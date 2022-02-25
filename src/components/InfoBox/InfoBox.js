import React from "react";
import { useGlobalContext } from "../../context";
import "./InfoBox.css";

const InfoBox = ({ title, numbers, active, total, ...props }) => {
  const { loading } = useGlobalContext();

  return (
    <div
      onClick={props.onClick}
      className={
        title === "recovered"
          ? "card green"
          : title === "deaths"
          ? " card red"
          : "card"
      }
    >
      <div className={active ? "card-active active" : "card-active"}></div>
      <p className="card__title">{title}</p>
      {loading ? (
        <h2 className="loading-donts">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </h2>
      ) : (
        <h2 className={numbers ? "card__numbers" : "card__numbers green"}>
          {numbers}
        </h2>
      )}
      <p className="card__total">{total} total</p>
    </div>
  );
};

export default InfoBox;
