import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import QuizGuessFlagClosed from "../components/quizTypes/QuizGuessFlagClosed";
import QuizGuessFlagOpen from "../components/quizTypes/QuizGuessFlagOpen";

export default function Quiz() {
  const [countryData, setCountryData] = useState(null);
  const [questions, setQuestions] = useState({});

  const quantityOfQuestions = 5;

  useEffect(() => {
    axios
      .get(
        `https://restcountries.com/v3.1/region/europe?fields=translations,flags`
      )
      .then((data) => {
        setCountryData(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
  };

  return (
    <div className="flex items-center font-monts flex-col bg-default bg-fixed h-screen bg-blue-100 bg-opacity-50 relative">
      <NavLink
        to={"/"}
        className="absolute left-5 top-5 flex justify-center items-center gap-2 transition-colors hover:text-red-700"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
        Powrót
      </NavLink>
      <ProgressBar />
      <QuizGuessFlagOpen questionQuantity={quantityOfQuestions} />
    </div>
  );
}
