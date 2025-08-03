import z from "zod";

export const CharacterSpeciesZ = z.object({
  uid: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  numerator: z.number().nullable().optional(),
  denominator: z.number().nullable().optional(),
});
