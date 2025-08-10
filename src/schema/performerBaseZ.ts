import z from "zod";
import { GenderZ } from "./genderZ";

export const PerformerBaseZ = z.object({
  uid: z.string(),
  name: z.string(),
  birthName: z.string().nullable().optional(),
  gender: GenderZ.nullable().optional(),
  dateOfBirth: z.string().nullable().optional(),
  placeOfBirth: z.string().nullable().optional(),
  dateOfDeath: z.string().nullable().optional(),
  placeOfDeath: z.string().nullable().optional(),
  animalPerformer: z.boolean().nullable().optional(),
  disPerformer: z.boolean().nullable().optional(),
  ds9Performer: z.boolean().nullable().optional(),
  entPerformer: z.boolean().nullable().optional(),
  filmPerformer: z.boolean().nullable().optional(),
  standInPerformer: z.boolean().nullable().optional(),
  stuntPerformer: z.boolean().nullable().optional(),
  tasPerformer: z.boolean().nullable().optional(),
  tngPerformer: z.boolean().nullable().optional(),
  tosPerformer: z.boolean().nullable().optional(),
  videoGamePerformer: z.boolean().nullable().optional(),
  voicePerformer: z.boolean().nullable().optional(),
  voyPerformer: z.boolean().nullable().optional(),
});
