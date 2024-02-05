import React from "react";
import SelectForm from "./SelectForm";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { OurStore } from "../../../../../redux/store";
import useTranslation from "next-translate/useTranslation";
import { LoadingStatus } from "../../../../../redux/types";
import { fetchRooms } from "../../../../../redux/slices/roomsSlice";
import { isCurrentLandMode } from "../../../../../utils/repairObjects";

interface IRoomSelectForm {
  isRequired?: boolean;
  loading?: boolean;
  skipLabel?: boolean;
  keyItem?: string;
  placeholder?: string;
  isInvalid?: boolean;
  name?: string;
}

const RoomSelectForm: React.FC<IRoomSelectForm> = ({
  isRequired,
  loading = false,
  skipLabel = false,
  keyItem = "room",
  placeholder = " ",
  name = "",
  isInvalid,
}) => {
  const { t } = useTranslation("settings");
  const { user } = useAppSelector((state: OurStore) => state.authReducer);

  const { rooms, status: roomsStatus } = useAppSelector((state: OurStore) => state.roomsReducer);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (roomsStatus === LoadingStatus.IDLE) {
      dispatch(fetchRooms());
    }
  }, [roomsStatus, dispatch]);

  return (
    <SelectForm
      name={!skipLabel ? (!!name ? name : t("common:room")) : undefined}
      keyItem={keyItem}
      isRequired={isRequired}
      placeholder={placeholder}
      loading={loading || roomsStatus === LoadingStatus.LOADING}
      isInvalid={isInvalid}
    >
      {rooms.map((room) => (
        <option key={room.pk} value={room.pk}>
          {isCurrentLandMode(user) ? `${room.building_name} - ${room.name}` : room.name}
        </option>
      ))}
    </SelectForm>
  );
};

export default RoomSelectForm;
