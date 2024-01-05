import { AxiosInstance } from 'axios';
import { PurchasePositionTypes } from './types';
import { Paginated } from '../../types/paginated';


export const PurchaseApi = (instance: AxiosInstance) => ({
  async getAllByPosition() {
    const { data } = await instance.get<Paginated<PurchasePositionTypes>>('/api/purchases/position/');
    return data;
  },
  async getAllByChecks() {
    
  },
});