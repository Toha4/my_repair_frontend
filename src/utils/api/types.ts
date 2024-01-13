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

export type PurchasePositionTypes = {
  pk: number;
  cash_check: number;
  name: string;
  room: number;
  room_name: string;
  category: number;
  category_name: string;
  shop: number;
  shop_name: string;
  quantity: number;
  price: number;
  is_service: boolean;
  date: string;
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
  is_service: boolean;
};

export type CheckType = {
  pk?: number;
  date: string;
  shop: number;
  positions: PositionCheckType[];
};
