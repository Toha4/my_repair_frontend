import useTranslation from "next-translate/useTranslation";
import React from "react";
import { Api } from "../../../../utils/api";
import { PurchasePositionTypes } from "../../../../utils/api/types";
import { Box, Spinner, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import {
  Column,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ActionColumnType, ITableParams } from "../../../../types/types";
import style from "../../expenses.module.scss";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import ActionTableRow from "./ActionTableRow";
import { formatNumber } from "../../../../utils/DataConvert";
import { useAppSelector } from "../../../../redux/hooks";
import { OurStore } from "../../../../redux/store";
import { RepairObjectTypes } from "../../../../redux/types";
import TablePagination from "../../../common/TablePagination";

interface ITableExpensesList {
  search?: string;
  filter?: any;
}

// TODO: Изменить шрифт

// TODO: Сделать более точный расчет высоты таблицы после реализации всех компонентов
const WIDTH_TABLE = "65vh";
const WIDTH_TABLE_WITH_FILTER = "55vh";

const TableExpensesList: React.FC<ITableExpensesList> = ({ search, filter }) => {
  const { t, lang } = useTranslation("expenses");

  const { user } = useAppSelector((state: OurStore) => state.authReducer);

  const [purchasses, setPurchases] = React.useState<PurchasePositionTypes[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const [tableParams, setTableParams] = React.useState<ITableParams>({ pagination: { pageIndex: 0, pageSize: 50 } });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        let params: { [k: string]: any } = {};

        if (tableParams.pagination) {
          params.page = tableParams.pagination?.pageIndex + 1;
          params.page_size = tableParams.pagination?.pageSize;
        }

        if (sorting.length > 0) {
          params.sortField = sorting[0].id;
          params.sortOrder = sorting[0].desc ? "desc" : "asc";
        }

        const result = await Api().purchase.getAllByPosition(params);
        setPurchases(result.results);

        // Обновляем pageCount у таблицы (через table.setPageCount() не работает)
        table.setOptions((old) => {
          return { ...old, pageCount: result.page_count };
        });
      } catch (e) {
        console.log(e);
        console.error("Error from get position");
      }

      setLoading(false);
    };

    fetchData();
  }, [search, filter, tableParams]);

  const columnHelper = createColumnHelper<PurchasePositionTypes & ActionColumnType>();
  const columns = React.useMemo(
    () => [
      columnHelper.accessor("name", {
        id: "name",
        header: () => <span>{t("name")}</span>,
      }),
      columnHelper.accessor("date", {
        id: "date",
        header: () => <span>{t("purchase")}</span>,
        size: user?.settings?.current_repair_object_type == RepairObjectTypes.LAND ? 300 : 200,
        cell: (props: any) => {
          return (
            <React.Fragment>
              <Box>{props.row.original.shop_name}</Box>
              <Box mt={1}>
                <span className={style.tableCellPurchaseDate}>{props.row.original.date}</span>
                <span className={style.tableCellPurchaseCheck}>#{props.row.original.cash_check}</span>
              </Box>
            </React.Fragment>
          );
        },
      }),
      columnHelper.accessor("room", {
        id: "purpose",
        header: () => <span>{t("purpose")}</span>,
        size: 200,
        enableSorting: false,
        cell: (props: any) => {
          return (
            <React.Fragment>
              <Box>{props.row.original.room_name}</Box>
              <Box mt={1} className={style.tableCellPurposeCategory}>
                {props.row.original.category_name}
              </Box>
            </React.Fragment>
          );
        },
      }),
      columnHelper.accessor("note", {
        id: "note",
        header: () => <span>{t("note")}</span>,
        enableSorting: false,
      }),
      columnHelper.accessor("price", {
        id: "price",
        header: () => <span>{t("amount")}</span>,
        size: 130,
        cell: (props: any) => {
          return (
            <React.Fragment>
              <Box className={style.tableCellAmountTotal}>
                {formatNumber(props.row.original.price * props.row.original.quantity)}
              </Box>
              <Box>
                <span>{formatNumber(Number(props.row.original.price))}</span>
                <span style={{ marginLeft: ".3rem", marginRight: ".3rem" }}>x</span>
                <span>{props.row.original.quantity}</span>
              </Box>
            </React.Fragment>
          );
        },
      }),
      columnHelper.accessor("action", {
        id: "action",
        header: () => <span>{t("action")}</span>,
        size: 105,
        enableSorting: false,
        cell: (props: any) => {
          const {
            row: { original },
          } = props;
          return (
            <ActionTableRow
              id={original.pk}
              link={original.link}
              onClickEditPosition={handleEditPositon}
              onClickEditCheck={handleEditCheck}
            />
          );
        },
      }),
    ],
    [lang, purchasses]
  ) as Column<PurchasePositionTypes>[];

  const handleEditPositon = (id: number) => {
    console.log("Edit position: ", id);
  };

  const handleEditCheck = (id: number) => {
    console.log("Edit check: ", id);
  };

  const pagination = React.useMemo(
    () => ({
      pageIndex: tableParams.pagination?.pageIndex ?? 0,
      pageSize: tableParams.pagination?.pageSize ?? 50,
    }),
    [tableParams]
  );

  const sorting = React.useMemo(() => tableParams.sorting ?? [], [tableParams]);

  const table = useReactTable({
    data: purchasses,
    columns,
    state: {
      pagination,
      sorting,
    },
    manualPagination: true,
    manualSorting: true,
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const nextState = updater(pagination);
        setTableParams({ ...tableParams, pagination: nextState });
      }
    },
    onSortingChange: (updater) => {
      if (typeof updater === "function") {
        const nextState = updater(sorting);
        setTableParams({ ...tableParams, sorting: nextState });
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const getTableBody = () => {
    const rows = table.getRowModel().rows;

    if (loading) {
      return (
        <Tr>
          <Td colSpan={columns.length}>
            <Spinner />
          </Td>
        </Tr>
      );
    } else if (rows.length === 0) {
      return (
        <Tr>
          <Td colSpan={columns.length}>{t("expensesEmpty")}</Td>
        </Tr>
      );
    } else {
      return rows.map((row: any) => {
        return (
          <Tr key={row.id} style={{ whiteSpace: "normal" }}>
            {row.getVisibleCells().map((cell: any) => (
              <Td key={cell.id} width={cell.column.getSize() !== 150 ? cell.column.getSize() : undefined}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Td>
            ))}
          </Tr>
        );
      });
    }
  };

  return (
    <React.Fragment>
      <TableContainer className={style.tableContainer} height={WIDTH_TABLE} overflowY="auto">
        <Table
          variant="simple"
          size="sm"
          className={style.table}
          overflowY="hidden"
          __css={{ "table-layout": "fixed", width: "full" }}
        >
          <Thead position="sticky" top={0}>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => (
                  <Th
                    width={header.getSize() !== 150 ? header.getSize() : undefined}
                    key={header.id}
                    {...{
                      cursor: header.column.getCanSort() ? "pointer" : "",
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: <TriangleUpIcon aria-label="sorted ascending" className={style.sortIcon} />,
                      desc: <TriangleDownIcon aria-label="sorted descending" className={style.sortIcon} />,
                    }[header.column.getIsSorted() as string] ?? null}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>{getTableBody()}</Tbody>
        </Table>
      </TableContainer>

      <TablePagination
        currentPageSize={table.getState().pagination.pageSize}
        currentPageIndex={table.getState().pagination.pageIndex}
        pageCount={table.getPageCount()}
        setPageSize={table.setPageSize}
        setPageIndex={table.setPageIndex}
        previousPage={table.previousPage}
        nextPage={table.nextPage}
        canPreviousPage={table.getCanPreviousPage()}
        canNextPage={table.getCanNextPage()}
      ></TablePagination>
    </React.Fragment>
  );
};

export default TableExpensesList;
