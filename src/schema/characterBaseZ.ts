import z from "zod";
import { GenderZ } from "./genderZ";
import { BloodTypeZ } from "./bloodTypeZ";
import { MaritalStatusZ } from "./maritalStatusZ";

export const CharacterBaseZ = z.object({
  uid: z.string(),
  name: z.string(),
  gender: GenderZ.optional(),
  yearOfBirth: z.number().optional(),
  monthOfBirth: z.number().optional(),
  dayOfBirth: z.number().optional(),
  placeOfBirth: z.string().optional(),
  yearOfDeath: z.number().optional(),
  monthOfDeath: z.number().optional(),
  dayOfDeath: z.number().optional(),
  placeOfDeath: z.string().optional(),
  height: z.number().optional(),
  weight: z.number().optional(),
  deceased: z.boolean().optional(),
  bloodType: BloodTypeZ.optional(),
  maritalStatus: MaritalStatusZ.optional(),
  serialNumber: z.string().optional(),
  hologramActivationDate: z.string().optional(),
  hologramStatus: z.string().optional(),
  hologramDateStatus: z.string().optional(),
  hologram: z.boolean().optional(),
  fictionalCharacter: z.boolean().optional(),
  mirror: z.boolean().optional(),
  alternateReality: z.boolean().optional(),
});
