import React from "react";
import useTranslation from "next-translate/useTranslation";
import { Box, Button, useDisclosure, useToast } from "@chakra-ui/react";
import style from "./Settings.module.scss";
import ActionTableRow from "../tables/ActionTableRow";
import TableSettings from "../tables/TableSetting";
import CategoryFormModal from "../forms/settings/CategoryFormModal";
import { Api } from "../../utils/api";
import { useConfirmationModalContext } from "../../contexts/ModalDialogContext";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { OurStore } from "../../redux/store";
import { LoadingStatus } from "../../redux/types";
import { CategoryRemoved, fetchCategories } from "../../redux/slices/categorySlice";
import { createColumnHelper } from "@tanstack/react-table";
import { CategoryItemTypes } from "../../utils/api/types";
import { ActionColumnType } from "../../types/types";

const CategoriesSettings: React.FC = () => {
  const { t, lang } = useTranslation("settings");
  const { isOpen: isOpenForm, onOpen: onOpenForm, onClose: onCloseForm } = useDisclosure();
  const [idEdit, setIdEdit] = React.useState<number | null>(null);

  const toast = useToast();
  const modalContext = useConfirmationModalContext();

  const { categories, status: categoriesStatus } = useAppSelector((state: OurStore) => state.categoriesReducer);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (categoriesStatus === LoadingStatus.IDLE) {
      dispatch(fetchCategories());
    }
  }, [categoriesStatus, dispatch]);

  const columnHelper = createColumnHelper<CategoryItemTypes & ActionColumnType>();
  const columns = React.useMemo(
    () => [
      columnHelper.accessor("name", {
        id: "name",
        header: () => <span>{t("name")}</span>,
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
            <ActionTableRow id={original.pk} onClickEdit={handleEditCategory} onClickDelete={handleDeleteCategory} />
          );
        },
      }),
    ],
    [lang, categories]
  );

  const handleEditCategory = (id: number) => {
    setIdEdit(id);
    onOpenForm();
  };

  const handleDeleteCategory = async (id: number) => {
    const nameCategory = categories.find((item) => id === item.pk)?.name;
    const resultConfirm = await modalContext.showConfirmation(
      t("confirmationTextDelete", { name: t("category"), object: nameCategory })
    );

    if (!resultConfirm) {
      return;
    }

    Api()
      .category.remove(id)
      .then(() => {
        dispatch(CategoryRemoved(id));
      })
      .catch((err) => {
        console.warn("Error delete category", err);
        toast({ title: t("unknownError"), status: "error" });
      });
  };

  const handleAddCategory = () => {
    setIdEdit(null);
    onOpenForm();
  };

  return (
    <>
      {isOpenForm && <CategoryFormModal id={idEdit} isOpen={isOpenForm} onClose={onCloseForm} />}

      <Box className={style.settingBox}>
        <Button variant="brandSolid" onClick={handleAddCategory}>
          {`${t("actionAdd")} ${t("category")}`}
        </Button>

        <Box mt="15px" mb="15px">
          <TableSettings
            columns={columns}
            data={categories}
            maxHeight="600px"
            loading={categoriesStatus === LoadingStatus.LOADING}
            emptyPlaceholder={t("placeholderEmpty", { name: t("categoriesEmpty") })}
          />
        </Box>
      </Box>
    </>
  );
};

export default CategoriesSettings;
