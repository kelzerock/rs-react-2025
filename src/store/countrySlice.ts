import { createSlice } from "@reduxjs/toolkit";
import { countryList } from "../constant/countries";
import type { RootState } from "./store";

export const countriesSlice = createSlice({
  name: "country",
  initialState: countryList,
  reducers: {},
});

export const selectCountries = (state: RootState) => state.countries;

export default countriesSlice.reducer;
