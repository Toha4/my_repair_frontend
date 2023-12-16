import { AxiosInstance } from 'axios';
import { BuildingItemTypes } from './types';


export const BuildingApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<BuildingItemTypes[]>('/api/homes/building');
    return data;
  },
  async get(id: number) {  
    const { data } = await instance.get<BuildingItemTypes>(`/api/homes/building/${id}`,);
    return data;
  },
  async create(Building: BuildingItemTypes) {
    const { data } = await instance.post<BuildingItemTypes, { data: BuildingItemTypes }>('/api/homes/building/', Building);
    return data;
  },
  async update(id: number, Building: BuildingItemTypes) {
    const { data } = await instance.put<BuildingItemTypes, { data: BuildingItemTypes }>(`api/homes/building/${id}`, Building);
    return data;
  },
  remove(id: number) {
    return instance.delete(`api/homes/building/${id}`);
  },
});
