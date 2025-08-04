import z from "zod";
import { BloodTypeZ } from "./bloodTypeZ";
import { MaritalStatusZ } from "./maritalStatusZ";
import { PerformerBaseZ } from "./performerBaseZ";
import { EpisodeBaseZ } from "./episodeBaseZ";
import { CharacterSpeciesZ } from "./characterSpeciesZ";
import { CharacterRelationZ } from "./characterRelation";
import { TitleBaseZ } from "./titleBaseZ";
import { MovieBaseZ } from "./movieBaseZ";
import { OccupationBaseZ } from "./occupationBaseZ";
import { OrganizationBaseZ } from "./organizationBaseZ";

export const CharacterFullZ = z.object({
  uid: z.string(),
  name: z.string(),
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
  performers: z.array(PerformerBaseZ).nullable().optional(),
  episodes: z.array(EpisodeBaseZ).nullable().optional(),
  movies: z.array(MovieBaseZ).nullable().optional(),
  characterSpecies: z.array(CharacterSpeciesZ).nullable().optional(),
  characterRelations: z.array(CharacterRelationZ).nullable().optional(),
  titles: z.array(TitleBaseZ).nullable().optional(),
  occupations: z.array(OccupationBaseZ).nullable().optional(),
  organizations: z.array(OrganizationBaseZ).nullable().optional(),
});
