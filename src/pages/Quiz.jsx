import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faFlagUsa,
  faLocationDot,
  faMapPin,
} from "@fortawesome/free-solid-svg-icons";

import QuizTypeMap from "../components/quizTypes/QuizTypeMap";
import QuizTypeClosed from "../components/quizTypes/QuizTypeClosed";
import QuizTypeOpen from "../components/quizTypes/QuizTypeOpen";
import Loading from "../components/Loading";

export default function Quiz() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [icon, setIcon] = useState("");
  const [countryData, setCountryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState({});
  const [selectedMode, setSelectedMode] = useState("open");
  const [quantityOfQuestions, setQuantityOfQuestions] = useState(5);

  const [regionApi, setRegionApi] = useState("");
  const [region, setRegion] = useState("");
  const [quizTypeText, setQuizTypeText] = useState("");

  const location = useLocation();

  const levelTitleState = location.state.levelTitle;
  const quizTypeState = location.state.typeQuiz;

  const setupQuiz = () => {
    switch (levelTitleState) {
      case "Europa":
        setRegionApi("europe");
        setRegion("europe");
        break;
      case "Ameryka Północna":
        setRegionApi("north america");
        setRegion("north_america");
        break;
      case "Ameryka Południowa":
        setRegionApi("south america");
        setRegion("south_america");
        break;
      case "Afryka":
        setRegionApi("africa");
        setRegion("africa");
        break;
      case "Azja":
        setRegionApi("asia");
        setRegion("asia");
        break;
      case "Oceania":
        setRegionApi("oceania");
        setRegion("oceania");
        break;
      case "Świat":
        setRegionApi("world");
        setRegion("world");
        break;
      default:
        setRegionApi("world");
        setRegion("world");
        break;
    }
    switch (quizTypeState) {
      case "flags":
        setQuizTypeText(
          <p className="font-medium text-xl">
            Wybór państwa na podstawie{" "}
            <span className="font-bold text-blue-600">flagi</span>
          </p>
        );
        setIcon(<FontAwesomeIcon className="text-[48px]" icon={faFlagUsa} />);
        break;
      case "country":
        setQuizTypeText(
          <p className="font-medium text-xl">
            Wybór państwa na podstawie{" "}
            <span className="font-bold text-blue-600">nazwy państwa</span>
          </p>
        );
        setIcon(
          <FontAwesomeIcon className="text-[48px]" icon={faLocationDot} />
        );
        break;
      case "capital":
        setQuizTypeText(
          <p className="font-medium text-xl">
            Wybór państwa na podstawie{" "}
            <span className="font-bold text-blue-600">stolicy kraju</span>
          </p>
        );
        setIcon(<FontAwesomeIcon className="text-[48px]" icon={faMapPin} />);
        break;
      default:
        setQuizTypeText("");
        break;
    }
  };

  const apiUrl =
    regionApi === "world"
      ? "https://restcountries.com/v3.1/all?fields=translations,flags,independent,capital,ccn3"
      : `https://restcountries.com/v3.1/region/${regionApi}?fields=translations,flags,independent,capital,ccn3`;

  useEffect(() => {
    setupQuiz();
  }, [levelTitleState]);

  useEffect(() => {
    if (region) {
      axios
        .get(apiUrl)
        .then((response) => {
          if (regionApi !== "north america") {
            const independentCountries = response.data.filter(
              (country) => country.independent === true
            );
            setCountryData(independentCountries);
          } else {
            setCountryData(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [regionApi]);

  const handleDifficultyChange = (e) => {
    const value = e.target.value;
    switch (value) {
      case "easy":
        setQuantityOfQuestions(5);
        break;
      case "medium":
        setQuantityOfQuestions(10);
        break;
      case "hard":
        setQuantityOfQuestions(20);
        break;
      default:
        setQuantityOfQuestions(5);
    }
  };

  const handleQuizMode = (e) => {
    setSelectedMode(e.target.value);
  };

  const generateQuestions = async () => {
    let generatedNumbers = [];
    let generatedData = [];

    for (let i = 0; i < quantityOfQuestions; i++) {
      let generateNumber = parseInt(
        Math.random() * (countryData.length - 0) + 0
      );

      if (generatedNumbers.includes(generateNumber)) {
        i--;
        continue;
      }

      generatedNumbers.push(generateNumber);
      generatedData.push(countryData[generateNumber]);
    }
    setQuestions(generatedData);
    console.log(generatedData);
  };

  const handleStartQuiz = async () => {
    setIsLoading(true);
    await generateQuestions();
    setIsLoading(false);
    setStartQuiz(true);
  };
  return (
    <div className="font-monts bg-default bg-blue-100 bg-opacity-5 flex items-center flex-col h-screen relative">
      <NavLink
        to={"/"}
        className="absolute left-5 top-5 flex justify-center items-center gap-2 transition-colors hover:text-red-700"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
        Powrót
      </NavLink>

      {!startQuiz ? (
        <div className="flex flex-col gap-5 items-center justify-center h-screen">
          <h1 className="text-6xl font-semibold text-blue-800">
            {levelTitleState}
          </h1>
          {quizTypeText}
          <p className="mb-20">{icon}</p>
          <div className="flex justify-start flex-col w-full items-center max-w-64">
            <label className="font-semibold" htmlFor="quiz">
              Typ quizu
            </label>
            <select
              className="border border-blue-500 cursor-pointer py-2 w-full"
              onChange={handleQuizMode}
              name="quiz"
            >
              <option value="open">Pytania otwarte</option>
              <option value="closed">Pytania zamknięte</option>
              <option value="map">Wybór państwa na mapie</option>
            </select>
          </div>
          <div className="flex justify-start flex-col w-full items-center max-w-64">
            <label className="font-semibold" htmlFor="difficulty">
              Poziom trudności
            </label>
            <select
              className="border border-blue-500 cursor-pointer py-2 w-full"
              name="difficulty"
              onChange={handleDifficultyChange}
            >
              <option value="easy">Łatwy(5 pytań)</option>
              <option value="medium">Średni(10 pytań)</option>
              <option value="hard">Trudny(20 pytań)</option>
            </select>
          </div>

          <button
            className="flex items-center justify-center font-medium mt-5 border-2 border-black rounded-[0.7rem] h-12 w-52 select-none transition-colors bg-white cursor-pointer hover:bg-blue-50 hover:border-blue-500 hover:text-blue-500"
            onClick={async () => {
              const response = await axios.get(apiUrl);
              console.log(response.data);
              handleStartQuiz();
            }}
          >
            Start
          </button>
        </div>
      ) : isLoading ? (
        <Loading />
      ) : selectedMode === "open" ? (
        <QuizTypeOpen
          quizType={quizTypeState}
          region={region}
          regionApi={regionApi}
          questions={questions}
          quantityOfQuestions={quantityOfQuestions}
          setStartQuiz={setStartQuiz}
          isStarted={true}
        />
      ) : selectedMode === "map" ? (
        <QuizTypeMap
          quizType={quizTypeState}
          region={region}
          regionApi={regionApi}
          questions={questions}
          quantityOfQuestions={quantityOfQuestions}
          setStartQuiz={setStartQuiz}
          isStarted={true}
        />
      ) : (
        <QuizTypeClosed
          quizType={quizTypeState}
          region={region}
          regionApi={regionApi}
          questions={questions}
          quantityOfQuestions={quantityOfQuestions}
          setStartQuiz={setStartQuiz}
          isStarted={true}
        />
      )}
    </div>
  );
}
