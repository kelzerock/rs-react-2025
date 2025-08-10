import { useSearchParams } from "react-router";
import { Query } from "../models/enums/query";
import { memo } from "react";
import type { Pagination } from "../models/types/pagination";

export const PaginationSection = memo(function PaginationSection({
  isLoading,
  page,
}: {
  isLoading: boolean;
  page: Pagination;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  if (!page) return;
  const { pageNumber, totalPages, firstPage, lastPage } = page;
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
    <div
      className="bg-stone-50 dark:bg-stone-700 p-2 flex flex-col justify-center gap-1 items-center rounded-xl"
      data-testid="wrapper"
    >
      <div className="flex gap-1">
        <button
          onClick={handlePrevButton}
          disabled={firstPage || isLoading}
          data-testid="prev"
          className="text-md font-bold bg-stone-300 rounded-md py-1 px-5 hover:bg-stone-700 hover:text-stone-200 transition-colors duration-500 capitalize hover:cursor-pointer disabled:bg-stone-100 disabled:text-stone-500 disabled:cursor-auto"
        >
          Prev
        </button>
        <span
          data-testid="page"
          className="text-md font-bold bg-stone-200 rounded-md py-1 px-5 capitalize text-stone-600"
        >
          {pageNumber + OFFSET}
        </span>
        <button
          disabled={lastPage || isLoading}
          data-testid="next"
          onClick={handleNextButton}
          className="text-md font-bold bg-stone-300 rounded-md py-1 px-5 hover:bg-stone-700 hover:text-stone-200 transition-colors duration-500 capitalize hover:cursor-pointer disabled:bg-stone-100 disabled:text-stone-500 disabled:cursor-auto"
        >
          Next
        </button>
      </div>
      <span className="dark:text-stone-200">Total page: {totalPages}</span>
    </div>
  );
});
