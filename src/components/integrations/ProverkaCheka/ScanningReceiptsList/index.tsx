import React from "react";
import {
  Box,
  Checkbox,
  Flex,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import style from "../../Integrations.module.scss";
import {
  Column,
  RowSelectionState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ReceiptListType } from "../../../../utils/api/types";
import { ActionColumnType, ITableParams, SelectColumnType } from "../../../../types/types";
import ActionTableRow from "./ActionTableRow";
import { Api } from "../../../../utils/api";
import TablePagination from "../../../common/TablePagination";
import QrCodeCheckScaner from "../../../common/QrCodeCheckScaner";
import { LinkedLackObjectIcon } from "../../../Icons";
import { useConfirmationModalContext } from "../../../../contexts/ModalDialogContext";
import ReceiptModal from "./ReceiptModal";
import { CheckIcon } from "@chakra-ui/icons";

interface IScanningReceiptsList {
  selectMode?: boolean;
  rowSelection?: RowSelectionState;
  setRowSelection?: React.Dispatch<React.SetStateAction<RowSelectionState>>;
}

const ScanningReceiptsList: React.FC<IScanningReceiptsList> = ({
  selectMode = false,
  rowSelection,
  setRowSelection,
}) => {
  const { t, lang } = useTranslation("integrations");
  const { colorMode } = useColorMode();

  const { isOpen: isOpenForm, onOpen: onOpenModal, onClose: onCloseForm } = useDisclosure();
  const [idReceiptOpen, setIdReceiptOpen] = React.useState<number | null>(null);

  const [receipts, setReceipts] = React.useState<ReceiptListType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loadingScaning, setLoadingScaning] = React.useState<boolean>(false);

  const toast = useToast();
  const modalContext = useConfirmationModalContext();

  const [tableParams, setTableParams] = React.useState<ITableParams>({ pagination: { pageIndex: 0, pageSize: 20 } });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        let params: { [k: string]: any } = {};

        if (tableParams.pagination) {
          params.page = tableParams.pagination?.pageIndex + 1;
          params.page_size = tableParams.pagination?.pageSize;
        }

        const result = await Api().proverkaChekaIntegration.getAllScannedReceipts({
          ...params,
          ...tableParams.filters,
          is_added_check: selectMode ? false : undefined,
        });

        if (!ignore) {
          setReceipts(result.results);

          // Обновляем pageCount у таблицы (через table.setPageCount() не работает)
          table.setOptions((old) => {
            return { ...old, pageCount: result.page_count };
          });
        }
      } catch (e) {
        console.log(e);
        console.error("Error from get receipts");
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
  }, [tableParams]);

  const handleScanQRCode = (decodedText: string) => {
    setLoadingScaning(true);

    Api()
      .proverkaChekaIntegration.getReceiptByQrRow(decodedText)
      .then((receipt) => {
        setTableParams({ ...tableParams });

        setIdReceiptOpen(receipt.pk);
        onOpenModal();
      })
      .catch((err) => {
        console.warn("Error get receipt", err);
        // TODO: Изменить текст ошибки
        toast({ title: t("common:unknownError"), status: "error" });
      })
      .finally(() => {
        setLoadingScaning(false);
      });
  };

  const handleDeleteReceipt = async (id: number) => {
    const receipt = receipts.find((item) => id === item.pk);
    const resultConfirm = await modalContext.showConfirmation(
      t("common:confirmationTextDeleteWithObject", {
        name: t("proverkaChekaReceipt").toLocaleLowerCase(),
        object: `${receipt?.date} - ${receipt?.organization}`,
      })
    );

    if (!resultConfirm) {
      return;
    }

    Api()
      .proverkaChekaIntegration.removeReceipt(id)
      .then(() => {
        setTableParams({ ...tableParams });
      })
      .catch((err) => {
        console.warn("Error delete shop", err);
        toast({ title: t("common:unknownError"), status: "error" });
      });
  };

  const columnHelper = createColumnHelper<ReceiptListType & ActionColumnType & SelectColumnType>();
  const columns = React.useMemo(
    () => [
      selectMode
        ? columnHelper.accessor("selectCol", {
            id: "select-col",
            header: () => <span></span>,
            enableSorting: false,
            size: 25,
            cell: (props: any) => {
              return (
                <Checkbox
                  isChecked={props.row?.getIsSelected()}
                  disabled={!props.row?.getCanSelect()}
                  onChange={props.row.getToggleSelectedHandler()}
                />
              );
            },
          })
        : columnHelper.accessor("is_added_check", {
            id: "is_added_check",
            header: () => <span></span>,
            enableSorting: false,
            size: 25,
            cell: (props: any) => {
              return (
                <Box>
                  <Tooltip
                    label={
                      props.row.original.is_added_check
                        ? t("proverkaChekaReceiptAdded")
                        : t("proverkaChekaReceiptNotAdded")
                    }
                    closeOnScroll
                  >
                    <CheckIcon
                      color={
                        props.row.original.is_added_check
                          ? "var(--chakra-colors-green-400)"
                          : "var(--chakra-colors-gray-400)"
                      }
                      opacity={!props.row.original.is_added_check ? "25%" : undefined}
                    />
                  </Tooltip>
                </Box>
              );
            },
          }),
      columnHelper.accessor("date", {
        id: "date",
        header: () => <span>{t("common:date")}</span>,
        enableSorting: false,
        size: 160,
      }),
      columnHelper.accessor("organization", {
        id: "organization",
        header: () => <span>{t("common:shop")}</span>,
        enableSorting: false,
        cell: (props: any) => {
          return (
            <Box>
              <span>{props.row.original.organization}</span>
              {!props.row.original.shop_pk && (
                <Tooltip label={t("proverkaChekaShopNotLinked")} closeOnScroll>
                  <span>
                    <LinkedLackObjectIcon h="24px" w="24px" marginLeft=".2rem" />
                  </span>
                </Tooltip>
              )}
            </Box>
          );
        },
      }),
      columnHelper.accessor("total_sum", {
        id: "total_sum",
        header: () => <span>{t("common:amount")}</span>,
        size: 130,
        enableSorting: false,
      }),
      columnHelper.accessor("action", {
        id: "action",
        header: () => <span>{t("common:action")}</span>,
        size: 95,
        enableSorting: false,
        cell: (props: any) => {
          const {
            row: { original, index },
          } = props;
          return (
            <ActionTableRow
              id={original.pk}
              onClickDelete={handleDeleteReceipt}
              isAddedCheck={!!props.row.original.is_added_check}
            />
          );
        },
      }),
    ],
    [lang, receipts]
  ) as Column<ReceiptListType>[];

  const pagination = React.useMemo(
    () => ({
      pageIndex: tableParams.pagination?.pageIndex ?? 0,
      pageSize: tableParams.pagination?.pageSize ?? 50,
    }),
    [tableParams]
  );

  const table = useReactTable({
    data: receipts,
    columns,
    state: {
      pagination,
      rowSelection,
    },
    manualPagination: true,
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const nextState = updater(pagination);
        setTableParams({ ...tableParams, pagination: nextState });
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: selectMode ? setRowSelection : undefined,
    getRowId: (row) => row.pk.toString(),
    enableMultiRowSelection: selectMode ? false : undefined,
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
          <Td colSpan={columns.length}>{t("proverkaChekaReceiptsEmpty")}</Td>
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
    <>
      {isOpenForm && <ReceiptModal id={idReceiptOpen} isOpen={isOpenForm} onClose={onCloseForm} />}

      <Box marginTop="1rem">
        {!selectMode && (
          <Box marginBottom="1rem">
            <QrCodeCheckScaner qrCodeScanerSuccess={handleScanQRCode} isLoading={loadingScaning}></QrCodeCheckScaner>
          </Box>
        )}
        <Flex
          direction="column"
          height={!selectMode ? "calc(100vh - 410px)" : undefined}
          maxHeight={selectMode ? "540px" : undefined}
        >
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
              minWidth="660px"
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
        </Flex>
      </Box>
    </>
  );
};

export default ScanningReceiptsList;
