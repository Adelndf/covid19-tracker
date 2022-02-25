import React, { useEffect, useState } from "react";
import "./Map.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { useGlobalContext } from "../../context";
import "leaflet/dist/leaflet.css"; // importent! for map
import { showDataOnMap } from "../../untils/until";

const Map = ({ countries }) => {
  const { opt, casesType } = useGlobalContext();
  const [zoom, setZoom] = useState(2);
  const [center, setCenter] = useState({ lat: 34.80746, long: -40.4796 });

  useEffect(() => {
    const ulr =
      opt === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${opt}`;
    const getData = async () => {
      await fetch(ulr)
        .then((res) => res.json())
        .then((data) => {
          if (opt === "worldwide") {
            setCenter({ lat: 34.80746, long: -40.4796 });
            setZoom(2);
          }
          if (opt !== "worldwide") {
            setCenter(data.countryInfo);
            setZoom(4);
          }
        });
    };
    getData();
  }, [opt]);

  const { lat, long } = center;

  return (
    <div className="map">
      <MapContainer center={[lat, long]} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataOnMap(countries, casesType)}
      </MapContainer>
    </div>
  );
};

export default Map;
