import React from "react";
import useTranslation from "next-translate/useTranslation";
import { FormProvider, useForm } from "react-hook-form";
import style from "../Settings.module.scss";
import ModalForm from "../../common/ModalForm";

import { yupResolver } from "@hookform/resolvers/yup";
import { RepairObjectFormSchema } from "../validations";
import InputForm from "../../common/forms/elements/InputForm";
import InputNumberForm from "../../common/forms/elements/InputNumberForm";
import SelectForm from "../../common/forms/elements/selects/SelectForm";
import { RepairObjectTypesNames } from "../../../constants/object";
import { capitalizeFirstLetter } from "../../../utils/DataConvert";
import { Api } from "../../../utils/api";
import { useToast } from "@chakra-ui/react";
import { useAppDispatch } from "../../../redux/hooks";
import { RepairObjectItemTypes } from "../../../utils/api/types";
import { repairObjectAdded, repairObjectUpdated } from "../../../redux/slices/repairObjectSlice";
import { IModalForm } from "../../common/forms/types";


interface IFormObject {
  name: string;
  type: number;
  square?: number | null;
}

const RepairObjectFormModal: React.FC<IModalForm> = ({ id, isOpen, onClose }) => {
  const { t } = useTranslation("settings");

  const methodsForm = useForm<IFormObject>({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    resolver: yupResolver(RepairObjectFormSchema(t)),
  });

  const toast = useToast();

  const { reset } = methodsForm;

  const [loading, setLoading] = React.useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (id) {
      setLoading(true);

      const fetchData = async () => {
        const result = await Api().repairObject.get(id);
        reset({
          name: result.name,
          type: result.type_object,
          square: result.square,
        });

        setLoading(false);
      }

      fetchData();
    }
  }, []);

  const handleSave = async (value: IFormObject) => {
    const data = {
      name: value.name,
      type_object: value.type,
      square: value.square,
    };

    try {
      setSubmitLoading(true);

      if (id) {
        await Api().repairObject.update(id, data).then(
          (reparObject: RepairObjectItemTypes) => {
            dispatch(repairObjectUpdated(reparObject));
            setSubmitLoading(false);
          }
        );
      } else {
        await Api().repairObject.create(data).then(
          (reparObject: RepairObjectItemTypes) => {
            dispatch(repairObjectAdded(reparObject));
            setSubmitLoading(false);
          }
        );
      }
    } catch (err) {
      console.warn('Error add or update object repair', err);
      toast({ title: t("common:unknownError"), status: "error" });
    } finally {
      onClose();
    }
  };

  return (
    <ModalForm
      isOpen={isOpen}
      header={`${t(id ? "common:actionEdit" : "common:actionAdd")} ${t("common:object").toLocaleLowerCase()}`}
      onClose={onClose}
      okText={t(id ? "common:actionSave" : "common:actionAdd")}
      onOk={methodsForm.handleSubmit(handleSave)}
      isLoadingSubmitButton={submitLoading}
    >
      <FormProvider {...methodsForm}>
        <form className={style.settingForm}>
          <InputForm name={t("common:name")} keyItem="name" isRequired loading={loading}/>
          
          <SelectForm
            name={t("common:type")}
            keyItem="type"
            isRequired={!id}
            disabled={!!id}
            placeholder=" "
            tooltip={t("typeDescription")}
            helpText={t("typeHelpText")}
            loading={loading}
          >
            {Object.entries(RepairObjectTypesNames).map(([key, value]) => (
              <option key={key} value={key}>{capitalizeFirstLetter(t(value))}</option>
            ))}
          </SelectForm>
          
          <InputNumberForm name={t("square")} keyItem="square" loading={loading}/>
        </form>
      </FormProvider>
    </ModalForm>
  );
};

export default RepairObjectFormModal;
