import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import QuizGuessCountryOnMap from "../components/quizTypes/QuizGuessCountryOnMap";
import QuizGuessFlagClosed from "../components/quizTypes/QuizGuessFlagClosed";
import QuizGuessFlagOpen from "../components/quizTypes/QuizGuessFlagOpen";
import StartQuiz from "../components/StartQuiz";

export default function Quiz() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [countryData, setCountryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState({});
  const [selectedMode, setSelectedMode] = useState("open");
  const [quantityOfQuestions, setQuantityOfQuestions] = useState(5);

  useEffect(() => {
    axios
      .get(
        `https://restcountries.com/v3.1/region/europe?fields=translations,flags`
      )
      .then((data) => {
        setIsLoading(true);
        setCountryData(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
    console.log(e.target.value);
  };

  const generateQuestions = () => {
    let generatedNumbers = [];
    let generatedData = [];

    for (let i = 0; i < quantityOfQuestions; i++) {
      let generateNumber = parseInt(
        Math.random() * (countryData.length - 0) + 0
      );

      if (generatedNumbers.includes(generateNumber)) return;

      generatedNumbers.push(generateNumber);
      generatedData.push(countryData[generateNumber]);
    }
    setQuestions(generatedData);
    console.log(generatedData);
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

      {startQuiz && !isLoading ? (
        <>
          {selectedMode === "open" && (
            <QuizGuessFlagOpen
              questions={questions}
              quantityOfQuestions={quantityOfQuestions}
            />
          )}
          {selectedMode === "map" && (
            <QuizGuessCountryOnMap
              questions={questions}
              quantityOfQuestions={quantityOfQuestions}
            />
          )}
        </>
      ) : (
        <div className="flex flex-col gap-5 items-center justify-center h-screen">
          <div className="flex justify-start flex-col w-full">
            <label className="font-semibold" htmlFor="quiz">
              Typ quizu
            </label>
            <select
              className="border border-blue-500 cursor-pointer py-2"
              onChange={handleQuizMode}
              name="quiz"
            >
              <option value="open">Pytania otwarte</option>
              <option value="map">Wybór państwa na mapie</option>
            </select>
          </div>
          <div className="flex justify-start flex-col w-full">
            <label className="font-semibold" htmlFor="difficulty">
              Poziom trudności
            </label>
            <select
              className="border border-blue-500 cursor-pointer py-2"
              name="difficulty"
              onChange={handleDifficultyChange}
            >
              <option value="easy">Łatwy(5 pytań)</option>
              <option value="medium">Średni(10 pytań)</option>
              <option value="hard">Trudny(20 pytań)</option>
            </select>
          </div>

          <button
            className="py-5 px-14 text-xl font-semibold border-2 bg-green-500 border-green-600"
            onClick={() => {
              generateQuestions();
              setStartQuiz(true);
            }}
          >
            Start
          </button>
        </div>
      )}
    </div>
  );
}
