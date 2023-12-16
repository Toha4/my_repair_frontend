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
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { OurStore } from "../../../redux/store";
import { isCurrentLandMode } from "../../../utils/repairObjects";
import BuildingSelectForm from "../elements/BuildingSelectForm";
import { RoomItemTypes } from "../../../utils/api/types";
import { roomAdded, roomUpdated } from "../../../redux/slices/roomsSlice";

interface IFormRoom {
  name: string;
  building?: number;
  square?: number;
  date_begin?: Date | null;
  date_end?: Date | null;
}

const RoomFormModal: React.FC<IModalForm> = ({ id, isOpen, onClose }) => {
  const { t } = useTranslation("settings");
  const { user } = useAppSelector((state: OurStore) => state.authReducer);

  const methodsForm = useForm<IFormRoom>({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    resolver: yupResolver(RoomFormSchema(t)),
  });

  const toast = useToast();

  const { reset } = methodsForm;

  const [loading, setLoading] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (id) {
      setLoading(true);

      const fetchData = async () => {
        const result = await Api().room.get(id);
        reset({
          name: result.name,
          building: result.building,
          square: result.square,
          date_begin: result.date_begin ? stringToDate(result.date_begin) : null,
          date_end: result.date_end ? stringToDate(result.date_end) : null,
        });

        setLoading(false);
      };
      fetchData();
    }
  }, []);

  const handleSave = async (value: IFormRoom) => {
    const data = {
      name: value.name,
      building: value.building,
      square: value.square,
      date_begin: value.date_begin ? moment(value.date_begin).format("YYYY-MM-DD") : null,
      date_end: value.date_end ? moment(value.date_end).format("YYYY-MM-DD") : null,
    };

    try {
      if (id) {
        await Api().room.update(id, data).then(
          (room: RoomItemTypes) => {
            dispatch(roomUpdated(room))
          }
        );
      } else {
        await Api().room.create(data).then(
          (room: RoomItemTypes) => {
            dispatch(roomAdded(room));
          }
        );
      }
    } catch (err) {
      console.warn("Error add or update room", err);
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
          <InputForm name={t("name")} keyItem="name" isRequired loading={loading}/>
          {isCurrentLandMode(user) && (
            <BuildingSelectForm isRequired loading={loading}></BuildingSelectForm>
          )}
          <InputNumberForm name={t("square")} keyItem="square" loading={loading}/>
          <DatepickerForm name={t("dateBegin")} keyItem="date_begin" placeholder={t("actionSelectDate")} loading={loading}/>
          <DatepickerForm name={t("dateEnd")} keyItem="date_end" placeholder={t("actionSelectDate")} loading={loading}/>
        </form>
      </FormProvider>
    </ModalForm>
  );
};

export default RoomFormModal;
