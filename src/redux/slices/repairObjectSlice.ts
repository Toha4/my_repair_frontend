import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IRepairObjectSliceState, LoadingStatus } from "../types";
import { Api } from "../../utils/api";
import { sortByName } from "../../utils/DataConvert";
import { RepairObjectItemTypes } from "../../utils/api/types";

const initialState: IRepairObjectSliceState = {
  status: LoadingStatus.IDLE,
  repairObjects: [],
  error: null,
};

export const fetchRepairObjects = createAsyncThunk("homes/repair_object", async (_, thinkAPI) => {
  try {
    return await Api().repairObject.getAll();
  } catch (error: any) {
    return thinkAPI.rejectWithValue({ error: error.message });
  }
});

const repairObjectsSlice = createSlice({
  name: "repairObjects",
  initialState: initialState,
  reducers: {
    repairObjectAdded: (state: IRepairObjectSliceState, action: PayloadAction<RepairObjectItemTypes>) => {
      state.repairObjects.push(action.payload);

      // Сортируем как на бэке
      state.repairObjects.sort(sortByName);
    },
    repairObjectUpdated: (state: IRepairObjectSliceState, action: PayloadAction<RepairObjectItemTypes>) => {
      state.repairObjects = state.repairObjects.map((item) => {
        if (item.pk === action.payload.pk) {
          return action.payload;
        }

        return item;
      });

      // Сортируем как на бэке
      state.repairObjects.sort(sortByName);
    },
    repairObjectRemoved: (state: IRepairObjectSliceState, action: PayloadAction<number>) => {
      state.repairObjects = state.repairObjects.filter((repairObject) => repairObject.pk !== action.payload);
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRepairObjects.pending, (state) => {
      state.status = LoadingStatus.LOADING;
    }),
      builder.addCase(fetchRepairObjects.fulfilled, (state, action) => {
        state.status = LoadingStatus.SUCCEEDED;
        state.repairObjects = action.payload;
      }),
      builder.addCase(fetchRepairObjects.rejected, (state, action) => {
        state.status = LoadingStatus.FAILED;
        state.repairObjects = [];
        state.error = action.error;
      });
  },
});

export const { repairObjectAdded, repairObjectRemoved, repairObjectUpdated, reset } = repairObjectsSlice.actions;

export const repairObjectsReducer = repairObjectsSlice.reducer;
