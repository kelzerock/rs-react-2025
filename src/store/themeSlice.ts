import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

type Theme = { theme: "light" | "dark" };
const initialState: Theme = { theme: "light" };
export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      return state.theme === "dark" ? { theme: "light" } : { theme: "dark" };
    },
  },
});

export const selectTheme = (state: RootState) => state.theme;
export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
