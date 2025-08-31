import { lazy, Suspense } from "react";
const TableCountries = lazy(() => import("../../components/TableCountries"));

const Loading = () => <div className="w-full h-full">Loading ...</div>;

export const HomePage = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <h1
          className="p-4 text-4xl dark:text-stone-400"
          data-testid="test-main"
        >
          React Performance
        </h1>
        <TableCountries />
      </Suspense>
    </>
  );
};
