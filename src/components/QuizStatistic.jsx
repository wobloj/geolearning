import { React, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { updateUserPoints } from "../firebase/services";
import { UserContext } from "../context/UserContext.jsx";

import ButtonBlue from "./ButtonBlue.jsx";

export default function QuizStatistic({
  quizData,
  points,
  questionQuantity,
  time,
  setStartQuiz,
  quizType,
  mode,
  region,
}) {
  const { username, setUsername, isLoggedIn, setIsLoggedIn } =
    useContext(UserContext);

  const quantOfQuestionsCorrect = points / 100;
  useEffect(() => {
    const saveQuizResults = async () => {
      try {
        await updateUserPoints(region, quizType, mode, points, username);
      } catch (error) {
        console.error("Nie udało się zapisać wyników quizu:", error);
      }
    };

    saveQuizResults();
  }, [region, quizType, mode, points, username]);
  return (
    <>
      <div className="flex flex-col justify-center h-full font-monts w-full items-center">
        <div className=" border-2 rounded bg-white border-blue-500 p-6 w-[150%]">
          <div className="text-4xl text-center my-5">Wyniki</div>
          <div className="text-center">
            <p className="font-semibold text-xl">
              {region === "europe"
                ? "Europa"
                : region === "north_america"
                ? "Ameryka północna"
                : region === "south_america"
                ? "Ameryka południowa"
                : region === "africa"
                ? "Afryka"
                : region === "asia"
                ? "Azja"
                : region === "oceania"
                ? "Oceania"
                : "Świat"}
            </p>
            <p className="font-medium text-l">
              {quizType === "flags"
                ? "Wybieranie państw na podstawie flag"
                : quizType === "capital"
                ? "Wybieranie państw na podstawie stolicy kraju"
                : "Wybieranie flagi na podstawie nazwy państwa"}
            </p>
          </div>
          <div className="my-4">
            <p className="font-semibold">
              Poprawne odpowiedzi:{" "}
              <span className="font-normal ml-2">
                {quantOfQuestionsCorrect}/{questionQuantity}
              </span>
            </p>
            <p className="font-semibold">
              Punkty: <span className="font-normal ml-2">{points}</span>
            </p>
            <p className="font-semibold">Czas: {time}</p>
            {!isLoggedIn && (
              <p className="text-center text-red-400">
                Ukończ quiz będąc zalogowanym by zapisać swój wynik
              </p>
            )}
          </div>
          {quizData && quizData.length > 0 ? (
            <>
              <p className="my-2 font-semibold">Twoje błędne odpowiedzi:</p>
              {quizData.map((data, index) => (
                <div
                  className="my-2 outline-blue-400 py-2 px-3 hover:outline hover:outline-2 hover:rounded-md"
                  key={index}
                >
                  <p>Numer pytania: {data.numberQuestion}</p>
                  <p className="text-red-500">
                    Twoja odpowiedź: {data.yourAnswer}
                  </p>
                  <p className="text-green-500">
                    Poprawna odpowiedź: {data.correctAnswer}
                  </p>
                </div>
              ))}
            </>
          ) : (
            <div className="text-center">
              <p className=" text-green-500 my-8">
                Gratulacje ukończyłeś quiz bez żadnej pomyłki!
              </p>
            </div>
          )}

          <div className="flex flex-row gap-5 mt-5 items-center justify-center">
            <ButtonBlue onClick={() => setStartQuiz(false)}>
              Spróbuj ponownie
            </ButtonBlue>
            <NavLink to={"/"} className="py-2 px-4">
              Wróć do strony głównej
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
