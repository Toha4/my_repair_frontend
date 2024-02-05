import { AxiosInstance } from 'axios';
import { RoomItemTypes } from './types';


export const RoomApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<RoomItemTypes[]>('/api/homes/room');
    return data;
  },
  async get(id: number) {
    const { data } = await instance.get<RoomItemTypes>(`/api/homes/room/${id}`);
    return data;
  },
  async create(room: RoomItemTypes) {
    const { data } = await instance.post<RoomItemTypes, { data: RoomItemTypes }>('/api/homes/room/', room);
    return data;
  },
  async update(id: number, room: RoomItemTypes) {
    const { data } = await instance.put<RoomItemTypes, { data: RoomItemTypes }>(`api/homes/room/${id}`, room);
    return data;
  },
  remove(id: number) {
    return instance.delete(`api/homes/room/${id}`);
  },
});
