import { configureStore } from "@reduxjs/toolkit";
import formControlReducer from "./formControlSlice";
import countriesSlice from "./countrySlice";
import formUncontrolledReducer from "./formUncontrolledSlice";

export const store = configureStore({
  reducer: {
    formControl: formControlReducer,
    formUncontrolled: formUncontrolledReducer,
    countries: countriesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
