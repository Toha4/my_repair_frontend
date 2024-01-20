import axios, { AxiosInstance } from 'axios';
import { ILogin, IRegister, IUser, IUserUpdate } from '../../redux/types';


export const UserApi = (instance: AxiosInstance) => ({
  async loginProxy(credentials: ILogin) {
    const { data } = await axios.post<{ access: string }>("/api/auth/login", credentials);
    return data;
  },
  async logoutProxy() {
    const { data } = await axios.post("/api/auth/logout");
    return data;
  },
  async register(credentials: IRegister) {
    const { data } = await instance.post<IUser>("/api/auth/registration/", credentials);
    return data;
  },
  async getMe() {
    const { data } = await instance.get<IUser>("/api/users/me/");
    return data;
  },
  async updateUser(user: IUserUpdate) {
    const { data } = await instance.put<IUser>("/api/users/me/", user);
    return data;
  }
});
