import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Navbar from "../../../components/AdminPage/Navbar";
import Footer from "../../../components/Footer";
import MaterialTable from "material-table";
import "react-notifications/lib/notifications.css";
const axios = require("axios");
const FinanceAdmin = () => {
  const [financeData, setFinanceData] = useState([]);
  const [columns, setColumns] = useState([
    { title: "Center", field: "account_name", defaultGroupOrder: 0 },
    { title: "Event Name", field: "event_name", defaultGroupOrder: 1 },
    {
      title: "Finance Name",
      field: "finance_name",
    },
    {
      title: "Finance Description",
      field: "finance_description",
    },
    {
      title: "Time",
      field: "finance_time",
      type: "date",
    },
    {
      title: "Finance Spending",
      field: "finance_spending",
      type: "currency",
      currencySetting: {
        currencyCode: "VND",
        minimumFractionDigits: 0,
        maximumFractionDigits: 3,
      },
    },
  ]);
  useEffect(() => {
    axios
      .get("/finance-data-admin")
      .then((res) => {
        if (res.data.length > 0) setFinanceData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className="app">
        <Navbar />
        <main>
          <Header />
          <div className="container mt-3 mb-5">
            <div className="row">
              <div className="col">
                <div className="card" style={{ width: "100%" }}>
                  <div className="card-body">
                    <MaterialTable
                      title="FINANCE DATA"
                      columns={columns}
                      data={financeData}
                      options={{
                        grouping: true,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </>
  );
};
export default FinanceAdmin;
