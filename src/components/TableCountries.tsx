import { use, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCountries, selectCountries } from "../store/countriesSlice";
import type { Countries } from "../models/types/countries";
import { CountryRow } from "./CountryRow";
import { ModalMoreInfoSet } from "./ModalMoreInfoSet";
import { selectYears } from "../store/yearsSlice";

let countriesPromise: Promise<Countries> | null = null;

const fetchCountriesData = () => {
  if (!countriesPromise) {
    countriesPromise = fetch("data.json").then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch countries data");
      }
      return response.json();
    });
  }
  return countriesPromise;
};

const CountriesDataLoader = () => {
  const dispatch = useDispatch();
  const data = use(fetchCountriesData());
  dispatch(addCountries(data));
  return null;
};

const TableCountries = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [moreInfoSet, setMoreInfoSet] = useState({
    cement_co2: false,
    cement_co2_per_capita: false,
    gas_co2: false,
  });
  const [year, setYear] = useState({
    choice: 2023,
    dateTime: new Date().getTime(),
  });
  const [highlightedRows, setHighlightedRows] = useState<boolean>(false);
  const years = useSelector(selectYears);
  const countries = useSelector(selectCountries);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleChangeYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = Number(e.target.value);
    setYear({ choice: newYear, dateTime: new Date().getTime() });

    setHighlightedRows(true);

    setTimeout(() => {
      setHighlightedRows(false);
    }, 1000);
  };

  if (!countries) {
    return <CountriesDataLoader />;
  }

  const additionalCols = Object.values(moreInfoSet).filter(Boolean).length;

  console.log({ countries });

  return (
    <>
      <div>TableCountries</div>
      <div className="relative">
        <button className="btn-form-open self-start" onClick={handleOpen}>
          Add more data
        </button>
        <ModalMoreInfoSet
          isOpen={isOpen}
          close={handleClose}
          moreInfoSet={moreInfoSet}
          setMoreInfoSet={setMoreInfoSet}
        />
      </div>
      <div className="flex flex-col gap-1 w-full overflow-x-hidden">
        <div
          className={`grid grid-cols-${Math.min(6 + additionalCols, 16)} border-b border-stone-400`}
        >
          <span className="col-span-1">Country</span>
          <span className="col-span-1">iso_code</span>
          <span className="col-span-1">
            <label htmlFor="year" className="flex gap-1">
              Year
              <select value={year.choice} onChange={handleChangeYear}>
                {years.map((year) => (
                  <option value={year} key={year}>
                    {year}
                  </option>
                ))}
              </select>
            </label>
          </span>
          <span className="col-span-1">population</span>
          <span className="col-span-1">co2</span>
          <span className="col-span-1">co2_per_capita</span>
          {additionalCols > 0 &&
            Object.entries(moreInfoSet).map(
              ([key, value]) =>
                value && (
                  <span className="col-span-1" key={key}>
                    {key}
                  </span>
                ),
            )}
        </div>
        {countries &&
          Object.entries(countries).map(([country, infoCountry]) => (
            <div
              key={country}
              className={`${highlightedRows ? "bg-emerald-200" : ""} transition-colors duration-300`}
            >
              <CountryRow
                country={country}
                infoCountry={infoCountry}
                year={year.choice}
                moreInfoSet={moreInfoSet}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default TableCountries;
