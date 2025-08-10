import z from "zod";

export const TitleBaseZ = z.object({
  uid: z.string(),
  name: z.string(),
  militaryRank: z.boolean().nullable().optional(),
  fleetRank: z.boolean().nullable().optional(),
  religiousTitle: z.boolean().nullable().optional(),
  position: z.boolean().nullable().optional(),
  mirror: z.boolean().nullable().optional(),
});
