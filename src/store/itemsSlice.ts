import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type z from "zod";
import type { CharacterBaseZ } from "../schema/characterBaseZ";

type Character = z.infer<typeof CharacterBaseZ>;
const initialState: Character[] = [];

export const itemsSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<Character>) => {
      if (!state.some((item) => item.uid === action.payload.uid)) {
        return [...state, action.payload];
      } else {
        return state.filter((item) => item.uid !== action.payload.uid);
      }
    },
    removeAllItems: () => {
      return [];
    },
  },
});

export const selectItems = (state: RootState) => state.items;
export const { toggleItem, removeAllItems } = itemsSlice.actions;

export default itemsSlice.reducer;
