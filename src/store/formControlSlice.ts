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
      const newCard = {
        ...state.current,
        id: Date.now().toString(),
      };
      return {
        db: [newCard, ...state.db],
        current: { ...initialCurrentForm },
      };
    },
  },
});

export const selectFormControlDB = (state: RootState) => state.formControl.db;
export const { addCurrentState, addToDb } = formControlSlice.actions;

export default formControlSlice.reducer;
