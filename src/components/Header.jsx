import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import Navbar from "./Navbar";
import { UserContext } from "../context/UserContext";
import avatar from "../assets/avatars/avatar-default.png";
import DarkModeSwitcher from "./DarkModeSwitcher";
import ButtonBlue from "./ButtonBlue";
import Logo from "./Logo";

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
      <header className="grid grid-cols-3 place-items-center pt-7 w-full">
        {isLoggedIn ? (
          <NavLink to="/profile">
            <div className="bg-backgroundlight dark:bg-backgrounddark flex flex-row items-center gap-4 border-2 border-blue-400 rounded-md py-4 px-8 cursor-pointer">
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
          <Logo />
        </NavLink>
        <div className="flex flex-row items-center gap-5 justify-end">
          <DarkModeSwitcher />
          {isLoggedIn ? (
            <ButtonBlue style={"h-12"} onClick={handleLogout}>
              Wyloguj się
            </ButtonBlue>
          ) : (
            <div className="flex flex-row items-center gap-5">
              <NavLink to={`/login`}>
                <ButtonBlue style={"h-12"}>Zaloguj się</ButtonBlue>
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
