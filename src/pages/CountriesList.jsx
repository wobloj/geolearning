import { React, Suspense, useEffect, useState } from "react";
import Header from "../components/Header";
import Loading from "../components/Loading";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function CountriesList() {
  const [countriesByContinent, setCountriesByContinent] = useState({});
  const [filteredCountries, setFilteredCountries] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const handleContinentName = (continent) => {
    switch (continent) {
      case "Europe":
        return "Europa";
      case "Africa":
        return "Afryka";
      case "Asia":
        return "Azja";
      case "Americas":
        return "Ameryka Północna i Południowa";
      case "Oceania":
        return "Oceania";
      default:
        return continent;
    }
  };

  const findCountry = (text) => {
    if (text === "") {
      setFilteredCountries(countriesByContinent);
      return;
    }

    const filtered = Object.keys(countriesByContinent).reduce(
      (acc, continent) => {
        acc[continent] = countriesByContinent[continent].filter((country) =>
          country.translations.pol.common
            .toLowerCase()
            .includes(text.toLowerCase())
        );
        return acc;
      },
      {}
    );

    setFilteredCountries(filtered);
  };

  useEffect(() => {
    document.title = "Geolearn - Lista krajów";
    axios
      .get("https://restcountries.com/v3.1/all?independent=true")
      .then((response) => {
        const countries = response.data;

        const continents = ["Europe", "Africa", "Asia", "Americas", "Oceania"];
        const groupedCountries = continents.reduce((acc, continent) => {
          acc[continent] = countries.filter(
            (country) => country.region === continent
          );
          return acc;
        }, {});

        setCountriesByContinent(groupedCountries);
        setFilteredCountries(groupedCountries);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="bg-default min-h-screen pb-20 font-monts">
        <Header />
        <div className="flex flex-col items-center ">
          <Suspense fallback={<Loading />}>
            <label className="mt-5 font-semibold" htmlFor="search">
              Wyszukaj państwo
            </label>
            <input
              type="text"
              name="search"
              id="search"
              className="border-2 border-blue-400 outline-none text-xl h-10"
              onChange={(e) => findCountry(e.target.value)}
            />
            {Object.keys(filteredCountries).map((continent) => (
              <div key={continent}>
                <h2 className="flex justify-center my-20 text-4xl">
                  {handleContinentName(continent)}
                </h2>
                <div className="grid grid-cols-5 gap-24 mx-20">
                  {filteredCountries[continent].map((data, index) => (
                    <NavLink
                      to={`/country/${data.cca3}`}
                      state={{ ccn3: data.ccn3 }}
                      className="flex flex-col items-center gap-2 cursor-pointer group"
                      key={index}
                    >
                      <img
                        className={`h-32 ${
                          data.translations.pol.common === "Nepal"
                            ? ""
                            : "border-[1px] border-black"
                        }`}
                        src={`${data.flags.png}`}
                        alt={`${data.flags.alt}`}
                      />
                      <p className="text-center font-semibold group-hover:text-blue-500">
                        {data.translations.pol.common.toUpperCase()}
                      </p>
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </Suspense>
        </div>
      </div>
    </>
  );
}
