import z from "zod";

export const MaritalStatusZ = z.enum([
  "SINGLE",
  "ENGAGED",
  "MARRIED",
  "DIVORCED",
  "REMARRIED",
  "SEPARATED",
  "WIDOWED",
  "CAPTAINS_WOMAN",
]);
