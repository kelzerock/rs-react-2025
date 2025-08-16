import z from "zod";

export const OrganizationBaseZ = z.object({
  uid: z.string(),
  name: z.string(),
  government: z.boolean().nullable().optional(),
  intergovernmentalOrganization: z.boolean().nullable().optional(),
  researchOrganization: z.boolean().nullable().optional(),
  sportOrganization: z.boolean().nullable().optional(),
  medicalOrganization: z.boolean().nullable().optional(),
  militaryOrganization: z.boolean().nullable().optional(),
  militaryUnit: z.boolean().nullable().optional(),
  governmentAgency: z.boolean().nullable().optional(),
  lawEnforcementAgency: z.boolean().nullable().optional(),
  prisonOrPenalColony: z.boolean().nullable().optional(),
  mirror: z.boolean().nullable().optional(),
  alternateReality: z.boolean().nullable().optional(),
});
