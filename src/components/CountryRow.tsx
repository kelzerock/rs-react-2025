import { useState } from "react";
import type { Country } from "../models/types/country";

export const CountryRow = ({
  country,
  infoCountry,
  year,
  moreInfoSet,
}: {
  country: string;
  infoCountry: Country;
  year: number;
  moreInfoSet: {
    cement_co2: boolean;
    cement_co2_per_capita: boolean;
    gas_co2: boolean;
  };
}) => {
  const [infoCountryData] = useState(infoCountry);
  const selectedYearData = infoCountryData.data?.find(
    (data) => data?.year === year,
  );

  const additionalCols = Object.values(moreInfoSet).filter(Boolean).length;

  return (
    <div
      className={`col-span-full grid dark:text-white`}
      style={{
        gridTemplateColumns: `repeat(${6 + additionalCols}, minmax(0, 1fr))`,
      }}
      key={country}
    >
      <span className="col-span-1">{country}</span>
      <span className="col-span-1">{infoCountry?.iso_code ?? "N/A"}</span>
      <span className="col-span-1">
        {selectedYearData ? selectedYearData.year : "N/A"}
      </span>
      <span className="col-span-1">
        {selectedYearData && selectedYearData.population
          ? selectedYearData.population.toFixed(0)
          : "N/A"}
      </span>
      <span className="col-span-1">
        {selectedYearData && selectedYearData.co2
          ? selectedYearData.co2.toFixed(4)
          : "N/A"}
      </span>
      <span className="col-span-1">
        {selectedYearData && selectedYearData.co2_per_capita
          ? selectedYearData.co2_per_capita.toFixed(4)
          : "N/A"}
      </span>
      {additionalCols > 0 &&
        Object.entries(moreInfoSet).map(
          ([key, value]) =>
            value && (
              <span className="col-span-1" key={key}>
                {selectedYearData &&
                selectedYearData[key as keyof typeof selectedYearData]
                  ? selectedYearData[
                      key as keyof typeof selectedYearData
                    ]?.toFixed(4)
                  : "N/A"}
              </span>
            ),
        )}
    </div>
  );
};
