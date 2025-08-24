import type { SchemaFormType } from "./schemaForm";

export type SchemaFormTypeForDb = Omit<SchemaFormType, "picture"> & {
  picture: string;
  id?: string;
};
