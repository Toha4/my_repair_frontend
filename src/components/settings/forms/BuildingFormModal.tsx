import React from "react";
import useTranslation from "next-translate/useTranslation";
import { FormProvider, useForm } from "react-hook-form";
import style from "../Settings.module.scss";
import ModalForm from "../../common/ModalForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { BuildingFormSchema } from "../../../utils/validations";
import InputForm from "../../common/forms/elements/InputForm";
import InputNumberForm from "../../common/forms/elements/InputNumberForm";
import DatepickerForm from "../../common/forms/elements/DatepickerForm";
import moment from "moment";
import { stringToDate } from "../../../utils/DataConvert";
import { Api } from "../../../utils/api";
import { useToast } from "@chakra-ui/react";
import { BuildingItemTypes } from "../../../utils/api/types";
import { useAppDispatch } from "../../../redux/hooks";
import { buildingAdded, buildingUpdated } from "../../../redux/slices/buildingsSlice";


interface IFormBuilding {
  name: string;
  square?: number;
  date_begin?: Date | null;
  date_end?: Date | null;
}

const BuildingFormModal: React.FC<IModalForm> = ({ id, isOpen, onClose }) => {
  const { t } = useTranslation("settings");

  const methodsForm = useForm<IFormBuilding>({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    resolver: yupResolver(BuildingFormSchema(t)),
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
        const result = await Api().building.get(id);
        reset({
          name: result.name,
          square: result.square,
          date_begin: result.date_begin ? stringToDate(result.date_begin) : null,
          date_end: result.date_end ? stringToDate(result.date_end) : null
        });

        setLoading(false);
      }
      fetchData();
    }
  }, []);

  const handleSave = async (value: IFormBuilding) => {
    const data = {
      name: value.name,
      square: value.square,
      date_begin: value.date_begin ? moment(value.date_begin).format("YYYY-MM-DD") : null,
      date_end: value.date_end ? moment(value.date_end).format("YYYY-MM-DD") : null,
    };

    try {
      setSubmitLoading(true);

      if (id) {
        await Api().building.update(id, data).then(
          (building: BuildingItemTypes) => {
            dispatch(buildingUpdated(building));
            setSubmitLoading(false);
          }
        );
      } else {
        await Api().building.create(data).then(
          (building: BuildingItemTypes) => {
            dispatch(buildingAdded(building));
            setSubmitLoading(false);
          }
        );
      }
    } catch (err) {
      console.warn('Error add or update building', err);
      toast({ title: t("unknownError"), status: "error" });
    } finally {
      onClose();
    }
  };

  return (
    <ModalForm
      isOpen={isOpen}
      header={`${t(id ? "actionEdit" : "actionAdd")} ${t("building")}`}
      onClose={onClose}
      okText={t(id ? "actionSave" : "actionAdd")}
      onOk={methodsForm.handleSubmit(handleSave)}
      isLoadingSubmitButton={submitLoading}
    >
      <FormProvider {...methodsForm}>
        <form className={style.settingForm}>
          <InputForm name={t("name")} keyItem="name" isRequired loading={loading}/>
          <InputNumberForm name={t("square")} keyItem="square" loading={loading}/>
          <DatepickerForm name={t("dateBegin")} keyItem="date_begin" placeholder={t("actionSelectDate")} loading={loading}/>
          <DatepickerForm name={t("dateEnd")} keyItem="date_end" placeholder={t("actionSelectDate")} loading={loading}/>
        </form>
      </FormProvider>
    </ModalForm>
  );
};

export default BuildingFormModal;
