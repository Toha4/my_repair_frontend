import React from "react";
import useTranslation from "next-translate/useTranslation";
import { Box, Text, Button, useDisclosure, useToast } from "@chakra-ui/react";
import style from "./Settings.module.scss";
import ActionTableRow from "../tables/ActionTableRow";
import TableSettings from "../tables/TableSetting";
import RoomFormModal from "../forms/settings/RoomFormModal";
import { useAppSelector } from "../../redux/hooks";
import { OurStore } from "../../redux/store";
import { RoomItemTypes } from "../../utils/api/types";
import { useConfirmationModalContext } from "../../contexts/ModalDialogContext";
import { Api } from "../../utils/api";


const RoomsSettings: React.FC = () => {
  const { t, lang } = useTranslation("settings");
  const { user } = useAppSelector((state: OurStore) => state.authReducer);
  const { isOpen: isOpenForm, onOpen: onOpenForm, onClose: onCloseForm } = useDisclosure()
  const [idEdit, setIdEdit] = React.useState<number | null>(null);

  const [rooms, setRooms] = React.useState<RoomItemTypes[]>([]);
  const [update, setUpdate] = React.useState<boolean>(true);
  const [loading, setLoading] = React.useState<boolean>(false);

  const [currentHome, setCurrentHome] = React.useState<number | undefined>(undefined);

  const toast = useToast();
  const modalContext = useConfirmationModalContext()

  React.useEffect(() => {
    if (update || currentHome != user?.settings?.current_home) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const result = await Api().room.getAll();
          setRooms(result);
        } catch (e) {
          console.error("Error from get categories");
        }

        setUpdate(false);
        setLoading(false);
        setCurrentHome(user?.settings?.current_home);
      }

      fetchData();
    }
  }, [update, user])

  const columns = React.useMemo(
    () => [
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
        updateTable();
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

  const updateTable = () => {
    setUpdate(true);
  };

  return (
    <>
      {isOpenForm && <RoomFormModal id={idEdit} isOpen={isOpenForm} onClose={onCloseForm} onUpdateTable={updateTable} />}

      <Box className={style.settingBox}>
        <Button variant="brandSolid" onClick={handleAddRoom}>
          {`${t("actionAdd")} ${t("room")}`}
        </Button>

        <Box mt="15px" mb="15px">
          <TableSettings
            columns={columns}
            data={rooms}
            maxHeight="600px"
            emptyPlaceholder={loading ? "" : t("placeholderEmpty", { name: t("roomsEmpty") })}
          />
        </Box>
        <Text>{t("noteRooms", { name: user?.settings?.current_home_name })}</Text>
      </Box>
    </>
  );
};

export default RoomsSettings;
