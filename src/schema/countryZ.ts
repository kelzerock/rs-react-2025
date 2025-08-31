import z from "zod";

export const CountryZ = z.object({
  data: z
    .array(
      z
        .object({
          cement_co2: z.number().optional(),
          cement_co2_per_capita: z.number().optional(),
          cumulative_cement_co2: z.number().optional(),
          population: z.number().optional(),
          year: z.number().optional(),
          co2: z.number().optional(),
          co2_per_capita: z.number().optional(),
          gas_co2: z.number().optional(),
          gas_co2_per_capita: z.number().optional(),
          cumulative_gas_co2: z.number().optional(),
          cumulative_gas_co2_per_capita: z.number().optional(),
        })
        .optional(),
    )
    .optional(),
  iso_code: z.string().optional(),
});
