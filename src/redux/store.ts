import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

import { authReducer } from "./slices/auth";


const combinedReducer = combineReducers({
  authReducer,
});

const rootReducer: typeof combinedReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

export type AppDispatch = typeof store.dispatch;
export type OurStore = ReturnType<typeof combinedReducer>;