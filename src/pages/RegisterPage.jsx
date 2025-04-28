import React, { useCallback, useState } from "react";
import { registerUser } from "../firebase/services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEarthAmerica,
  faChevronLeft,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import PopUp from "../components/PopUp";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [passwordValidation, setPasswordValidation] = useState([
    { length: false },
    { specialCapital: false },
    { same: false },
  ]);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [correctPasswordValid, setCorrectPasswordValid] = useState(false);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [isVisiblePasswordVal, setIsVisiblePasswordVal] = useState(false);

  const onSubmit = (e) => {
    const points = {
      europe: {
        flags: {
          open: 0,
          closed: 0,
          map: 0,
        },
        country: {
          open: 0,
          closed: 0,
          map: 0,
        },
        capital: {
          open: 0,
          closed: 0,
          map: 0,
        },
      },
      north_america: {
        flags: {
          open: 0,
          closed: 0,
          map: 0,
        },
        country: {
          open: 0,
          closed: 0,
          map: 0,
        },
        capital: {
          open: 0,
          closed: 0,
          map: 0,
        },
      },
      south_america: {
        flags: {
          open: 0,
          closed: 0,
          map: 0,
        },
        country: {
          open: 0,
          closed: 0,
          map: 0,
        },
        capital: {
          open: 0,
          closed: 0,
          map: 0,
        },
      },
      africa: {
        flags: {
          open: 0,
          closed: 0,
          map: 0,
        },
        country: {
          open: 0,
          closed: 0,
          map: 0,
        },
        capital: {
          open: 0,
          closed: 0,
          map: 0,
        },
      },
      asia: {
        flags: {
          open: 0,
          closed: 0,
          map: 0,
        },
        country: {
          open: 0,
          closed: 0,
          map: 0,
        },
        capital: {
          open: 0,
          closed: 0,
          map: 0,
        },
      },
      oceania: {
        flags: {
          open: 0,
          closed: 0,
          map: 0,
        },
        country: {
          open: 0,
          closed: 0,
          map: 0,
        },
        capital: {
          open: 0,
          closed: 0,
          map: 0,
        },
      },
      world: {
        flags: {
          open: 0,
          closed: 0,
          map: 0,
        },
        country: {
          open: 0,
          closed: 0,
          map: 0,
        },
        capital: {
          open: 0,
          closed: 0,
          map: 0,
        },
      },
    };
    e.preventDefault();
    try {
      registerUser(email, password, username, points);
      navigate("/login");
    } catch (err) {
      setIsError(true);
      setError(err.message);
    }
  };

  useCallback(() => {
    validatePassword(password, repeatPassword);
  }, [password, repeatPassword]);

  const validatePassword = (password, repeatPassword) => {
    const passwordLength = password.length >= 6;
    const passwordSpecialCapital =
      /[A-Z]/.test(password) && /[!@#$%^&*.,]/.test(password);
    const passwordSame =
      password !== "" && repeatPassword !== "" && password === repeatPassword;

    setPasswordValidation([
      { length: passwordLength },
      { specialCapital: passwordSpecialCapital },
      { same: passwordSame },
    ]);

    if (passwordLength && passwordSpecialCapital && passwordSame) {
      setCorrectPasswordValid(true);
    } else {
      setCorrectPasswordValid(false);
    }
  };

  return (
    <div className="font-monts bg-default bg-blue-100 bg-opacity-5 h-screen flex items-center flex-col relative">
      <NavLink
        to={"/"}
        className="absolute left-5 top-5 flex justify-center items-center gap-2 transition-colors hover:text-red-700"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
        Powrót
      </NavLink>
      <div className="flex flex-col items-center pb-24 pt-24 gap-2">
        <FontAwesomeIcon className="w-10 h-10" icon={faEarthAmerica} />
        <p className="text-4xl font-bold">Rejestracja</p>
      </div>
      <form className="flex flex-col items-center gap-10">
        <input
          className="rounded-md text-center border-2 border-blue-400 w-80 h-10 focus:outline-none"
          placeholder="address@email.com"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          value={email}
          name="email"
          id="email"
        />
        <input
          className="rounded-md text-center border-2 border-blue-400 w-80 h-10 focus:outline-none"
          placeholder="nazwa użytkownika"
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
          value={username}
          name="username"
          id="username"
        />
        <input
          className={`rounded-md text-center border-2 transition-colors ${
            correctPasswordValid ? "border-green-400" : "border-blue-400"
          }  w-80 h-10 focus:outline-none`}
          placeholder="hasło"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value, repeatPassword); // sprawdzaj od razu
          }}
          onFocus={() => {
            setIsVisiblePasswordVal(true);
          }}
          onBlur={() => {
            setIsVisiblePasswordVal(false);
          }}
          required
          type="password"
          name="password"
          id="password"
        />
        <input
          className={`rounded-md text-center border-2 transition-colors ${
            correctPasswordValid ? "border-green-400" : "border-blue-400"
          }  w-80 h-10 focus:outline-none`}
          placeholder="powtórz hasło"
          value={repeatPassword}
          onFocus={() => {
            setIsVisiblePasswordVal(true);
          }}
          onBlur={() => {
            setIsVisiblePasswordVal(false);
          }}
          onChange={(e) => {
            setRepeatPassword(e.target.value);
            validatePassword(password, e.target.value); // sprawdzaj od razu
          }}
          required
          type="password"
          name="repeatPassword"
          id="repeatPassword"
        />
        <button
          className="rounded-md py-3 px-8 bg-white border-2 border-blue-400 transition-colors font-medium hover:bg-blue-100"
          type="submit"
          onClick={onSubmit}
        >
          Zarejestruj się
        </button>
        {isError && (
          <PopUp>
            <p className="text-red-500">{error}</p>
          </PopUp>
        )}
      </form>
      <div
        className={`flex flex-col items-center bg-white mt-10 text-sm border-[1px] border-blue-400 rounded-md p-5 ${
          isVisiblePasswordVal ? "visible" : "invisible"
        }`}
      >
        <ul className="flex flex-col items-start gap-2">
          <li
            className={`flex items-center gap-2 transition-colors duration-300 ${
              passwordValidation[0].length ? "text-green-400" : "text-red-400"
            }`}
          >
            <FontAwesomeIcon
              icon={passwordValidation[0].length ? faCheck : faXmark}
            />
            Hasło musi mieć co najmniej 6 znaków.
          </li>
          <li
            className={`flex items-center gap-2 transition-colors duration-300 ${
              passwordValidation[1].specialCapital
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            <FontAwesomeIcon
              icon={passwordValidation[1].specialCapital ? faCheck : faXmark}
            />
            Hasło musi zawierać co najmniej jedną wielką literę oraz jeden znak
            specjalny.
          </li>
          <li
            className={`flex items-center gap-2 transition-colors duration-300 ${
              passwordValidation[2].same ? "text-green-400" : "text-red-400"
            }`}
          >
            <FontAwesomeIcon
              icon={passwordValidation[2].same ? faCheck : faXmark}
            />
            Hasła muszą być takie same.
          </li>
        </ul>
      </div>
    </div>
  );
}
