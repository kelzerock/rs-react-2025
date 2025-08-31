import { use, useEffect, useState, useMemo, useCallback } from "react";
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
import type { Country } from "../models/types/country";
import { SortingPanel } from "./SortingPanel";

let countriesPromise: Promise<Countries> | null = null;

const fetchCountriesData = () => {
  if (!countriesPromise) {
    countriesPromise = fetch(
      // "https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json",
      "data.json",
    ).then((response) => {
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
  const [sortingPanelTitle, setSortingPanelTitle] = useState<{
    title: string;
    direction: "asc" | "desc";
  }>({ title: "", direction: "asc" });
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

  const additionalCols = useMemo(() => {
    return Object.values(moreInfoSet).filter(Boolean).length;
  }, [moreInfoSet]);

  const gridTemplateColumns = useMemo(() => {
    return {
      gridTemplateColumns: `repeat(${6 + additionalCols}, minmax(0, 1fr))`,
    };
  }, [additionalCols]);

  const filteredCountriesMemo = useMemo(() => {
    if (!countries || countryChoice.trim() === "") {
      return countries;
    }

    const searchValue = countryChoice.trim();
    return Object.fromEntries(
      Object.entries(countries).filter(([country]) =>
        country.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    );
  }, [countries, countryChoice]);

  const activeAdditionalCols = useMemo(() => {
    return Object.entries(moreInfoSet).filter(([, value]) => value);
  }, [moreInfoSet]);

  useEffect(() => {
    if (countries && countriesName.length === 0) {
      const mappedCountries = Object.keys(countries);
      dispatch(addCountriesName(mappedCountries));
    }
  }, [countries, countriesName, dispatch]);

  useEffect(() => {
    setFilteredCountries(countries);
  }, [countries]);

  useEffect(() => {
    setFilteredCountries(filteredCountriesMemo);
  }, [filteredCountriesMemo]);

  const handleSearchCountry = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCountryChoice(e.target.value);
    },
    [],
  );

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  const handleChangeYear = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newYear = Number(e.target.value);
      setYear({ choice: newYear, dateTime: new Date().getTime() });

      setHighlightedRows(true);

      setTimeout(() => {
        setHighlightedRows(false);
      }, 1000);
    },
    [],
  );

  const handleClickSortButton = useCallback(
    (
      target: string,
      direction: "asc" | "desc",
      typeData: "number" | "string",
    ) => {
      if (!filteredCountries) return;

      const sortedCountries = Object.entries(filteredCountries).sort((a, b) => {
        if (target === "country") {
          const aValue = a[0];
          const bValue = b[0];
          return direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (target === "iso_code") {
          const aValue = a[1]?.iso_code ?? "";
          const bValue = b[1]?.iso_code ?? "";
          return direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        const getValue = (
          countryData: Country,
          typeData: "number" | "string",
        ) => {
          const data = countryData?.data?.find((d) => d?.year === year.choice);
          if (!data) return typeData === "number" ? 0 : "";
          return (
            data[target as keyof typeof data] ??
            (typeData === "number" ? 0 : "")
          );
        };

        const aValue = getValue(a[1], typeData);
        const bValue = getValue(b[1], typeData);

        if (
          typeData === "number" &&
          typeof aValue === "number" &&
          typeof bValue === "number"
        ) {
          return direction === "asc" ? aValue - bValue : bValue - aValue;
        }
        if (
          typeData === "string" &&
          typeof aValue === "string" &&
          typeof bValue === "string"
        ) {
          return direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        return 0;
      });
      setFilteredCountries(Object.fromEntries(sortedCountries));
    },
    [filteredCountries, year.choice],
  );

  const handleSetSortingPanelTitle = useCallback(
    (value: { title: string; direction: "asc" | "desc" }) => {
      setSortingPanelTitle(value);
    },
    [],
  );

  if (!countries) {
    return <CountriesDataLoader />;
  }

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
          className={`grid border-b border-stone-400 sticky top-0 bg-stone-300`}
          style={gridTemplateColumns}
        >
          <div className="col-span-1 flex flex-col gap-1 items-center p-0.5">
            <div className="flex gap-1 items-center justify-evenly">
              <label htmlFor="countries-name-input">Country</label>
              <SortingPanel
                handleClickSortButton={handleClickSortButton}
                title="country"
                typeData="string"
                sortingPanelTitle={sortingPanelTitle}
                setSortingPanelTitle={handleSetSortingPanelTitle}
              />
            </div>
            <input
              className="w-full border border-stone-400 rounded-md p-1 focus:outline-none"
              type="text"
              list="countries-name-datalist"
              id="countries-name-input"
              value={countryChoice}
              onChange={handleSearchCountry}
            />
            <datalist id="countries-name-datalist">
              {countriesName.map((country) => (
                <option value={country} key={country}>
                  {country}
                </option>
              ))}
            </datalist>
          </div>
          <div className="col-span-1 flex gap-1 items-center justify-evenly">
            iso_code
            <SortingPanel
              handleClickSortButton={handleClickSortButton}
              title="iso_code"
              typeData="string"
              sortingPanelTitle={sortingPanelTitle}
              setSortingPanelTitle={handleSetSortingPanelTitle}
            />
          </div>
          <div className="col-span-1 flex gap-1 items-center justify-evenly">
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
          </div>
          <div className="col-span-1 flex gap-1 items-center justify-evenly">
            population
            <SortingPanel
              handleClickSortButton={handleClickSortButton}
              title="population"
              typeData="number"
              sortingPanelTitle={sortingPanelTitle}
              setSortingPanelTitle={handleSetSortingPanelTitle}
            />
          </div>
          <div className="col-span-1 flex gap-1 items-center justify-evenly">
            co2
            <SortingPanel
              handleClickSortButton={handleClickSortButton}
              title="co2"
              typeData="number"
              sortingPanelTitle={sortingPanelTitle}
              setSortingPanelTitle={handleSetSortingPanelTitle}
            />
          </div>
          <div className="col-span-1 flex gap-1 items-center justify-evenly">
            co2_per_capita
            <SortingPanel
              handleClickSortButton={handleClickSortButton}
              title="co2_per_capita"
              typeData="number"
              sortingPanelTitle={sortingPanelTitle}
              setSortingPanelTitle={handleSetSortingPanelTitle}
            />
          </div>
          {additionalCols > 0 &&
            activeAdditionalCols.map(
              ([key, value]) =>
                value && (
                  <div
                    className="col-span-1 flex gap-1 items-center justify-evenly"
                    key={key}
                  >
                    {key}
                    <SortingPanel
                      handleClickSortButton={handleClickSortButton}
                      title={key}
                      typeData="number"
                      sortingPanelTitle={sortingPanelTitle}
                      setSortingPanelTitle={handleSetSortingPanelTitle}
                    />
                  </div>
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
