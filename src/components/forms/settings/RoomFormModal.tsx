import React from "react";
import useTranslation from "next-translate/useTranslation";
import { FormProvider, useForm } from "react-hook-form";
import style from "../form.module.scss";
import ModalForm from "../../common/ModalForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { RoomFormSchema } from "../../../utils/validations";
import InputForm from "../elements/InputForm";
import InputNumberForm from "../elements/InputNumberForm";
import DatepickerForm from "../elements/DatepickerForm";
import moment from "moment";
import { stringToDate } from "../../../utils/DataConvert";


interface IFormRoom {
  name: string;
  square?: number;
  date_begin?: Date | null;
  date_end?: Date | null;
}

const RoomFormModal: React.FC<IModalForm> = ({ id, isOpen, onClose }) => {
  const { t } = useTranslation("settings");

  const methodsForm = useForm<IFormRoom>({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    resolver: yupResolver(RoomFormSchema(t)),
  });

  const { reset } = methodsForm;

  React.useEffect(() => {
    if (id) {
      console.log(`Loading room [${id}]`);
      // Simulated loading
      setTimeout(() => {
        const test_data = { name: "Спальня", square: 15.2, date_begin: stringToDate("12.11.2020"), date_end: null }
        reset(test_data);
      }, 100)
    }
  }, []);

  const handleSave = (value: IFormRoom) => {
    console.log('value: ', value);
    const data = {
      name: value.name,
      square: value.square,
      date_begin: value.date_begin ? moment(value.date_begin).format("YYYY-MM-DD") : null,
      date_end: value.date_end ? moment(value.date_end).format("YYYY-MM-DD") : null,
    };

    if (id) {
      console.log("Save room: ", data);
    } else {
      console.log("Add room: ", data);
    }

    onClose();
  };

  return (
    <ModalForm
      isOpen={isOpen}
      header={`${t(id ? "actionEdit" : "actionAdd")} ${t("room")}`}
      onClose={onClose}
      okText={t(id ? "actionSave" : "actionAdd")}
      onOk={methodsForm.handleSubmit(handleSave)}
    >
      <FormProvider {...methodsForm}>
        <form className={style.settingForm}>
          <InputForm name={t("name")} keyItem="name" isRequired />
          <InputNumberForm name={t("square")} keyItem="square" />
          <DatepickerForm name={t("dateBegin")} keyItem="date_begin" placeholder={t("actionSelectDate")} />
          <DatepickerForm name={t("dateEnd")} keyItem="date_end" placeholder={t("actionSelectDate")} />
        </form>
      </FormProvider>
    </ModalForm>
  );
};

export default RoomFormModal;
