import React from "react";
import { useState, useEffect } from "react";
import Europe from "./svg/EuropeSVG";
import Africa from "./svg/AfricaSVG";
import NorthAmerica from "./svg/NorthAmericaSVG";
import SouthAmerica from "./svg/SouthAmericaSVG";
import Oceania from "./svg/OceaniaSVG";
import Asia from "./svg/AsiaSVG";
import World from "./svg/WorldSVG";

export default function ContinentSVG({ color, continentProp }) {
  const [continent, setContinent] = useState();
  useEffect(() => {
    switch (continentProp) {
      case "Europa":
        setContinent(() => <Europe />);
        break;
      case "Afryka":
        setContinent(() => <Africa />);
        break;
      case "Ameryka Północna":
        setContinent(() => <NorthAmerica />);
        break;
      case "Ameryka Południowa":
        setContinent(() => <SouthAmerica />);
        break;
      case "Oceania":
        setContinent(() => <Oceania />);
        break;
      case "Azja":
        setContinent(() => <Asia />);
        break;
      case "Świat":
        setContinent(() => <World />);
        break;
      default:
        setContinent(() => <World />);
        break;
    }
  }, [continentProp]);

  return <div className={`${color}`}>{continent}</div>;
}
