import React from "react";
import {
  Box,
  chakra,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import style from "./TableSetting.module.scss";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy, Column } from "react-table";

interface ITableSettings {
  columns: Column<object>[];
  data: Array<object>;
  maxHeight?: string | number;
  emptyPlaceholder?: string;
  loading?: boolean;
}

const TableSettings: React.FC<ITableSettings> = ({
  columns,
  data,
  maxHeight,
  emptyPlaceholder = '',
  loading = false
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

    const getTableBody = () => {
      if (loading) {
        return <Box m="15px" ><Spinner /></Box>
      } else if (rows.length === 0) {
        return <Box m="15px">{emptyPlaceholder}</Box>
      } else {
        return rows.map((row: any) => {
          prepareRow(row);
          
          return (
            <Tr
              {...row.getRowProps()}
              style={{ whiteSpace: "normal" }}
            >
              {row.cells.map((cell: any) => (
                <Td
                  {...cell.getCellProps()}
                  isNumeric={cell.column.isNumeric}
                >
                  {cell.render("Cell")}
                </Td>
              ))}
            </Tr>
          );
        })
      }
    }

  return (
    <TableContainer
      className={style.table}
      overflowY="auto"
      maxHeight={maxHeight}
    >
      <Table {...getTableProps()} variant="simple" size="sm" overflowY="hidden">
        <Thead position="sticky" top={0}>
          {headerGroups.map((headerGroup: any) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={column.isNumeric}
                  width={column.width}
                >
                  {column.render("Header")}
                  <chakra.span pl="4">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {getTableBody()}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableSettings;
