import React from "react";
import useTranslation from "next-translate/useTranslation";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import style from "./Settings.module.scss";
import ActionTableRow from "../tables/ActionTableRow";
import TableSettings from "../tables/TableSetting";
import CategoryFormModal from "../forms/settings/CategoryFormModal";


const CategoriesSettings: React.FC = () => {
  const { t, lang } = useTranslation("settings");
  const { isOpen: isOpenForm, onOpen: onOpenForm, onClose: onCloseForm } = useDisclosure()
  const [idEdit, setIdEdit] = React.useState<number | null>(null);

  const testData = [
    {
      id: 7,
      name: "Пол",
    },
    {
      id: 20,
      name: "Потолок",
    },
    {
      id: 10,
      name: "Стены",
    },
  ];

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
              id={original.id}
              onClickEdit={handleEditCategory}
              onClickDelete={handleDeleteCategory}
            />
          );
        },
      },
    ],
    [lang]
  );

  const handleEditCategory = (id: number) => {
    setIdEdit(id);
    onOpenForm();
  };

  const handleDeleteCategory = (id: number) => {
    console.log(`Delete [${id}]`);
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
            data={testData}
            maxHeight="600px"
            emptyPlaceholder={t("placeholderEmpty", { name: t("categoriesEmpty") })}
          />
        </Box>
      </Box>
    </>
  );
};

export default CategoriesSettings;