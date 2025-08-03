import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

type Theme = { isLight: boolean };
const initialState: Theme = { isLight: true };
export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      return state.isLight ? { isLight: false } : { isLight: true };
    },
    changeTheme: (state, action: PayloadAction<boolean>) => {
      return { isLight: action.payload };
    },
  },
});

export const selectTheme = (state: RootState) => state.theme;
export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
