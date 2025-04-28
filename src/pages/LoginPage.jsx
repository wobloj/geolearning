import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEarthAmerica,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "../firebase/services";

import { UserContext } from "../context/UserContext.jsx";
import PopUp from "../components/PopUp.jsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [isError, setIsError] = useState(false);

  const context = useContext(UserContext);

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password, context);
      navigate("/");
    } catch (err) {
      setIsError(true);
    }
  };

  const validateEmail = (email) => {
    const re =
      /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
    if (re.test(String(email).toLowerCase()) || email === "") {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  // TODO: Wyświetlać ma się powiadomienie jeżeli wpisane zostało błędne email lub hasło
  return (
    <div className="flex flex-col items-center justify-center font-monts bg-default bg-blue-100 bg-opacity-5 h-screen">
      <NavLink
        to={"/"}
        className="absolute left-5 top-5 flex justify-center items-center gap-2 transition-colors hover:text-red-700"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
        Powrót
      </NavLink>
      <div className="flex flex-col items-center pb-24 pt-24 gap-2">
        <FontAwesomeIcon className="w-10 h-10" icon={faEarthAmerica} />
        <p className="text-4xl font-bold">Logowanie</p>
      </div>
      <form className="flex flex-col items-center">
        <input
          className=" text-center border-2 rounded-md border-blue-400 w-80 h-10 transition-colors focus:outline-none focus:border-blue-600"
          placeholder="address@email.com"
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          name="email"
          id="email"
          onBlur={(e) => validateEmail(e.target.value)}
        />
        {emailError && (
          <p className="text-sm text-red-400">
            Nieprawidłowy format adresu email
          </p>
        )}
        <input
          className="text-center border-2 mt-5 rounded-md border-blue-400 w-80 h-10 transition-colors focus:outline-none focus:border-blue-600 before:content-['hasło']"
          placeholder="hasło"
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          name="password"
          id="password"
        />
        <button
          className="py-3 px-8 my-10 bg-white border-2 border-blue-400 rounded-md transition-colors font-medium hover:bg-blue-100"
          onClick={onLogin}
        >
          Zaloguj
        </button>
      </form>
      {isError && (
        <PopUp>
          <p className="text-red-500">Błędny email lub hasło</p>
        </PopUp>
      )}

      <div className="flex justify-center items-top flex-row gap-10">
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl font-medium">Nie pamiętasz hasła?</p>
          <Link to={"/reset-password"}>
            <p className=" text-blue-500 transition-colors hover:text-blue-700 mb-5">
              Przypomnij hasło
            </p>
          </Link>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl font-medium">Nie masz konta?</p>
          <Link to={"/register"}>
            <p className=" text-blue-400 transition-colors hover:text-blue-600">
              Zarejestruj się!
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
