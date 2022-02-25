import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";
import { useGlobalContext } from "../context";

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 300,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 500,
  },
  deaths: {
    hex: "blue",
    multiplier: 900,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];
  // ES6 =>
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const prettyPrintState = (state) =>
  state ? `+${numeral(state).format("0.0a")}` : 0;

// Draw circles on map
export const showDataOnMap = (data, casesType) => {
  return data.map((country) => (
    <Circle
      key={country.cases + country.active}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
};
