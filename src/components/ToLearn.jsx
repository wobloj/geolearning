import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function ToLearn({ toLearn }) {
  const [flipped, setFlipped] = useState(Array(toLearn.length).fill(false));
  const [listOfCountries, setListOfCountries] = useState([]);
  const [learnFrom, setLearnFrom] = useState("flag");
  const [learnTo, setLearnTo] = useState("country");
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha?codes=${toLearn.join(",")}`
        );
        const data = await response.json();
        setListOfCountries(data);
        console.log("Data fetched", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCountries();
  }, [toLearn]);

  const handleLeaningFrom = (e) => {
    const value = e.target.value;
    switch (value) {
      case "flag":
        if (learnTo === "flag") {
          break;
        }
        setLearnFrom("flag");
        break;
      case "country":
        if (learnTo === "country") {
          break;
        }
        setLearnFrom("country");
        break;
      case "capital":
        if (learnTo === "capital") {
          break;
        }
        setLearnFrom("capital");
        break;

      default:
        setLearnFrom("flag");
        break;
    }
  };

  const handleLeaningTo = (e) => {
    const value = e.target.value;
    switch (value) {
      case "flag":
        if (learnFrom === "flag") {
          break;
        }
        setLearnTo("flag");
        break;
      case "country":
        if (learnFrom === "country") {
          break;
        }
        setLearnTo("country");
        break;
      case "capital":
        if (learnFrom === "capital") {
          break;
        }
        setLearnTo("capital");
        break;

      default:
        setLearnTo("country");
        break;
    }
  };

  const handleClick = (index) => {
    setFlipped((prev) =>
      prev.map((state, i) => (i === index ? !state : state))
    );
  };

  return (
    <div>
      <div className="flex flex-row justify-center gap-12 mb-10">
        <select
          className="border border-blue-500 cursor-pointer py-2 w-full"
          name="quiz"
          onChange={handleLeaningFrom}
        >
          {learnTo !== "flag" && <option value="flag">Flaga</option>}
          {learnTo !== "country" && (
            <option value="country">Nazwa państwa</option>
          )}
          {learnTo !== "capital" && <option value="capital">Stolica</option>}
        </select>
        <select
          className="border border-blue-500 cursor-pointer py-2 w-full"
          name="quiz"
          onChange={handleLeaningTo}
        >
          {learnFrom !== "flag" && <option value="flag">Flaga</option>}
          {learnFrom !== "country" && (
            <option value="country">Nazwa państwa</option>
          )}
          {learnFrom !== "capital" && <option value="capital">Stolica</option>}
        </select>
      </div>
      <div className="grid grid-cols-3 gap-24">
        {listOfCountries.map((data, index) => {
          return (
            <div
              className="cursor-pointer perspective"
              key={index}
              onClick={() => handleClick(index)}
            >
              <div
                className={`relative preserve-3d transform ${
                  flipped[index] ? "rotate-y-180" : ""
                } transition-transform duration-500 mb-7`}
              >
                <div className="absolute backface-hidden w-full h-24 flex items-center justify-center rounded-lg bg-blue-400 text-xl">
                  {learnFrom === "flag" && (
                    <img
                      className="max-h-20"
                      src={data.flags.png}
                      alt={data.flags.alt}
                    />
                  )}
                  {learnFrom === "country" && (
                    <p>{data.translations.pol.common}</p>
                  )}
                  {learnFrom === "capital" && <p>{data.capital[0]}</p>}
                </div>
                <div className="absolute text-center backface-hidden rotate-y-180 w-full h-24 border-2 border-blue-400 bg-white rounded-lg flex flex-col items-center justify-around">
                  {learnTo === "flag" && (
                    <img
                      className="h-16 border-[1px] border-black"
                      src={data.flags.png}
                      alt={data.flags.alt}
                    />
                  )}
                  {learnTo === "country" && (
                    <div>
                      <p className="font-bold">Nazwa państwa</p>
                      <p>{data.translations.pol.common}</p>
                    </div>
                  )}
                  {learnTo === "capital" && (
                    <div>
                      <p className="font-bold">Stolica</p>
                      <p>{data.capital[0]}</p>
                    </div>
                  )}
                  <NavLink
                    to={`/country/${data.cca3}`}
                    state={{ ccn3: data.ccn3 }}
                    className="flex justify-center justify-self-end text-blue-400 hover:text-blue-800"
                  >
                    Dowiedz się wiecej
                  </NavLink>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
