import z from "zod";

export const EpisodeBaseZ = z.object({
  uid: z.string(),
  title: z.string(),
  titleGerman: z.string().optional(),
  titleItalian: z.string().optional(),
  titleJapanese: z.string().optional(),
  series: z
    .object({
      uid: z.string(),
      title: z.string(),
    })
    .optional(),
  season: z
    .object({
      uid: z.string(),
      title: z.string(),
    })
    .optional(),
  seasonNumber: z.number().optional(),
  episodeNumber: z.number().optional(),
  productionSerialNumber: z.string().optional(),
  featureLength: z.boolean().optional(),
  stardateFrom: z.number().optional(),
  stardateTo: z.number().optional(),
  yearFrom: z.number().optional(),
  yearTo: z.number().optional(),
  usAirDate: z.string().optional(),
  finalScriptDate: z.string().optional(),
});
