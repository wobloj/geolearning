import React, { useState } from "react";

import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

import europe_geojson from "../geojson/europe.json";

export default function MapToQuiz({ sendSelectedCountry }) {
  return (
    <>
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{}}
        className="bg-blue-300 border-2 border-black m-auto w-[70rem] h-[50rem]"
      >
        <ZoomableGroup center={[19, 51]} minZoom={1} maxZoom={15}>
          <Geographies geography={europe_geojson}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  className="country stroke-[0.03px] stroke-white outline-none fill-green-800 transition-all hover:fill-green-900 hover:outline-none hover:cursor-pointer focus:fill-yellow-700 focus:stroke-[0.1px] focus:stroke-yellow-500"
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => {
                    sendSelectedCountry(geo.properties.name_pl);
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
}
