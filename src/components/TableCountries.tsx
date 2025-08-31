import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCountries, selectCountries } from "../store/countriesSlice";

const TableCountries = () => {
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);
  console.log({ countries });
  useEffect(() => {
    if (countries) return;

    const fetchDataCo = async () => {
      const response = await fetch(
        "data.json",
        // "https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json"
      );
      if (!response.ok) {
        console.log("fetch failed!");
        return;
      }
      const data = await response.json();
      dispatch(addCountries(data));
    };

    fetchDataCo();
  }, [countries]);
  return (
    <>
      <div>TableCountries</div>
      <div className="flex flex-col gap-1 w-full">
        <div className="col-span-full grid grid-cols-6 ">
          <span className="col-span-1">Country</span>
          <span className="col-span-1">iso_code</span>
          <span className="col-span-1">year</span>
          <span className="col-span-1">population</span>
          <span className="col-span-1">co2</span>
          <span className="col-span-1">co2_per_capita</span>
        </div>
        {countries &&
          Object.entries(countries).map(([country, infoCountry]) => (
            <div className="col-span-full grid grid-cols-6 " key={country}>
              <span className="col-span-1">{country}</span>
              <span className="col-span-1">
                {infoCountry.iso_code ?? "N/A"}
              </span>
              <span className="col-span-1">
                {infoCountry.data[0].year ?? "N/A"}
              </span>
              <span className="col-span-1">
                {infoCountry.data[0].population ?? "N/A"}
              </span>
              <span className="col-span-1">
                {infoCountry.data[0].co2 ?? "N/A"}
              </span>
              <span className="col-span-1">
                {infoCountry.data[0].co2_per_capita ?? "N/A"}
              </span>
            </div>
          ))}
      </div>
    </>
  );
};

export default TableCountries;
