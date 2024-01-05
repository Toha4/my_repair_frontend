import React from "react";
import useTranslation from "next-translate/useTranslation";
import { Box, Button, useDisclosure, useToast } from "@chakra-ui/react";
import ActionTableRow from "../../tables/ActionTableRow";
import TableSettings from "../../tables/TableSetting";
import BuildingFormModal from "../../forms/settings/BuildingFormModal";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { OurStore } from "../../../redux/store";
import { useConfirmationModalContext } from "../../../contexts/ModalDialogContext";
import { Api } from "../../../utils/api";
import { LoadingStatus } from "../../../redux/types";
import { buildingRemoved, fetchBuildings } from "../../../redux/slices/buildingsSlice";
import { createColumnHelper } from "@tanstack/react-table";
import { BuildingItemTypes } from "../../../utils/api/types";
import { ActionColumnType } from "../../../types/types";

const BuildingsSettings: React.FC = () => {
  const { t, lang } = useTranslation("settings");

  const { isOpen: isOpenForm, onOpen: onOpenForm, onClose: onCloseForm } = useDisclosure();
  const [idEdit, setIdEdit] = React.useState<number | null>(null);

  const toast = useToast();
  const modalContext = useConfirmationModalContext();

  const { buildings, status: buildingsStatus } = useAppSelector((state: OurStore) => state.buildingsReducer);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (buildingsStatus === LoadingStatus.IDLE) {
      dispatch(fetchBuildings());
    }
  }, [buildingsStatus, dispatch]);

  const columnHelper = createColumnHelper<BuildingItemTypes & ActionColumnType>();
  const columns = React.useMemo(
    () => [
      columnHelper.accessor("name", {
        id: "name",
        header: () => <span>{t("name")}</span>,
      }),
      columnHelper.accessor("square", {
        id: "square",
        header: () => <span>{t("square")}</span>,
        size: 120,
      }),
      columnHelper.accessor("date_begin", {
        id: "dateBegin",
        header: () => <span>{t("dateBegin")}</span>,
        size: 135,
      }),
      columnHelper.accessor("date_end", {
        id: "dateEnd",
        header: () => <span>{t("dateEnd")}</span>,
        size: 135,
      }),
      columnHelper.accessor("action", {
        id: "action",
        header: () => <span>{t("action")}</span>,
        size: 90,
        enableSorting: false,
        cell: (props: any) => {
          const {
            row: { original },
          } = props;
          return (
            <ActionTableRow id={original.pk} onClickEdit={handleEditBuilding} onClickDelete={handleDeleteBuilding} />
          );
        },
      }),
    ],
    [lang, buildings]
  );

  const handleEditBuilding = (id: number) => {
    setIdEdit(id);
    onOpenForm();
  };

  const handleDeleteBuilding = async (id: number) => {
    const nameBuilding = buildings.find((item) => id === item.pk)?.name;
    const resultConfirm = await modalContext.showConfirmation(
      t("confirmationTextDelete", { name: t("building"), object: nameBuilding })
    );

    if (!resultConfirm) {
      return;
    }

    Api()
      .building.remove(id)
      .then(() => {
        dispatch(buildingRemoved(id));
      })
      .catch((err) => {
        console.warn("Error delete building", err);
        toast({ title: t("unknownError"), status: "error" });
      });
  };

  const handleAddBuilding = () => {
    setIdEdit(null);
    onOpenForm();
  };

  return (
    <>
      {isOpenForm && <BuildingFormModal id={idEdit} isOpen={isOpenForm} onClose={onCloseForm} />}

      <Button variant="brandSolid" onClick={handleAddBuilding}>
        {`${t("actionAdd")} ${t("building")}`}
      </Button>

      <Box mt="15px" mb="15px">
        <TableSettings
          columns={columns}
          data={buildings}
          maxHeight="600px"
          loading={buildingsStatus === LoadingStatus.LOADING}
          emptyPlaceholder={t("placeholderEmpty", { name: t("buildingsEmpty") })}
        />
      </Box>
    </>
  );
};

export default BuildingsSettings;
