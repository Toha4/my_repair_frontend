import React from "react";
import useTranslation from "next-translate/useTranslation";
import { Box, Button, Text, useDisclosure, useToast } from "@chakra-ui/react";
import style from "./Settings.module.scss";
import TableSettings from "../tables/TableSetting";
import ActionTableRow from "../tables/ActionTableRow";
import HomeFormModal from "../forms/settings/HomeFormModal";
import { HomeItemTypes } from "../../utils/api/types";
import { useConfirmationModalContext } from "../../contexts/ModalDialogContext";
import { Api } from "../../utils/api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { OurStore } from "../../redux/store";
import { setUserSettings } from "../../redux/slices/auth";


const HomesSettings: React.FC = () => {
  const { t, lang } = useTranslation("settings");
  const { user } = useAppSelector((state: OurStore) => state.authReducer);
  const dispatch = useAppDispatch();
  
  const { isOpen: isOpenForm, onOpen: onOpenForm, onClose: onCloseForm } = useDisclosure()
  const [idEdit, setIdEdit] = React.useState<number | null>(null);

  const [homes, setHomes] = React.useState<HomeItemTypes[]>([]);
  const [update, setUpdate] = React.useState<boolean>(true);
  const [loading, setLoading] = React.useState<boolean>(false);

  const toast = useToast();
  const modalContext = useConfirmationModalContext()

  React.useEffect(() => {
    if (update) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const result = await Api().home.getAll();
          setHomes(result);
        } catch (e) {
          console.error("Error from get categories");
        }

        setUpdate(false);
        setLoading(false);
      }

      fetchData();
    }
  }, [update])

  const columns = React.useMemo(
    () => [
      {
        Header: t("name"),
        accessor: "name",
        width: "40%",
      },
      {
        Header: t("type"),
        accessor: "type_name",
        width: "25%",
      },
      {
        Header: t("square"),
        accessor: "square",
        width: "20%",
        disableSortBy: true,
      },
      {
        Header: t("action"),
        accessor: "action",
        width: "15%",
        disableSortBy: true,
        Cell: (props: any) => {
          const { row: { original } } = props;
          return (
            <ActionTableRow
              id={original.pk}
              is_active={original.pk == user?.settings?.current_home}
              onClickActive={handleSetActiveHome}
              onClickEdit={handleEditHome}
              onClickDelete={handleDeleteHome}
            />
          )
        }
      }
    ],
    [lang, homes, user]
  );

  const handleSetActiveHome = async (id: number) => {
    const data = await Api().home.setCurrentHome(id);
    if (dispatch) {
      dispatch(setUserSettings(data));
    }
  };

  const handleEditHome = (id: number) => {
    setIdEdit(id);
    onOpenForm();
  };

  const handleDeleteHome = async (id: number) => {
    const nameHome = homes.find(item => id === item.pk)?.name;
    const resultConfirm = await modalContext.showConfirmation(
      t("confirmationTextDelete", { name: t("home"), object: nameHome })
    );

    if (!resultConfirm) {
      return;
    }

    Api().home.remove(id)
      .then(() => {
        updateTable();
      })
      .catch((err) => {
        console.warn('Error delete home', err);
        toast({ title: t("unknownError"), status: "error" });
      })
  };

  const handleAddHome = () => {
    setIdEdit(null);
    onOpenForm();
  };

  const updateTable = () => {
    setUpdate(true);
  };

  return (
    <>
      {isOpenForm && <HomeFormModal id={idEdit} isOpen={isOpenForm} onClose={onCloseForm} onUpdateTable={updateTable} />}

      <Box className={style.settingBox} >
        <Button variant="brandSolid" onClick={handleAddHome}>
          {`${t("actionAdd")} ${t("home")}`}
        </Button>

        <Box mt="15px" mb="15px">
          <TableSettings
            columns={columns}
            data={homes}
            maxHeight="600px"
            emptyPlaceholder={loading ? "" : t("placeholderEmpty", { name: t("homesEmpty") })}
          />
        </Box>
        <Text>{t("noteHomes")}</Text>
      </Box>
    </>
  );
};

export default HomesSettings;