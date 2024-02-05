export interface IFormCheckPosition {
  pk?: number;
  name: string;
  room: number | undefined;
  category: number | undefined;
  link: string;
  note: string;
  price: number | undefined;
  quantity: number;
  is_service: boolean;
  is_delivery: boolean;
}

export interface IFormCheck {
  date: Date | undefined;
  shop: number;
  positions: IFormCheckPosition[];
}