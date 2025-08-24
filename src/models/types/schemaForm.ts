import z from "zod";
import type { SchemaForm } from "../../schema/schemaForm";

export type SchemaFormType = z.infer<typeof SchemaForm>;
