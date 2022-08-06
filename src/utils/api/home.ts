import { AxiosInstance } from 'axios';
import { IUserSettings } from '../../redux/types';
import { HomeItemTypes } from './types';


export const HomeApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<HomeItemTypes[]>('/api/homes/home');
    return data;
  },
  async get(id: number) {
    const { data } = await instance.get<HomeItemTypes>(`/api/homes/home/${id}`);
    return data;
  },
  async create(Home: HomeItemTypes) {
    const { data } = await instance.post<HomeItemTypes, { data: HomeItemTypes }>('/api/homes/home/', Home);
    return data;
  },
  async update(id: number, Home: HomeItemTypes) {
    const { data } = await instance.put<HomeItemTypes, { data: HomeItemTypes }>(`api/homes/home/${id}`, Home);
    return data;
  },
  remove(id: number) {
    return instance.delete(`api/homes/home/${id}`);
  },
  async setCurrentHome(current_home: number) {
    const { data } = await instance.post<any, { data: IUserSettings }>("api/homes/set_current_home/", { current_home });
    return data;
  }
});
