import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className="my-4">
        <ul className="flex flex-row gap-24">
          <li className="text-2xl cursor-pointer font-semibold text-blue-400 hover:text-blue-600">
            <NavLink to="/map">Mapa świata</NavLink>
          </li>
          <li className="text-2xl cursor-pointer font-semibold text-blue-400 hover:text-blue-600">
            Dzienny quiz
          </li>
          <li className="text-2xl cursor-pointer font-semibold text-blue-400 hover:text-blue-600">
            Placeholder 3
          </li>
        </ul>
      </nav>
    </>
  );
}
