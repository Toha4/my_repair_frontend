import { SerializedError } from "@reduxjs/toolkit";

export enum LoadingStates {
  IDLE = "idle",
  LOADING = "loading",
};

export interface IUserSettings {
  current_home?: number;
  current_home_name?: string;
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
  loading: LoadingStates;
  user?: IUser | null;
  isAuthenticated: boolean;
  register_success: boolean;
  error?: SerializedError | null;
};
