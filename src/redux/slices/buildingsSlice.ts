import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IBuildingSliceState, LoadingStatus } from "../types";
import { Api } from "../../utils/api";
import { BuildingItemTypes } from "../../utils/api/types";
import { sortByName } from "../../utils/DataConvert";



const initialState: IBuildingSliceState = {
  status: LoadingStatus.IDLE,
  buildings: [],
  error: null
}


export const fetchBuildings = createAsyncThunk('homes/building', async (_, thinkAPI) => {
  try {
    return await Api().building.getAll();
  }
  catch (error: any) {
    return thinkAPI.rejectWithValue({ error: error.message });
  }
})


const buildingsSlice = createSlice({
  name: 'buildings',
  initialState: initialState,
  reducers: {
    buildingAdded: (state: IBuildingSliceState, action: PayloadAction<BuildingItemTypes>) => {
      state.buildings.push(action.payload);

      // Сортируем как на бэке
      state.buildings.sort(sortByName);
    },
    buildingUpdated: (state: IBuildingSliceState, action: PayloadAction<BuildingItemTypes>) => {
      state.buildings = state.buildings.map((item) => {
        if (item.pk === action.payload.pk) { 
          return action.payload
        }
        
        return item
      })
      
      // Сортируем как на бэке
      state.buildings.sort(sortByName);
    },
    buildingRemoved: (state: IBuildingSliceState, action: PayloadAction<number>) => {
      state.buildings = state.buildings.filter(building => building.pk !== action.payload)
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBuildings.pending, (state) => {
      state.status = LoadingStatus.LOADING;
    }),
    builder.addCase(fetchBuildings.fulfilled, (state, action) => {
      state.status = LoadingStatus.SUCCEEDED;
      state.buildings = action.payload;
    }),
    builder.addCase(fetchBuildings.rejected, (state, action) => {
      state.status = LoadingStatus.FAILED;
      state.buildings = [];
      state.error = action.error;
    })
  }
})

export const { buildingAdded, buildingRemoved, buildingUpdated, reset } = buildingsSlice.actions;

export const buildingsReducer = buildingsSlice.reducer;