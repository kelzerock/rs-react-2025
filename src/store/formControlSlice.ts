import { createSlice } from "@reduxjs/toolkit";
import type { SchemaFormType } from "../models/types/schemaForm";

const initialState: { db: SchemaFormType[]; current: SchemaFormType } = {
  db: [],
  current: {
    name: "",
    age: 0,
    email: "",
    password: "",
    confirmPassword: "",
    gender: "female",
    acceptTerms: false,
    picture: null,
    country: "",
  },
};

export const formControlSlice = createSlice({
  name: "formControl",
  initialState,
  reducers: {},
});
