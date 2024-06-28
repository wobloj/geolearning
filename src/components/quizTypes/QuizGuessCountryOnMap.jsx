import React, { useState } from "react";
import Map from "../MapToQuiz";
import ProgressBar from "../ProgressBar";

export default function QuizGuessCountryOnMap(props) {
  const { quantityOfQuestions, questions } = props;
  const [selectedCountry, setSelectedCountry] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  function sendSelectedCountry(country) {
    setSelectedCountry(country);
  }

  const handleNextQuestion = () => {
    setQuestionIndex(questionIndex + 1);
    setIsAnswered(false);
    if (quantityOfQuestions - 1 === questionIndex) {
      setQuestionIndex(0);
    }
  };

  const confirmAndCheckAnswer = () => {
    if (
      selectedCountry.toUpperCase() ===
      questions[questionIndex].translations.pol.common.toUpperCase()
    ) {
      setIsAnswered(true);
      console.log("Poprawna odpowiedź");
    } else {
      setIsAnswered(true);
      console.log(
        selectedCountry.toUpperCase(),
        questions[questionIndex].translations.pol.common.toUpperCase()
      );
      console.log("Błędna odpowiedź");
    }
  };

  return (
    <>
      <ProgressBar
        progress={questionIndex}
        quantityOfQuestions={quantityOfQuestions}
      />
      <div className="flex gap-6 font-monts h-full">
        <Map sendSelectedCountry={sendSelectedCountry} />
        <div className="flex flex-col justify-between items-center bg-white border border-black my-20 py-5 px-20">
          <div className="flex flex-col items-center gap-2 mt-14">
            <p className="text-3xl font-bold">Znajdź</p>

            <img
              className=" max-w-48 border border-black"
              src={questions[questionIndex].flags.svg}
              alt={questions[questionIndex].flags.alt}
            />
            <p className="text-xl">
              {questions[questionIndex].translations.pol.common}
            </p>
          </div>
          {isAnswered ? (
            <button
              className="mt-24 py-4 px-6 border-2 border-green-600 bg-green-500 text-black font-semibold"
              onClick={handleNextQuestion}
            >
              Następne pytanie
            </button>
          ) : (
            <button
              onClick={confirmAndCheckAnswer}
              className="mt-24 py-4 px-6 border-2 border-green-600 bg-green-500 text-black font-semibold"
            >
              Zatwierdź
            </button>
          )}
        </div>
      </div>
    </>
  );
}
