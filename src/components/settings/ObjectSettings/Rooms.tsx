import React from "react";
import useTranslation from "next-translate/useTranslation";
import { Box, Button, useDisclosure, useToast } from "@chakra-ui/react";
import ActionTableRow from "../../tables/ActionTableRow";
import TableSettings from "../../tables/TableSetting";
import RoomFormModal from "../../forms/settings/RoomFormModal";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { OurStore } from "../../../redux/store";
import { useConfirmationModalContext } from "../../../contexts/ModalDialogContext";
import { Api } from "../../../utils/api";
import { isCurrentLandMode } from "../../../utils/repairObjects";
import { LoadingStatus } from "../../../redux/types";
import { fetchRooms, roomRemoved } from "../../../redux/slices/roomsSlice";


const RoomsSettings: React.FC = () => {
  const { t, lang } = useTranslation("settings");
  const { user } = useAppSelector((state: OurStore) => state.authReducer);

  const { isOpen: isOpenForm, onOpen: onOpenForm, onClose: onCloseForm } = useDisclosure()
  const [idEdit, setIdEdit] = React.useState<number | null>(null);

  const toast = useToast();
  const modalContext = useConfirmationModalContext()

  const { rooms, status: roomsStatus } = useAppSelector((state: OurStore) => state.roomsReducer);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (roomsStatus === LoadingStatus.IDLE) {
      dispatch(fetchRooms())
    }
  }, [roomsStatus, dispatch])

  const columns = React.useMemo(
    () => isCurrentLandMode(user) ? [
      {
        Header: t("name"),
        accessor: "name",
        width: "20%",
      },
      {
        Header: t("building"),
        accessor: "building_name",
        width: "20%",
      },
      {
        Header: t("square"),
        accessor: "square",
        width: "14%",
        disableSortBy: true,
      },
      {
        Header: t("dateBegin"),
        accessor: "date_begin",
        width: "18%",
        disableSortBy: true,
      },
      {
        Header: t("dateEnd"),
        accessor: "date_end",
        width: "18%",
        disableSortBy: true,
      },
      {
        Header: t("action"),
        accessor: "action",
        width: "10%",
        disableSortBy: true,
        Cell: (props: any) => {
          const {
            row: { original },
          } = props;
          return (
            <ActionTableRow
              id={original.pk}
              onClickEdit={handleEditRoom}
              onClickDelete={handleDeleteRoom}
            />
          );
        },
      },
    ] : [
      {
        Header: t("name"),
        accessor: "name",
        width: "35%",
      },
      {
        Header: t("square"),
        accessor: "square",
        width: "15%",
        disableSortBy: true,
      },
      {
        Header: t("dateBegin"),
        accessor: "date_begin",
        width: "20%",
        disableSortBy: true,
      },
      {
        Header: t("dateEnd"),
        accessor: "date_end",
        width: "20%",
        disableSortBy: true,
      },
      {
        Header: t("action"),
        accessor: "action",
        width: "10%",
        disableSortBy: true,
        Cell: (props: any) => {
          const {
            row: { original },
          } = props;
          return (
            <ActionTableRow
              id={original.pk}
              onClickEdit={handleEditRoom}
              onClickDelete={handleDeleteRoom}
            />
          );
        },
      },
    ],
    [lang, rooms]
  );

  const handleEditRoom = (id: number) => {
    setIdEdit(id);
    onOpenForm();
  };

  const handleDeleteRoom = async (id: number) => {
    const nameRoom = rooms.find(item => id === item.pk)?.name;
    const resultConfirm = await modalContext.showConfirmation(
      t("confirmationTextDelete", { name: t("room"), object: nameRoom })
    );

    if (!resultConfirm) {
      return;
    }

    Api().room.remove(id)
      .then(() => {
        dispatch(roomRemoved(id));
      })
      .catch((err) => {
        console.warn('Error delete room', err);
        toast({ title: t("unknownError"), status: "error" });
      })
  };

  const handleAddRoom = () => {
    setIdEdit(null);
    onOpenForm();
  };

  return (
    <>
      {isOpenForm && <RoomFormModal id={idEdit} isOpen={isOpenForm} onClose={onCloseForm} />}

      <Button variant="brandSolid" onClick={handleAddRoom}>
        {`${t("actionAdd")} ${t("room")}`}
      </Button>

      <Box mt="15px" mb="15px">
        <TableSettings
          columns={columns}
          data={rooms}
          maxHeight="600px"
          loading={roomsStatus === LoadingStatus.LOADING}
          emptyPlaceholder={t("placeholderEmpty", { name: t("roomsEmpty") })}
        />
      </Box>
    </>
  );
};

export default RoomsSettings;
