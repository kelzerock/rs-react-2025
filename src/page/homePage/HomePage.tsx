import { lazy, Suspense, useEffect, useState } from "react";
const TableCountries = lazy(() => import("../../components/TableCountries"));

const Loading = () => {
  const [additionalDots, setAdditionalDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setAdditionalDots((prev) => {
        if (prev.length > 4) {
          return "";
        } else {
          return prev + ".";
        }
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <span className="text-xl relative dark:text-white">
        Loading countries data
        <span className="absolute left-1/1 top-1/2 -translate-y-1/2">
          {additionalDots}
        </span>
      </span>
    </div>
  );
};

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
