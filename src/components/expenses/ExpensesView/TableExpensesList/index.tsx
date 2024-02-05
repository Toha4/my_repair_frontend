import useTranslation from "next-translate/useTranslation";
import React from "react";
import { Api } from "../../../../utils/api";
import { ITotalPurchase, PositionCheckType, PositionType, PurchasePositionTypes } from "../../../../utils/api/types";
import {
  Box,
  Flex,
  Spacer,
  Spinner,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
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
import ExpensesFilter from "../ExpensesFilter";
import PositionUpdateFormModal from "../../forms/PositionEditFormModal";

interface ITableExpensesList {
  onOpenEditCheckDialog: (id: number) => void;
  updateCount: number; // Для тригера useEffect, чтоб обновить данные
}

const TableExpensesList: React.FC<ITableExpensesList> = ({ onOpenEditCheckDialog, updateCount }) => {
  const { colorMode } = useColorMode();
  const { t, lang } = useTranslation("expenses");

  const { user } = useAppSelector((state: OurStore) => state.authReducer);

  const [purchasses, setPurchases] = React.useState<PurchasePositionTypes[]>([]);
  const [total, setTotal] = React.useState<ITotalPurchase>({ total_number: 0, total_amount: 0.0 });
  const [loading, setLoading] = React.useState<boolean>(false);

  const [tableParams, setTableParams] = React.useState<ITableParams>({ pagination: { pageIndex: 0, pageSize: 50 } });

  const {
    isOpen: isOpenFormEditPosition,
    onOpen: onOpenFormEditPosition,
    onClose: onCloseFormEditPosition,
  } = useDisclosure();
  const [indexPositionEdit, setIndexPositionEdit] = React.useState<number | null>(null);

  const toast = useToast();

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

        const result = await Api().purchase.getAllByPosition({ ...params, ...tableParams.filters });

        if (!ignore) {
          setPurchases(result.results);
          setTotal(result.totals);

          // Обновляем pageCount у таблицы (через table.setPageCount() не работает)
          table.setOptions((old) => {
            return { ...old, pageCount: result.page_count };
          });
        }
      } catch (e) {
        console.log(e);
        console.error("Error from get position");
      }

      if (!ignore) {
        setLoading(false);
      }
    };

    let ignore = false;
    fetchData();

    return () => {
      ignore = true;
    };
  }, [tableParams, updateCount]);

  const getTagPosition = (type: PositionType) => {
    if (type === PositionType.SERVICE) {
      return (
        <Tag size="sm" colorScheme="orange" marginLeft=".5rem">
          {t("common:service")}
        </Tag>
      );
    } else if (type === PositionType.DELIVERY) {
      return (
        <Tag size="sm" colorScheme="green" marginLeft=".5rem">
          {t("common:delivery")}
        </Tag>
      );
    }
  };

  const columnHelper = createColumnHelper<PurchasePositionTypes & ActionColumnType>();
  const columns = React.useMemo(
    () => [
      columnHelper.accessor("name", {
        id: "name",
        header: () => <span>{t("common:name")}</span>,
        cell: (props: any) => {
          return (
            <React.Fragment>
              <span className={style.tableCellName}>{props.row.original.name}</span>
              {getTagPosition(props.row.original.type)}
            </React.Fragment>
          );
        },
      }),
      columnHelper.accessor("cash_check_date", {
        id: "cash_check_date",
        header: () => <span>{t("purchase")}</span>,
        size: user?.settings?.current_repair_object_type == RepairObjectTypes.LAND ? 300 : 200,
        cell: (props: any) => {
          return (
            <React.Fragment>
              <Box>{props.row.original.shop_name}</Box>
              <Box mt={1}>
                <span className={style.tableCellPurchaseDate}>{props.row.original.cash_check_date}</span>
                <span className={style.tableCellPurchaseCheck}>#{props.row.original.cash_check_id}</span>
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
            row: { original, index },
          } = props;
          return (
            <ActionTableRow
              index={index}
              cashCheckId={original.cash_check}
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

  const handleEditPositon = (index: number) => {
    setIndexPositionEdit(index);
    onOpenFormEditPosition();
  };

  const handleEditCheck = (id: number) => {
    onOpenEditCheckDialog(id);
  };

  const handleUpdatePosition = (position: PurchasePositionTypes) => {
    // Обновим позицию точечно, чтоб не делать запрос для всей таблицы
    if (indexPositionEdit !== null && !!position) {
      let total_amount =
        total.total_amount - purchasses[indexPositionEdit].price * purchasses[indexPositionEdit].quantity;

      const newPurchasses = Array.from(purchasses);
      newPurchasses[indexPositionEdit] = position;
      setPurchases(newPurchasses);

      // Чтобы не отправлять запрос для строки Итого, вычислим новое значение на фронте
      total_amount += position.price * position.quantity;
      setTotal({ ...total, total_amount });

      toast({ title: t("positionUpdated", { name: position.name }), status: "success" });

      setIndexPositionEdit(null);
    }
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
      {isOpenFormEditPosition && indexPositionEdit !== null && (
        <PositionUpdateFormModal
          position={purchasses[indexPositionEdit]}
          isOpen={isOpenFormEditPosition}
          onClose={onCloseFormEditPosition}
          updatePosition={handleUpdatePosition}
        />
      )}

      <Flex direction="column" height={"calc(100vh - 115px)"}>
        <ExpensesFilter tableParams={tableParams} setTableParams={setTableParams}></ExpensesFilter>
        <TableContainer
          className={style.tableContainer}
          style={{ flexGrow: 1, minHeight: "200px" }}
          border={colorMode == "light" ? "1px solid" : undefined}
          borderColor={colorMode == "light" ? "gray.200 !important" : undefined}
          overflowY="auto"
        >
          <Table
            variant="simple"
            size="sm"
            className={style.table}
            overflowY="hidden"
            __css={{ tableLayout: "fixed", width: "full" }}
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

        <Flex>
          <Box>
            <span>{t("totalPositions")}:</span>
            <span className={style.totalRowValue}>{total.total_number}</span>
          </Box>
          <Spacer />
          <Box>
            <span>{t("totalAmount")}:</span>
            <span className={style.totalRowValue}>{formatNumber(total.total_amount)}</span>
          </Box>
        </Flex>

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
      </Flex>
    </React.Fragment>
  );
};

export default TableExpensesList;
