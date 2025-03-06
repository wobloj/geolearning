import React, { useEffect, useState } from "react";
import Map from "../MapToQuiz";
import ProgressBar from "../ProgressBar";
import QuizStatistic from "../QuizStatistic";

export default function QuizTypeMap(props) {
  const {
    quantityOfQuestions,
    questions,
    region,
    quizType,
    setStartQuiz,
    isStarted,
  } = props;

  const [selectedCountry, setSelectedCountry] = useState("Brak odpowiedzi");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [points, setPoints] = useState(0);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [time, setTime] = useState(0);

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
      setPoints(points + 100);
      setIsCorrectAnswer(true);
    } else {
      //Wskaż poprawny kraj na mapie oraz jaki kraj zaznaczył użytkownik
      setIsAnswered(true);
      setCorrectAnswer("Błędna odpowiedź");
      setIsCorrectAnswer(false);
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
    setSelectedCountry("Brak odpowiedzi");
  };
  //TODO: Błędną oraz poprawną odpowiedź należy wyróżnić
  //TODO: Jeżeli użytkownik zaznaczy złą odpowiedź zaznacz na mapie jego odpowiedz oraz poprawną odpowiedź
  return (
    <div
      data-testid="quiz-type-map"
      className="h-screen flex font-monts flex-col"
    >
      {!isFinished ? (
        <div className="flex flex-col items-center justify-center">
          <ProgressBar
            progress={questionIndex}
            quantityOfQuestions={quantityOfQuestions}
            isStarted={isStarted}
            onTimeUpdate={(currentTime) => setTime(currentTime)}
          />
          <div className="flex gap-6 font-monts h-full">
            <Map region={region} sendSelectedCountry={sendSelectedCountry} />
            <div className="flex flex-col justify-between items-center bg-white border border-black py-5 px-14 my-6 min-w-72 max-w-72">
              <div className="flex flex-col items-center gap-2 mt-14">
                <p className="text-3xl font-bold">Znajdź</p>
                {quizType === "flags" ? (
                  <img
                    className=" max-w-48 border border-black"
                    src={questions[questionIndex].flags.svg}
                    alt={questions[questionIndex].flags.alt}
                  />
                ) : quizType === "country" ? (
                  <p className="text-xl mt-9">
                    {questions[questionIndex].translations.pol.common}
                  </p>
                ) : (
                  <p className="text-xl mt-9">
                    {questions[questionIndex].capital[0]}
                  </p>
                )}
              </div>
              <div className=" max-w-48">
                <p
                  className={`${
                    isCorrectAnswer ? `text-green-500` : `text-red-500`
                  } text-center text-xl`}
                >
                  {correctAnswer}
                </p>
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
          </div>
        </div>
      ) : (
        <QuizStatistic
          quizData={quizData}
          points={points}
          mode="map"
          region={region}
          quizType={quizType}
          questionQuantity={quantityOfQuestions}
          setStartQuiz={setStartQuiz}
          time={`${String(Math.floor(time / 60)).padStart(2, "0")}:${String(
            time % 60
          ).padStart(2, "0")}`}
          timeNotFormatted={time}
        />
      )}
    </div>
  );
}
