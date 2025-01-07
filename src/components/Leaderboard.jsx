import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Leaderboard({
  continent,
  setIsLeaderboardVisible,
  quizType,
}) {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center font-monts bg-blue-900/20 backdrop-blur-sm">
        <FontAwesomeIcon
          className="absolute top-0 right-0 mr-10 mt-10 text-4xl cursor-pointer transition-transform hover:rotate-180"
          icon={faXmark}
          onClick={() => setIsLeaderboardVisible(false)}
        />
        <h1 className="font-semibold text-4xl my-10">Tablica wyników</h1>
        <p className="font-semibold text-2xl mb-2">{continent}</p>
        <p className="font-medium text-xl mb-10">{quizType}</p>
        <table className="text-center border-[1px] border-black">
          <tr className="bg-white">
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
          <tr className="bg-white">
            <td>1</td>
            <td>user</td>
            <td>1500</td>
          </tr>
          <tr className="bg-blue-200">
            <td>2</td>
            <td>user2</td>
            <td>1300</td>
          </tr>
          <tr className="bg-white">
            <td>3</td>
            <td>user3</td>
            <td>1100</td>
          </tr>
          <tr className="bg-blue-200">
            <td>4</td>
            <td>user4</td>
            <td>1000</td>
          </tr>
        </table>
      </div>
    </>
  );
}
