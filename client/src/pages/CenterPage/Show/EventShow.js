import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Navbar from "../../../components/CenterPage/Navbar";
import Footer from "../../../components/Footer";
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
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
const axios = require("axios");
const EventShow = () => {
  const [show, setShow] = useState(false);
  const [eventStatus, setEventStatus] = useState("availableEvent");
  const [eventTitle, setEventTitle] = useState("");
  const [showData, setShowData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [eventId, setEventId] = useState();
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState([
    {
      title: "Show Name",
      field: "show_name",
      initialEditValue: "",
      validate: (rowData) =>
        rowData.show_name === "" ? "Show Name cannot be empty" : "",
    },
    {
      title: "Show Description",
      field: "show_description",
      initialEditValue: "",
    },
    {
      title: "Start Time",
      field: "show_start_time",
      type: "datetime",
      initialEditValue: "",
      validate: (rowData) =>
        rowData.show_start_time === "" ? "Start Time cannot be empty" : "",
    },
    {
      title: "Finish Time",
      field: "show_finish_time",
      type: "datetime",
      initialEditValue: "",
      validate: (rowData) =>
        rowData.show_finish_time === "" ? "Finish Time cannot be empty" : "",
    },
    { title: "Speaker", field: "show_speaker", initialEditValue: "" },
  ]);
  const fetchData = async () => {
    let data = await axios
      .post("/show", {
        event_id: eventId,
      })
      .then((res) => {
        if (res.data.length > 0) setShowData(res.data);
        else if (res.data.length === 0) setShowData([]);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };
  useEffect(() => {
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
  }, []);
  const onHandledClick = (e) => {
    setShow(true);
    setLoading(true);
    setEventId(e.event_id);
    let temp =
      e.event_name + " start on " + e.event_date + " at " + e.event_time;
    setEventTitle(temp);
    setTimeout(async () => {
      let data = await axios
        .post("/show", {
          event_id: e.event_id,
        })
        .then((res) => {
          if (res.data.length > 0) setShowData(res.data);
          else if (res.data.length === 0) setShowData([]);
        })
        .catch((error) => {
          console.log(error);
        });
      setLoading(false);
    }, 3000);
  };
  const getAddShowData = (data) => {
    console.log(data);
    let startTime = new Date(data.show_start_time);
    let ddStart = String(startTime.getDate()).padStart(2, "0");
    let mmStart = String(startTime.getMonth() + 1).padStart(2, "0");
    let yyyyStart = startTime.getFullYear();
    let hourStart = String(startTime.getHours()).padStart(2, "0");
    let minuteStart = String(startTime.getMinutes()).padStart(2, "0");
    let secondStart = String(startTime.getSeconds()).padStart(2, "0");
    startTime =
      yyyyStart +
      "-" +
      mmStart +
      "-" +
      ddStart +
      " " +
      hourStart +
      ":" +
      minuteStart +
      ":" +
      secondStart;
    let finishTime = new Date(data.show_finish_time);
    let ddFinish = String(finishTime.getDate()).padStart(2, "0");
    let mmFinish = String(finishTime.getMonth() + 1).padStart(2, "0");
    let yyyyFinish = finishTime.getFullYear();
    let hourFinish = String(finishTime.getHours()).padStart(2, "0");
    let minuteFinish = String(finishTime.getMinutes()).padStart(2, "0");
    let secondFinish = String(finishTime.getSeconds()).padStart(2, "0");
    finishTime =
      yyyyFinish +
      "-" +
      mmFinish +
      "-" +
      ddFinish +
      " " +
      hourFinish +
      ":" +
      minuteFinish +
      ":" +
      secondFinish;
    axios
      .post("/add-show", {
        event_id: eventId,
        show_name: data.show_name,
        show_description: data.show_description,
        show_speaker: data.show_speaker,
        show_start_time: startTime,
        show_finish_time: finishTime,
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
  const getEditShowData = (data) => {
    let startTime = new Date(data.show_start_time);
    let ddStart = String(startTime.getDate()).padStart(2, "0");
    let mmStart = String(startTime.getMonth() + 1).padStart(2, "0");
    let yyyyStart = startTime.getFullYear();
    let hourStart = String(startTime.getHours()).padStart(2, "0");
    let minuteStart = String(startTime.getMinutes()).padStart(2, "0");
    let secondStart = String(startTime.getSeconds()).padStart(2, "0");
    startTime =
      yyyyStart +
      "-" +
      mmStart +
      "-" +
      ddStart +
      " " +
      hourStart +
      ":" +
      minuteStart +
      ":" +
      secondStart;
    let finishTime = new Date(data.show_finish_time);
    let ddFinish = String(finishTime.getDate()).padStart(2, "0");
    let mmFinish = String(finishTime.getMonth() + 1).padStart(2, "0");
    let yyyyFinish = finishTime.getFullYear();
    let hourFinish = String(finishTime.getHours()).padStart(2, "0");
    let minuteFinish = String(finishTime.getMinutes()).padStart(2, "0");
    let secondFinish = String(finishTime.getSeconds()).padStart(2, "0");
    finishTime =
      yyyyFinish +
      "-" +
      mmFinish +
      "-" +
      ddFinish +
      " " +
      hourFinish +
      ":" +
      minuteFinish +
      ":" +
      secondFinish;
    axios
      .post("/edit-show", {
        id: data.id,
        show_name: data.show_name,
        show_description: data.show_description,
        show_speaker: data.show_speaker,
        show_start_time: startTime,
        show_finish_time: finishTime,
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
  const deleteShow = (data) => {
    axios
      .post("/delete-show", {
        id: data,
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
                      <h2>EVENT'S SHOW</h2>
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
                      <i>Click event to see show's details</i>
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
      <Modal show={show} onHide={() => setShow(false)} centered size="lg">
        <Modal.Body>
          {loading ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" />
            </div>
          ) : eventStatus === "availableEvent" ? (
            <MaterialTable
              title={eventTitle}
              columns={columns}
              data={showData}
              options={{
                filtering: true,
                actionsColumnIndex: -1,
              }}
              editable={{
                onRowAdd: (newData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      getAddShowData(newData);
                      resolve();
                    }, 1000);
                  }),
                onRowUpdate: (newData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      getEditShowData(newData);
                      resolve();
                    }, 1000);
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      const dataDelete = [...showData];
                      const index = oldData.tableData.id;
                      deleteShow(dataDelete[index].id);
                      resolve();
                    }, 1000);
                  }),
              }}
            />
          ) : (
            eventStatus === "unavailableEvent" && (
              <MaterialTable
                title={eventTitle}
                columns={columns}
                data={showData}
                options={{
                  filtering: true,
                }}
              />
            )
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="btn btn-primary" onClick={() => setShow(false)}>
            Close
          </div>
        </Modal.Footer>
      </Modal>
      <NotificationContainer />
    </>
  );
};
export default EventShow;
