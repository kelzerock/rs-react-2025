import z from "zod";

export const CharacterRelationZ = z.object({
  type: z.string().optional,
  source: z
    .object({
      uid: z.string(),
      name: z.string(),
    })
    .nullable()
    .optional(),
  target: z
    .object({
      uid: z.string(),
      name: z.string(),
    })
    .nullable()
    .optional(),
});
