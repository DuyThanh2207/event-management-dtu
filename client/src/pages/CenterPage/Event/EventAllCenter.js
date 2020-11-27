import React, { useEffect, useState } from "react";
import Header from "./../../../components/Header";
import Navbar from "./../../../components/CenterPage/Navbar";
import Footer from "./../../../components/Footer";
import Paper from "@material-ui/core/Paper";
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
import Modal from "react-bootstrap/Modal";
import AddEvent from "../../../components/CenterPage/Event/AddEvent";
import EditEvent from "./../../../components/CenterPage/Event/EditEvent";
const axios = require("axios");
const EventAllCenter = () => {
  const [eventData, setEventData] = useState([]);
  const [show, setShow] = useState(false);
  const [addEvent, setAddEvent] = useState(false);
  const [editEvent, setEditEvent] = useState(false);
  const [dataUser, setDataUser] = useState([]);
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
  const temp = dataUser.filter(
    (item) =>
      item.account_username === sessionStorage.getItem("account_username")
  );
  const owners = temp.map((item) => {
    return {
      text: item.account_name,
      id: item.account_username,
      color: item.account_color,
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
      .post("/event-center", {
        account_username: sessionStorage.getItem("account_username"),
      })
      .then((res) => {
        if (res.data.length > 0) setEventData(res.data);
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
        setDataUser(res.data);
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
    if (
      new Date(eventData.filter((item) => item.event_id === eventId)[0].time) >
      new Date(today)
    )
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
    else
      NotificationManager.error(
        "You can only delete upcoming events ",
        "Error",
        3000
      );
  };
  const commitChanges = ({ deleted }) => {
    if (deleted !== undefined) deleteEvent(deleted);
  };
  const addNewEvent = () => {
    if (addEvent)
      return <AddEvent getAddNewEvent={(data) => getAddNewEvent(data)} />;
  };
  var eventEdit = eventData.filter((item) => new Date(item.time) >= new Date());
  const editEventForm = () => {
    if (editEvent)
      return (
        <EditEvent
          eventEdit={eventEdit}
          getEditEvent={(data) => getEditEvent(data)}
        />
      );
  };
  const getAddNewEvent = (data) => {
    axios
      .post("/add-event", {
        event_name: data.event_name,
        event_place: data.event_place,
        event_date: data.event_date,
        event_duration: data.event_duration,
        event_description: data.event_description,
        center_username: sessionStorage.getItem("account_username"),
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
  const getEditEvent = (data) => {
    axios
      .post("/edit-event", {
        event_id: data.event_id,
        event_name: data.event_name,
        event_place: data.event_place,
        event_date: data.time,
        event_duration: data.event_duration,
        event_description: data.event_description,
        center_username: sessionStorage.getItem("account_username"),
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
          <div className="d-flex mb-3 justify-content-end">
            <div className="btn btn-success" onClick={() => onAddNewEvent()}>
              Add New Event
            </div>
            <div className="btn btn-warning" onClick={() => onEditEvent()}>
              Edit Event
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
      <Modal size="lg" show={show} onHide={() => setShow(false)} centered>
        <Modal.Body>
          <div className="d-flex justify-content-center mt-2">
            <div style={{ width: "90%" }}>
              {addNewEvent()}
              {editEventForm()}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="btn btn-secondary" onClick={() => setShow(false)}>
            Close
          </div>
        </Modal.Footer>
      </Modal>
      <NotificationContainer />
    </div>
  );
};

export default EventAllCenter;
