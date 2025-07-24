import { useSearchParams } from "react-router";
import type { StateAppComponent } from "../models/types/stateAppComponent";
import { Query } from "../models/enums/query";

export const PaginationSection = ({ state }: { state: StateAppComponent }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  if (!state.page) return;
  const { pageNumber, totalPages, firstPage, lastPage } = state.page;
  const OFFSET = 1;

  const changeUrlPage = (page: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(Query.PAGE, page);
    setSearchParams(params);
  };

  const handlePrevButton = () => {
    changeUrlPage(String(pageNumber + 1 - 1));
  };
  const handleNextButton = () => {
    changeUrlPage(String(pageNumber + 1 + 1));
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
