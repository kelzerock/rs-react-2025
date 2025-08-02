import z from "zod";

export const OrganizationBaseZ = z.object({
  uid: z.string(),
  name: z.string(),
  government: z.boolean().optional(),
  intergovernmentalOrganization: z.boolean().optional(),
  researchOrganization: z.boolean().optional(),
  sportOrganization: z.boolean().optional(),
  medicalOrganization: z.boolean().optional(),
  militaryOrganization: z.boolean().optional(),
  militaryUnit: z.boolean().optional(),
  governmentAgency: z.boolean().optional(),
  lawEnforcementAgency: z.boolean().optional(),
  prisonOrPenalColony: z.boolean().optional(),
  mirror: z.boolean().optional(),
  alternateReality: z.boolean().optional(),
});
