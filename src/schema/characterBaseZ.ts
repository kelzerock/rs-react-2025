import z from "zod";
import { GenderZ } from "./genderZ";
import { BloodTypeZ } from "./bloodTypeZ";
import { MaritalStatusZ } from "./maritalStatusZ";

export const CharacterBaseZ = z.object({
  uid: z.string(),
  name: z.string(),
  gender: GenderZ.nullable().optional(),
  yearOfBirth: z.number().nullable().optional(),
  monthOfBirth: z.number().nullable().optional(),
  dayOfBirth: z.number().nullable().optional(),
  placeOfBirth: z.string().nullable().optional(),
  yearOfDeath: z.number().nullable().optional(),
  monthOfDeath: z.number().nullable().optional(),
  dayOfDeath: z.number().nullable().optional(),
  placeOfDeath: z.string().nullable().optional(),
  height: z.number().nullable().optional(),
  weight: z.number().nullable().optional(),
  deceased: z.boolean().nullable().optional(),
  bloodType: BloodTypeZ.nullable().optional(),
  maritalStatus: MaritalStatusZ.nullable().optional(),
  serialNumber: z.string().nullable().optional(),
  hologramActivationDate: z.string().nullable().optional(),
  hologramStatus: z.string().nullable().optional(),
  hologramDateStatus: z.string().nullable().optional(),
  hologram: z.boolean().nullable().optional(),
  fictionalCharacter: z.boolean().nullable().optional(),
  mirror: z.boolean().nullable().optional(),
  alternateReality: z.boolean().nullable().optional(),
});
