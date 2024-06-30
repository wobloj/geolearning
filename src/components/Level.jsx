import React from "react";
import { Link } from "react-router-dom";

export default function Level({ color, levelTitle }) {
  return (
    <div className="flex flex-col items-center justify-center font-monts">
      <h1 className={`text-4xl py-5 font-semibold text-${color}`}>
        {levelTitle}
      </h1>
      <Link to={"/map"}>
        <div
          className={`flex items-center justify-center rounded-full ${color} antialiased size-28 text-white font-semibold text-4xl shadow-[inset_0px_0px_10px_10px_#00000024] my-3 cursor-pointer transition-all hover:shadow-[inset_0px_0px_15px_15px_#00000040]`}
        >
          1
        </div>
      </Link>
      <div className="flex flex-col justify-center items-center gap-3">
        <div className={`size-7 ${color} rounded-full`}></div>
        <div className={`size-7 ${color} ml-5 rounded-full`}></div>
        <div className={`size-7 ${color} rounded-full`}></div>
      </div>
      <Link to={"/quiz"}>
        <div
          className={`flex items-center justify-center rounded-full ${color} antialiased size-28 text-white font-semibold text-4xl shadow-[inset_0px_0px_10px_10px_#00000024] my-3 cursor-pointer transition-all hover:shadow-[inset_0px_0px_15px_15px_#00000040]`}
        >
          2
        </div>
      </Link>
      <div className="flex flex-col justify-center items-center gap-3">
        <div className={`size-7 ${color} rounded-full`}></div>
        <div className={`size-7 ${color} mr-5 rounded-full`}></div>
        <div className={`size-7 ${color} rounded-full`}></div>
      </div>
      <Link to={"/loading"}>
        <div
          className={`flex items-center justify-center rounded-full ${color} antialiased size-28 text-white font-semibold text-4xl shadow-[inset_0px_0px_10px_10px_#00000024] my-3 cursor-pointer transition-all hover:shadow-[inset_0px_0px_15px_15px_#00000040]`}
        >
          3
        </div>
      </Link>
      <br />
    </div>
  );
}
