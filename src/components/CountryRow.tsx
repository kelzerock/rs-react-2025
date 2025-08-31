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
    (data) => data.year === year,
  );

  const additionalCols = Object.values(moreInfoSet).filter(Boolean).length;

  return (
    <div
      className={`col-span-full grid grid-cols-6 ${additionalCols > 0 ? `grid-cols-${6 + additionalCols}` : ""}`}
      key={country}
    >
      <span className="col-span-1">{country}</span>
      <span className="col-span-1">{infoCountry?.iso_code ?? "N/A"}</span>
      <span className="col-span-1">
        {selectedYearData ? selectedYearData.year : "N/A"}
      </span>
      <span className="col-span-1">
        {selectedYearData && selectedYearData.population
          ? selectedYearData.population
          : "N/A"}
      </span>
      <span className="col-span-1">
        {selectedYearData && selectedYearData.co2
          ? selectedYearData.co2
          : "N/A"}
      </span>
      <span className="col-span-1">
        {selectedYearData && selectedYearData.co2_per_capita
          ? selectedYearData.co2_per_capita
          : "N/A"}
      </span>
      {additionalCols > 0 &&
        Object.entries(moreInfoSet).map(
          ([key, value]) =>
            value && (
              <span className="col-span-1" key={key}>
                {selectedYearData
                  ? selectedYearData[key as keyof typeof selectedYearData]
                  : "N/A"}
              </span>
            ),
        )}
    </div>
  );
};
