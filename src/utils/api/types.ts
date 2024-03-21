import { Paginated } from "../../types/paginated";

export type CategoryItemTypes = {
  pk?: number;
  name: string;
};

export type ShopItemTypes = {
  pk?: number;
  name: string;
  link?: string;
};

export type BuildingItemTypes = {
  pk?: number;
  name: string;
  square?: number;
  date_begin?: string | null;
  date_end?: string | null;
};

export type RoomItemTypes = {
  pk?: number;
  name: string;
  building?: number;
  building_name?: string;
  square?: number;
  date_begin?: string | null;
  date_end?: string | null;
};

export type RepairObjectItemTypes = {
  pk?: number;
  name: string;
  type_object: number;
  type_object_name?: string;
  square?: number | null;
};

export enum PositionType {
  PURCHASE = 0,
  SERVICE = 1,
  DELIVERY = 2,
}

export const PositionTypeLocales = {
  [PositionType.PURCHASE]: "purchase",
  [PositionType.SERVICE]: "service",
  [PositionType.DELIVERY]: "delivery"
};

export type PurchasePositionTypes = {
  pk: number;
  cash_check_id: number;
  name: string;
  room: number;
  room_name: string;
  category: number;
  category_name: string;
  shop: number;
  shop_name: string;
  quantity: number;
  price: number;
  type: PositionType;
  cash_check_date: string;
  link: string;
  note: string;
};

export type PositionCheckType = {
  pk?: number;
  name: string;
  room?: number;
  category?: number;
  link: string;
  note: string;
  price: number;
  quantity: number;
  type: PositionType;
};

export type CheckType = {
  pk?: number;
  date: string;
  shop: number;
  receipt_scanning?: number | null;
  positions: PositionCheckType[];
};

export interface ITotalPurchase {
  total_number: number;
  total_amount: number;
}

export interface PaginatedPurchaseWithTotal<T> extends Paginated<T> {
  totals: ITotalPurchase;
}

export type ProverkaChekaIntegrationSettingsType = {
  is_enabled: boolean;
  api_key: string;
}

export type ProverkaChekaIntegrationSettingsUpdateType = {
  is_enabled?: boolean;
  api_key?: string;
}

export type ReceiptsItemType = {
  name: string;
  price: string;
  quantity: string;
  sum: string;
}

export type ReceiptType = {
  pk: number;
  created: string;
  qr_raw: string;
  organization: string;
  retail_place_addres: string;
  organization_inn: string;
  date: string | null;
  request_number: number | null;
  operator: string;
  total_sum: string;
  html: string;
  shop_pk: number | null;
  shop_name: string | null;
  items: ReceiptsItemType[];
}

export type ReceiptListType = {
  pk: number;
  created: string;
  organization: string;
  retail_place_addres: string | null;
  organization_inn: string;
  date: string | null;
  request_number: number | null;
  operator: string;
  total_sum: string;
  is_added_check: boolean;
  shop_pk: number | null;
}