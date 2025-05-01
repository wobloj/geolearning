import { React, Suspense, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import Back from "../components/Back";
import axios from "axios";
import Loading from "../components/Loading";
import { translateText } from "../api/translate";

export default function CountryInfo() {
  const location = useLocation();
  const [country, setCountry] = useState(null);
  const [translatedData, setTranslatedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/all`);
        const countries = response.data;
        const filteredCountry = countries.find(
          (country) => country.ccn3 === location.state.ccn3
        );

        if (!filteredCountry) {
          setLoading(false);
          return;
        }

        setCountry(filteredCountry);

        const continent = filteredCountry.continents[0];
        const capital = filteredCountry.capital[0];
        const languages = Object.values(filteredCountry.languages || {});

        const [translatedContinent, translatedCapital, ...translatedLanguages] =
          await Promise.all([
            translateText(continent),
            translateText(capital),
            ...languages.map((lang) => translateText(lang)),
          ]);

        setTranslatedData({
          capital: translatedCapital,
          continent: translatedContinent,
          languages: translatedLanguages,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching country data:", error);
        setLoading(false);
      }
    };

    fetchCountryData();
  }, [location.state.ccn3]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="min-h-screen pb-20 relative">
        <Back to={"/countries"} />
        <h1 className="text-center text-5xl py-16 font-bold text-blue-400 drop-shadow-md">
          Informacje o kraju
        </h1>
        <Suspense fallback={<Loading />}>
          {country && (
            <div className="flex flex-row items-center justify-around gap-20 mx-40">
              <div className="max-w-[40rem]">
                <div className="flex flex-col self-start gap-5 text-xl">
                  <h2 className="text-4xl my-8 font-semibold text-blue-500">
                    {country.translations.pol.common}
                  </h2>
                  <h3>
                    Pełna nazwa państwa:{" "}
                    <span className="font-bold">
                      {country.translations.pol.official}
                    </span>
                  </h3>
                  <p>
                    Stolica:{" "}
                    <span className="font-bold">{translatedData.capital}</span>
                  </p>
                  <p>
                    Język obowiązujący:{" "}
                    <span className="font-bold">
                      {Object.values(translatedData.languages)
                        .map((language) => {
                          return language;
                        })
                        .join(", ")}
                    </span>
                  </p>
                  <p>
                    Kontynent:{" "}
                    <span className="font-bold">
                      {translatedData.continent}
                    </span>
                  </p>
                  <p>
                    Populacja:{" "}
                    <span className="font-bold">
                      {country.population
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                    </span>
                  </p>
                  <p>
                    Powierzchnia państwa:{" "}
                    <span className="font-bold">
                      {country.area
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                      km<sup>2</sup>
                    </span>
                  </p>
                  <p>
                    Waluta:{" "}
                    <span className="font-bold">
                      {Object.values(country.currencies)
                        .map(
                          (currency) => `${currency.name} (${currency.symbol})`
                        )
                        .join(", ")}
                    </span>
                  </p>
                  <p>
                    Strefa czasowa:{" "}
                    <span className="font-bold">
                      {country.timezones.join(", ")}
                    </span>
                  </p>
                  <p>
                    Początek tygodnia:{" "}
                    <span className="font-bold">
                      {country.startOfWeek === "monday"
                        ? "Poniedziałek"
                        : "Niedziela"}
                    </span>
                  </p>
                  <p>
                    Obowiązujące domeny:{" "}
                    <span className="font-bold">
                      {Object.values(country.tld).join(" ")}
                    </span>
                  </p>
                  <p className=" my-5">
                    Wyświetl państwo na mapie:{" "}
                    <a
                      href={country.maps.googleMaps}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 font-bold hover:text-blue-700"
                    >
                      Przejdź do mapy <FontAwesomeIcon icon={faLink} />
                    </a>
                  </p>
                </div>
              </div>
              <div>
                <img
                  className=" shadow-lg max-h-72"
                  src={country.flags.png}
                  alt={country.flags.alt}
                />
                <p className="text-center my-4 text-xl font-semibold">
                  Flaga państwa
                </p>
              </div>
              <div>
                <img
                  className="max-h-72"
                  src={country.coatOfArms.png}
                  alt={country.coatOfArms.alt}
                />
                <p className="text-center my-4 text-xl font-semibold">
                  Godło państwa
                </p>
              </div>
            </div>
          )}
        </Suspense>
      </div>
    </>
  );
}
