import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import QuizGuessCountryOnMap from "../components/quizTypes/QuizGuessCountryOnMap";
import QuizGuessFlagClosed from "../components/quizTypes/QuizGuessFlagClosed";
import QuizGuessFlagOpen from "../components/quizTypes/QuizGuessFlagOpen";

export default function Quiz() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [countryData, setCountryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState({});

  const quantityOfQuestions = 5;

  useEffect(() => {
    axios
      .get(
        `https://restcountries.com/v3.1/region/europe?fields=translations,flags`
      )
      .then((data) => {
        setCountryData(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const generateQuestions = () => {
    if (isLoading) return;

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
          {/* <QuizGuessFlagOpen
            questions={questions}
            quantityOfQuestions={quantityOfQuestions}
          /> */}
          <QuizGuessCountryOnMap
            questions={questions}
            quantityOfQuestions={quantityOfQuestions}
          />
        </>
      ) : (
        <div className="flex items-center justify-center h-screen">
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
