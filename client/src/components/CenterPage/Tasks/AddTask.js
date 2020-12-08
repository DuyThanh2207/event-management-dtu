import React, { useEffect, useState } from "react";
import "./AddTask.scss";
import Multiselect from "react-widgets/lib/Multiselect";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
const axios = require("axios");
const AddTask = (props) => {
  const [staffData, setStaffData] = useState([]);
  const [staffTask, setStaffTask] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedDeadline, setSelectedDeadline] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  var staffId = [];
  useEffect(() => {
    axios
      .post("/member", {
        account_username: sessionStorage.getItem("account_username"),
      })
      .then((res) => {
        res.data.forEach((item) => {
          staffId.push(item.account_username);
        });
        setStaffData(staffId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const getCreateTask = (data) => {
    let tempData = staffTask.join(", ");
    let deadline = new Date(selectedDeadline);
    let ddDeadline = String(deadline.getDate()).padStart(2, "0");
    let mmDeadline = String(deadline.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyyDeadline = deadline.getFullYear();
    deadline = yyyyDeadline + "-" + mmDeadline + "-" + ddDeadline;
    let startDate = new Date(selectedStartDate);
    let dd = String(startDate.getDate()).padStart(2, "0");
    let mm = String(startDate.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = startDate.getFullYear();
    startDate = yyyy + "-" + mm + "-" + dd;
    let temp = {
      task_name: taskName,
      task_description: taskDescription,
      staff_id: tempData,
      start_date: startDate,
      deadline: deadline,
    };
    props.getAddTaskData(temp);
  };
  return (
    <div className="card" style={{ width: "100%" }}>
      <div className="card-body">
        <div style={{ width: "100%" }}>
          <ValidatorForm
            onSubmit={getCreateTask}
            style={{ width: "100%", height: "100%" }}
          >
            <TextValidator
              style={{ width: "100%" }}
              label="Task Name *"
              onChange={(e) => setTaskName(e.target.value)}
              value={taskName}
              validators={["required"]}
              type="text"
              errorMessages={["This field is required"]}
            />
            <br />
            <TextField
              style={{ width: "100%" }}
              label="Task Description"
              onChange={(e) => setTaskDescription(e.target.value)}
              value={taskDescription}
              type="text"
            />
            <br />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Start Date *"
                  value={selectedStartDate}
                  onChange={(value) => setSelectedStartDate(value)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Deadline *"
                  value={selectedDeadline}
                  onChange={(value) => setSelectedDeadline(value)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <label>Staff</label>
            <Multiselect
              data={staffData}
              onChange={(value) => setStaffTask(value)}
            />
            <h5 className="mb-3" style={{ color: "red" }}>
              * is require
            </h5>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => props.changeAddStatus()}
            >
              Close
            </button>
          </ValidatorForm>
        </div>
      </div>
    </div>
  );
};
export default AddTask;
