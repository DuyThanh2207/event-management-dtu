import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Navbar from "../../../components/AdminPage/Navbar";
import Footer from "../../../components/Footer";
import MaterialTable from "material-table";
import "react-notifications/lib/notifications.css";
const axios = require("axios");
const Task = () => {
  const [eventData, setEventData] = useState([]);
  const [columns, setColumns] = useState([
    { title: "Center", field: "account_name", defaultGroupOrder: 0 },
    { title: "Event Name", field: "event_name", defaultGroupOrder: 1 },
    { title: "Task Name", field: "task_name" },
    { title: "Task Description", field: "task_description" },
    { title: "Start Date", field: "start_date", type: "date" },
    { title: "Deadline", field: "deadline", type: "date" },
    { title: "Status", field: "status", editable: "never" },
    { title: "Staff", field: "staff_id" },
  ]);
  useEffect(() => {
    axios
      .get("/check-task")
      .then(() => {
        axios
          .get("/tasks-data-admin")
          .then((res) => {
            if (res.data.length > 0) setEventData(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //[Frontend] list task event
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
                      title="TASK"
                      columns={columns}
                      data={eventData}
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
export default Task;
