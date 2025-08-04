import type { MainCharacter } from "../../models/types/mainCharacter";
import type { MainResponse } from "../../models/types/mainResponse";
import { isCharacter } from "./isCharacter";

const isCharacterArray = (data: unknown): data is MainCharacter[] => {
  return Array.isArray(data) && data.every(isCharacter);
};

export const isResponse = (data: unknown): data is MainResponse => {
  return (
    typeof data === "object" &&
    data !== null &&
    "characters" in data &&
    isCharacterArray(data.characters) &&
    "page" in data &&
    typeof data.page === "object" &&
    data.page !== null &&
    "firstPage" in data.page &&
    "lastPage" in data.page &&
    "numberOfElements" in data.page &&
    "pageNumber" in data.page &&
    "pageSize" in data.page &&
    "totalElements" in data.page &&
    "totalPages" in data.page &&
    typeof data.page.firstPage === "boolean" &&
    typeof data.page.lastPage === "boolean" &&
    typeof data.page.numberOfElements === "number" &&
    typeof data.page.pageNumber === "number" &&
    typeof data.page.pageSize === "number" &&
    typeof data.page.totalElements === "number" &&
    typeof data.page.totalPages === "number"
  );
};
