import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Back from "../components/Back";
import Header from "../components/Header";

export default function Quiz() {
  const continents = [
    {
      name_en: "world",
      name_pl: "świat",
      coordinates: [0, 0],
    },
    {
      name_en: "europe",
      name_pl: "europa",
      coordinates: [19, 51],
    },
    {
      name_en: "africa",
      name_pl: "afryka",
      coordinates: [20, 6],
    },
    {
      name_en: "north america",
      name_pl: "ameryka północna",
      coordinates: [-97, 39],
    },
    {
      name_en: "south america",
      name_pl: "ameryka południowa",
      coordinates: [-72, -12],
    },
    {
      name_en: "asia",
      name_pl: "azja",
      coordinates: [68, 49],
    },
    {
      name_en: "oceania",
      name_pl: "oceania",
      coordinates: [105, -10],
    },
  ];

  return (
    <div className="w-full flex flex-col items-center min-h-screen pb-20 relative">
      <Header />
      <h1 className="text-3xl mt-5 mb-16 font-bold text-blue-400 drop-shadow-md">
        Mapa świata
      </h1>
      <nav className="flex gap-10 pb-9">
        {continents.map((continent) => (
          <NavLink
            key={continent.name_en}
            to={`/map/${continent.name_en}`}
            state={{
              continent: continent.name_en,
              coordinates: continent.coordinates,
            }}
            className={({ isActive }) => {
              return isActive
                ? "border-b-2 border-orange-700 text-orange-700"
                : "";
            }}
          >
            <p className="antialiased text-xl font-semibold hover:text-orange-700 capitalize">
              {continent.name_pl}
            </p>
          </NavLink>
        ))}
      </nav>
      <div className="flex justify-between w-11/12 gap-6">
        <Outlet />
      </div>
    </div>
  );
}
