import { AxiosInstance } from 'axios';
import { IUserSettings } from '../../redux/types';
import { RepairObjectItemTypes } from './types';


export const RepairObjectApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<RepairObjectItemTypes[]>('/api/homes/repair_object');
    return data;
  },
  async get(id: number) {
    const { data } = await instance.get<RepairObjectItemTypes>(`/api/homes/repair_object/${id}`);
    return data;
  },
  async create(Object: RepairObjectItemTypes) {
    const { data } = await instance.post<RepairObjectItemTypes, { data: RepairObjectItemTypes }>('/api/homes/repair_object/', Object);
    return data;
  },
  async update(id: number, Object: RepairObjectItemTypes) {
    const { data } = await instance.put<RepairObjectItemTypes, { data: RepairObjectItemTypes }>(`api/homes/repair_object/${id}`, Object);
    return data;
  },
  remove(id: number) {
    return instance.delete(`api/homes/repair_object/${id}`);
  },
  async setCurrentRepairObject(current_repair_object: number) {
    const { data } = await instance.post<any, { data: IUserSettings }>("api/homes/set_current_repair_object/", { current_repair_object });
    return data;
  }
});
