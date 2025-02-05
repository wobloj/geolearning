import { React, useState, useEffect } from "react";
import ProgressBar from "../ProgressBar";
import QuizStatistic from "../QuizStatistic";
import ButtonGreen from "../ButtonGreen";

export default function QuizTypeClosed(props) {
  const {
    quantityOfQuestions,
    questions,
    region,
    regionApi,
    quizType,
    setStartQuiz,
    isStarted,
  } = props;

  const [fakeAnswers, setFakeAnswers] = useState([]);
  const [countries, setCountries] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answerState, setAnswerState] = useState(null);
  const [yourAnswer, setYourAnswer] = useState(null);
  const [quizData, setQuizData] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [time, setTime] = useState(0);

  const apiUrl =
    regionApi === "world"
      ? "https://restcountries.com/v3.1/all?fields=translations,flags,independent,capital"
      : `https://restcountries.com/v3.1/region/${regionApi}?fields=translations,flags,independent,capital`;

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const generateFakeAnswers = () => {
    if (countries.length === 0) return;

    const correctAnswer = questions[questionIndex];
    const correctCountryName = correctAnswer.translations.pol.common;

    const incorrectAnswers = countries.filter(
      (country) => country.translations.pol.common !== correctCountryName
    );

    const shuffledIncorrectAnswers = incorrectAnswers
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const answerOptions = [correctAnswer, ...shuffledIncorrectAnswers];
    const shuffledAnswers = answerOptions.sort(() => 0.5 - Math.random());

    setFakeAnswers(shuffledAnswers);
  };

  useEffect(() => {
    if (countries.length > 0) {
      generateFakeAnswers();
    }
  }, [questionIndex, countries]);

  const handleNextQuestion = () => {
    setQuestionIndex((prevIndex) => prevIndex + 1);
    setIsAnswered(false);
    setYourAnswer(null);
    setAnswerState(null);
    if (quantityOfQuestions - 1 === questionIndex) {
      setIsFinished(true);
      setQuestionIndex(0);
    }
  };

  const confirmAndCheckAnswer = (selectedAnswer) => {
    if (isAnswered) return;

    const correctAnswer = questions[questionIndex];
    const isCorrect =
      selectedAnswer.translations.pol.common ===
      correctAnswer.translations.pol.common;

    setYourAnswer(selectedAnswer);

    if (isCorrect) {
      setAnswerState(true);
      setPoints(points + 100);
    } else {
      setQuizData((prevQuizData) => [
        ...prevQuizData,
        {
          numberQuestion: questionIndex + 1,
          correctAnswer: correctAnswer.translations.pol.common,
          yourAnswer: selectedAnswer.translations.pol.common,
        },
      ]);
      setAnswerState(false);
    }
    setIsAnswered(true);
  };

  return (
    <div className="h-screen flex flex-col flex-1">
      {!isFinished ? (
        <div className="flex flex-col items-center">
          <ProgressBar
            progress={questionIndex}
            quantityOfQuestions={quantityOfQuestions}
            isStarted={isStarted}
            onTimeUpdate={(currentTime) => setTime(currentTime)}
          />
          <div>
            {quizType === "flags" ? (
              <div className="flex flex-col items-center">
                <p className="font-bold text-4xl pt-14 pb-14">
                  Jak nazywa się ten kraj?
                </p>
                <img
                  className=" max-h-64 border-[1px] border-black"
                  src={questions[questionIndex].flags.svg}
                  alt={questions[questionIndex].flags.alt}
                />
                <div className="grid lg:grid-cols-2 sm:grid-cols-1 lg:gap-[5rem] sm:gap-1 font-semibold text-center text-xl mt-20">
                  {fakeAnswers.map((answer, index) => (
                    <div
                      key={index}
                      onClick={() => confirmAndCheckAnswer(answer)}
                      id="answerBox"
                      className={`flex items-center rounded-xl justify-center border-2 border-black h-[6rem] lg:w-[15rem] sm:w-screen select-none bg-white ${
                        isAnswered &&
                        answer.translations.pol.common ===
                          questions[questionIndex].translations.pol.common
                          ? "border-green-400 bg-green-50 text-green-400"
                          : isAnswered && yourAnswer === answer
                          ? "border-red-400 bg-red-50 text-red-500"
                          : ""
                      } ${
                        isAnswered
                          ? "cursor-auto"
                          : "hover:bg-blue-50 hover:border-blue-500 hover:text-blue-500 cursor-pointer"
                      }`}
                    >
                      {answer.translations.pol.common}
                    </div>
                  ))}
                </div>
              </div>
            ) : quizType === "country" ? (
              <div className="flex flex-col items-center">
                <p className="font-bold text-4xl pt-14 pb-14">
                  Wybierz flagę tego kraju
                </p>
                <p className="text-7xl text-blue-500">
                  {questions[questionIndex].translations.pol.common}
                </p>
                <div className="mt-72 grid lg:grid-cols-4 sm:grid-cols-1 lg:gap-[5rem] sm:gap-1 font-semibold text-center text-xl">
                  {fakeAnswers.map((answer, index) => (
                    <div
                      key={index}
                      onClick={() => confirmAndCheckAnswer(answer)}
                      id="answerBox"
                      className={`flex items-center justify-center border-2 border-black h-[6rem] lg:w-[15rem] sm:w-screen select-none bg-white ${
                        isAnswered &&
                        answer.translations.pol.common ===
                          questions[questionIndex].translations.pol.common
                          ? "border-green-400 bg-green-50"
                          : isAnswered && yourAnswer === answer
                          ? "border-red-400 bg-red-50 text-red-500"
                          : ""
                      } ${
                        isAnswered
                          ? "cursor-auto"
                          : "hover:bg-blue-50 hover:border-blue-500 cursor-pointer"
                      }`}
                    >
                      <img
                        className="max-w-full max-h-[75%] border-[1px] border-black"
                        src={answer.flags.png}
                        alt={answer.flags.alt}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <p className="font-bold text-4xl pt-14 pb-14">
                  Stolicą jakiego kraju jest...
                </p>
                <p className="text-7xl text-blue-500">
                  {questions[questionIndex].capital[0]}
                </p>
                <div className=" mt-72 grid lg:grid-cols-4 sm:grid-cols-1 lg:gap-[5rem] sm:gap-1 font-semibold text-center text-xl">
                  {fakeAnswers.map((answer, index) => (
                    <div
                      key={index}
                      onClick={() => confirmAndCheckAnswer(answer)}
                      id="answerBox"
                      className={`flex items-center justify-center border-2 border-black h-[6rem] lg:w-[15rem] sm:w-screen select-none bg-white ${
                        isAnswered &&
                        answer.translations.pol.common ===
                          questions[questionIndex].translations.pol.common
                          ? "border-green-400 bg-green-50 text-green-500"
                          : isAnswered && yourAnswer === answer
                          ? "border-red-400 bg-red-50 text-red-500"
                          : ""
                      } ${
                        isAnswered
                          ? "cursor-auto"
                          : "hover:bg-blue-50 hover:border-blue-500 hover:text-blue-500 cursor-pointer"
                      }`}
                    >
                      {answer.translations.pol.common}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {isAnswered && (
            <ButtonGreen
              className={
                "absolute right-12 top-[50%] translate-y-[-100%] w-44 h-16"
              }
              onClick={handleNextQuestion}
            >
              Następne
            </ButtonGreen>
          )}
        </div>
      ) : (
        <QuizStatistic
          quizData={quizData}
          mode="closed"
          points={points}
          quizType={quizType}
          region={region}
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
