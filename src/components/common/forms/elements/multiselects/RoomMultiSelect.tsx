import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { OurStore } from "../../../../../redux/store";
import useTranslation from "next-translate/useTranslation";
import { LoadingStatus } from "../../../../../redux/types";
import { fetchRooms } from "../../../../../redux/slices/roomsSlice";
import MultiSelectForm, { IMultiselectOption } from "./MultiSelectForm";

interface IRoomMultiselectForm {
  keyItem?: string;
  isRequired?: boolean;
  loading?: boolean;
  skipLabel?: boolean;
  placeholder?: string;
}

const RoomMultiselectForm: React.FC<IRoomMultiselectForm> = ({
  keyItem = "rooms",
  isRequired,
  loading = false,
  skipLabel = false,
  placeholder = "",
}) => {
  const { t } = useTranslation("common");

  const { rooms, status: roomsStatus } = useAppSelector((state: OurStore) => state.roomsReducer);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (roomsStatus === LoadingStatus.IDLE) {
      dispatch(fetchRooms());
    }
  }, [roomsStatus, dispatch]);

  const option: IMultiselectOption[] =
    rooms.length > 0 ? rooms.map((room) => ({ label: room.name, value: room.pk!.toString() })) : [];

  return (
    <React.Fragment>
      <MultiSelectForm
        options={option}
        name={!skipLabel ? t("common:rooms") : undefined}
        keyItem={keyItem}
        isRequired={isRequired}
        placeholder={placeholder}
        loading={loading || roomsStatus === LoadingStatus.LOADING}
      />
    </React.Fragment>
  );
};

export default RoomMultiselectForm;
