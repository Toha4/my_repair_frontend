import Cookies, { parseCookies } from 'nookies';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import { UserApi } from './user';
import { HomeApi } from './home';
import axiosApi from '../axiosApi';


export type ApiReturnType = {
  user: ReturnType<typeof UserApi>;
  home: ReturnType<typeof HomeApi>;
};

export const Api = (ctx?: NextPageContext | GetServerSidePropsContext): ApiReturnType => {
  const instance = axiosApi;

  const cookies = ctx ? Cookies.get(ctx) : parseCookies();
  const access = cookies.access;
  
  if (access) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${access}`;
  }

  const apis = {
    user: UserApi,
    home: HomeApi,
  };

  const result = Object.entries(apis).reduce((prev, [key, f]) => {
    return {
      ...prev,
      [key]: f(instance),
    };
  }, {} as ApiReturnType);

  return result;
};