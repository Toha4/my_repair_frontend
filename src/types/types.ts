import { PaginationState, SortingState } from "@tanstack/react-table";

export type ActionColumnType = {
  action: any;
};

export interface ITablePagination extends PaginationState {
  pageCount: number;
}

export interface ITableParams {
  pagination?: PaginationState;
  sorting?: SortingState;
  filters?: {};
}
