import React from "react";
import { NavLink } from "react-router-dom";
import ContinentSVG from "./ContinentSVG";

export default function Level({ color, colorMap, levelTitle, onClick }) {
  return (
    <div className="font-monts grid grid-cols-3 items-center">
      <div></div>
      <div className="flex flex-col items-center justify-center">
        <h1
          className={` flex flex-row items-center gap-5 text-4xl py-5 font-semibold text-black`}
        >
          {levelTitle}
        </h1>
        <div
          className={`flex items-center justify-center drop-shadow-md  rounded-full ${color} antialiased size-28 text-white font-semibold text-4xl shadow-[inset_0px_0px_10px_10px_#00000024] my-3 cursor-pointer transition-all hover:shadow-[inset_0px_0px_15px_15px_#00000040]`}
          onClick={() => onClick(1)}
        >
          1
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
          <div className={`size-7 ${color} rounded-full drop-shadow-md `}></div>
          <div
            className={`size-7 ${color} ml-5 rounded-full drop-shadow-md `}
          ></div>
          <div className={`size-7 ${color} rounded-full drop-shadow-md `}></div>
        </div>
        <div
          className={`flex items-center justify-center drop-shadow-md  rounded-full ${color} antialiased size-28 text-white font-semibold text-4xl shadow-[inset_0px_0px_10px_10px_#00000024] my-3 cursor-pointer transition-all hover:shadow-[inset_0px_0px_15px_15px_#00000040]`}
          onClick={() => onClick(2)}
        >
          2
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
          <div className={`size-7 ${color} rounded-full drop-shadow-md `}></div>
          <div
            className={`size-7 ${color} mr-5 rounded-full drop-shadow-md `}
          ></div>
          <div className={`size-7 ${color} rounded-full drop-shadow-md `}></div>
        </div>
        <div
          className={`flex items-center justify-center drop-shadow-md  rounded-full ${color} antialiased size-28 text-white font-semibold text-4xl shadow-[inset_0px_0px_10px_10px_#00000024] my-3 cursor-pointer transition-all hover:shadow-[inset_0px_0px_15px_15px_#00000040]`}
          onClick={() => onClick(3)}
        >
          3
        </div>
        <br />
      </div>
      <div>
        <ContinentSVG color={colorMap} continentProp={levelTitle} />
      </div>
    </div>
  );
}
