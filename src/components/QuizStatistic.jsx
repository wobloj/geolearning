import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function QuizStatistic({
  quizData,
  points,
  questionQuantity,
  time,
  setStartQuiz,
}) {
  const navigate = useNavigate();
  //TODO: Podczas wyświetlania blędnych odpowiedzi poprawic poprawną odpowiedź by była taka jaką użytkownik wpisał
  return (
    <>
      <div className="flex flex-col justify-center h-full font-monts">
        <div className=" border-2 rounded bg-white border-blue-500 p-6">
          <div className="text-4xl text-center my-5">Wyniki</div>
          <div className="my-4">
            <p className="font-semibold">
              Poprawne odpowiedzi:{" "}
              <span className="font-normal ml-2">
                {points / 100}/{questionQuantity}
              </span>
            </p>
            <p className="font-semibold">
              Punkty: <span className="font-normal ml-2">{points}</span>
            </p>
            <p className="font-semibold">Czas: {time}</p>
          </div>
          {quizData && quizData.length > 0 ? (
            <>
              <p className="my-2 font-semibold">Twoje błędne odpowiedzi:</p>
              {quizData.map((data, index) => (
                <div className="my-2" key={index}>
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

          <div className="flex flex-row gap-5 mt-5">
            <button
              onClick={() => setStartQuiz(false)}
              className="py-2 px-4 border-2 border-blue-500 text-blue-500"
            >
              Spróbuj ponownie
            </button>
            <NavLink to={"/"} className="py-2 px-4">
              Wróć do strony głównej
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
