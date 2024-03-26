import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex justify-center pt-7">
      <NavLink to={`/`}>
        <div className="flex flex-col items-center w-fit">
          <h1 className="text-6xl pb-2 text-blue-400 font-bold">Geolearn</h1>
          <span className="h-px bg-gray-600 w-full"></span>
          <p className="text-3xl text-blue-900">Ucz się geografii</p>
        </div>
      </NavLink>
    </div>
  );
}
