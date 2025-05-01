import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { getLeaderboard } from "../firebase/services"; // Importuj funkcję getLeaderboard

export default function Leaderboard({
  continent,
  region,
  setIsLeaderboardVisible,
  quizType,
}) {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [mode, setMode] = useState("open");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeaderboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLeaderboard(region, quizType, mode);
      setLeaderboardData(data);
    } catch (error) {
      setError(
        "Nie udało się pobrać tablicy wyników. Spróbuj ponownie później."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, [continent, quizType, mode]);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center font-monts bg-blue-900/20 backdrop-blur-sm">
        <FontAwesomeIcon
          className="absolute top-0 right-0 mr-10 mt-10 text-4xl cursor-pointer transition-transform hover:text-red-500 hover:rotate-180"
          icon={faXmark}
          onClick={() => setIsLeaderboardVisible(false)}
        />
        <div className="flex justify-center items-center flex-col h-1/4">
          <h1 className="font-semibold text-4xl my-10">Tablica wyników</h1>
          <p className="font-semibold text-2xl mb-2">{continent}</p>
          <p className="font-medium text-xl mb-10">
            {quizType === "flags"
              ? "Wybór na podstawie flagi"
              : quizType === "country"
              ? "Wybór na podstawie nazwy państw"
              : "Wybór na podstawie stolicy państwa"}
          </p>

          <div className="mb-5 flex justify-center items-center">
            <label className="flex gap-1">
              <input
                type="radio"
                name="mode"
                value="open"
                checked={mode === "open"}
                onChange={(e) => setMode(e.target.value)}
              />
              Pytania otwarte
            </label>
            <label className="ml-4 flex gap-1">
              <input
                type="radio"
                name="mode"
                value="closed"
                checked={mode === "closed"}
                onChange={(e) => setMode(e.target.value)}
              />
              Pytania zamknięte
            </label>
            <label className="ml-4 flex gap-1">
              <input
                type="radio"
                name="mode"
                value="map"
                checked={mode === "map"}
                onChange={(e) => setMode(e.target.value)}
              />
              Pytania na mapie
            </label>
          </div>
        </div>
        {error && <p className="text-red-500 mb-5">{error}</p>}
        <div className="h-3/4 flex justify-center items-start mt-12 w-full">
          {loading ? (
            <p className="text-xl font-semibold">Ładowanie wyników...</p>
          ) : leaderboardData.length === 0 ? (
            <p className="text-xl font-semibold">
              Brak wyników do wyświetlenia.
            </p>
          ) : (
            <table className="text-center border-[1px] border-black">
              <thead>
                <tr className="bg-white dark:bg-backgrounddark">
                  <th className="px-5 border-[1px] border-black border-r-transparent">
                    Pozycja
                  </th>
                  <th className="px-5 border-[1px] border-black border-r-transparent">
                    Nazwa użytkownika
                  </th>
                  <th className="px-5 border-[1px] border-black border-l-transparent">
                    Punkty
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((entry, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0
                        ? "bg-white dark:bg-backgrounddark"
                        : "bg-blue-200 dark:bg-blue-400"
                    }
                  >
                    <td>{index + 1}</td>
                    <td>{entry.username}</td>
                    <td>{entry.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
