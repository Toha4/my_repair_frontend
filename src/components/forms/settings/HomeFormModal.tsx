import React from "react";
import useTranslation from "next-translate/useTranslation";
import { FormProvider, useForm } from "react-hook-form";
import style from "../form.module.scss";
import ModalForm from "../../common/ModalForm";

import { yupResolver } from "@hookform/resolvers/yup";
import { HomeFormSchema } from "../../../utils/validations";
import InputForm from "../elements/InputForm";
import InputNumberForm from "../elements/InputNumberForm";
import SelectForm from "../elements/SelectForm";
import { HomeTypesNames } from "../../../constants/home";
import { capitalizeFirstLetter } from "../../../utils/DataConvert";
import { Api } from "../../../utils/api";
import { useToast } from "@chakra-ui/react";


interface IFormHome {
  name: string;
  type: number;
  square?: number | null;
}

const HomeFormModal: React.FC<IModalForm> = ({ id, isOpen, onClose, onUpdateTable }) => {
  const { t } = useTranslation("settings");

  const methodsForm = useForm<IFormHome>({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    resolver: yupResolver(HomeFormSchema(t)),
  });

  const toast = useToast();

  const { reset } = methodsForm;

  React.useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const result = await Api().home.get(id);
        reset({
          name: result.name,
          type: result.type_home,
          square: result.square,
        });
      }
      fetchData();
    }
  }, []);

  const handleSave = async (value: IFormHome) => {
    const data = {
      name: value.name,
      type_home: value.type,
      square: value.square,
    };

    try {
      if (id) {
        await Api().home.update(id, data);
        onUpdateTable();
      } else {
        await Api().home.create(data);
        onUpdateTable();
      }
    } catch (err) {
      console.warn('Error add or update shop', err);
      toast({ title: t("unknownError"), status: "error" });
    } finally {
      onClose();
    }
  };

  return (
    <ModalForm
      isOpen={isOpen}
      header={`${t(id ? "actionEdit" : "actionAdd")} ${t("home")}`}
      onClose={onClose}
      okText={t(id ? "actionSave" : "actionAdd")}
      onOk={methodsForm.handleSubmit(handleSave)}
    >
      <FormProvider {...methodsForm}>
        <form className={style.settingForm}>
          <InputForm name={t("name")} keyItem="name" isRequired />
          <SelectForm
            name={t("type")}
            keyItem="type"
            isRequired
            placeholder=" "
          >
            {Object.entries(HomeTypesNames).map(([key, value]) => (
              <option key={key} value={key}>{capitalizeFirstLetter(t(value))}</option>
            ))}
          </SelectForm>
          <InputNumberForm name={t("square")} keyItem="square" />
        </form>
      </FormProvider>
    </ModalForm>
  );
};

export default HomeFormModal;
