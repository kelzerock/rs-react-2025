import { useEffect, useState } from "react";
import type { StateAppComponent } from "../../models/types/stateAppComponent";
import { requestAPI } from "../../utils/requestAPI";
import { isResponse } from "../../utils/checkFn/isResponse";
import { loadDataFromLocalStorage } from "../../utils/loadDataFromLocalStorage";
import { LocalStorageKey } from "../../models/enums/localStorageKey";
import { Search } from "../../components/Search";
import { CrashComponent } from "../../components/CrashComponent";
import { ListOfCharacters } from "../../components/ListOfCharacters";
import { CharacterInfo } from "../../components/CharacterInfo";
import { Methods } from "../../models/enums/methods";

export const HomePage = () => {
  const [state, setState] = useState<StateAppComponent>({
    characters: [],
    isLoading: false,
    inputSearch: "",
    isError: false,
    responseStatus: null,
  });

  const handleSearchInputChange = (value: string): void => {
    setState({ ...state, inputSearch: value });
  };

  const requestToApi = async (search: string | null = null): Promise<void> => {
    try {
      setState({ ...state, responseStatus: null, isLoading: true });
      const response = await requestAPI({
        body: { name: search || state.inputSearch },
        method: Methods.POST,
        path: "/search",
      });
      if (response.status >= 400) {
        setState({ ...state, responseStatus: response.status });
      }
      if (!response.ok) return;

      const data = await response.json();
      console.log({ data });
      if (isResponse(data)) {
        setState({ ...state, characters: data.characters, isLoading: false });
      } else {
        setState({ ...state, characters: [], isLoading: false });
      }
    } catch (error) {
      console.error("Ошибка загрузки:", error);
      setState({ ...state, characters: [], isLoading: false });
    }
  };

  useEffect(() => {
    const savedSearch = loadDataFromLocalStorage(LocalStorageKey.inputData);
    const searchQuery = savedSearch ? String(savedSearch) : "";
    setState((prev) => ({ ...prev, inputSearch: searchQuery }));
    requestToApi(searchQuery);
  }, [state.inputSearch]);

  const { characters, isLoading, isError, inputSearch, responseStatus } = state;

  return (
    <>
      <h1 className="p-4 text-4xl">StarTrek characters library:</h1>
      <Search
        onInputChange={handleSearchInputChange}
        isLoading={isLoading}
        initialValue={inputSearch}
      />
      {isError && <CrashComponent />}
      {isLoading ? (
        <p className="text-gray-500 text-xl" aria-label="Loading data...">
          Loading data...
        </p>
      ) : (
        <div className="flex gap-2 items-start">
          <ListOfCharacters characters={characters} />
          <CharacterInfo />
        </div>
      )}
      {responseStatus !== null && (
        <p
          className="text-red-600 text-sm font-medium mt-2"
          data-testid="error-message"
        >
          Error connecting to API. Status code: {responseStatus}
        </p>
      )}
    </>
  );
};
