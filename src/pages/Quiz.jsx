import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlagUsa,
  faLocationDot,
  faMapPin,
} from "@fortawesome/free-solid-svg-icons";

import QuizTypeMap from "../components/quizTypes/QuizTypeMap";
import QuizTypeClosed from "../components/quizTypes/QuizTypeClosed";
import QuizTypeOpen from "../components/quizTypes/QuizTypeOpen";
import Loading from "../components/Loading";
import Back from "../components/Back";
import ButtonGreen from "../components/ButtonGreen";

export default function Quiz() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [icon, setIcon] = useState("");
  const [countryData, setCountryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState({});
  const [selectedMode, setSelectedMode] = useState("open");
  const [quantityOfQuestions, setQuantityOfQuestions] = useState(5);
  const [error, setError] = useState(null);

  const [regionApi, setRegionApi] = useState("");
  const [region, setRegion] = useState("");
  const [quizTypeText, setQuizTypeText] = useState("");

  const location = useLocation();

  const levelTitleState = location.state.levelTitle;
  const quizTypeState = location.state.typeQuiz;

  const setupQuiz = useCallback(() => {
    const regionMapping = {
      Europa: { api: "europe", region: "europe" },
      "Ameryka Północna": { api: "north america", region: "north_america" },
      "Ameryka Południowa": { api: "south america", region: "south_america" },
      Afryka: { api: "africa", region: "africa" },
      Azja: { api: "asia", region: "asia" },
      Oceania: { api: "oceania", region: "oceania" },
      Świat: { api: "world", region: "world" },
    };

    const quizTypeMapping = {
      flags: {
        text: (
          <p className="font-medium text-xl">
            Wybór państwa na podstawie{" "}
            <span className="font-bold text-blue-600">flagi</span>
          </p>
        ),
        icon: <FontAwesomeIcon className="text-[48px]" icon={faFlagUsa} />,
      },
      country: {
        text: (
          <p className="font-medium text-xl">
            Wybór państwa na podstawie{" "}
            <span className="font-bold text-blue-600">nazwy państwa</span>
          </p>
        ),
        icon: <FontAwesomeIcon className="text-[48px]" icon={faLocationDot} />,
      },
      capital: {
        text: (
          <p className="font-medium text-xl">
            Wybór państwa na podstawie{" "}
            <span className="font-bold text-blue-600">stolicy kraju</span>
          </p>
        ),
        icon: <FontAwesomeIcon className="text-[48px]" icon={faMapPin} />,
      },
    };

    const regionData = regionMapping[levelTitleState] || regionMapping["Świat"];
    setRegionApi(regionData.api);
    setRegion(regionData.region);

    const quizTypeData = quizTypeMapping[quizTypeState] || {
      text: "",
      icon: "",
    };
    setQuizTypeText(quizTypeData.text);
    setIcon(quizTypeData.icon);
  }, [levelTitleState, quizTypeState]);

  const apiUrl =
    regionApi === "world"
      ? "https://restcountries.com/v3.1/all?fields=translations,flags,independent,capital,ccn3"
      : `https://restcountries.com/v3.1/region/${regionApi}?fields=translations,flags,independent,capital,ccn3`;

  useEffect(() => {
    setupQuiz();
  }, [setupQuiz]);

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
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setError("Something went wrong");
          setIsLoading(false);
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

  const generateQuestions = () => {
    let generatedNumbers = [];
    let generatedData = [];
    const maxAttempts = countryData.length * 2; // Dodaj zabezpieczenie przed pętlą

    for (let i = 0; i < quantityOfQuestions; i++) {
      let attempts = 0;
      let generateNumber;

      do {
        generateNumber = Math.floor(Math.random() * countryData.length);
        attempts++;
        if (attempts > maxAttempts) {
          setError("Not enough unique countries available");
          return;
        }
      } while (generatedNumbers.includes(generateNumber));

      generatedNumbers.push(generateNumber);
      generatedData.push(countryData[generateNumber]);
    }
    setQuestions(generatedData);
  };

  const handleStartQuiz = async () => {
    if (!countryData) {
      setError("No country data available");
      return;
    }
    setIsLoading(true);
    await generateQuestions();
    setIsLoading(false);
    setStartQuiz(true);
  };

  return (
    <div className="flex items-center flex-col h-screen relative">
      <Back to={`/`} />

      {!startQuiz ? (
        <div className="flex flex-col gap-5 items-center justify-center h-screen">
          <h1 className="text-6xl mb-8 font-semibold text-blue-800">
            {levelTitleState}
          </h1>
          {quizTypeText}
          <p className="mb-20 text-blue-400">{icon}</p>
          <div className="flex justify-start flex-col w-full items-center max-w-64">
            <label className="font-semibold" htmlFor="quiz">
              Typ quizu
            </label>
            <select
              id="quiz"
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
              id="difficulty"
              className="border border-blue-500 cursor-pointer py-2 w-full"
              name="difficulty"
              onChange={handleDifficultyChange}
            >
              <option value="easy">Łatwy(5 pytań)</option>
              <option value="medium">Średni(10 pytań)</option>
              <option value="hard">Trudny(20 pytań)</option>
            </select>
          </div>

          <ButtonGreen onClick={handleStartQuiz}>Start</ButtonGreen>
          {error && <p>{error}</p>}
        </div>
      ) : isLoading ? (
        <Loading />
      ) : selectedMode === "open" ? (
        <QuizTypeOpen
          data-testid="quiz-type-open"
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
          data-testid="quiz-type-map"
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
          data-testid="quiz-type-closed"
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
