import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Navbar from "../../../components/CenterPage/Navbar";
import Footer from "../../../components/Footer";
import MaterialTable from "material-table";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import swal from "sweetalert";
const axios = require("axios");
const ReportCenter = () => {
  const [reportData, setReportData] = useState([]);
  const [columns, setColumns] = useState([
    { title: "Event", field: "event_name", defaultGroupOrder: 0 },
    { title: "Task", field: "task_name", defaultGroupOrder: 1 },
    {
      title: "Report",
      field: "report_detail",
    },
    {
      title: "Time",
      field: "report_time",
      type: "datetime",
    },
    {
      title: "Staff",
      field: "annunciator",
    },
    {
      title: "Status",
      field: "report_handle",
    },
    {
      title: "Solve ?",
      render: (rowData) => {
        if (rowData.report_handle === null)
          return (
            <div
              type="button"
              onClick={() => {
                if (window.confirm("Are you sure you solve this report ?"))
                  editStatusReport(rowData);
              }}
            >
              <AssignmentTurnedInIcon />
            </div>
          );
      },
    },
  ]);
  const fetchData = async () => {
    let data = await axios
      .post("/report-list", {
        center_username: sessionStorage.getItem("account_username"),
      })
      .then((res) => {
        if (res.data.length > 0) setReportData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const editStatusReport = async (data) => {
    let report = await axios
      .post("/update-report", {
        id: data.id,
      })
      .then((res) => {
        if (res.data.message) {
          NotificationManager.error(res.data.message, "Error", 3000);
        } else {
          swal("Good job!", "You solved this report!", "success");
          fetchData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
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
                      title="REPORT"
                      columns={columns}
                      data={reportData}
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
      <NotificationContainer />
    </>
  );
};
export default ReportCenter;
