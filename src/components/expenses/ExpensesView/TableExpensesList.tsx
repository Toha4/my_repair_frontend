import useTranslation from "next-translate/useTranslation";
import React from "react";
import { Api } from "../../../utils/api";
import { PurchasePositionTypes } from "../../../utils/api/types";
import { Table } from "@chakra-ui/react";
import { usePagination, useTable } from "react-table";

interface ITableExpensesList {
  search?: string;
  filter?: any;
}

const TableExpensesList: React.FC<ITableExpensesList> = ({ search, filter }) => {
  const { t, lang } = useTranslation("settings");

  const [purchasses, setPurchases] = React.useState<PurchasePositionTypes[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await Api().purchase.getAllByPosition();
        setPurchases(result.results);
      } catch (e) {
        console.log(e)
        console.error("Error from get position");
      }

      setLoading(false);
    }

    fetchData();
  }, [search, filter]);

  const columns = React.useMemo(
    () => [
      {
        Header: t("name"),
        accessor: "name",
        width: "90%",
      },
      // {
      //   Header: t("action"),
      //   accessor: "action",
      //   width: "10%",
      //   disableSortBy: true,
      //   Cell: (props: any) => {
      //     const {
      //       row: { original },
      //     } = props;
      //     return (
      //       <ActionTableRow
      //         id={original.pk}
      //         onClickEdit={handleEditCategory}
      //         onClickDelete={handleDeleteCategory}
      //       />
      //     );
      //   },
      // },
    ],
    [lang, purchasses]
  );

  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //   useTable({ columns, purchasses }, usePagination);

  // TODO: Остановился - необходимо сделать миграцию на ReactTable V8 - https://tanstack.com/table/v8/docs/guide/migrating


  return (
    <React.Fragment>
      <Table>
        
      </Table>
    </React.Fragment>
  )
}

export default TableExpensesList;