import z from "zod";

export const MovieBaseZ = z.object({
  uid: z.string(),
  title: z.string(),
  description: z
    .object({
      uid: z.string(),
      name: z.string(),
    })
    .optional(),
  titleBulgarian: z.string().optional(),
  titleCatalan: z.string().optional(),
  titleChineseTraditional: z.string().optional(),
  titleGerman: z.string().optional(),
  titleItalian: z.string().optional(),
  titleJapanese: z.string().optional(),
  titlePolish: z.string().optional(),
  titleRussian: z.string().optional(),
  titleSerbian: z.string().optional(),
  titleSpanish: z.string().optional(),
  stardateFrom: z.number().optional(),
  stardateTo: z.number().optional(),
  yearFrom: z.number().optional(),
  yearTo: z.number().optional(),
  usReleaseDate: z.string().optional(),
});
