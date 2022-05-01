import React from "react";
import useTranslation from "next-translate/useTranslation";
import { Box, Text, Button } from "@chakra-ui/react";
import style from "./Settings.module.scss";
import ActionTableRow from "../tables/ActionTableRow";
import TableSettings from "../tables/TableSetting";

const RoomsSettings: React.FC = () => {
  const { t, lang } = useTranslation("settings");

  const testData = [
    {
      id: 1,
      name: "Спальня",
      square: 15.2,
      date_begin: "12.11.2020",
      date_end: "15.03.2021",
    },
    {
      id: 2,
      name: "Гостинная",
      square: 65.7,
      date_begin: "01.01.2022",
      date_end: "",
    },
    { id: 3, name: "Кухня", square: null, date_begin: "", date_end: "" },
  ];

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
              id={original.id}
              onClickEdit={handleEditRoom}
              onClickDelete={handleDeleteRoom}
            />
          );
        },
      },
    ],
    [lang]
  );

  const handleEditRoom = (id: number) => {
    console.log(`Edit [${id}]`);
  };

  const handleDeleteRoom = (id: number) => {
    console.log(`Delete [${id}]`);
  };

  const handleAddRoom = () => {
    console.log("Add room");
  };

  return (
    <Box className={style.settingBox}>
      <Button variant="brandSolid" onClick={handleAddRoom}>
        {`${t("actionAdd")} ${t("room")}`}
      </Button>

      <Box mt="15px" mb="15px">
        <TableSettings
          columns={columns}
          data={testData}
          maxHeight="600px"
          emptyPlaceholder={t("placeholderEmpty", { name: t("roomsEmpty") })}
        />
      </Box>
      <Text>{t("noteRooms", { name: "Test home" })}</Text>
    </Box>
  );
};

export default RoomsSettings;
