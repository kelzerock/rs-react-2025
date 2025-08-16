import type { MainCharacter } from "../../models/types/mainCharacter";

export const isCharacter = (data: unknown): data is MainCharacter => {
  return (
    typeof data === "object" &&
    data !== null &&
    "uid" in data &&
    "name" in data &&
    typeof data.uid === "string" &&
    typeof data.name === "string"
  );
};
