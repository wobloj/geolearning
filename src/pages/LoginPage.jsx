import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEarthAmerica,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="font-monts bg-default bg-blue-100 bg-opacity-5 h-screen">
      <NavLink
        to={"/"}
        className="absolute left-5 top-5 flex justify-center items-center gap-2 transition-colors hover:text-red-700"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
        Powrót
      </NavLink>
      <div className="flex flex-col items-center pb-36 pt-24 gap-2">
        <FontAwesomeIcon className="w-10 h-10" icon={faEarthAmerica} />
        <p className="text-4xl font-bold">Logowanie</p>
      </div>
      <div className="flex flex-col items-center gap-10">
        <input
          className=" text-center border-2 border-blue-400 w-80 h-10 focus:outline-none"
          placeholder="address@email.com"
          type="email"
          name="email"
          id="email"
        />
        <input
          className="text-center border-2 border-blue-400 w-80 h-10 focus:outline-none"
          placeholder="hasło"
          type="password"
          name="password"
          id="password"
        />
        <button
          className=" py-2 px-4 bg-green-600 border-2 border-green-700"
          type="submit"
        >
          Logowanie
        </button>
        <p className=" text-red-500"></p>
      </div>
      <div className="flex justify-center items-center flex-col mt-32 gap-2">
        <p className="text-3xl font-bold">Nie masz konta?</p>
        <Link to={"/register"}>
          <p className=" text-blue-400">Zarejestruj się!</p>
        </Link>
      </div>
    </div>
  );
}
