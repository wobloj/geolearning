import React, { useState } from "react";
import { registerUser } from "../firebase/services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEarthAmerica,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import PopUp from "../components/PopUp";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);

  const onSubmit = (e) => {
    const points = {
      europe: {
        flags: {
          open:0,
          closed:0,
          map:0,
        },
        country:{
          open:0,
          closed:0,
          map:0,
        },
        capital: {
          open:0,
          closed:0,
          map:0,
        },
      },
      north_america: {
        flags: {
          open:0,
          closed:0,
          map:0,
        },
        country:{
          open:0,
          closed:0,
          map:0,
        },
        capital: {
          open:0,
          closed:0,
          map:0,
        },
      },
      south_america: {
        flags: {
          open:0,
          closed:0,
          map:0,
        },
        country:{
          open:0,
          closed:0,
          map:0,
        },
        capital: {
          open:0,
          closed:0,
          map:0,
        },
      },
      africa: {
        flags: {
          open:0,
          closed:0,
          map:0,
        },
        country:{
          open:0,
          closed:0,
          map:0,
        },
        capital: {
          open:0,
          closed:0,
          map:0,
        },
      },
      asia: {
        flags: {
          open:0,
          closed:0,
          map:0,
        },
        country:{
          open:0,
          closed:0,
          map:0,
        },
        capital: {
          open:0,
          closed:0,
          map:0,
        },
      },
      oceania: {
        flags: {
          open:0,
          closed:0,
          map:0,
        },
        country:{
          open:0,
          closed:0,
          map:0,
        },
        capital: {
          open:0,
          closed:0,
          map:0,
        },
      },
      world: {
        flags: {
          open:0,
          closed:0,
          map:0,
        },
        country:{
          open:0,
          closed:0,
          map:0,
        },
        capital: {
          open:0,
          closed:0,
          map:0,
        },
      },
    };
    e.preventDefault();
    try{
      registerUser(email, password, username, points);
      navigate("/login");
    }catch(err){
      setIsError(true);
      setError(err.message);
    }
    
  };
  //TODO: Hasło musi mieć co najmniej 6 znaków
  return (
    <div className="font-monts bg-default bg-blue-100 bg-opacity-5 h-screen">
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
          onChange={(e) => setUsername(e.target.value)}
          required
          value={username}
          name="username"
          id="username"
        />
        <input
          className="rounded-md text-center border-2 border-blue-400 w-80 h-10 focus:outline-none"
          placeholder="hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          name="password"
          id="password"
        />
        <input
          className="rounded-md text-center border-2 border-blue-400 w-80 h-10 focus:outline-none"
          placeholder="powtórz hasło"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
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
        {isError &&<PopUp>
          <p className="text-red-500">{error}</p>
        </PopUp>}
        
      </form>
    </div>
  );
}
