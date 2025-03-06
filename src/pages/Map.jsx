import React, { useState, useRef, Suspense } from "react";
import { useLocation } from "react-router-dom";

import CountryDataTable from "../components/CountryDataTable";

import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";

import { Tooltip } from "react-tooltip";
import axios from "axios";

import world_geojson from "../geojson/world.json";
import europe_geojson from "../geojson/europe.json";
import asia_geojson from "../geojson/asia.json";
import africa_geojson from "../geojson/africa.json";
import oceania_geojson from "../geojson/oceania.json";
import na_geojson from "../geojson/north_america.json";
import sa_geojson from "../geojson/south_america.json";
import Loading from "../components/Loading";

export default function Map() {
  const [countryTooltip, setCountryTooltip] = useState("");
  const [countryCcn3, setCountryCcn3] = useState("");
  const [country, setCountry] = useState("");
  const [selected, setSelected] = useState(false);
  const [capital, setCapital] = useState(null);
  const [capitalCoordinates, setCapitalCoordinates] = useState([0, 0]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [countryData, setCountryData] = useState(null);
  const [selectedCountryId, setSelectedCountryId] = useState(null);

  const location = useLocation();
  const selectedCountry = useRef(null);

  const focused = () => {
    setSelected(true);
  };

  const notFocused = () => {
    setSelected(false);
    setDataLoaded(false);
  };

  const changeContinent = () => {
    switch (location.state.continent) {
      case "world":
        return world_geojson;
      case "europe":
        return europe_geojson;
      case "asia":
        return asia_geojson;
      case "africa":
        return africa_geojson;
      case "oceania":
        return oceania_geojson;
      case "north america":
        return na_geojson;
      case "south america":
        return sa_geojson;
      default:
        return world_geojson;
    }
  };

  return (
    <>
      <Tooltip offset={12} float="false" anchorSelect=".country">
        {countryTooltip}
      </Tooltip>
      <ComposableMap
        projection="geoEqualEarth"
        className="bg-map bg-orange-200 border-2 border-black m-auto h-1/2 w-[calc(100%-15rem)]"
      >
        <ZoomableGroup
          center={location.state.coordinates}
          zoom={1}
          maxZoom={16}
        >
          <Geographies geography={changeContinent()}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  ref={selectedCountry}
                  onFocus={focused}
                  onBlur={notFocused}
                  className={`country stroke-[0.07px] stroke-black outline-none transition-all hover:fill-orange-300 hover:outline-none hover:cursor-pointer ${
                    selectedCountryId === geo.properties.iso_n3_eh
                      ? "fill-orange-300"
                      : "fill-orange-200"
                  }`}
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={async () => {
                    try {
                      setDataLoaded(false);
                      const response = await axios.get(
                        `https://restcountries.com/v3.1/name/${geo.properties.admin}`
                      );

                      setCountryData(response.data);

                      let countryName = "";
                      let countryCapital = "";
                      let countryCoordinates = [];
                      let countryCcn3 = "";

                      for (const country of response.data) {
                        if (country.ccn3 === geo.properties.iso_n3_eh) {
                          countryName = geo.properties.name_pl;
                          countryCapital = country.capital;
                          countryCoordinates =
                            country.capitalInfo.latlng.reverse();
                          countryCcn3 = geo.properties.iso_n3_eh;
                          break;
                        }
                      }

                      setCountry(countryName);
                      setCapital(countryCapital);
                      setCapitalCoordinates(countryCoordinates);
                      setCountryCcn3(countryCcn3);
                      setSelectedCountryId(geo.properties.iso_n3_eh);

                      setDataLoaded(true);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                  onMouseEnter={() => {
                    setCountryTooltip(geo.properties.name_pl);
                  }}
                  onMouseLeave={() => {
                    setCountryTooltip("");
                  }}
                  // TODO: Podczas przesuwania mapy maja nie znikać podświetlenia oraz tekst ze stolica kraju
                />
              ))
            }
          </Geographies>
          {selected && dataLoaded ? (
            <Marker coordinates={capitalCoordinates}>
              <circle r={0.2} fill="#F53" />
              <text
                fill="#000"
                textAnchor="middle"
                className="text-[4.5px] -translate-y-[0.5px] select-none"
              >
                {capital}
              </text>
            </Marker>
          ) : (
            ""
          )}
        </ZoomableGroup>
      </ComposableMap>
      {countryData === null ? (
        ""
      ) : (
        <Suspense fallback={<Loading />}>
          <CountryDataTable
            ccn3={countryCcn3}
            countryData={countryData}
            countryName={country}
          />
        </Suspense>
      )}
    </>
  );
}
