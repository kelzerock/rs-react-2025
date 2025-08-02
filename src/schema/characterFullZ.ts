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
  performers: z.array(PerformerBaseZ).optional(),
  episodes: z.array(EpisodeBaseZ).optional(),
  movies: z.array(MovieBaseZ).optional(),
  characterSpecies: z.array(CharacterSpeciesZ).optional(),
  characterRelations: z.array(CharacterRelationZ).optional(),
  titles: z.array(TitleBaseZ).optional(),
  occupations: z.array(OccupationBaseZ).optional(),
  organizations: z.array(OrganizationBaseZ).optional(),
});
