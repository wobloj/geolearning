import React from "react";
import { NavLink } from "react-router-dom";
import avatar from "../assets/avatar-default.png";

export default function Header() {
  return (
    <div className="grid grid-cols-3 place-items-center pt-7">
      <div className="bg-white flex flex-row items-center gap-4 border-2 border-blue-400 rounded-md py-4 px-8 cursor-pointer">
        <img
          className="p-1 border-2 border-blue-400 rounded-full w-8 h-8"
          src={avatar}
          alt="zdjecie avataru"
        />
        <p>Nazwa</p>
      </div>
      <NavLink to={`/`}>
        <div className="flex flex-col items-center w-fit">
          <h1 className="text-6xl pb-2 text-blue-400 font-bold">Geolearn</h1>
          <span className="h-px bg-gray-600 w-full"></span>
          <p className="text-3xl text-blue-900">Ucz się geografii</p>
        </div>
      </NavLink>
      <NavLink to={`/login`}>
        <div className="bg-white font-medium py-3 px-5 border-2 border-blue-400 rounded-md cursor-pointer">
          Zaloguj się
        </div>
      </NavLink>
    </div>
  );
}
