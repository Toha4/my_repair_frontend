export type CategoryItemTypes = {
  pk?: number;
  name: string;
};

export type ShopItemTypes = {
  pk?: number;
  name: string;
  link?: string;
};

export type RoomItemTypes = {
  pk?: number;
  name: string;
  square?: number;
  date_begin?: string | null;
  date_end?: string | null;
};

export type HomeItemTypes = {
  pk?: number;
  name: string;  
  type_home: number;
  type_home_name?: string;
  square?: number | null;
};