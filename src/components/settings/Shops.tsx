import React from "react";
import useTranslation from "next-translate/useTranslation";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import style from "./Settings.module.scss";
import TableSettings from "../tables/TableSetting";
import ActionTableRow from "../tables/ActionTableRow";
import ShopFormModal from "../forms/settings/ShopFormModal";


const ShopsSettings: React.FC = () => {
  const { t, lang } = useTranslation("settings");
  const { isOpen: isOpenForm, onOpen: onOpenForm, onClose: onCloseForm } = useDisclosure()
  const [idEdit, setIdEdit] = React.useState<number | null>(null);

  const testData = [
    {
      id: 7,
      name: "AliExpress",
      link: "https://ru.aliexpress.com",
    },
    {
      id: 22,
      name: "DNS",
      link: "https://www.dns-shop.ru",
    },
    {
      id: 10,
      name: "Баярд",
      link: null,
    },
  ];

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
              onClickEdit={handleEditShop}
              onClickDelete={handleDeleteShop}
            />
          );
        },
      },
    ],
    [lang]
  );

  const handleEditShop = (id: number) => {
    setIdEdit(id);
    onOpenForm();
  };

  const handleDeleteShop = (id: number) => {
    console.log(`Delete [${id}]`);
  };

  const handleAddShop = () => {
    setIdEdit(null);
    onOpenForm();
  };

  return (
    <>
      {isOpenForm && <ShopFormModal id={idEdit} isOpen={isOpenForm} onClose={onCloseForm} />}

      <Box className={style.settingBox}>
        <Button variant="brandSolid" onClick={handleAddShop}>
          {`${t("actionAdd")} ${t("shop")}`}
        </Button>

        <Box mt="15px" mb="15px">
          <TableSettings
            columns={columns}
            data={testData}
            maxHeight="600px"
            emptyPlaceholder={t("placeholderEmpty", { name: t("shopsEmpty") })}
          />
        </Box>
      </Box>
    </>
  );
};

export default ShopsSettings;