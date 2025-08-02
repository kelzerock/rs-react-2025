import z from "zod";
import { GenderZ } from "./genderZ";

export const PerformerBaseZ = z.object({
  uid: z.string(),
  name: z.string(),
  birthName: z.string().optional(),
  gender: GenderZ.optional(),
  dateOfBirth: z.string().optional(),
  placeOfBirth: z.string().optional(),
  dateOfDeath: z.string().optional(),
  placeOfDeath: z.string().optional(),
  animalPerformer: z.boolean().optional(),
  disPerformer: z.boolean().optional(),
  ds9Performer: z.boolean().optional(),
  entPerformer: z.boolean().optional(),
  filmPerformer: z.boolean().optional(),
  standInPerformer: z.boolean().optional(),
  stuntPerformer: z.boolean().optional(),
  tasPerformer: z.boolean().optional(),
  tngPerformer: z.boolean().optional(),
  tosPerformer: z.boolean().optional(),
  videoGamePerformer: z.boolean().optional(),
  voicePerformer: z.boolean().optional(),
  voyPerformer: z.boolean().optional(),
});
