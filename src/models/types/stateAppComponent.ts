import type { MainCharacter } from "./mainCharacter";
import type { Pagination } from "./pagination";

export type StateAppComponent = {
  characters: MainCharacter[];
  isLoading: boolean;
  inputSearch: string;
  isError: boolean;
  responseStatus: number | null;
  page: Pagination;
};
