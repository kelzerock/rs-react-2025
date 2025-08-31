import type z from "zod";
import type { CountriesZ } from "../../schema/countriesZ";

export type Countries = z.infer<typeof CountriesZ>;
