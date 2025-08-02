import z from "zod";

export const TitleBaseZ = z.object({
  uid: z.string(),
  name: z.string(),
  militaryRank: z.boolean().optional(),
  fleetRank: z.boolean().optional(),
  religiousTitle: z.boolean().optional(),
  position: z.boolean().optional(),
  mirror: z.boolean().optional(),
});
