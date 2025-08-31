import z from "zod";
import { CountryZ } from "./countryZ";

export const CountriesZ = z.record(z.string(), CountryZ);
