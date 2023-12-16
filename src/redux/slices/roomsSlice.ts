import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IRoomSliceState, LoadingStatus } from "../types";
import { Api } from "../../utils/api";
import { sortByName } from "../../utils/DataConvert";
import { RoomItemTypes } from "../../utils/api/types";

const initialState: IRoomSliceState = {
  status: LoadingStatus.IDLE,
  rooms: [],
  error: null
}

export const fetchRooms = createAsyncThunk('homes/room', async (_, thinkAPI) => {
  try {
    return await Api().room.getAll();
  }
  catch (error: any) {
    return thinkAPI.rejectWithValue({ error: error.message });
  }
})

const roomsSlice = createSlice({
  name: 'rooms',
  initialState: initialState,
  reducers: {
    roomAdded: (state: IRoomSliceState, action: PayloadAction<RoomItemTypes>) => {
      state.rooms.push(action.payload);

      // Сортируем как на бэке
      state.rooms.sort(sortByName);
    },
    roomUpdated: (state: IRoomSliceState, action: PayloadAction<RoomItemTypes>) => {
      state.rooms = state.rooms.map((item) => {
        if (item.pk === action.payload.pk) { 
          return action.payload
        }
        
        return item
      })
      
      // Сортируем как на бэке
      state.rooms.sort(sortByName);
    },
    roomRemoved: (state: IRoomSliceState, action: PayloadAction<number>) => {
      state.rooms = state.rooms.filter(room => room.pk !== action.payload)
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRooms.pending, (state) => {
      state.status = LoadingStatus.LOADING;
    }),
    builder.addCase(fetchRooms.fulfilled, (state, action) => {
      state.status = LoadingStatus.SUCCEEDED;
      state.rooms = action.payload;
    }),
    builder.addCase(fetchRooms.rejected, (state, action) => {
      state.status = LoadingStatus.FAILED;
      state.rooms = [];
      state.error = action.error;
    })
  }
})

export const { roomAdded, roomRemoved, roomUpdated, reset } = roomsSlice.actions;

export const roomsReducer = roomsSlice.reducer;