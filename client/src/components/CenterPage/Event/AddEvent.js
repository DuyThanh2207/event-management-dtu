import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
function AddEvent(props) {
  const [eventName, setEventName] = useState("");
  const [eventPlace, setEventPlace] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [eventDuration, setEventDuration] = useState(1);
  const [eventDescription, setEventDescription] = useState("");
  const getCreateEvent = () => {
    let datetime = eventDate;
    let dd = String(datetime.getDate()).padStart(2, "0");
    let mm = String(datetime.getMonth() + 1).padStart(2, "0");
    let yyyy = datetime.getFullYear();
    let hour = String(datetime.getHours()).padStart(2, "0");
    let minute = String(datetime.getMinutes()).padStart(2, "0");
    let second = String(datetime.getSeconds()).padStart(2, "0");
    datetime =
      yyyy + "-" + mm + "-" + dd + " " + hour + ":" + minute + ":" + second;
    let data = {
      event_name: eventName,
      event_place: eventPlace,
      event_date: datetime,
      event_duration: eventDuration,
      event_description: eventDescription,
    };
    props.getAddNewEvent(data);
  };
  return (
    <>
      <ValidatorForm
        onSubmit={getCreateEvent}
        style={{ width: "100%", height: "100%" }}
      >
        <TextValidator
          style={{ width: "100%" }}
          label="Event Name *"
          onChange={(e) => setEventName(e.target.value)}
          value={eventName}
          validators={["required"]}
          type="text"
          errorMessages={["This field is required"]}
        />
        <br />
        <TextValidator
          style={{ width: "100%" }}
          label="Event Place *"
          onChange={(e) => setEventPlace(e.target.value)}
          value={eventPlace}
          validators={["required"]}
          type="text"
          errorMessages={["This field is required"]}
        />
        <br />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date start"
            value={eventDate}
            onChange={(date) => setEventDate(date)}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <br />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Time picker"
            value={eventDate}
            onChange={(date) => setEventDate(date)}
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
          />
        </MuiPickersUtilsProvider>
        <br />
        <TextValidator
          style={{ width: "100%" }}
          label="Event Duration ( hour ) *"
          onChange={(e) => setEventDuration(e.target.value)}
          value={eventDuration}
          validators={["required"]}
          type="number"
          errorMessages={["This field is required"]}
        />
        <br />
        <TextField
          style={{ width: "100%" }}
          label="Event Description"
          onChange={(e) => setEventDescription(e.target.value)}
          value={eventDescription}
          type="text"
        />
        <br />
        <br />
        <h5 className="mb-3" style={{ color: "red" }}>
          * is require
        </h5>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </ValidatorForm>
    </>
  );
}

export default AddEvent;
