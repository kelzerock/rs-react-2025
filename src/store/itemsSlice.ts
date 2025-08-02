import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export const itemsSlices = createSlice({
  name: "item",
  initialState: "",
  reducers: {},
});

export const selectItems = (state: RootState) => state.items;

export default itemsSlices.reducer;
