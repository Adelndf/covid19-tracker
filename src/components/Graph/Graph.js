import React, { useEffect, useState } from "react";
import "./Graph.css";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; //have to import it
import "react-chartjs-2"; //have to import it
import numeral from "numeral";
import { useGlobalContext } from "../../context";

const graphData = "https://disease.sh/v3/covid-19/historical/all?lastdays=90";

const options = {
  plugins: {
    legend: {
      display: false,
    },

    tooltip: {
      mode: "index",
      intersect: false,
      callback: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      x: {
        id: "x",
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
      y: {
        id: "y",
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    },
  },
};

const buildChartData = (data, casesType = "cases") => {
  const chartData = [];
  let lastDataPoint;

  for (let date in data.cases) {
    if (lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: data["cases"][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

const Graph = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { casesType } = useGlobalContext();

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const res = await fetch(graphData);
      const data = await res.json();
      const chartData = buildChartData(data, casesType);
      setData(chartData);
      setLoading(false);
    };
    getData();
  }, [casesType]);

  return (
    <div className="graph">
      <h3 className="graph__title">last 90 days</h3>
      {!loading ? (
        <Line
          options={options}
          data={{
            datasets: [
              {
                backgroundColor: "red",
                borderColor: "#fff",
                data: data,
              },
            ],
          }}
        />
      ) : (
        <h2 className="loading-donts">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </h2>
      )}
    </div>
  );
};

export default Graph;
