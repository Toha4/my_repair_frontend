import Cookies, { parseCookies } from 'nookies';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import { UserApi } from './user';
import { RepairObjectApi } from './repairObject';
import { CategoryApi } from './category';
import { ShopApi } from './shop';
import { RoomApi } from './room';
import axiosApi from '../axiosApi';
import { BuildingApi } from './buildings';
import { PurchaseApi } from './purchase';
import { GetReceiptsApi } from './getReceipts';


export type ApiReturnType = {
  user: ReturnType<typeof UserApi>;
  repairObject: ReturnType<typeof RepairObjectApi>;
  category: ReturnType<typeof CategoryApi>;
  shop: ReturnType<typeof ShopApi>;
  building: ReturnType<typeof BuildingApi>;
  room: ReturnType<typeof RoomApi>;
  purchase: ReturnType<typeof PurchaseApi>;
  getReceipts: ReturnType<typeof GetReceiptsApi>;
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
    repairObject: RepairObjectApi,
    category: CategoryApi,
    shop: ShopApi,
    room: RoomApi,
    building: BuildingApi,
    purchase: PurchaseApi,
    getReceipts: GetReceiptsApi,
  };

  const result = Object.entries(apis).reduce((prev, [key, f]) => {
    return {
      ...prev,
      [key]: f(instance),
    };
  }, {} as ApiReturnType);

  return result;
};