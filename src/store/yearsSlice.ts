import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

const yearsSlice = createSlice({
  name: "years",
  initialState: {
    years: [2020, 2021, 2022, 2023, 2024, 2025],
  },
  reducers: {
    addYears: (state, action: PayloadAction<number[]>) => {
      return {
        ...state,
        years: Array.from(new Set([...state.years, ...action.payload])),
      };
    },
  },
});

export const { addYears } = yearsSlice.actions;
export default yearsSlice.reducer;
export const selectYears = (state: RootState) => state.dataYears.years;
