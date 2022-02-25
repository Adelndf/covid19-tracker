import React, { useEffect, useState } from "react";
import "./App.css";
import { Graph, Header, InfoBox, Map, Table } from "./components";
import { useGlobalContext } from "./context";
import { prettyPrintState, sortData } from "./untils/until";
import "leaflet/dist/leaflet.css"; // importent! for map

const App = () => {
  const [countries, setCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const { selectedCountry, setCasesType, casesType } = useGlobalContext();
  const [mapCountries, setMapCountries] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("https://disease.sh/v3/covid-19/countries");
      const data = await res.json();

      const countries = data.map((country) => ({
        name: country.country,
        value: country.countryInfo.iso2,
      }));
      const sortedData = sortData(data);
      setTableData(sortedData);
      setCountries(countries);
      setMapCountries(data);
    };
    getData();
  }, []);

  const {
    allCases,
    todayCases,
    allDeaths,
    allRecovered,
    todayDeaths,
    todayRecovered,
  } = selectedCountry;

  return (
    <div className="app">
      <div className="app__wrapper">
        <div className="app__left">
          <Header countries={countries} />

          <div className="app__cards">
            <InfoBox
              active={casesType === "cases"}
              onClick={(e) => setCasesType("cases")}
              title="cases"
              numbers={prettyPrintState(todayCases)}
              total={prettyPrintState(allCases)}
            />
            <InfoBox
              active={casesType === "recovered"}
              onClick={(e) => setCasesType("recovered")}
              title="recovered"
              numbers={prettyPrintState(todayRecovered)}
              total={prettyPrintState(allRecovered)}
            />
            <InfoBox
              active={casesType === "deaths"}
              onClick={(e) => setCasesType("deaths")}
              title="deaths"
              numbers={prettyPrintState(todayDeaths)}
              total={prettyPrintState(allDeaths)}
            />
          </div>

          <Map countries={mapCountries} />
        </div>
        <div className="app__right">
          <Table countries={tableData} />
          <Graph />
        </div>
      </div>
    </div>
  );
};

export default App;
