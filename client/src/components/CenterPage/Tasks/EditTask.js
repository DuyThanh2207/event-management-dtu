import React, { useEffect, useState } from "react";
import "./AddTask.scss";
import Multiselect from "react-widgets/lib/Multiselect";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import MenuItem from "@material-ui/core/MenuItem";
const axios = require("axios");
const EditTask = (props) => {
  const [staffData, setStaffData] = useState([]);
  const [staffTemp, setStaffTemp] = useState(
    props.editData.staff_id.split(", ")
  );
  const [taskName, setTaskName] = useState(props.editData.task_name);
  const [status, setStatus] = useState(props.editData.status);
  const [taskDescription, setTaskDescription] = useState(
    props.editData.task_description
  );
  const [deadline, setDeadline] = useState();
  const [startDate, setStartDate] = useState();
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
    getDeadline();
    getStartDate();
  }, []);
  const getEditAccount = () => {
    let tempData = staffTemp.join(", ");
    let deadlineTemp = new Date(deadline);
    let ddDeadline = String(deadline.getDate()).padStart(2, "0");
    let mmDeadline = String(deadline.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyyDeadline = deadline.getFullYear();
    deadlineTemp = yyyyDeadline + "-" + mmDeadline + "-" + ddDeadline;
    let startDateTemp = new Date(startDate);
    let dd = String(startDate.getDate()).padStart(2, "0");
    let mm = String(startDate.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = startDate.getFullYear();
    startDateTemp = yyyy + "-" + mm + "-" + dd;
    let temp = {
      task_name: taskName,
      task_description: taskDescription,
      staff_id: tempData,
      task_id: props.editData.task_id,
      start_date: startDateTemp,
      deadline: deadlineTemp,
      status: status,
    };
    props.getEditTaskData(temp);
  };
  const getDeadline = () => {
    let temp = props.editData.deadline.replaceAll("-", ",");
    let dateTemp = temp.split(",");
    let dd = dateTemp[0];
    let mm = dateTemp[1];
    let yyyy = dateTemp[2];
    let today = yyyy + "," + mm + "," + dd;
    let date = new Date(today);
    setDeadline(date);
  };
  const getStartDate = () => {
    let temp = props.editData.start_date.replaceAll("-", ",");
    let dateTemp = temp.split(",");
    let dd = dateTemp[0];
    let mm = dateTemp[1];
    let yyyy = dateTemp[2];
    let today = yyyy + "," + mm + "," + dd;
    let date = new Date(today);
    setStartDate(date);
  };
  return (
    <div className="card" style={{ width: "100%" }}>
      <div className="card-body">
        <div style={{ width: "100%" }}>
          <ValidatorForm
            onSubmit={getEditAccount}
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
                  value={startDate}
                  onChange={(value) => setStartDate(value)}
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
                  value={deadline}
                  onChange={(value) => setDeadline(value)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <label>Staff</label>
            <Multiselect
              value={staffTemp}
              data={staffData}
              onChange={(value) => setStaffTemp(value)}
            />
            <TextValidator
              style={{ width: "100%" }}
              label="Status *"
              select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              validators={["required"]}
              errorMessages={["This field is required"]}
            >
              <MenuItem key="Done" value="Done">
                Done
              </MenuItem>
              <MenuItem key="Fail" value="Fail">
                Fail
              </MenuItem>
              <MenuItem key="In Process" value="In Process">
                In Process
              </MenuItem>
            </TextValidator>
            <h5 className="mb-3" style={{ color: "red" }}>
              * is require
            </h5>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => props.changeEditStatus()}
            >
              Close
            </button>
          </ValidatorForm>
        </div>
      </div>
    </div>
  );
};
export default EditTask;
