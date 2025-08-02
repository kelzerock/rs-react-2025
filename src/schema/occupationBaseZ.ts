import z from "zod";

export const OccupationBaseZ = z.object({
  uid: z.string(),
  name: z.string(),
  legalOccupation: z.boolean().optional(),
  medicalOccupation: z.boolean().optional(),
  scientificOccupation: z.boolean().optional(),
});
