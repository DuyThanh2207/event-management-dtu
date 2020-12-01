import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Navbar from "../../../components/StaffPage/Navbar";
import Footer from "../../../components/Footer";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EventIcon from "@material-ui/icons/Event";
import Spinner from "react-bootstrap/Spinner";
import MaterialTable from "material-table";
import "./TaskStaff.css";
import swal from "sweetalert";
import "react-notifications/lib/notifications.css";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
const axios = require("axios");
const TaskStaff = () => {
  const [taskAll, setTaskAll] = useState([]);
  const [eventStatus, setEventStatus] = useState("availableEvent");
  const [eventData, setEventData] = useState([]);
  const [eventId, setEventId] = useState();
  const [eventTitle, setEventTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    let data = await axios
      .post("/task-staff-all", {
        staff_id: "%" + sessionStorage.getItem("account_username") + "%",
        event_id: eventId,
      })
      .then((res) => {
        setTaskAll(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    axios
      .get("/check-task")
      .then((res) => {
        axios
          .post("/event-staff", {
            staff_id: "%" + sessionStorage.getItem("account_username") + "%",
          })
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
  const onHandledClick = (e) => {
    setLoading(true);
    setEventId(e.event_id);
    let temp =
      e.event_name + " start on " + e.event_date + " at " + e.event_time;
    setEventTitle(temp);
    setTimeout(async () => {
      let data = await axios
        .post("/task-staff-all", {
          staff_id: "%" + sessionStorage.getItem("account_username") + "%",
          event_id: e.event_id,
        })
        .then((res) => {
          setTaskAll(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      setLoading(false);
    }, 3000);
  };
  const editStatusTask = async (data) => {
    let updateTask = await axios
      .post("/update-task", {
        task_id: data.task_id,
      })
      .then((res) => {
        if (res.data.message) {
          NotificationManager.error(res.data.message, "Error", 3000);
        } else {
          swal("Good job!", "You done this task!", "success");
          fetchData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  today = dd + "-" + mm + "-" + yyyy;
  var availableEvent = [];
  var unavailableEvent = [];
  eventData.forEach((item) => {
    {
      if (new Date(item.time) > new Date()) {
        availableEvent.push(item);
      } else if (new Date(item.time) < new Date()) {
        unavailableEvent.push(item);
      }
    }
  });
  return (
    <div className="app">
      <Navbar />
      <main>
        <Header />
        <div className="container mt-3 mb-5">
          <div className="row">
            <div className="col">
              <div className="card" style={{ width: "100%" }}>
                <div className="card-body">
                  <div className="d-flex justify-content-center">
                    <h2>TASK</h2>
                  </div>
                  <div className="d-flex justify-content-end">
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        aria-label="position"
                        name="position"
                        defaultValue="availableEvent"
                        onChange={(e) => setEventStatus(e.target.value)}
                      >
                        <FormControlLabel
                          value="availableEvent"
                          control={<Radio />}
                          label="Available Event"
                        />
                        <FormControlLabel
                          value="unavailableEvent"
                          control={<Radio />}
                          label="Unavailable Event"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  {eventStatus === "availableEvent" && (
                    <List>
                      {availableEvent.length > 0 ? (
                        availableEvent.map((value, index) => (
                          <ListItem
                            button
                            onClick={() => onHandledClick(value)}
                            data-toggle="modal"
                            data-target=".taskModalAvailable"
                          >
                            <ListItemIcon>
                              <EventIcon />
                            </ListItemIcon>
                            <ListItemText primary={value.event_name} />
                          </ListItem>
                        ))
                      ) : (
                        <div>You don't have any available event</div>
                      )}
                    </List>
                  )}
                  {eventStatus === "unavailableEvent" && (
                    <List>
                      {unavailableEvent.length > 0 ? (
                        unavailableEvent.map((value, index) => (
                          <ListItem
                            button
                            onClick={() => onHandledClick(value)}
                            data-toggle="modal"
                            data-target=".taskModalUnavailable"
                          >
                            <ListItemIcon>
                              <EventIcon />
                            </ListItemIcon>
                            <ListItemText primary={value.event_name} />
                          </ListItem>
                        ))
                      ) : (
                        <div>You don't have any unavailable event</div>
                      )}
                    </List>
                  )}
                </div>
                <div className="mb-2 mr-3 d-flex justify-content-end">
                  <strong>
                    <i>Click event to see task's details</i>
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
      <div
        class="modal modalfade taskModalAvailable"
        tabindex="-1"
        role="dialog"
      >
        <div class="modal-dialog modal-dialog-centered modal-xl">
          <div class="modal-content">
            <div class="modal-body">
              {loading ? (
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" />
                </div>
              ) : (
                <div className="row mt-2">
                  <div className="col">
                    <MaterialTable
                      title={eventTitle}
                      columns={[
                        { title: "Task", field: "task_name" },
                        {
                          title: "Task Description",
                          field: "task_description",
                        },
                        {
                          title: "Start Date",
                          field: "start_date",
                          type: "date",
                        },
                        {
                          title: "Deadline",
                          field: "deadline",
                          type: "date",
                        },
                        {
                          title: "Status",
                          field: "status",
                          editable: "never",
                        },
                        {
                          title: "Done ?",
                          render: (rowData) => {
                            if (rowData.status === "In Process")
                              return (
                                <div
                                  type="button"
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        "Are you sure you done this task ?"
                                      )
                                    )
                                      editStatusTask(rowData);
                                  }}
                                >
                                  <AssignmentTurnedInIcon />
                                </div>
                              );
                          },
                        },
                      ]}
                      data={taskAll}
                      options={{
                        filtering: true,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal modalfade taskModalUnavailable"
        role="dialog"
        tabindex="-1"
      >
        <div class="modal-dialog modal-dialog-centered modal-xl">
          <div class="modal-content">
            <div class="modal-body">
              {loading ? (
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" />
                </div>
              ) : (
                <div className="row mt-2">
                  <div className="col">
                    <MaterialTable
                      title={eventTitle}
                      columns={[
                        { title: "Task", field: "task_name" },
                        {
                          title: "Task Description",
                          field: "task_description",
                        },
                        {
                          title: "Start Date",
                          field: "start_date",
                          type: "date",
                        },
                        {
                          title: "Deadline",
                          field: "deadline",
                          type: "date",
                        },
                        { title: "Status", field: "status" },
                      ]}
                      data={taskAll}
                      options={{ filtering: true }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <NotificationContainer />
    </div>
  );
};

export default TaskStaff;
