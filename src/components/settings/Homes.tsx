import React from "react";
import useTranslation from "next-translate/useTranslation";
import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import style from "./Settings.module.scss";
import TableSettings from "../tables/TableSetting";
import ActionTableRow from "../tables/ActionTableRow";
import HomeFormModal from "../forms/settings/HomeFormModal";


const HomesSettings: React.FC = () => {
  const { t, lang } = useTranslation("settings");

  const { isOpen: isOpenForm, onOpen: onOpenForm, onClose: onCloseForm } = useDisclosure()
  const [idEdit, setIdEdit] = React.useState<number | null>(null);


  const testData = [
    { id: 1, name: "Мой дом", type_name: "дом", square: 125.5, is_active: false },
    { id: 2, name: "Моя квартира", type_name: "квартира", square: 65.7, is_active: true },
    { id: 3, name: "На ленина", type_name: "квартира", square: null, is_active: false },
  ]

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
              id={original.id}
              is_active={original.is_active}
              onClickActive={handleSetActiveHome}
              onClickEdit={handleEditHome}
              onClickDelete={handleDeleteHome}
            />
          )
        }
      }
    ],
    [lang,],
  );

  const handleSetActiveHome = (id: number) => {
    console.log(`Set active [${id}]`);
  };

  const handleEditHome = (id: number) => {
    setIdEdit(id);
    onOpenForm();
  };

  const handleDeleteHome = (id: number) => {
    console.log(`Delete [${id}]`);
  };

  const handleAddHome = () => {
    setIdEdit(null);
    onOpenForm();
  };

  return (
    <>
      {isOpenForm && <HomeFormModal id={idEdit} isOpen={isOpenForm} onClose={onCloseForm} />}

      <Box className={style.settingBox} >
        <Button variant="brandSolid" onClick={handleAddHome}>
          {`${t("actionAdd")} ${t("home")}`}
        </Button>

        <Box mt="15px" mb="15px">
          <TableSettings
            columns={columns}
            data={testData}
            maxHeight="600px"
            emptyPlaceholder={t("placeholderEmpty", { name: t("homesEmpty") })}
          />
        </Box>
        <Text>{t("noteHomes")}</Text>
      </Box>
    </>
  );
};

export default HomesSettings;