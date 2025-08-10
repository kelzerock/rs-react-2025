import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./itemsSlice";
import { stapiAPI } from "../serviceAPI/stapiAPI";
import { setupListeners } from "@reduxjs/toolkit/query/react";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    [stapiAPI.reducerPath]: stapiAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stapiAPI.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
