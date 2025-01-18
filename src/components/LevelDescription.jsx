import React from "react";
import { NavLink } from "react-router-dom";

export default function LevelDescription({
  levelName,
  quizType,
  isLeaderboardVisible,
}) {
  return (
    <>
      <div>
        <p className="text-center font-semibold text-2xl mb-6">{levelName}</p>
        {quizType === "flags" && (
          <div className="px-10">
            <p className="text-center">
              Na tym poziomie należy rozpoznać kraj na podstawie przedstawionej{" "}
              <span className="font-semibold">flagi</span>.
            </p>
            <br></br>
            <p className="mb-4">Poziom posiada trzy typy quizów:</p>
            <ul>
              <li>
                <span className="font-semibold">Pytania otwarte</span> - będą
                polegały na na wpisaniu nazwy kraju na podstawie flagi.
              </li>
              <li>
                <span className="font-semibold">Pytania zamknięte</span> - będą
                polegały na wyborze nazwy kraju spośród 4 odpowiedzi
              </li>
              <li>
                <span className="font-semibold">Wybór państwa na mapie</span> -
                w oparciu o flagę należy znaleźć oraz zaznaczyć odpowiedni kraj
                na mapie.
              </li>
            </ul>
          </div>
        )}
        {quizType === "capital" && (
          <div className="px-10">
            <p className="text-center">
              Na tym poziomie należy rozpoznać kraj na podstawie{" "}
              <span className="font-semibold">stolicy danego kraju</span>.
            </p>
            <br></br>
            <p className="mb-4">Poziom posiada trzy typy quizów:</p>
            <ul>
              <li>
                <span className="font-semibold">Pytania otwarte</span> -
                polegają na na wpisaniu nazwy państwa na podstawie stolicy
                kraju.
              </li>
              <li>
                <span className="font-semibold">Pytania zamknięte</span> -
                polegają na wyborze nazwy państwa spośród czterech odpowiedzi
              </li>
              <li>
                <span className="font-semibold">Wybór państwa na mapie</span> -
                na podstawie stolicy kraju należy znaleźć oraz zaznaczyć
                odpowiedni kraj na mapie.
              </li>
            </ul>
          </div>
        )}
        {quizType === "country" && (
          <div className="px-10">
            <p className="text-center">
              Na tym poziomie należy rozpoznać kraj na podstawie jej{" "}
              <span className="font-semibold">nazwy</span>.
            </p>
            <br></br>
            <p className="mb-4">Poziom posiada trzy typy quizów:</p>
            <ul>
              <li>
                <span className="font-semibold">Pytania otwarte</span> -
                polegają na na wpisaniu stolicy państwa na podstawie nazwy
                kraju.
              </li>
              <li>
                <span className="font-semibold">Pytania zamknięte</span> -
                polegają na wyborze flagi kraju spośród czterech odpowiedzi
              </li>
              <li>
                <span className="font-semibold">Wybór państwa na mapie</span> -
                w oparciu o nazwę kraju należy znaleźć oraz zaznaczyć odpowiedni
                kraj na mapie.
              </li>
            </ul>
          </div>
        )}
        <div className="flex flex-row justify-center gap-2 mt-5">
          <NavLink
            to={`/quiz/${levelName.toLowerCase()}`}
            state={{
              levelTitle: levelName,
              typeQuiz: quizType,
            }}
            className="flex items-center justify-center flex-1 max-w-64 border-2 border-green-500 font-medium text-green-500 rounded-lg py-2 px-8 text-center mt-6 transition-colors hover:border-green-700 hover:text-green-700 hover:bg-green-100"
          >
            Start
          </NavLink>
          <button
            onClick={() => isLeaderboardVisible(true)}
            className="flex items-center justify-center flex-1 max-w-64 border-2 border-blue-400 font-medium text-blue-500 rounded-lg py-2 px-8 text-center mt-6 transition-colors hover:border-blue-700 hover:text-blue-700 hover:bg-blue-100"
          >
            Tablica wyników
          </button>
        </div>
      </div>
    </>
  );
}
