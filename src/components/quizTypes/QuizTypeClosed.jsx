import { React, useState, useRef, useEffect } from "react";
import ProgressBar from "../ProgressBar";
import QuizStatistic from "../QuizStatistic";

export default function QuizTypeClosed(props) {
  const { quantityOfQuestions, questions, region, quizType, setStartQuiz } =
    props;

  const [fakeAnswers, setFakeAnswers] = useState([]);
  const [countries, setCountries] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answerState, setAnswerState] = useState(null);
  const [yourAnswer, setYourAnswer] = useState(null);
  const [quizData, setQuizData] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/region/${region}?fields=translations,flags,independent,capital`
        );
        const data = await response.json();
        setCountries(data);
        console.log(data);
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

    // Filtrujemy kraje, aby usunąć poprawną odpowiedź
    const incorrectAnswers = countries.filter(
      (country) => country.translations.pol.common !== correctCountryName
    );

    // Losujemy trzy unikalne fałszywe odpowiedzi
    const shuffledIncorrectAnswers = incorrectAnswers
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    // Dodajemy poprawną odpowiedź do opcji i mieszamy
    const answerOptions = [correctAnswer, ...shuffledIncorrectAnswers];
    const shuffledAnswers = answerOptions.sort(() => 0.5 - Math.random());

    setFakeAnswers(shuffledAnswers); // Ustawienie w stanie dla renderowania
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
    if (isAnswered) return; // Jeśli już odpowiedziano, nie rób nic

    const correctAnswer = questions[questionIndex];
    const isCorrect =
      selectedAnswer.translations.pol.common ===
      correctAnswer.translations.pol.common;

    setYourAnswer(selectedAnswer); // Zapisz wybraną odpowiedź

    if (isCorrect) {
      console.log("Poprawna odpowiedź");
      setAnswerState(true);
      setPoints(points + 100);
    } else {
      console.log("Błędna odpowiedź");
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
    setIsAnswered(true); // Ustaw stan na odpowiedziano
  };

  return (
    <div className="h-screen flex flex-col flex-1">
      {!isFinished ? (
        <div className="flex flex-col items-center">
          <ProgressBar
            progress={questionIndex}
            quantityOfQuestions={quantityOfQuestions}
            points={points}
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
            <button
              className="mt-24 py-4 px-6 border-2 border-green-600 bg-green-500 text-black font-semibold absolute right-12 top-[50%] translate-y-[-100%]"
              onClick={handleNextQuestion}
            >
              Następne pytanie
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
    </div>
  );
}
