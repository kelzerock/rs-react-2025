import z from "zod";

export const EpisodeBaseZ = z.object({
  uid: z.string(),
  title: z.string(),
  titleGerman: z.string().nullable().optional(),
  titleItalian: z.string().nullable().optional(),
  titleJapanese: z.string().nullable().optional(),
  series: z
    .object({
      uid: z.string(),
      title: z.string(),
    })
    .nullable()
    .optional(),
  season: z
    .object({
      uid: z.string(),
      title: z.string(),
    })
    .nullable()
    .optional(),
  seasonNumber: z.number().nullable().optional(),
  episodeNumber: z.number().nullable().optional(),
  productionSerialNumber: z.string().nullable().optional(),
  featureLength: z.boolean().nullable().optional(),
  stardateFrom: z.number().nullable().optional(),
  stardateTo: z.number().nullable().optional(),
  yearFrom: z.number().nullable().optional(),
  yearTo: z.number().nullable().optional(),
  usAirDate: z.string().nullable().optional(),
  finalScriptDate: z.string().nullable().optional(),
});
