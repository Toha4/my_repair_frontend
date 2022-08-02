import axios, { AxiosInstance } from 'axios';
import { ILogin, IRegister, IUser } from '../../redux/types';


export const UserApi = (instance: AxiosInstance) => ({
  async loginProxy(credentials: ILogin) {
    const { data } = await axios.post<{ access: string }>("http://localhost:3000/api/auth/login", credentials);
    return data;
  },
  async logoutProxy() {
    const { data } = await axios.post("http://localhost:3000/api/auth/logout");
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
});
