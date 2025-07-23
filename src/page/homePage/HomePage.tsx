import { useCallback, useEffect, useMemo, useState } from "react";
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
import { PaginationSection } from "../../components/Pagination";
import { useSearchParams } from "react-router";
import { Query } from "../../models/enums/query";
import { RequestQuery } from "../../models/enums/requestQuery";

export const HomePage = () => {
  const [state, setState] = useState<StateAppComponent>({
    characters: [],
    isLoading: false,
    inputSearch: "",
    isError: false,
    responseStatus: null,
    page: null,
  });
  const [searchParams] = useSearchParams();

  const renderCharacter = useMemo(() => state.characters, [state.characters]);

  const handleSearchInputChange = (value: string): void => {
    setState({ ...state, inputSearch: value });
  };

  const requestToApi = useCallback(
    async (search: string | null = null): Promise<void> => {
      try {
        const queries = new URLSearchParams();
        const page = searchParams.get(Query.PAGE);

        if (page) {
          const correctPage = String(parseFloat(page) - 1);
          queries.set(RequestQuery.PAGE, correctPage);
        }
        setState((prev) => ({
          ...prev,
          responseStatus: null,
          isLoading: true,
        }));
        const response = await requestAPI({
          body: { name: search || state.inputSearch },
          method: Methods.POST,
          path: "/search",
          queries,
        });

        if (response.status >= 400) {
          setState((prev) => ({ ...prev, responseStatus: response.status }));
        }
        if (!response.ok) return;

        const data = await response.json();
        console.log({ data });

        if (isResponse(data)) {
          setState((prev) => ({
            ...prev,
            characters: data.characters,
            page: data.page,
            isLoading: false,
          }));
        } else {
          setState((prev) => ({ ...prev, characters: [], isLoading: false }));
        }
      } catch (error) {
        console.error("Ошибка загрузки:", error);
        setState((prev) => ({ ...prev, characters: [], isLoading: false }));
      }
    },
    [state.inputSearch],
  );

  useEffect(() => {
    const savedSearch = loadDataFromLocalStorage(LocalStorageKey.inputData);
    const searchQuery = savedSearch ? String(savedSearch) : "";
    setState((prev) => ({ ...prev, inputSearch: searchQuery }));
    requestToApi(searchQuery);
  }, [state.inputSearch, requestToApi]);

  const { isLoading, isError, inputSearch, responseStatus } = state;

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
        <>
          <div className="flex gap-2 items-start">
            <ListOfCharacters characters={renderCharacter} />
            <CharacterInfo />
          </div>
          <PaginationSection state={state} setState={setState} />
        </>
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
