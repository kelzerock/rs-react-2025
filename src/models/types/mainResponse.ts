import type { MainCharacter } from "./mainCharacter";

export type MainResponse = {
  characters: MainCharacter[];
  page: {
    firstPage: boolean;
    lastPage: boolean;
    numberOfElements: number;
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
  };
};
