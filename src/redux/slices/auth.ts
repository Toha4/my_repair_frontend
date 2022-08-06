import { createSlice, SerializedError, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../utils/api";
import { destoryAccessCookie, setAccessCookie } from "../../utils/cookies";
import { IAuthSliceState, ILogin, IRegister, IUser, IUserSettings, IUserUpdate, LoadingStates } from "../types";


const internalInitialState: IAuthSliceState = {
  loading: LoadingStates.IDLE,
  user: null,
  isAuthenticated: false,
  register_success: false,
  error: null,
};


export const fetchUser = createAsyncThunk("auth/me", async (_, thinkAPI) => {
  try {
    return await Api().user.getMe();
  }
  catch (error: any) {
    return thinkAPI.rejectWithValue({ error: error.message });
  }
});

export const register = createAsyncThunk("auth/register", async (credentials: IRegister, thunkAPI) => {
  try {
    const user = await Api().user.register(credentials);
    return { user };
  }
  catch (error: any) {
    let message: string;
    if (error?.response?.data?.username) {
      message = error.response.data.username[0];
    }
    else if (error?.response?.data?.email) {
      message = error.response.data.email[0];
    }
    else if (error?.response?.data?.password) {
      message = error.response.data.password[0];
    }
    else {
      message = error.message;
    }

    return thunkAPI.rejectWithValue({message, code: error.code});
  }
});

export const login = createAsyncThunk("auth/login", async (credentials: ILogin, thunkAPI) => {
  try {
    const data = await Api().user.loginProxy(credentials);
    setAccessCookie(data.access);

    const user = await Api().user.getMe();
    return { user };
  } catch (error: any) {
    const message = error?.response?.data?.detail || error.message;
    return thunkAPI.rejectWithValue({message, code: error.code});
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    Api().user.logoutProxy();

    destoryAccessCookie();
  } catch (error: any) {
    const message = error?.response?.data?.detail || error.message;
    return thunkAPI.rejectWithValue({message, code: error.code});
  }
});

export const updateUser = createAsyncThunk("auth/me/update", async (data: IUserUpdate, thinkAPI) => {
  try {
    return await Api().user.updateUser(data);
  }
  catch (error: any) {
    return thinkAPI.rejectWithValue({ error: error.message });
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState: internalInitialState,
  reducers: {
    setUser: (state: any, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
      state.isAuthenticated = action.payload !== null;
    },
    setUserSettings: (state: any, action: PayloadAction<IUserSettings>) => {
      state.user.settings = action.payload;
    },
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = LoadingStates.LOADING;
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loading = LoadingStates.IDLE;
      state.isAuthenticated = true;
    })
    builder.addCase(login.rejected, (state, action) => {
      return { ...internalInitialState, error: action.payload as SerializedError};
      // throw new Error(action.error.message);
    })
    builder.addCase(logout.pending, (state) => {
      state.loading = LoadingStates.LOADING;
    })
    builder.addCase(logout.fulfilled, (_state) => internalInitialState)
    builder.addCase(register.pending, (state) => {
      state.loading = LoadingStates.LOADING;
    })
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loading = LoadingStates.IDLE;
      state.register_success = true;
    })
    builder.addCase(register.rejected, (state, action) => {
      return { ...internalInitialState, error: action.payload as SerializedError};
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      return { ...internalInitialState, error: action.error };
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload;
    })
  }
});

export const { setUser, setUserSettings, reset } = authSlice.actions;

export const authReducer = authSlice.reducer;