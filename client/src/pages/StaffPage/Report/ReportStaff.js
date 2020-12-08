import React, { useEffect, useState } from "react";
import Navbar from "./../../../components/StaffPage/Navbar";
import Header from "./../../../components/Header";
import Footer from "./../../../components/Footer";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
const axios = require("axios");
function ReportStaff() {
  const [event, setEvent] = useState([]);
  const [eventSelected, setEventSelected] = useState("");
  const [task, setTask] = useState([]);
  const [taskSelected, setTaskSelected] = useState("");
  const [report, setReport] = useState("");
  useEffect(() => {
    axios
      .post("/event-staff", {
        staff_id: "%" + sessionStorage.getItem("account_username") + "%",
      })
      .then((res) => {
        if (res.data.length > 0) setEvent(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  var availableEvent = [];
  event.forEach((item) => {
    {
      if (new Date(item.time) > new Date()) {
        availableEvent.push(item);
      }
    }
  });
  const onHandleClick = (e) => {
    setEventSelected(e.target.value);
    axios
      .post("/task-event", {
        staff_id: "%" + sessionStorage.getItem("account_username") + "%",
        event_id: e.target.value,
      })
      .then((res) => {
        if (res.data.length > 0) setTask(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const sendReport = () => {
    let datetime = new Date();
    let dd = String(datetime.getDate()).padStart(2, "0");
    let mm = String(datetime.getMonth() + 1).padStart(2, "0");
    let yyyy = datetime.getFullYear();
    let hour = String(datetime.getHours()).padStart(2, "0");
    let minute = String(datetime.getMinutes()).padStart(2, "0");
    let second = "00";
    datetime =
      yyyy + "-" + mm + "-" + dd + " " + hour + ":" + minute + ":" + second;
    axios
      .post("/report", {
        event_id: eventSelected,
        task_id: taskSelected,
        report_detail: report,
        report_time: datetime,
      })
      .then((res) => {
        if (res.data.message)
          NotificationManager.error(res.data.message, "Error", 3000);
        else {
          NotificationManager.success("Complete !", "Success", 3000);
          setEventSelected("");
          setTaskSelected("");
          setReport("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="app">
        <Navbar />
        <main>
          <Header />
          <div className="mb-3 container">
            <ValidatorForm
              onSubmit={sendReport}
              style={{ width: "100%", height: "100%" }}
            >
              <div className="d-flex">
                <TextValidator
                  style={{ minWidth: 300 }}
                  label="Select Event *"
                  select
                  value={eventSelected}
                  onChange={onHandleClick}
                  helperText="Please select event"
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                >
                  {availableEvent.map((item) => (
                    <MenuItem value={item.event_id}>{item.event_name}</MenuItem>
                  ))}
                </TextValidator>
                <div className="ml-5">
                  <TextValidator
                    style={{ minWidth: 300 }}
                    label="Select Task *"
                    select
                    value={taskSelected}
                    onChange={(e) => setTaskSelected(e.target.value)}
                    helperText="Please select task"
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                  >
                    {task.map((item) => (
                      <MenuItem value={item.task_id}>{item.task_name}</MenuItem>
                    ))}
                  </TextValidator>
                </div>
              </div>
              <br />
              <TextValidator
                style={{ width: "100%" }}
                label="Enter report *"
                onChange={(e) => setReport(e.target.value)}
                value={report}
                type="text"
                validators={["required"]}
                errorMessages={["This field is required"]}
              />
              <br />
              <h5 className="mb-3" style={{ color: "red" }}>
                * is require
              </h5>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                className="mt-2"
                type="submit"
              >
                Submit
              </Button>
            </ValidatorForm>
          </div>
          <Footer />
        </main>
        <NotificationContainer />
      </div>
    </>
  );
}

export default ReportStaff;
