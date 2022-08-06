import React from "react";
import useTranslation from "next-translate/useTranslation";
import { Box, Button, useDisclosure, useToast } from "@chakra-ui/react";
import style from "./Settings.module.scss";
import TableSettings from "../tables/TableSetting";
import ActionTableRow from "../tables/ActionTableRow";
import ShopFormModal from "../forms/settings/ShopFormModal";
import { ShopItemTypes } from "../../utils/api/types";
import { useConfirmationModalContext } from "../../contexts/ModalDialogContext";
import { Api } from "../../utils/api";


const ShopsSettings: React.FC = () => {
  const { t, lang } = useTranslation("settings");
  const { isOpen: isOpenForm, onOpen: onOpenForm, onClose: onCloseForm } = useDisclosure()
  const [idEdit, setIdEdit] = React.useState<number | null>(null);

  const [shops, setShops] = React.useState<ShopItemTypes[]>([]);
  const [update, setUpdate] = React.useState<boolean>(true);
  const [loading, setLoading] = React.useState<boolean>(false);

  const toast = useToast();
  const modalContext = useConfirmationModalContext()

  React.useEffect(() => {
    if (update) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const result = await Api().shop.getAll();
          setShops(result);
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
        width: "45%",
      },
      {
        Header: t("link"),
        accessor: "link",
        width: "45%",
        disableSortBy: true,
        Cell: (props: any) => {
          const { row: { original } } = props;
          return (
            <a href={original.link} target="_blank">{original.link}</a>
          );
        },
      },
      {
        Header: t("action"),
        accessor: "action",
        width: "10%",
        disableSortBy: true,
        Cell: (props: any) => {
          const { row: { original } } = props;
          return (
            <ActionTableRow
              id={original.pk}
              onClickEdit={handleEditShop}
              onClickDelete={handleDeleteShop}
            />
          );
        },
      },
    ],
    [lang, shops]
  );

  const handleEditShop = (id: number) => {
    setIdEdit(id);
    onOpenForm();
  };

  const handleDeleteShop = async (id: number) => {
    const nameShop = shops.find(item => id === item.pk)?.name;
    const resultConfirm = await modalContext.showConfirmation(
      t("confirmationTextDelete", { name: t("shop"), object: nameShop })
    );

    if (!resultConfirm) {
      return;
    }

    Api().shop.remove(id)
      .then(() => {
        updateTable();
      })
      .catch((err) => {
        console.warn('Error delete shop', err);
        toast({ title: t("unknownError"), status: "error" });
      })
  };

  const handleAddShop = () => {
    setIdEdit(null);
    onOpenForm();
  };

  const updateTable = () => {
    setUpdate(true);
  };

  return (
    <>
      {isOpenForm && <ShopFormModal id={idEdit} isOpen={isOpenForm} onClose={onCloseForm} onUpdateTable={updateTable} />}

      <Box className={style.settingBox}>
        <Button variant="brandSolid" onClick={handleAddShop}>
          {`${t("actionAdd")} ${t("shop")}`}
        </Button>

        <Box mt="15px" mb="15px">
          <TableSettings
            columns={columns}
            data={shops}
            maxHeight="600px"
            emptyPlaceholder={loading ? "" : t("placeholderEmpty", { name: t("shopsEmpty") })}
          />
        </Box>
      </Box>
    </>
  );
};

export default ShopsSettings;