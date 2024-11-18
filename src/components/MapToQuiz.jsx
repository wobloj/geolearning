import React, { useEffect, useState } from "react";

import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

import Loading from "./Loading";

import europe_geojson from "../geojson/europe.json";
import africa_geojson from "../geojson/africa.json";
import asia_geojson from "../geojson/asia.json";
import north_america_geojson from "../geojson/north_america.json";
import south_america_geojson from "../geojson/south_america.json";
import oceania_geojson from "../geojson/oceania.json";
import world_geojson from "../geojson/world.json";

export default function MapToQuiz({ region, sendSelectedCountry }) {
  const [geojson, setGeojson] = useState(null);

  useEffect(() => {
    const setupMap = async () => {
      console.log(region);
      switch (region) {
        case "europe":
          setGeojson(europe_geojson);
          console.log(europe_geojson);
          break;
        case "north america":
          console.log(region);
          setGeojson(north_america_geojson);
          break;
        case "south america":
          console.log(region);
          setGeojson(south_america_geojson);
          break;
        case "asia":
          console.log(region);
          setGeojson(asia_geojson);
          break;
        case "africa":
          console.log(region);
          setGeojson(africa_geojson);
          break;
        case "oceania":
          console.log(region);
          setGeojson(oceania_geojson);
          break;
        case "world":
          console.log(region);
          setGeojson(world_geojson);
          break;
        default:
          break;
      }
    };

    setupMap();
  }, [region]); // Będzie uruchamiać setupMap przy zmianie levelType

  return (
    <>
      {!geojson ? (
        <Loading />
      ) : (
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{}}
          className="bg-blue-300 border-2 border-black m-auto w-[70rem] h-[50rem]"
        >
          <ZoomableGroup center={[19, 51]} minZoom={1} maxZoom={15}>
            <Geographies geography={geojson}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    className="country stroke-[0.03px] stroke-white outline-none fill-green-800 transition-all hover:fill-green-900 hover:outline-none hover:cursor-pointer focus:fill-yellow-700 focus:stroke-[0.1px] focus:stroke-yellow-500"
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      console.log(region);
                      sendSelectedCountry(geo.properties.name_pl);
                    }}
                  />
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      )}
    </>
  );
}
