import z from "zod";

export const OccupationBaseZ = z.object({
  uid: z.string(),
  name: z.string(),
  legalOccupation: z.boolean().nullable().optional(),
  medicalOccupation: z.boolean().nullable().optional(),
  scientificOccupation: z.boolean().nullable().optional(),
});
