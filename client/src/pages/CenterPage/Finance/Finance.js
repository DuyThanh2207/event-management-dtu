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
const Finance = () => {
  const [show, setShow] = useState(false);
  const [eventStatus, setEventStatus] = useState("availableEvent");
  const [eventTitle, setEventTitle] = useState("");
  const [financeData, setFinanceData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [eventId, setEventId] = useState();
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState([
    {
      title: "Finance Name",
      field: "finance_name",
      initialEditValue: "",
      validate: (rowData) =>
        rowData.finance_name === "" ? "Finance Name cannot be empty" : "",
    },
    {
      title: "Finance Description",
      field: "finance_description",
      initialEditValue: "",
    },
    {
      title: "Time",
      field: "finance_time",
      initialEditValue: "",
      type: "date",
      validate: (rowData) =>
        rowData.finance_time === "" ? "Finance Time cannot be empty" : "",
    },
    {
      title: "Finance Spending",
      field: "finance_spending",
      initialEditValue: "",
      type: "currency",
      currencySetting: {
        currencyCode: "VND",
        minimumFractionDigits: 0,
        maximumFractionDigits: 3,
      },
      validate: (rowData) =>
        rowData.finance_spending === ""
          ? "Finance Spending cannot be empty"
          : "",
    },
  ]);
  const fetchData = async () => {
    let data = await axios
      .post("/finance", {
        event_id: eventId,
      })
      .then((res) => {
        if (res.data.length > 0) setFinanceData(res.data);
        else if (res.data.length === 0) setFinanceData([]);
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
        .post("/finance", {
          event_id: e.event_id,
        })
        .then((res) => {
          if (res.data.length > 0) setFinanceData(res.data);
          else if (res.data.length === 0) setFinanceData([]);
        })
        .catch((error) => {
          console.log(error);
        });
      setLoading(false);
    }, 3000);
  };
  const getAddFinanceData = (data) => {
    let financeTime = new Date(data.finance_time);
    let dd = String(financeTime.getDate()).padStart(2, "0");
    let mm = String(financeTime.getMonth() + 1).padStart(2, "0");
    let yyyy = financeTime.getFullYear();
    financeTime = yyyy + "-" + mm + "-" + dd;
    axios
      .post("/add-finance", {
        event_id: eventId,
        finance_name: data.finance_name,
        finance_description: data.finance_description,
        finance_time: financeTime,
        finance_spending: data.finance_spending,
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
  const getEditFinanceData = (data) => {
    let financeTime = new Date(data.finance_time);
    let dd = String(financeTime.getDate()).padStart(2, "0");
    let mm = String(financeTime.getMonth() + 1).padStart(2, "0");
    let yyyy = financeTime.getFullYear();
    financeTime = yyyy + "-" + mm + "-" + dd;
    axios
      .post("/edit-finance", {
        id: data.id,
        finance_name: data.finance_name,
        finance_description: data.finance_description,
        finance_time: financeTime,
        finance_spending: data.finance_spending,
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
  const deleteFinance = (data) => {
    axios
      .post("/delete-finance", {
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
                      <h2>FINANCE'S DETAILS</h2>
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
                      <i>Click event to see finance's details</i>
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
              data={financeData}
              options={{
                filtering: true,
                actionsColumnIndex: -1,
              }}
              editable={{
                onRowAdd: (newData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      getAddFinanceData(newData);
                      resolve();
                    }, 1000);
                  }),
                onRowUpdate: (newData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      getEditFinanceData(newData);
                      resolve();
                    }, 1000);
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      const dataDelete = [...financeData];
                      const index = oldData.tableData.id;
                      deleteFinance(dataDelete[index].id);
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
                data={financeData}
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
export default Finance;
