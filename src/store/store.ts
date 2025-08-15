import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./itemsSlice";
import { stapiAPI } from "../serviceAPI/stapiAPI";
import { setupListeners } from "@reduxjs/toolkit/query/react";

export const store = () => {
  return configureStore({
    reducer: {
      items: itemsReducer,
      [stapiAPI.reducerPath]: stapiAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        stapiAPI.middleware,
      ),
  });
};

setupListeners(store().dispatch);

export type AppStore = ReturnType<typeof store>;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
