import React, { useEffect, useState } from "react";
import Navbar from "../../../components/CenterPage/Navbar";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import CanvasJSReact from "../../../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const axios = require("axios");
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function Chart() {
  const [data, setData] = useState([]);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const options = {
    theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Event Profit",
    },
    axisY: {
      title: "Profit ( in VNĐ )",
      includeZero: false,
    },
    data: [
      {
        type: "area",
        dataPoints: data
          .sort(function (a, b) {
            return a.profit - b.profit;
          })
          .map((item) => {
            if (item.profit === null) return { label: item.event_name, y: 0 };
            else return { label: item.event_name, y: parseInt(item.profit) };
          }),
      },
    ],
  };
  useEffect(() => {
    axios
      .post("/finance-center", {
        center_username: sessionStorage.getItem("account_username"),
      })
      .then((res) => {
        let thu = 0;
        let chi = 0;
        if (res.data.length > 0) {
          res.data.forEach((item) => {
            if (item.finance_spending > 0) thu = thu + item.finance_spending;
            else if (item.finance_spending < 0)
              chi = chi + item.finance_spending;
          });
          setIncome(thu);
          setExpenses(chi);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .post("/finance-profit", {
        center_username: sessionStorage.getItem("account_username"),
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="app">
      <Navbar />
      <main>
        <Header />
        <div className="container mt-3 mb-5">
          <div className="row mb-5">
            <div className="col-12">
              <div className="card" style={{ width: "100%" }}>
                <div className="card-body d-flex justify-content-between">
                  <div>
                    <strong>Income ( VNĐ )</strong>
                    <hr />
                    <h4>
                      <AttachMoneyIcon /> {numberWithCommas(income)}
                    </h4>
                  </div>
                  <div>
                    <strong>Expenses ( VNĐ )</strong>
                    <hr />
                    <h4>
                      <MoneyOffIcon /> {numberWithCommas(expenses)}
                    </h4>
                  </div>
                  <div>
                    <strong>Profit ( VNĐ )</strong>
                    <hr />
                    <h4>
                      <MonetizationOnIcon />{" "}
                      {numberWithCommas(income + expenses)}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <CanvasJSChart options={options} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default Chart;
