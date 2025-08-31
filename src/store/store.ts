import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice";
import yearsReducer from "./yearsSlice";

export const store = configureStore({
  reducer: { countries: countriesReducer, dataYears: yearsReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
