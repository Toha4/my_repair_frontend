import React from "react";
import useTranslation from "next-translate/useTranslation";
import { Box, Button, useDisclosure, useToast } from "@chakra-ui/react";
import style from "./Settings.module.scss";
import ActionTableRow from "../tables/ActionTableRow";
import TableSettings from "../tables/TableSetting";
import CategoryFormModal from "../forms/settings/CategoryFormModal";
import { Api } from "../../utils/api";
import { CategoryItemTypes } from "../../utils/api/types";
import { useConfirmationModalContext } from "../../contexts/ModalDialogContext";


const CategoriesSettings: React.FC = () => {
  const { t, lang } = useTranslation("settings");
  const { isOpen: isOpenForm, onOpen: onOpenForm, onClose: onCloseForm } = useDisclosure()
  const [idEdit, setIdEdit] = React.useState<number | null>(null);

  const [categoryies, setCategoryies] = React.useState<CategoryItemTypes[]>([]);
  const [update, setUpdate] = React.useState<boolean>(true);
  const [loading, setLoading] = React.useState<boolean>(false);

  const toast = useToast();
  const modalContext = useConfirmationModalContext()

  React.useEffect(() => {
    if (update) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const result = await Api().category.getAll();
          setCategoryies(result);
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
        width: "90%",
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
              onClickEdit={handleEditCategory}
              onClickDelete={handleDeleteCategory}
            />
          );
        },
      },
    ],
    [lang, categoryies]
  );

  const handleEditCategory = (id: number) => {
    setIdEdit(id);
    onOpenForm();
  };

  const handleDeleteCategory = async (id: number) => {
    const nameCategory = categoryies.find(item => id === item.pk)?.name;
    const resultConfirm = await modalContext.showConfirmation(
      t("confirmationTextDelete", { name: t("category"), object: nameCategory })
    );

    if (!resultConfirm) {
      return;
    }

    Api().category.remove(id)
      .then(() => {
        updateTable();
      })
      .catch((err) => {
        console.warn('Error delete category', err);
        toast({ title: t("unknownError"), status: "error" });
      })
  };

  const handleAddCategory = () => {
    setIdEdit(null);
    onOpenForm();
  };

  const updateTable = () => {
    setUpdate(true);
  };

  return (
    <>
      {isOpenForm && <CategoryFormModal id={idEdit} isOpen={isOpenForm} onClose={onCloseForm} onUpdateTable={updateTable} />}

      <Box className={style.settingBox}>
        <Button variant="brandSolid" onClick={handleAddCategory}>
          {`${t("actionAdd")} ${t("category")}`}
        </Button>

        <Box mt="15px" mb="15px">
          <TableSettings
            columns={columns}
            data={categoryies}
            maxHeight="600px"
            emptyPlaceholder={loading ? "" : t("placeholderEmpty", { name: t("categoriesEmpty") })}
          />
        </Box>
      </Box>
    </>
  );
};

export default CategoriesSettings;