import z from "zod";

export const BloodTypeZ = z.enum(["B_NEGATIVE", "O_NEGATIVE", "T_NEGATIVE"]);
