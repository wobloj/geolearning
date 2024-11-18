import React, { useState } from "react";
import { registerUser } from "../firebase/services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEarthAmerica,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSubmit = (e) => {
    const points = {
      Europe: {
        level1: 0,
        level2: 0,
        level3: 0,
      },
      North_America: {
        level1: 0,
        level2: 0,
        level3: 0,
      },
      South_America: {
        level1: 0,
        level2: 0,
        level3: 0,
      },
      Africa: {
        level1: 0,
        level2: 0,
        level3: 0,
      },
      Asia: {
        level1: 0,
        level2: 0,
        level3: 0,
      },
      Oceania: {
        level1: 0,
        level2: 0,
        level3: 0,
      },
      World: {
        level1: 0,
        level2: 0,
        level3: 0,
      },
    };
    e.preventDefault();
    registerUser(email, password, username, points);
    navigate("/login");
  };
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
        <p className="text-4xl font-bold">Rejestracja</p>
      </div>
      <form className="flex flex-col items-center gap-10">
        <input
          className=" text-center border-2 border-blue-400 w-80 h-10 focus:outline-none"
          placeholder="address@email.com"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          value={email}
          name="email"
          id="email"
        />
        <input
          className=" text-center border-2 border-blue-400 w-80 h-10 focus:outline-none"
          placeholder="nazwa użytkownika"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          required
          value={username}
          name="username"
          id="username"
        />
        <input
          className="text-center border-2 border-blue-400 w-80 h-10 focus:outline-none"
          placeholder="hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          name="password"
          id="password"
        />
        <input
          className="text-center border-2 border-blue-400 w-80 h-10 focus:outline-none"
          placeholder="powtórz hasło"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
          type="password"
          name="repeatPassword"
          id="repeatPassword"
        />
        <button
          className="py-3 px-8 bg-white border-2 border-blue-400 transition-colors font-medium hover:bg-blue-100"
          type="submit"
          onClick={onSubmit}
        >
          Zarejestruj się
        </button>
        <p className=" text-red-500">{}</p>
      </form>
    </div>
  );
}
