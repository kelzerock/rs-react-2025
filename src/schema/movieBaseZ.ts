import z from "zod";

export const MovieBaseZ = z.object({
  uid: z.string(),
  title: z.string(),
  description: z
    .object({
      uid: z.string(),
      name: z.string(),
    })
    .nullable()
    .optional(),
  titleBulgarian: z.string().nullable().optional(),
  titleCatalan: z.string().nullable().optional(),
  titleChineseTraditional: z.string().nullable().optional(),
  titleGerman: z.string().nullable().optional(),
  titleItalian: z.string().nullable().optional(),
  titleJapanese: z.string().nullable().optional(),
  titlePolish: z.string().nullable().optional(),
  titleRussian: z.string().nullable().optional(),
  titleSerbian: z.string().nullable().optional(),
  titleSpanish: z.string().nullable().optional(),
  stardateFrom: z.number().nullable().optional(),
  stardateTo: z.number().nullable().optional(),
  yearFrom: z.number().nullable().optional(),
  yearTo: z.number().nullable().optional(),
  usReleaseDate: z.string().nullable().optional(),
});
