import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCountries, selectCountries } from "../store/countriesSlice";
import type { Countries } from "../models/types/countries";
import { CountryRow } from "./CountryRow";
import { ModalMoreInfoSet } from "./ModalMoreInfoSet";
import { selectYears } from "../store/yearsSlice";
import {
  addCountriesName,
  selectCountriesName,
} from "../store/countriesNameSlice";

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
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [moreInfoSet, setMoreInfoSet] = useState({
    cement_co2: false,
    cement_co2_per_capita: false,
    gas_co2: false,
  });
  const [countryChoice, setCountryChoice] = useState("");
  const [year, setYear] = useState({
    choice: 2023,
    dateTime: new Date().getTime(),
  });
  const [highlightedRows, setHighlightedRows] = useState<boolean>(false);

  const years = useSelector(selectYears);
  const countries = useSelector(selectCountries);
  const [filteredCountries, setFilteredCountries] = useState<Countries | null>(
    countries,
  );
  const countriesName = useSelector(selectCountriesName);
  console.log({ countriesName });

  useEffect(() => {
    if (countries && countriesName.length === 0) {
      const mappedCountries = Object.keys(countries);
      dispatch(addCountriesName(mappedCountries));
    }
  }, [countries, countriesName, dispatch]);

  useEffect(() => {
    setFilteredCountries(countries);
  }, [countries]);

  const handleSearchCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.trim();
    setCountryChoice(e.target.value);

    if (searchValue === "") {
      setFilteredCountries(countries);
      return;
    }

    const filtered = Object.fromEntries(
      Object.entries(countries ?? {}).filter(([country]) =>
        country.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    );
    setFilteredCountries(filtered);
  };

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
      <div className="flex flex-col gap-1 w-full">
        <div
          className={`grid grid-cols-${Math.min(6 + additionalCols, 16)} border-b border-stone-400 sticky top-0 bg-stone-300`}
        >
          <span className="col-span-1 flex flex-col gap-1 items-center p-0.5">
            <label htmlFor="countries-name">Country</label>
            <input
              className="w-full border border-stone-400 rounded-md p-1 focus:outline-none"
              type="text"
              list="countries-name"
              id="countries-name"
              value={countryChoice}
              onChange={(e) => handleSearchCountry(e)}
            />
            <datalist id="countries-name">
              {countriesName.map((country) => (
                <option value={country} key={country}>
                  {country}
                </option>
              ))}
            </datalist>
          </span>
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
        {filteredCountries &&
          Object.entries(filteredCountries).map(([country, infoCountry]) => (
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
