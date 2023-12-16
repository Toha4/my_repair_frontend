import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IShopSliceState, LoadingStatus } from "../types";
import { Api } from "../../utils/api";
import { sortByName } from "../../utils/DataConvert";
import { ShopItemTypes } from "../../utils/api/types";

const initialState: IShopSliceState = {
  status: LoadingStatus.IDLE,
  shops: [],
  error: null
}

export const fetchShops = createAsyncThunk('shop', async (_, thinkAPI) => {
  try {
    return await Api().shop.getAll();
  }
  catch (error: any) {
    return thinkAPI.rejectWithValue({ error: error.message });
  }
})

const shopsSlice = createSlice({
  name: 'shops',
  initialState: initialState,
  reducers: {
    shopAdded: (state: IShopSliceState, action: PayloadAction<ShopItemTypes>) => {
      state.shops.push(action.payload);

      // Сортируем как на бэке
      state.shops.sort(sortByName);
    },
    shopUpdated: (state: IShopSliceState, action: PayloadAction<ShopItemTypes>) => {
      state.shops = state.shops.map((item) => {
        if (item.pk === action.payload.pk) { 
          return action.payload
        }
        
        return item
      })
      
      // Сортируем как на бэке
      state.shops.sort(sortByName);
    },
    shopRemoved: (state: IShopSliceState, action: PayloadAction<number>) => {
      state.shops = state.shops.filter(shop => shop.pk !== action.payload)
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShops.pending, (state) => {
      state.status = LoadingStatus.LOADING;
    }),
    builder.addCase(fetchShops.fulfilled, (state, action) => {
      state.status = LoadingStatus.SUCCEEDED;
      state.shops = action.payload;
    }),
    builder.addCase(fetchShops.rejected, (state, action) => {
      state.status = LoadingStatus.FAILED;
      state.shops = [];
      state.error = action.error;
    })
  }
})

export const { shopAdded, shopRemoved, shopUpdated, reset } = shopsSlice.actions;

export const shopsReducer = shopsSlice.reducer;