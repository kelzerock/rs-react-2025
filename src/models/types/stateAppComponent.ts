import type { MainCharacter } from "./mainCharacter";

export type StateAppComponent = {
  characters: MainCharacter[];
  isLoading: boolean;
  inputSearch: string;
};
