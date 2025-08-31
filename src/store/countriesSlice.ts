import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Countries } from "../models/types/countries";
import type { RootState } from "./store";

const initialState: { data: Countries | null } = { data: null };

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    addCountries: (state, action: PayloadAction<Countries>) => {
      return { data: action.payload };
    },
  },
});

export const { addCountries } = countriesSlice.actions;
export default countriesSlice.reducer;
export const selectCountries = (state: RootState) => state.countries.data;
