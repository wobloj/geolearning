import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function Back({ to }) {
  return (
    <NavLink
      to={to}
      className="absolute left-5 top-5 flex justify-center items-center gap-2 transition-colors hover:text-red-700 z-50"
    >
      <FontAwesomeIcon icon={faChevronLeft} />
      Powrót
    </NavLink>
  );
}
