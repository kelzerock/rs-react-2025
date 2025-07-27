import { useCallback, useEffect, useMemo, useState } from "react";
import type { StateAppComponent } from "../../models/types/stateAppComponent";
import { requestAPI } from "../../utils/requestAPI";
import { isResponse } from "../../utils/checkFn/isResponse";
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
import { useLS } from "../../hooks/useLS";

export const HomePage = () => {
  const [state, setState] = useState<StateAppComponent>({
    characters: [],
    isLoading: false,
    inputSearch: "",
    isError: false,
    responseStatus: null,
    page: null,
    isInitialLoaded: false,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [savedSearch, setSavedSearch] = useLS(LocalStorageKey.inputData, "");

  const page = searchParams.get(Query.PAGE);
  const renderCharacter = useMemo(() => state.characters, [state.characters]);

  const handleSearchInputChange = (value: string): void => {
    setState({ ...state, inputSearch: value });
    setSavedSearch(value);
    const newParams = new URLSearchParams();
    newParams.set(Query.PAGE, "1");
    setSearchParams(newParams);
  };

  const requestToApi = useCallback(
    async ({
      search = null,
      queries = null,
    }: {
      search?: string | null;
      queries?: URLSearchParams | null;
    }): Promise<void> => {
      try {
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

        if (isResponse(data)) {
          console.log({ data });
          setState((prev) => ({
            ...prev,
            characters: data.characters,
            page: data.page,
            isLoading: false,
          }));
        } else {
          setState((prev) => ({
            ...prev,
            characters: [],
            page: null,
            isLoading: false,
          }));
        }
      } catch (error) {
        console.error("Ошибка загрузки:", error);
        setState((prev) => ({
          ...prev,
          characters: [],
          page: null,
          isLoading: false,
        }));
      }
    },
    [state.inputSearch],
  );

  useEffect(() => {
    const page = searchParams.get(Query.PAGE);
    const details = searchParams.get(Query.DETAILS);
    const newParams = new URLSearchParams();

    if (page) {
      newParams.set(Query.PAGE, page);
    } else {
      newParams.set(Query.PAGE, "1");
    }

    if (details) {
      newParams.set(Query.DETAILS, details);
    }
    setSearchParams(newParams);
    setState((prev) => ({
      ...prev,
      inputSearch: savedSearch,
      isInitialLoaded: true,
    }));
  }, []);

  useEffect(() => {
    if (!state.isInitialLoaded) return;
    const newParams = new URLSearchParams(searchParams);
    if (page) {
      console.log({ state });
      newParams.set(RequestQuery.PAGE, String(parseInt(page) - 1));
      requestToApi({ queries: newParams, search: state.inputSearch });
    } else {
      console.log("=(");
    }
  }, [state.inputSearch, page, requestToApi]);

  const { isLoading, isError, inputSearch, responseStatus } = state;
  const memoPaginationProps = useMemo(
    () => ({
      page: state.page,
      isLoading: state.isLoading,
    }),
    [state.page, state.isLoading],
  );

  return (
    <>
      <h1 className="p-4 text-4xl">StarTrek characters library:</h1>
      <Search
        onInputChange={handleSearchInputChange}
        isLoading={isLoading}
        initialValue={inputSearch}
      />
      {isError && <CrashComponent />}

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2 items-start grow">
        <ListOfCharacters characters={renderCharacter} isLoading={isLoading} />
        <CharacterInfo />
      </div>
      <PaginationSection {...memoPaginationProps} />

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
