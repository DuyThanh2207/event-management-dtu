import React, { useEffect, useState } from "react";
import Header from "./../../../components/Header";
import Navbar from "./../../../components/AdminPage/Navbar";
import Footer from "./../../../components/Footer";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Resources,
  MonthView,
  Toolbar,
  DateNavigator,
  TodayButton,
  Appointments,
  AppointmentTooltip,
  ConfirmationDialog,
  EditRecurrenceMenu,
} from "@devexpress/dx-react-scheduler-material-ui";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddEvent from "./../../../components/AdminPage/Event/AddEvent";
import EditEvent from "./../../../components/AdminPage/Event/EditEvent";
const axios = require("axios");
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 100,
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
}));
const EventAll = () => {
  const classes = useStyles();
  const [eventData, setEventData] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [addEvent, setAddEvent] = useState(false);
  const [editEvent, setEditEvent] = useState(false);
  const [show, setShow] = useState(false);
  const [center, setCenter] = useState([]);
  const appointments = eventData.map((item) => {
    let dd = item.event_date.slice(0, 2);
    let mm = item.event_date.slice(3, 5) - 1;
    let yyyy = item.event_date.slice(6, 10);
    let hh = item.event_time.slice(0, 2);
    let mn = item.event_time.slice(3, 5);
    let hhEnd = parseInt(hh) + parseInt(item.event_duration);
    let startDateTemp = new Date(yyyy, mm, dd, hh, mn);
    let endDateTemp = new Date(yyyy, mm, dd, hhEnd, mn);
    return {
      id: item.event_id,
      title: item.event_name,
      location: item.event_place,
      members: [item.center_username],
      startDate: startDateTemp,
      endDate: endDateTemp,
    };
  });
  const owners = dataUser.map((item) => {
    let color = " ";
    if (item.account_color !== null) color = item.account_color;
    return {
      text: item.account_name,
      id: item.account_username,
      color: color,
    };
  });
  const location = eventData.map((item) => {
    return { id: item.event_place, text: item.event_place };
  });
  const filteredList = [...new Set(location.map(JSON.stringify))].map(
    JSON.parse
  );
  const resources = [
    {
      fieldName: "members",
      title: "Members",
      instances: owners,
      allowMultiple: true,
    },
    {
      fieldName: "location",
      title: "Location",
      instances: filteredList,
    },
  ];
  const fetchEvent = () => {
    axios
      .get("/event")
      .then((res) => {
        if (res.data.length > 0) setEventData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("/account-center-admin")
      .then((res) => {
        setDataUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchEvent();
    axios
      .get("/account-center")
      .then((res) => {
        setCenter(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
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
  today = yyyy + "-" + mm + "-" + dd;
  const deleteEvent = (eventId) => {
    axios
      .post("/delete-event", {
        event_id: eventId,
      })
      .then((res) => {
        if (res.data.message)
          NotificationManager.error(res.data.message, "Error", 3000);
        else NotificationManager.success("Complete !", "Success", 3000);
        fetchEvent();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addNewEvent = () => {
    if (addEvent)
      return <AddEvent getAddNewEvent={(data) => getAddNewEvent(data)} />;
  };
  const getAddNewEvent = (data) => {
    axios
      .post("/add-event", {
        event_name: data.event_name,
        event_place: data.event_place,
        event_date: data.event_date,
        event_duration: data.event_duration,
        event_description: data.event_description,
        center_username: data.center_username,
      })
      .then((res) => {
        if (res.data.message) {
          NotificationManager.error(res.data.message, "Error", 3000);
        } else {
          NotificationManager.success("Complete !", "Success", 3000);
          fetchEvent();
          setShow(false);
          setAddEvent(false);
        }
      });
  };
  var eventEdit = eventData.filter((item) => new Date(item.time) >= new Date());
  const editEventForm = () => {
    var result = {};
    for (var i = 0; i < center.length; i++) {
      result[center[i].account_username] = center[i].account_name;
    }
    if (editEvent)
      return (
        <EditEvent
          eventEdit={eventEdit}
          result={result}
          getEditEvent={(data) => getEditEvent(data)}
          getEditCenter={(data) => getEditCenter(data)}
        />
      );
  };
  const getEditEvent = (data) => {
    axios
      .post("/edit-event-admin", {
        event_id: data.event_id,
        event_name: data.event_name,
        event_place: data.event_place,
        event_date: data.time,
        event_duration: data.event_duration,
        event_description: data.event_description,
        center_username: data.center_username,
      })
      .then((res) => {
        if (res.data.message) {
          NotificationManager.error(res.data.message, "Error", 3000);
        } else {
          NotificationManager.success("Complete !", "Success", 3000);
          fetchEvent();
        }
      });
  };
  const getEditCenter = (data) => {
    axios
      .post("/edit-event-admin-center", {
        event_id: data.event_id,
        event_name: data.event_name,
        event_place: data.event_place,
        event_date: data.time,
        event_duration: data.event_duration,
        event_description: data.event_description,
        center_username: data.center_username,
      })
      .then((res) => {
        if (res.data.message) {
          NotificationManager.error(res.data.message, "Error", 3000);
        } else {
          NotificationManager.success("Complete !", "Success", 3000);
          fetchEvent();
        }
      });
  };
  const commitChanges = ({ deleted }) => {
    if (deleted !== undefined) deleteEvent(deleted);
  };
  const onAddNewEvent = () => {
    setShow(true);
    setEditEvent(false);
    setAddEvent(true);
  };
  const onEditEvent = () => {
    setShow(true);
    setEditEvent(true);
    setAddEvent(false);
  };
  return (
    <div className="app">
      <Navbar />
      <main>
        <Header />
        <div className="container mt-3 mb-5">
          <div className="d-flex justify-content-between">
            <div className="d-flex mb-2">
              <List className={classes.root}>
                <li>
                  <ul className={classes.ul}>
                    {dataUser.map((item) => {
                      return (
                        <ListItem>
                          <ListItemIcon>
                            <span
                              style={{
                                backgroundColor: item.account_color,
                                borderRadius: "50%",
                                height: "10px",
                                width: "10px",
                                display: "inline-block",
                              }}
                            ></span>
                          </ListItemIcon>
                          <ListItemText primary={item.account_name} />
                        </ListItem>
                      );
                    })}
                  </ul>
                </li>
              </List>
            </div>
            <div
              className="d-flex mb-3 justify-content-end"
              style={{ height: "50px" }}
            >
              <div className="btn btn-success" onClick={() => onAddNewEvent()}>
                Add New Event
              </div>
              <div className="btn btn-warning" onClick={() => onEditEvent()}>
                Edit Event
              </div>
            </div>
          </div>
          <Paper>
            <Scheduler data={appointments}>
              <ViewState defaultCurrentDate={today} />
              <MonthView />
              <EditingState onCommitChanges={commitChanges} />
              <EditRecurrenceMenu />
              <ConfirmationDialog />
              <Toolbar />
              <DateNavigator />
              <TodayButton />
              <Appointments />
              <AppointmentTooltip showDeleteButton />
              <Resources data={resources} mainResourceName="members" />
            </Scheduler>
          </Paper>
        </div>
        <Footer />
      </main>
      <NotificationContainer />
      <Dialog
        open={show}
        onClose={() => setShow(false)}
        maxWidth={addEvent ? "sm" : editEvent ? "md" : "sm"}
        fullWidth="true"
      >
        <DialogContent>
          {addNewEvent()}
          {editEventForm()}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventAll;
