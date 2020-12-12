import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Navbar from "../../../components/AdminPage/Navbar";
import Footer from "../../../components/Footer";
import MaterialTable from "material-table";
import "react-notifications/lib/notifications.css";
const axios = require("axios");
// [Server/Backend] Show Event information
const Show = () => {
  const [showData, setShowData] = useState([]);
  const [columns, setColumns] = useState([
    { title: "Center", field: "account_name", defaultGroupOrder: 0 },
    { title: "Event Name", field: "event_name", defaultGroupOrder: 1 },
    { title: "Show Name", field: "show_name" },
    { title: "Show Description", field: "show_description" },
    { title: "Start Time", field: "show_start_time", type: "date" },
    { title: "Finish Time", field: "show_finish_time", type: "date" },
    { title: "Speaker", field: "show_speaker" },
  ]);
  useEffect(() => {
    axios
      .get("/show-data-admin")
      .then((res) => {
        if (res.data.length > 0) setShowData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // [Frondend] show event information
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
                      title="EVENT'S SHOW"
                      columns={columns}
                      data={showData}
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
export default Show;
