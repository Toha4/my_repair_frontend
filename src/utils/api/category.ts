import { AxiosInstance } from 'axios';
import { CategoryItemTypes } from './types';


export const CategoryApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<CategoryItemTypes[]>('/api/core/category');
    return data;
  },
  async get(id: number) {
    const { data } = await instance.get<CategoryItemTypes>(`/api/core/category/${id}`);
    return data;
  },
  async create(category: CategoryItemTypes) {
    const { data } = await instance.post<CategoryItemTypes, { data: CategoryItemTypes }>('/api/core/category/', category);
    return data;
  },
  async update(id: number, category: CategoryItemTypes) {
    const { data } = await instance.put<CategoryItemTypes, { data: CategoryItemTypes }>(`api/core/category/${id}`, category);
    return data;
  },
  remove(id: number) {
    return instance.delete(`api/core/category/${id}`);
  },
});
