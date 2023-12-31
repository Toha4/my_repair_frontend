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
  building?: number
  building_name?: string
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