import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

const initialState: string[] = [];

const countriesNameSlice = createSlice({
  name: "years",
  initialState,
  reducers: {
    addCountriesName: (state, action: PayloadAction<string[]>) => {
      return Array.from(new Set([...state, ...action.payload]));
    },
  },
});

export const { addCountriesName } = countriesNameSlice.actions;
export default countriesNameSlice.reducer;
export const selectCountriesName = (state: RootState) => state.countriesName;
