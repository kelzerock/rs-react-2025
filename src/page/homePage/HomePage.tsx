import { lazy, Suspense } from "react";
const TableCountries = lazy(() => import("../../components/TableCountries"));

const Loading = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="text-xl">Loading countries data...</div>
  </div>
);

export const HomePage = () => {
  return (
    <>
      <h1 className="p-4 text-4xl dark:text-stone-400" data-testid="test-main">
        React Performance
      </h1>
      <Suspense fallback={<Loading />}>
        <TableCountries />
      </Suspense>
    </>
  );
};
