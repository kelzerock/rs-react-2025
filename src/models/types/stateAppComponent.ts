import type z from "zod";
import type { Pagination } from "./pagination";
import type { CharacterBaseZ } from "../../schema/characterBaseZ";

export type StateAppComponent = {
  characters: z.infer<typeof CharacterBaseZ>[];
  isLoading: boolean;
  inputSearch: string;
  isError: boolean;
  responseStatus: number | null;
  page: Pagination;
  isInitialLoaded: boolean;
};
