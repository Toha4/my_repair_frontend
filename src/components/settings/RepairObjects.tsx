import React from "react";
import useTranslation from "next-translate/useTranslation";
import { Box, Button, Text, useDisclosure, useToast } from "@chakra-ui/react";
import style from "./Settings.module.scss";
import TableSettings from "./tables/TableSetting";
import ActionTableRow from "./tables/ActionTableRow";
import RepairObjectFormModal from "./forms/RepairObjectFormModal";
import { useConfirmationModalContext } from "../../contexts/ModalDialogContext";
import { Api } from "../../utils/api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { OurStore } from "../../redux/store";
import { setUserSettings } from "../../redux/slices/authSlice";
import { LoadingStatus } from "../../redux/types";
import { reset as resetBuildings } from "../../redux/slices/buildingsSlice";
import { reset as resetRooms } from "../../redux/slices/roomsSlice";
import { fetchRepairObjects, repairObjectRemoved } from "../../redux/slices/repairObjectSlice";
import { createColumnHelper } from "@tanstack/react-table";
import { RepairObjectItemTypes } from "../../utils/api/types";
import { ActionColumnType } from "../../types/types";

const RepairObjectsSettings: React.FC = () => {
  const { t, lang } = useTranslation("settings");

  const { user } = useAppSelector((state: OurStore) => state.authReducer);

  const { isOpen: isOpenForm, onOpen: onOpenForm, onClose: onCloseForm } = useDisclosure();
  const [idEdit, setIdEdit] = React.useState<number | null>(null);

  const toast = useToast();
  const modalContext = useConfirmationModalContext();

  const { repairObjects, status: repairObjectsStatus } = useAppSelector(
    (state: OurStore) => state.repairObjectsReducer
  );
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (repairObjectsStatus === LoadingStatus.IDLE) {
      dispatch(fetchRepairObjects());
    }
  }, [repairObjectsStatus, dispatch]);

  const columnHelper = createColumnHelper<RepairObjectItemTypes & ActionColumnType>();
  const columns = React.useMemo(
    () => [
      columnHelper.accessor("name", {
        id: "name",
        header: () => <span>{t("common:name")}</span>,
      }),
      columnHelper.accessor("type_object_name", {
        id: "type_object_name",
        header: () => <span>{t("common:type")}</span>,
      }),
      columnHelper.accessor("square", {
        id: "square",
        header: () => <span>{t("square")}</span>,
        size: 148,
        enableSorting: false,
      }),
      columnHelper.accessor("action", {
        id: "action",
        header: () => <span>{t("action")}</span>,
        size: 105,
        enableSorting: false,
        cell: (props: any) => {
          const {
            row: { original },
          } = props;
          return (
            <ActionTableRow
              id={original.pk}
              is_active={original.pk == user?.settings?.current_repair_object}
              onClickActive={handleSetActiveRepairObject}
              onClickEdit={handleEditRepairObject}
              onClickDelete={handleDeleteRepairObject}
            />
          );
        },
      }),
    ],
    [lang, repairObjects, user]
  );

  const handleSetActiveRepairObject = async (id: number) => {
    const data = await Api().repairObject.setCurrentRepairObject(id);
    if (dispatch) {
      dispatch(setUserSettings(data));
      reloadRepairObjectData();
    }
  };

  const reloadRepairObjectData = () => {
    /* Удаляем ранее загруженные данные для объекта ремонта*/

    dispatch(resetBuildings());
    dispatch(resetRooms());
  };

  const handleEditRepairObject = (id: number) => {
    setIdEdit(id);
    onOpenForm();
  };

  const handleDeleteRepairObject = async (id: number) => {
    if (id === user?.settings?.current_repair_object) {
      toast({ title: t("objectDisableHelpText"), status: "info" });
      return;
    }

    const nameObject = repairObjects.find((item) => id === item.pk)?.name;
    const resultConfirm = await modalContext.showConfirmation(
      t("common:confirmationTextDeleteWithObject", { name: t("common:object").toLocaleLowerCase(), object: nameObject })
    );

    if (!resultConfirm) {
      return;
    }

    Api()
      .repairObject.remove(id)
      .then(() => {
        dispatch(repairObjectRemoved(id));
      })
      .catch((err) => {
        console.warn("Error delete repair object", err);
        toast({ title: t("unknownError"), status: "error" });
      });
  };

  const handleAddRepairObject = () => {
    setIdEdit(null);
    onOpenForm();
  };

  return (
    <>
      {isOpenForm && <RepairObjectFormModal id={idEdit} isOpen={isOpenForm} onClose={onCloseForm} />}

      <Box className={style.settingBox}>
        <Text marginBottom=".6rem">{t("noteHomes")}</Text>
        <Button variant="brandSolid" onClick={handleAddRepairObject}>
          {`${t("common:actionAdd")} ${t("common:object").toLocaleLowerCase()}`}
        </Button>
        <Box mt="15px" mb="15px">
          <TableSettings
            columns={columns}
            data={repairObjects}
            maxHeight="600px"
            loading={repairObjectsStatus === LoadingStatus.LOADING}
            emptyPlaceholder={t("placeholderEmpty", { name: t("objectsEmpty") })}
          />
        </Box>
      </Box>
    </>
  );
};

export default RepairObjectsSettings;
