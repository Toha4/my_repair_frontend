import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICategorySliceState, LoadingStatus } from "../types";
import { Api } from "../../utils/api";
import { sortByName } from "../../utils/DataConvert";
import { CategoryItemTypes } from "../../utils/api/types";

const initialState: ICategorySliceState = {
  status: LoadingStatus.IDLE,
  categories: [],
  error: null
}

export const fetchCategories = createAsyncThunk('category', async (_, thinkAPI) => {
  try {
    return await Api().category.getAll();
  }
  catch (error: any) {
    return thinkAPI.rejectWithValue({ error: error.message });
  }
})

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {
    categoryAdded: (state: ICategorySliceState, action: PayloadAction<CategoryItemTypes>) => {
      state.categories.push(action.payload);

      // Сортируем как на бэке
      state.categories.sort(sortByName);
    },
    categoryUpdated: (state: ICategorySliceState, action: PayloadAction<CategoryItemTypes>) => {
      state.categories = state.categories.map((item) => {
        if (item.pk === action.payload.pk) { 
          return action.payload
        }
        
        return item
      })
      
      // Сортируем как на бэке
      state.categories.sort(sortByName);
    },
    CategoryRemoved: (state: ICategorySliceState, action: PayloadAction<number>) => {
      state.categories = state.categories.filter(category => category.pk !== action.payload)
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.status = LoadingStatus.LOADING;
    }),
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.status = LoadingStatus.SUCCEEDED;
      state.categories = action.payload;
    }),
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.status = LoadingStatus.FAILED;
      state.categories = [];
      state.error = action.error;
    })
  }
})

export const { categoryAdded, CategoryRemoved, categoryUpdated, reset } = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;