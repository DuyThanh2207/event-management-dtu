import React, { useState } from "react";
import MaterialTable from "material-table";

function EditEvent(props) {
  const [columns, setColumns] = useState([
    {
      title: "Event Name",
      field: "event_name",
      validate: (rowData) =>
        rowData.event_name === "" ? "Event Name cannot be empty" : "",
    },
    { title: "Event Description", field: "event_description" },
    {
      title: "Event Place",
      field: "event_place",
      validate: (rowData) =>
        rowData.event_place === "" ? "Event Place cannot be empty" : "",
    },
    {
      title: "Event Time",
      field: "time",
      type: "datetime",
      validate: (rowData) =>
        rowData.time === "" ? "Event Time cannot be empty" : "",
    },
    {
      title: "Event Duration ( hour )",
      field: "event_duration",
      type: "numeric",
      validate: (rowData) => rowData.event_duration > 0,
    },
  ]);
  const getEditEvent = (newData) => {
    let datetime = new Date(newData.time);
    let dd = String(datetime.getDate()).padStart(2, "0");
    let mm = String(datetime.getMonth() + 1).padStart(2, "0");
    let yyyy = datetime.getFullYear();
    let hour = String(datetime.getHours()).padStart(2, "0");
    let minute = String(datetime.getMinutes()).padStart(2, "0");
    let second = String(datetime.getSeconds()).padStart(2, "0");
    datetime =
      yyyy + "-" + mm + "-" + dd + " " + hour + ":" + minute + ":" + second;
    let data = { ...newData, time: datetime };
    props.getEditEvent(data);
  };
  return (
    <>
      <MaterialTable
        title="Event ( You can only edit live and upcoming events )"
        columns={columns}
        data={props.eventEdit}
        options={{
          actionsColumnIndex: -1,
        }}
        editable={{
          onRowUpdate: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                getEditEvent(newData);
                resolve();
              }, 1000);
            }),
        }}
      />
    </>
  );
}

export default EditEvent;
