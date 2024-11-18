import React, { useState } from "react";
import Timer from "./Timer.jsx";

export default function ProgressBar(props) {
  const { progress, quantityOfQuestions, points } = props;

  return (
    <>
      <div className="font-monts w-screen h-3 absolute top-0 left-0 bg-gray-300">
        <div
          className="flex items-center bg-green-400 h-full transition-[width] duration-500"
          style={{
            width: `${((progress + 1) / quantityOfQuestions) * 100}%`,
          }}
        ></div>
      </div>
      <p className="pt-5 text-2xl font-semibold">{`${
        progress + 1
      } / ${quantityOfQuestions}`}</p>
      <Timer />
      <p>{points}</p>
    </>
  );
}
