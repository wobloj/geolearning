import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthEurope } from "@fortawesome/free-solid-svg-icons";

export default function Logo() {
  return (
    <div className="flex flex-col items-center w-fit">
      <span>
        <h1 className="text-6xl mb-1 text-blue-400 font-bold">
          Ge
          <FontAwesomeIcon className=" text-5xl" icon={faEarthEurope} />
          learn
        </h1>
      </span>
      <span className="h-px bg-gray-600 w-full"></span>
      <p className="text-3xl mt-1 text-blue-900 dark:text-blue-600">
        Ucz się geografii
      </p>
    </div>
  );
}
