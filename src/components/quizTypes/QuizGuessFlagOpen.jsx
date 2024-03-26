import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

export default function QuizGuessFlagOpen() {
  const [isAnswered, setIsAnswered] = useState(false);
  const [answerState, setAnswerState] = useState(null);
  const [countryData, setCountryData] = useState(null);
  const [questions, setQuestions] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [startQuiz, setStartQuiz] = useState(false);

  const [points, setPoints] = useState(0);

  const answer = useRef(null);

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

  const handleNextQuestion = () => {
    setQuestionIndex(questionIndex + 1);
    answer.current.disabled = false;
    setIsAnswered(false);
    answer.current.value = "";

    if (quantityOfQuestions - 1 === questionIndex) {
      setStartQuiz(false);
      setQuestionIndex(0);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {startQuiz ? (
        <>
          <p className="font-bold text-4xl pt-14 pb-14">Co to za kraj?</p>
          <img
            className=" h-[20rem]"
            src={questions[questionIndex].flags.svg}
            alt={questions[questionIndex].flags.alt}
          />
          <div className="flex flex-col gap-5 items-centerfont-semibold text-center font-semibold text-xl mt-20">
            <p>Odpowiedź wpisz tutaj</p>
            <div className="relative">
              <input
                ref={answer}
                placeholder="Odpowiedź"
                className="py-3 px-3 outline-none border-2 focus:border-blue-400 placeholder:text-gray-300 placeholder:font-thin"
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
          <button
            onClick={() => {
              if (
                answer.current.value.toUpperCase() ===
                questions[questionIndex].translations.pol.common.toUpperCase()
              ) {
                answer.current.className += " border-green-400";
                answer.current.disabled = true;
                setAnswerState(true);
                setIsAnswered(true);
                setPoints(points + 1);
                console.log(points);
              } else {
                answer.current.className += " border-red-400";
                answer.current.disabled = true;
                setAnswerState(false);
                setIsAnswered(true);
              }
            }}
            className="mt-24 py-4 px-6 border-2 border-green-600 bg-green-500 text-black font-semibold"
          >
            Zatwierdź
          </button>
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

      {isAnswered ? (
        <button onClick={handleNextQuestion}>Nastepne pytanie</button>
      ) : (
        ""
      )}
    </div>
  );
}
