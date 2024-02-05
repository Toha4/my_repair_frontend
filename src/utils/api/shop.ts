import { AxiosInstance } from 'axios';
import { ShopItemTypes } from './types';


export const ShopApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<ShopItemTypes[]>('/api/shops/shop');
    return data;
  },
  async get(id: number) {
    const { data } = await instance.get<ShopItemTypes>(`/api/shops/shop/${id}`);
    return data;
  },
  async create(shop: ShopItemTypes) {
    const { data } = await instance.post<ShopItemTypes, { data: ShopItemTypes }>('/api/shops/shop/', shop);
    return data;
  },
  async update(id: number, shop: ShopItemTypes) {
    const { data } = await instance.put<ShopItemTypes, { data: ShopItemTypes }>(`api/shops/shop/${id}`, shop);
    return data;
  },
  remove(id: number) {
    return instance.delete(`api/shops/shop/${id}`);
  },
});
