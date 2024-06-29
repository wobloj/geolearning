import React, { useState, useEffect } from "react";

export default function CountryDataTable(props) {
  const { ccn3, countryData, countryName } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [correctCountryData, setCorrectCountryData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await findCorrectCountryData(ccn3, countryData);
      setCorrectCountryData(data);
      setIsLoading(false);
    };
    fetchData();
  }, [ccn3, countryData]);

  const findCorrectCountryData = async (ccn3, countryData) => {
    for (const data of countryData) {
      if (data.ccn3 === ccn3) {
        return {
          flag: data.flags.png,
          flag_alt: data.flags.alt,
          capital: data.capital,
          population: data.population
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, " "),
          area: data.area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
          currency: data.currencies[0],
        };
      }
    }
    return null;
  };

  return (
    <div className="w-2/5 border-2 border-black bg-white">
      <p className="text-center text-4xl py-10">Dane</p>
      {isLoading ? (
        <div className="text-center text-lg py-10">Loading...</div>
      ) : correctCountryData ? (
        <div className="flex flex-col gap-3 text-lg px-8">
          <img
            className="border border-black m-auto mb-8"
            src={correctCountryData.flag}
            alt={correctCountryData.flag_alt}
          />
          <p>
            Nazwa państwa: <span className="font-bold">{countryName}</span>
          </p>
          <p>
            Stolica:{" "}
            <span className="font-bold">{correctCountryData.capital}</span>
          </p>
          <p>
            Liczebność państwa:{" "}
            <span className="font-bold">{correctCountryData.population}</span>
          </p>
          <p>
            Powierzchnia państwa:{" "}
            <span className="font-bold">
              {correctCountryData.area} km<sup>2</sup>
            </span>
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
