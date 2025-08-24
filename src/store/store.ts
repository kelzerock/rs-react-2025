import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./itemsSlice";
import formControlReducer from "./formControlSlice";
import countriesSlice from "./countrySlice";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    formControl: formControlReducer,
    countries: countriesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
