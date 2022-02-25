import React from "react";
import { useGlobalContext } from "../../context";
import "./Header.css";

const Header = ({ countries }) => {
  const { opt, setOpt } = useGlobalContext();

  const onOptChange = async (e) => {
    const value = e.target.value;
    setOpt(value);
  };

  return (
    <div className="header">
      <h1>covid-19 tracker</h1>
      <select onChange={onOptChange} value={opt} className="header__select">
        <option value="worldwide">worldwide</option>
        {countries.map((item, i) => (
          <option value={item.value} key={i}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Header;
