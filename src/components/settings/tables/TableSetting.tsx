import React from "react";
import { Spinner, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import style from "./TableSetting.module.scss";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useReactTable, getSortedRowModel, getCoreRowModel, flexRender, ColumnDef } from "@tanstack/react-table";

interface ITableSettings {
  columns: ColumnDef<any, any>[];
  data: Array<object>;
  maxHeight?: string | number;
  emptyPlaceholder?: string;
  loading?: boolean;
}

// В react-table v8 ширина колонок (size) передается в виде числа, нельзя задать в процентах или auto
// По умолчанию ширина 150
// Временный обходной путь getSize() !== 150 ? cell.column.getSize() : undefined.

const TableSettings: React.FC<ITableSettings> = ({
  columns,
  data,
  maxHeight,
  emptyPlaceholder = "",
  loading = false,
}) => {
  const table = useReactTable({
    data,
    columns,
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
          <Td colSpan={columns.length}>{emptyPlaceholder}</Td>
        </Tr>
      );
    } else {
      return rows.map((row: any) => {
        return (
          <Tr key={row.id} style={{ whiteSpace: "normal" }}>
            {row.getVisibleCells().map((cell: any) => (
              <Td
                key={cell.id}
                isNumeric={cell.column.isNumeric}
                width={cell.column.getSize() !== 150 ? cell.column.getSize() : undefined}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Td>
            ))}
          </Tr>
        );
      });
    }
  };

  return (
    <TableContainer className={style.table} overflowY="auto" maxHeight={maxHeight}>
      <Table variant="simple" size="sm" overflowY="hidden" __css={{ "tableLayout": "fixed", width: "full" }}>
        <Thead position="sticky" top={0}>
          {table.getHeaderGroups().map((headerGroup: any) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => (
                <Th
                  isNumeric={header.isNumeric}
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
  );
};

export default TableSettings;
