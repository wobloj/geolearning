import React, { useRef, useState } from "react";
import ProgressBar from "../ProgressBar.jsx";
import QuizStatistic from "../QuizStatistic.jsx";

export default function QuizTypeOpen(props) {
  const { quantityOfQuestions, questions, quizType, setStartQuiz } = props;

  const [isAnswered, setIsAnswered] = useState(false);
  const [answerState, setAnswerState] = useState(null);
  const [styleOutline, setStyleOutline] = useState("");
  const [quizData, setQuizData] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  const [questionIndex, setQuestionIndex] = useState(0);

  const [points, setPoints] = useState(0);

  const answer = useRef(null);

  const handleNextQuestion = () => {
    setQuestionIndex(questionIndex + 1);
    answer.current.disabled = false;
    setIsAnswered(false);
    answer.current.value = "";
    setStyleOutline("");
    if (quantityOfQuestions - 1 === questionIndex) {
      setIsFinished(true);
      setQuestionIndex(0);
    }
  };

  const confirmAndCheckAnswer = () => {
    if (quizType === "country") {
      console.log("Typ quizu: ", quizType);
      if (
        answer.current.value.toUpperCase() ===
        questions[questionIndex].capital[0].toUpperCase()
      ) {
        console.log("Poprawna odpowiedź stolica");
        setStyleOutline("border-green-400");
        answer.current.disabled = true;
        setAnswerState(true);
        setIsAnswered(true);
        setPoints(points + 100);
        console.log(points);
      } else {
        setQuizData((prevQuizData) => [
          ...prevQuizData,
          {
            numberQuestion: questionIndex + 1,
            correctAnswer: questions[questionIndex].capital[0],
            yourAnswer: answer.current.value,
          },
        ]);
        setStyleOutline("border-red-400");
        answer.current.disabled = true;
        setAnswerState(false);
        answer.current.value = questions[questionIndex].capital[0];
        setIsAnswered(true);
      }
    } else {
      if (
        answer.current.value.toUpperCase() ===
        questions[questionIndex].translations.pol.common.toUpperCase()
      ) {
        setStyleOutline("border-green-400");
        answer.current.disabled = true;
        setAnswerState(true);
        setIsAnswered(true);
        setPoints(points + 1);
        console.log(points);
      } else {
        setQuizData((prevQuizData) => [
          ...prevQuizData,
          {
            numberQuestion: questionIndex + 1,
            correctAnswer: questions[questionIndex].translations.pol.common,
            yourAnswer: answer.current.value,
          },
        ]);
        setStyleOutline("border-red-400");
        answer.current.disabled = true;
        setAnswerState(false);
        answer.current.value = questions[questionIndex].translations.pol.common;
        setIsAnswered(true);
      }
    }
  };

  return (
    <>
      {!isFinished ? (
        <div className="flex font-monts flex-col items-center">
          <ProgressBar
            progress={questionIndex}
            quantityOfQuestions={quantityOfQuestions}
            points={points}
          />
          {quizType === "flags" ? (
            <div>
              <p className="font-bold text-4xl pt-14 pb-14">Co to za kraj?</p>
              <img
                className=" relative h-[20rem] border border-black before:content-none before:w-full before:h-full before:bg-flag before:absolute"
                src={questions[questionIndex].flags.svg}
                alt={questions[questionIndex].flags.alt}
              />
            </div>
          ) : quizType === "country" ? (
            <div className="flex flex-col items-center">
              <p className="font-bold text-4xl pt-14 pb-14">
                Jaka jest stolica tego kraju?
              </p>
              <p className="font-semibold text-3xl pt-14 pb-14 text-blue-600">
                {questions[questionIndex].translations.pol.common}
              </p>
            </div>
          ) : (
            <div>
              <p className="font-bold text-4xl pt-14 pb-14">Co to za kraj?</p>
              <p className="font-semibold text-3xl pt-14 pb-14 text-blue-600">
                {questions[questionIndex].capital[0]}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-5 items-centerfont-semibold text-center font-semibold text-xl mt-20">
            <p>Odpowiedź wpisz tutaj</p>
            <div className="relative">
              <input
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    confirmAndCheckAnswer();
                  }
                }}
                ref={answer}
                placeholder="Odpowiedź"
                className={`py-3 px-3 outline-none border-2 focus:border-blue-400 placeholder:text-gray-300 placeholder:font-thin ${styleOutline}`}
                type="text"
              />
              {!isAnswered ? (
                ""
              ) : (
                <>
                  {answerState ? (
                    <i className="absolute -translate-y-2/4 right-4 top-2/4 text-green-400 fa-solid fa-circle-check"></i>
                  ) : (
                    <i className="absolute -translate-y-2/4 right-4 top-2/4 text-red-400 fa-solid fa-circle-xmark"></i>
                  )}
                </>
              )}
            </div>
          </div>

          {isAnswered ? (
            <button
              className="mt-24 py-4 px-6 border-2 border-green-600 bg-green-500 text-black font-semibold"
              onClick={handleNextQuestion}
            >
              Nastepne pytanie
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
      ) : (
        <QuizStatistic
          quizData={quizData}
          points={points}
          questionQuantity={quantityOfQuestions}
          setStartQuiz={setStartQuiz}
        />
      )}
    </>
  );
}
