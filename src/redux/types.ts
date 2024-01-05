import { SerializedError } from "@reduxjs/toolkit";
import { BuildingItemTypes, CategoryItemTypes, RepairObjectItemTypes, RoomItemTypes, ShopItemTypes } from "../utils/api/types";

export enum LoadingStatus {
  IDLE = "idle",
  LOADING = "loading",
  SUCCEEDED = 'succeeded',
  FAILED = 'failed'
};

export enum RepairObjectTypes {
  LAND = 1,
  APARTMENT = 2,
};

export interface IUserSettings {
  current_repair_object?: number;
  current_repair_object_name?: string;
  current_repair_object_type?: RepairObjectTypes;
};

export interface IUser {
  email: string;
  username: string;
  is_active: boolean;
  is_superuser?: boolean;
  first_name?: string;
  last_name?: string;
  settings?: IUserSettings;
};

export interface IUserUpdate {
  email: string;
  first_name: string;
  last_name: string;
};

export interface IRegister {
  email: string;
  username: string;
  password: string;
};

export interface ILogin {
  emailOrUsername: string;
  password: string;
};

export interface IAuthSliceState {
  loading: LoadingStatus;
  user?: IUser | null;
  isAuthenticated: boolean;
  register_success: boolean;
  error?: SerializedError | null;
};

export interface IBuildingSliceState {
  status: LoadingStatus;
  buildings: BuildingItemTypes[];
  error: any;
}

export interface IRoomSliceState {
  status: LoadingStatus;
  rooms: RoomItemTypes[];
  error: any;
}

export interface IRepairObjectSliceState {
  status: LoadingStatus;
  repairObjects: RepairObjectItemTypes[];
  error: any;
}

export interface IShopSliceState {
  status: LoadingStatus;
  shops: ShopItemTypes[];
  error: any;
}

export interface ICategorySliceState {
  status: LoadingStatus;
  categories: CategoryItemTypes[];
  error: any;
}