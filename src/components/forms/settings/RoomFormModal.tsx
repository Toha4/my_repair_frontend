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
import { Api } from "../../../utils/api";
import { useToast } from "@chakra-ui/react";


interface IFormRoom {
  name: string;
  square?: number;
  date_begin?: Date | null;
  date_end?: Date | null;
}

const RoomFormModal: React.FC<IModalForm> = ({ id, isOpen, onClose, onUpdateTable }) => {
  const { t } = useTranslation("settings");

  const methodsForm = useForm<IFormRoom>({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    resolver: yupResolver(RoomFormSchema(t)),
  });

  const toast = useToast();
  
  const { reset } = methodsForm;

  React.useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const result = await Api().room.get(id);
        reset({
          name: result.name,
          square: result.square,
          date_begin: result.date_begin ? stringToDate(result.date_begin) : null,
          date_end: result.date_end ? stringToDate(result.date_end) : null
        });
      }
      fetchData();
    }
  }, []);

  const handleSave = async (value: IFormRoom) => {
    const data = {
      name: value.name,
      square: value.square,
      date_begin: value.date_begin ? moment(value.date_begin).format("YYYY-MM-DD") : null,
      date_end: value.date_end ? moment(value.date_end).format("YYYY-MM-DD") : null,
    };

    try {
      if (id) {
        await Api().room.update(id, data);
        onUpdateTable();
      } else {
        await Api().room.create(data);
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
