import React, { useState } from "react";
import Map from "../MapToQuiz";
import ProgressBar from "../ProgressBar";
import QuizStatistic from "../QuizStatistic";

export default function QuizGuessCountryOnMap(props) {
  const { quantityOfQuestions, questions } = props;
  const [selectedCountry, setSelectedCountry] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [points, setPoints] = useState(0);

  function sendSelectedCountry(country) {
    setSelectedCountry(country);
  }

  const handleNextQuestion = () => {
    setQuestionIndex(questionIndex + 1);
    setIsAnswered(false);
    setCorrectAnswer("");
    if (quantityOfQuestions - 1 === questionIndex) {
      setIsFinished(true);
      setQuestionIndex(0);
    }
  };

  const confirmAndCheckAnswer = () => {
    if (
      selectedCountry.toUpperCase() ===
      questions[questionIndex].translations.pol.common.toUpperCase()
    ) {
      setIsAnswered(true);
      setCorrectAnswer("Poprawna odpowiedź");
      setPoints(points + 1);
    } else {
      //Wskaż poprawny kraj na mapie oraz jaki kraj zaznaczył użytkownik
      setIsAnswered(true);
      setCorrectAnswer("Błędna odpowiedź");
      setQuizData((prevQuizData) => [
        ...prevQuizData,
        {
          numberQuestion: questionIndex + 1,
          correctAnswer: questions[questionIndex].translations.pol.common,
          yourAnswer: selectedCountry,
        },
      ]);
      console.log(
        selectedCountry.toUpperCase(),
        questions[questionIndex].translations.pol.common.toUpperCase()
      );
    }
  };

  return (
    <>
      {!isFinished ? (
        <>
          <ProgressBar
            progress={questionIndex}
            quantityOfQuestions={quantityOfQuestions}
            points={points}
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
              <>
                <p>{correctAnswer}</p>
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
              </>
            </div>
          </div>
        </>
      ) : (
        <QuizStatistic
          quizData={quizData}
          points={points}
          questionQuantity={quantityOfQuestions}
        />
      )}
    </>
  );
}
