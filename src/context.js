import React, { createContext, useContext, useEffect, useState } from "react";

// create the context api
const AppContext = createContext();

// Wrapp the App with this AppProvider to access
// all the states & functions any where ..
const AppProvider = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [opt, setOpt] = useState("worldwide");
  const [loading, setLoading] = useState(false);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    setLoading(true);

    const URL =
      opt === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${opt}`;

    const getData = async () => {
      await fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          const {
            cases,
            todayCases,
            todayDeaths,
            deaths,
            todayRecovered,
            recovered,
          } = data;
          const country = {
            todayDeaths,
            allDeaths: deaths,
            todayRecovered,
            allRecovered: recovered,
            allCases: cases,
            todayCases,
          };
          setSelectedCountry(country);
          setLoading(false);
        });
    };
    getData();
  }, [opt]);

  return (
    <AppContext.Provider
      value={{
        opt,
        setOpt,
        selectedCountry,
        loading,
        casesType,
        setCasesType,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
