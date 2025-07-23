import { useSearchParams } from "react-router";
import { Methods } from "../models/enums/methods";
import type { StateAppComponent } from "../models/types/stateAppComponent";
import { isResponse } from "../utils/checkFn/isResponse";
import { requestAPI } from "../utils/requestAPI";

export const PaginationSection = ({
  state,
  setState,
}: {
  state: StateAppComponent;
  setState: React.Dispatch<React.SetStateAction<StateAppComponent>>;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  if (!state.page) return;
  const { pageNumber, totalPages, firstPage, lastPage } = state.page;
  const OFFSET = 1;

  const requestToAPI = async (page: number) => {
    try {
      setState((prev) => ({
        ...prev,
        responseStatus: null,
        isLoading: true,
      }));
      const response = await requestAPI({
        body: { name: state.inputSearch },
        method: Methods.POST,
        path: "/search",
        queries: { pageNumber: page },
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
        const details = searchParams.get("details");
        const params = new URLSearchParams();

        params.set("page", String(data.page.pageNumber + 1));

        if (details) {
          params.set("details", details);
        }

        setSearchParams(params);
      } else {
        setState((prev) => ({ ...prev, characters: [], isLoading: false }));
        if (searchParams.has("page")) {
          searchParams.delete("page");
          setSearchParams(searchParams);
        }
      }
    } catch (error) {
      console.error("Ошибка загрузки:", error);
      setState((prev) => ({ ...prev, characters: [], isLoading: false }));
    }
  };

  const handlePrevButton = async () => {
    await requestToAPI(pageNumber - 1);
  };
  const handleNextButton = async () => {
    await requestToAPI(pageNumber + 1);
  };
  return (
    <div className="bg-stone-50 p-2 flex flex-col justify-center gap-1 items-center rounded-xl">
      <div className="flex gap-1">
        <button
          onClick={handlePrevButton}
          disabled={firstPage}
          className="text-md font-bold bg-stone-300 rounded-md py-1 px-5 hover:bg-stone-700 hover:text-stone-200 transition-colors duration-500 capitalize hover:cursor-pointer disabled:bg-stone-100 disabled:text-stone-500 disabled:cursor-auto"
        >
          Prev
        </button>
        <span className="text-md font-bold bg-stone-200 rounded-md py-1 px-5 capitalize text-stone-600">
          {pageNumber + OFFSET}
        </span>
        <button
          disabled={lastPage}
          onClick={handleNextButton}
          className="text-md font-bold bg-stone-300 rounded-md py-1 px-5 hover:bg-stone-700 hover:text-stone-200 transition-colors duration-500 capitalize hover:cursor-pointer disabled:bg-stone-100 disabled:text-stone-500 disabled:cursor-auto"
        >
          Next
        </button>
      </div>
      <span>Total page: {totalPages}</span>
    </div>
  );
};
