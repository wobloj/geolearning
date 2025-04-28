import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import Navbar from "./Navbar";
import { UserContext } from "../context/UserContext";
import avatar from "../assets/avatar-default.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthEurope, faUser } from "@fortawesome/free-solid-svg-icons";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";
import DarkModeSwitcher from "./DarkModeSwitcher";

export default function Header() {
  const { username, setUsername, isLoggedIn, setIsLoggedIn } =
    useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        setUsername("");
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <header className="grid grid-cols-3 place-items-center pt-7 font-monts">
        {isLoggedIn ? (
          <NavLink to="/profile">
            <div className="bg-white flex flex-row items-center gap-4 border-2 border-blue-400 rounded-md py-4 px-8 cursor-pointer">
              <img
                className="p-1 border-2 border-blue-400 rounded-full w-8 h-8"
                src={avatar}
                alt="zdjecie avataru"
              />
              <p>{username}</p>
            </div>
          </NavLink>
        ) : (
          <div></div>
        )}

        <NavLink to={`/`}>
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
        </NavLink>
        <div className="flex flex-row items-center gap-5 justify-end">
          <DarkModeSwitcher />
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-white font-medium py-3 px-5 border-2 border-blue-400 rounded-md cursor-pointer hover:bg-blue-100 transition-colors"
            >
              Wylogowanie
            </button>
          ) : (
            <div className="flex flex-row items-center gap-5">
              <NavLink to={`/login`}>
                <div className="flex gap-2 items-center bg-white dark:bg-zinc-800 dark:text-white font-medium py-3 px-5 border-2 border-blue-400 rounded-md cursor-pointer hover:bg-blue-100 transition-colors">
                  Zaloguj się
                </div>
              </NavLink>
            </div>
          )}
        </div>
      </header>
      <div className="flex flex-col items-center mt-3">
        <Navbar />
      </div>
    </>
  );
}
