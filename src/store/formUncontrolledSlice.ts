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

export const formUncontrolledSlice = createSlice({
  name: "formUncontrolled",
  initialState,
  reducers: {
    addCurrentStateUncontrolledForm: (
      state,
      action: PayloadAction<SchemaFormTypeForDb>,
    ) => {
      return { ...state, current: { ...action.payload } };
    },
    addToDbUncontrolledForm: (state) => {
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

export const selectFormUncontrolledDB = (state: RootState) =>
  state.formUncontrolled.db;
export const { addCurrentStateUncontrolledForm, addToDbUncontrolledForm } =
  formUncontrolledSlice.actions;

export default formUncontrolledSlice.reducer;
