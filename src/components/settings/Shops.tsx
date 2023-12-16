import React from "react";
import useTranslation from "next-translate/useTranslation";
import { Box, Button, useDisclosure, useToast } from "@chakra-ui/react";
import style from "./Settings.module.scss";
import TableSettings from "../tables/TableSetting";
import ActionTableRow from "../tables/ActionTableRow";
import ShopFormModal from "../forms/settings/ShopFormModal";
import { useConfirmationModalContext } from "../../contexts/ModalDialogContext";
import { Api } from "../../utils/api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { OurStore } from "../../redux/store";
import { LoadingStatus } from "../../redux/types";
import { fetchShops, shopRemoved } from "../../redux/slices/shopsSlice";

const ShopsSettings: React.FC = () => {
  const { t, lang } = useTranslation("settings");
  const { isOpen: isOpenForm, onOpen: onOpenForm, onClose: onCloseForm } = useDisclosure();
  const [idEdit, setIdEdit] = React.useState<number | null>(null);

  const toast = useToast();
  const modalContext = useConfirmationModalContext();

  const { shops, status: shopsStatus } = useAppSelector((state: OurStore) => state.shopsReducer);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (shopsStatus === LoadingStatus.IDLE) {
      dispatch(fetchShops());
    }
  }, [shopsStatus, dispatch]);

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
          const {
            row: { original },
          } = props;
          return (
            <a href={original.link} target="_blank">
              {original.link}
            </a>
          );
        },
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
          return <ActionTableRow id={original.pk} onClickEdit={handleEditShop} onClickDelete={handleDeleteShop} />;
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
    const nameShop = shops.find((item) => id === item.pk)?.name;
    const resultConfirm = await modalContext.showConfirmation(
      t("confirmationTextDelete", { name: t("shop"), object: nameShop })
    );

    if (!resultConfirm) {
      return;
    }

    Api()
      .shop.remove(id)
      .then(() => {
        dispatch(shopRemoved(id));
      })
      .catch((err) => {
        console.warn("Error delete shop", err);
        toast({ title: t("unknownError"), status: "error" });
      });
  };

  const handleAddShop = () => {
    setIdEdit(null);
    onOpenForm();
  };

  return (
    <>
      {isOpenForm && (
        <ShopFormModal id={idEdit} isOpen={isOpenForm} onClose={onCloseForm} />
      )}

      <Box className={style.settingBox}>
        <Button variant="brandSolid" onClick={handleAddShop}>
          {`${t("actionAdd")} ${t("shop")}`}
        </Button>

        <Box mt="15px" mb="15px">
          <TableSettings
            columns={columns}
            data={shops}
            maxHeight="600px"
            loading={shopsStatus === LoadingStatus.LOADING}
            emptyPlaceholder={t("placeholderEmpty", { name: t("shopsEmpty") })}
          />
        </Box>
      </Box>
    </>
  );
};

export default ShopsSettings;
