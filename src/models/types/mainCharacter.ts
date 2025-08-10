import type z from "zod";
import type { CharacterBaseZ } from "../../schema/characterBaseZ";

export type MainCharacter = z.infer<typeof CharacterBaseZ>;
