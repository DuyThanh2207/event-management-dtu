import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Navbar from "../../../components/CenterPage/Navbar";
import Footer from "../../../components/Footer";
import AddTask from "../../../components/CenterPage/Tasks/AddTask";
import EditTask from "./../../../components/CenterPage/Tasks/EditTask";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EventIcon from "@material-ui/icons/Event";
import MaterialTable from "material-table";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import EditIcon from "@material-ui/icons/Edit";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import "./GiveTask.css";
import ListSubheader from "@material-ui/core/ListSubheader";
import Spinner from "react-bootstrap/Spinner";
const axios = require("axios");
const GiveTasks = () => {
  const [status, setStatus] = useState("all");
  const [eventStatus, setEventStatus] = useState("availableEvent");
  const [taskAll, setTaskAll] = useState([]);
  const [taskDone, setTaskDone] = useState([]);
  const [taskFail, setTaskFail] = useState([]);
  const [taskInProcess, setTaskInProcess] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [eventId, setEventId] = useState();
  const [showAddTask, setShowAddTask] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState();
  const [columns, setColumns] = useState([
    { title: "Task", field: "task_name" },
    { title: "Task Description", field: "task_description" },
    { title: "Start Date", field: "start_date", type: "date" },
    { title: "Deadline", field: "deadline", type: "date" },
    { title: "Status", field: "status" },
    { title: "Staff", field: "staff_id" },
    {
      title: "Edit",
      render: (rowData) => (
        <div
          className="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit"
          onClick={() => getEditData(rowData)}
        >
          <EditIcon />
        </div>
      ),
    },
  ]);
  const [column, setColumn] = useState([
    { title: "Task", field: "task_name" },
    { title: "Task Description", field: "task_description" },
    { title: "Deadline", field: "deadline", type: "date" },
    { title: "Status", field: "status", editable: "never" },
    { title: "Staff", field: "staff_id" },
  ]);
  const fetchData = async () => {
    let data = await axios
      .post("/tasks-data", {
        event_id: eventId,
      })
      .then((res) => {
        setTaskAll(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    let dataDone = await axios
      .post("/task-done", {
        event_id: eventId,
      })
      .then((res) => {
        setTaskDone(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    let dataInProcess = await axios
      .post("/task-not-done", {
        event_id: eventId,
      })
      .then((res) => {
        setTaskInProcess(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    axios
      .get("/check-task")
      .then(() => {
        axios
          .post("/event-center", {
            account_username: sessionStorage.getItem("account_username"),
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
  const getEditData = (dataEdit) => {
    setEditData(dataEdit);
    setEditStatus(true);
    setShowAddTask(false);
  };
  const onHandledClick = (e) => {
    setLoading(true);
    setEventId(e.event_id);
    setTimeout(async () => {
      let data = await axios
        .post("/tasks-data", {
          event_id: e.event_id,
        })
        .then((res) => {
          setTaskAll(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      let dataDone = await axios
        .post("/task-done", {
          event_id: e.event_id,
        })
        .then((res) => {
          setTaskDone(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      let dataInProcess = await axios
        .post("/task-not-done", {
          event_id: e.event_id,
        })
        .then((res) => {
          setTaskInProcess(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      let dataFail = await axios
        .post("/task-fail", {
          event_id: e.event_id,
        })
        .then((res) => {
          setTaskFail(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      setLoading(false);
    }, 3000);
  };
  const getAddTaskData = (data) => {
    axios
      .post("/add-task", {
        event_id: eventId,
        task_name: data.task_name,
        task_description: data.task_description,
        staff_id: data.staff_id,
        deadline: data.deadline,
        start_date: data.start_date,
        center_id: sessionStorage.getItem("account_username"),
      })
      .then((res) => {
        if (res.data.message) {
          NotificationManager.error(res.data.message, "Error", 3000);
        } else {
          NotificationManager.success("Complete !", "Success", 3000);
          fetchData();
          setShowAddTask(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getEditTaskData = (data) => {
    axios
      .post("/edit-task", {
        task_name: data.task_name,
        task_description: data.task_description,
        staff_id: data.staff_id,
        start_date: data.start_date,
        deadline: data.deadline,
        task_id: data.task_id,
        status: data.status,
      })
      .then((res) => {
        if (res.data.message) {
          NotificationManager.error(res.data.message, "Error", 3000);
        } else {
          NotificationManager.success("Complete !", "Success", 3000);
          fetchData();
          setEditStatus(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteTask = (data) => {
    axios
      .post("/delete-task", {
        task_id: data,
      })
      .then((res) => {
        if (res.data.message) {
          NotificationManager.error(res.data.message, "Error", 3000);
        } else {
          NotificationManager.success("Complete !", "Success", 3000);
          fetchData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
                    <div className="d-flex justify-content-center">
                      <h2>EVENT</h2>
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
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
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
                <div>
                  <div className="d-flex justify-content-between">
                    <div className="btn-group mb-3">
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => setShowAddTask(!showAddTask)}
                      >
                        Add Task
                      </button>
                    </div>
                    <div className="row ml-5">
                      <FormControl component="fieldset">
                        <RadioGroup
                          row
                          aria-label="position"
                          name="position"
                          defaultValue="all"
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <FormControlLabel
                            value="all"
                            control={<Radio />}
                            label="All"
                          />
                          <FormControlLabel
                            value="done"
                            control={<Radio />}
                            label="Done"
                          />
                          <FormControlLabel
                            value="inProcess"
                            control={<Radio />}
                            label="In Process"
                          />
                          <FormControlLabel
                            value="fail"
                            control={<Radio />}
                            label="Fail"
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      {status === "all" && (
                        <MaterialTable
                          title="Task"
                          columns={columns}
                          data={taskAll}
                          options={{
                            actionsColumnIndex: -1,
                          }}
                          editable={{
                            onRowDelete: (oldData) =>
                              new Promise((resolve) => {
                                setTimeout(() => {
                                  const dataDelete = [...taskAll];
                                  const index = oldData.tableData.id;
                                  deleteTask(dataDelete[index].task_id);
                                  resolve();
                                }, 1000);
                              }),
                          }}
                        />
                      )}
                      {status === "done" && (
                        <MaterialTable
                          title="Task"
                          columns={columns}
                          data={taskDone}
                          options={{
                            actionsColumnIndex: -1,
                          }}
                          editable={{
                            onRowDelete: (oldData) =>
                              new Promise((resolve) => {
                                setTimeout(() => {
                                  const dataDelete = [...taskDone];
                                  const index = oldData.tableData.id;
                                  deleteTask(dataDelete[index].task_id);
                                  resolve();
                                }, 1000);
                              }),
                          }}
                        />
                      )}
                      {status === "inProcess" && (
                        <MaterialTable
                          title="Task"
                          columns={columns}
                          data={taskInProcess}
                          options={{
                            actionsColumnIndex: -1,
                          }}
                          editable={{
                            onRowDelete: (oldData) =>
                              new Promise((resolve) => {
                                setTimeout(() => {
                                  const dataDelete = [...taskInProcess];
                                  const index = oldData.tableData.id;
                                  deleteTask(dataDelete[index].task_id);
                                  resolve();
                                }, 1000);
                              }),
                          }}
                        />
                      )}
                      {status === "fail" && (
                        <MaterialTable
                          title="Task"
                          columns={columns}
                          data={taskFail}
                          options={{
                            actionsColumnIndex: -1,
                          }}
                          editable={{
                            onRowDelete: (oldData) =>
                              new Promise((resolve) => {
                                setTimeout(() => {
                                  const dataDelete = [...taskFail];
                                  const index = oldData.tableData.id;
                                  deleteTask(dataDelete[index].task_id);
                                  resolve();
                                }, 1000);
                              }),
                          }}
                        />
                      )}
                    </div>
                    {showAddTask && (
                      <div className="col-3">
                        <AddTask
                          getAddTaskData={(data) => getAddTaskData(data)}
                          changeAddStatus={() => setShowAddTask(false)}
                        />
                      </div>
                    )}
                    {editStatus && (
                      <div className="col-3">
                        <EditTask
                          editData={editData}
                          changeEditStatus={() => setEditStatus(false)}
                          getEditTaskData={(data) => getEditTaskData(data)}
                        />
                      </div>
                    )}
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
                <div>
                  <div className="row ml-5">
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        aria-label="position"
                        name="position"
                        defaultValue="all"
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <FormControlLabel
                          value="all"
                          control={<Radio />}
                          label="All"
                        />
                        <FormControlLabel
                          value="done"
                          control={<Radio />}
                          label="Done"
                        />
                        <FormControlLabel
                          value="fail"
                          control={<Radio />}
                          label="Fail"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      {status === "all" && (
                        <MaterialTable
                          title="Task"
                          columns={column}
                          data={taskAll}
                        />
                      )}
                      {status === "done" && (
                        <MaterialTable
                          title="Task"
                          columns={column}
                          data={taskDone}
                        />
                      )}
                      {status === "inProcess" && (
                        <MaterialTable
                          title="Task"
                          columns={column}
                          data={taskInProcess}
                        />
                      )}
                      {status === "fail" && (
                        <MaterialTable
                          title="Task"
                          columns={column}
                          data={taskFail}
                        />
                      )}
                    </div>
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
    </>
  );
};
export default GiveTasks;
