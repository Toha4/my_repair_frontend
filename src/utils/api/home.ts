import { AxiosInstance } from 'axios';

import { ILogin, IUser } from "../../redux/slices/auth";


export const HomeApi = (instance: AxiosInstance) => ({
  async getHomes() {
    const { data } = await instance.get('/api/homes/home/');
    return data;
  },
});
