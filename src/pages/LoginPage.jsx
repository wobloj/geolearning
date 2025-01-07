import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEarthAmerica,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "../firebase/services";

import { UserContext } from "../context/UserContext.jsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const context = useContext(UserContext);

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password, context);
      navigate("/");
    } catch (err) {
      setError(err.message); // Wyświetlenie błędu
    }
  };
  // TODO: Wyświetlać ma się powiadomienie jeżeli wpisane zostało błędne email lub hasło
  // TODO: Dodać opcję resetu hasła
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
      <form className="flex flex-col items-center gap-10">
        <input
          className=" text-center border-2 rounded-md border-blue-400 w-80 h-10 transition-colors focus:outline-none focus:border-blue-600"
          placeholder="address@email.com"
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          name="email"
          id="email"
        />
        <input
          className="text-center border-2 rounded-md border-blue-400 w-80 h-10 transition-colors focus:outline-none focus:border-blue-600 before:content-['hasło']"
          placeholder="hasło"
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          name="password"
          id="password"
        />
        <button
          className="py-3 px-8 bg-white border-2 border-blue-400 transition-colors font-medium hover:bg-blue-100"
          onClick={onLogin}
        >
          Zaloguj
        </button>
        <Link to={"/reset"}>
          <p className=" text-blue-500 transition-colors hover:text-blue-700">
            Zresetuj hasło
          </p>
        </Link>
        <p className=" text-red-500"></p>
      </form>
      <div className="flex justify-center items-center flex-col mt-32 gap-2">
        <p className="text-3xl font-medium">Nie masz konta?</p>
        <Link to={"/register"}>
          <p className=" text-blue-400 transition-colors hover:text-blue-600">
            Zarejestruj się!
          </p>
        </Link>
      </div>
    </div>
  );
}
