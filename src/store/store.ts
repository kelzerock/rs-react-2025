import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice";
import yearsReducer from "./yearsSlice";
import countriesNameReducer from "./countriesNameSlice";

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    dataYears: yearsReducer,
    countriesName: countriesNameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
