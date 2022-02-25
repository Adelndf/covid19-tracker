import React from "react";
import "./Table.css";
import numeral from "numeral";

const Table = ({ countries }) => {
  return (
    <div className="table">
      <h3 className="table__title">live cases by country</h3>
      {countries.map((countrys) => {
        const { country, cases } = countrys;
        return (
          <div className="table__item" key={country}>
            <p className="table__country">{country}</p>
            <p className="table__cases">
              <strong>{numeral(cases).format("0,0")}</strong>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Table;
