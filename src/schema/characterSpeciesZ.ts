import z from "zod";

export const CharacterSpeciesZ = z.object({
  uid: z.string().optional(),
  name: z.string().optional(),
  numerator: z.number().optional(),
  denominator: z.number().optional(),
});
