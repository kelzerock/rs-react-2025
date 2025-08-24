import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { SchemaFormTypeForDb } from "../models/types/schemaFormForDb";
const initialCurrentForm: SchemaFormTypeForDb = {
  name: "",
  age: 0,
  email: "",
  password: "",
  confirmPassword: "",
  gender: "female",
  acceptTerms: false,
  picture: "",
  country: "",
};
const initialState: {
  db: SchemaFormTypeForDb[];
  current: SchemaFormTypeForDb;
} = {
  db: [],
  current: { ...initialCurrentForm },
};

export const formControlSlice = createSlice({
  name: "formControl",
  initialState,
  reducers: {
    addCurrentState: (state, action: PayloadAction<SchemaFormTypeForDb>) => {
      return { ...state, current: { ...action.payload } };
    },
    addToDb: (state) => {
      return {
        db: [...state.db, state.current],
        current: { ...initialCurrentForm },
      };
    },
  },
});

export const selectFormControl = (state: RootState) => state.formControl;
export const { addCurrentState, addToDb } = formControlSlice.actions;

export default formControlSlice.reducer;
