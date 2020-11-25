import React, { useEffect, useState } from "react";
import Header from "./../../../components/Header";
import Navbar from "./../../../components/AdminPage/Navbar";
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
const axios = require("axios");
const EventAll = () => {
  const [eventData, setEventData] = useState([]);
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
  const commitChanges = ({ deleted }) => {
    if (deleted !== undefined) deleteEvent(deleted);
  };
  return (
    <div className="app">
      <Navbar />
      <main>
        <Header />
        <div className="container mt-3 mb-5">
          <div className="d-flex mb-2">
            {dataUser.map((item) => {
              return (
                <>
                  <span
                    style={{
                      backgroundColor: item.account_color,
                      borderRadius: "50%",
                      height: "10px",
                      width: "10px",
                      display: "inline-block",
                    }}
                    className="ml-3 mt-1"
                  ></span>
                  <h5 className="ml-2">{item.account_name}</h5>
                  <br />
                </>
              );
            })}
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
    </div>
  );
};

export default EventAll;
