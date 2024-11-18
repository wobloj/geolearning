import React from "react";
import { NavLink } from "react-router-dom";
import ContinentSVG from "./ContinentSVG";

export default function Level({ color, colorMap, levelTitle }) {
  return (
    <div className="font-monts grid grid-cols-3 items-center">
      <div>
        <img src="" alt="" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1
          className={` flex flex-row items-center gap-5 text-4xl py-5 font-semibold text-black`}
        >
          {levelTitle}
        </h1>
        <NavLink
          to={`/quiz/${levelTitle.toLowerCase()}`}
          state={{
            levelTitle: levelTitle,
            typeQuiz: "Wybór państwa na podstawie flagi",
          }}
        >
          <div
            className={`flex items-center justify-center drop-shadow-md  rounded-full ${color} antialiased size-28 text-white font-semibold text-4xl shadow-[inset_0px_0px_10px_10px_#00000024] my-3 cursor-pointer transition-all hover:shadow-[inset_0px_0px_15px_15px_#00000040]`}
          >
            1
          </div>
        </NavLink>
        <div className="flex flex-col justify-center items-center gap-3">
          <div className={`size-7 ${color} rounded-full drop-shadow-md `}></div>
          <div
            className={`size-7 ${color} ml-5 rounded-full drop-shadow-md `}
          ></div>
          <div className={`size-7 ${color} rounded-full drop-shadow-md `}></div>
        </div>
        <NavLink
          to={`/quiz/${levelTitle.toLowerCase()}`}
          state={{
            levelTitle: levelTitle,
            typeQuiz: "Wybór państwa na podstawie nazwy kraju",
          }}
        >
          <div
            className={`flex items-center justify-center drop-shadow-md  rounded-full ${color} antialiased size-28 text-white font-semibold text-4xl shadow-[inset_0px_0px_10px_10px_#00000024] my-3 cursor-pointer transition-all hover:shadow-[inset_0px_0px_15px_15px_#00000040]`}
          >
            2
          </div>
        </NavLink>
        <div className="flex flex-col justify-center items-center gap-3">
          <div className={`size-7 ${color} rounded-full drop-shadow-md `}></div>
          <div
            className={`size-7 ${color} mr-5 rounded-full drop-shadow-md `}
          ></div>
          <div className={`size-7 ${color} rounded-full drop-shadow-md `}></div>
        </div>
        <NavLink
          to={`/quiz/${levelTitle.toLowerCase()}`}
          state={{
            levelTitle: levelTitle,
            typeQuiz: "Wybór państwa na podstawie stolicy kraju",
          }}
        >
          <div
            className={`flex items-center justify-center drop-shadow-md  rounded-full ${color} antialiased size-28 text-white font-semibold text-4xl shadow-[inset_0px_0px_10px_10px_#00000024] my-3 cursor-pointer transition-all hover:shadow-[inset_0px_0px_15px_15px_#00000040]`}
          >
            3
          </div>
        </NavLink>
        <br />
      </div>
      <div>
        <ContinentSVG color={colorMap} continentProp={levelTitle} />
      </div>
    </div>
  );
}
