import type z from "zod";
import { CountryZ } from "../../schema/countryZ";

export type Country = z.infer<typeof CountryZ>;
