import React, { useEffect, useState } from "react";
import Header from '../../../components/Header';
import Navbar from '../../../components/CenterPage/Navbar';
import Footer from '../../../components/Footer';
import MaterialTable from 'material-table';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './../../../pages/CenterPage/Tasks/GiveTask.css';
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal'
const axios = require('axios');
const CreateEvent = () => {
    const [eventData, setEventData] = useState([]);
    const [showData, setShowData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [eventId, setEventId] = useState();
    const [show, setShow] = useState(false);
    const [columns, setColumns] = useState([
        { title: 'Event ID', field: 'event_id', editable: 'never', hidden: true},
        { title: 'Event Name', field: 'event_name', validate: rowData => rowData.event_name === "" ? 'Event Name cannot be empty' : '',},
        { title: 'Event Description', field: 'event_description'},
        { title: 'Event Place', field: 'event_place', validate: rowData => rowData.event_place === "" ? 'Event Place cannot be empty' : '',},
        { title: 'Event Time', field: 'time', type: 'datetime', validate: rowData => rowData.time === "" ? 'Event Time cannot be empty' : '',},
        { title: 'Event Duration', field: 'event_duration', type: 'numeric', validate: rowData => rowData.event_duration < 0 ? 'Event Duration must be after 0' : '',},
    ]);
    const [column, setColumn] = useState([
        { title: 'Show ID', field: 'id', editable: 'never', hidden: true},
        { title: 'Show Name', field: 'show_name', validate: rowData => rowData.show_name === "" ? 'Show Name cannot be empty' : '',},
        { title: 'Show Duration', field: 'show_duration', validate: rowData => rowData.show_duration === "" ? 'Show Duration cannot be empty' : '',},
        { title: 'Show Speaker', field: 'show_speaker'},
    ]);
    const fetchEventData = async () => {
        const data = await axios.post('/event-center-available', {
            account_id: sessionStorage.getItem("account_id")
        }).then((res) => {
            if(res.data.length > 0)
                setEventData(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    const fetchShowData = async () => {
        const data = await axios.post('/show', {
            event_id: eventId
        }).then((res) => {
            if(res.data.length > 0)
                setShowData(res.data);
            else if (res.data.length === 0)
                setShowData([])
        })
        .catch((error) => {
            console.log(error);
        })
        setLoading(false)
    }
    useEffect(() => {
        fetchEventData()
    },[])
    const getAddEvent = (data) => {
        var today = new Date(data.time);
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var hour = String(today.getHours()).padStart(2, '0');
        var minute = String(today.getMinutes() + 1).padStart(2, '0');
        var second = String(today.getSeconds()).padStart(2, '0');;
        var eventTime = yyyy + '-' + mm + '-' + dd + " " + hour + ':' + minute + ':' + second
        axios.post('/add-event', {
            event_name: data.event_name,
            event_place: data.event_place,
            event_date: eventTime,
            event_duration: data.event_duration,
            event_description: data.event_description,
            center_id: sessionStorage.getItem("account_id")
        }).then((res) => {
            if(res.data.message){
                NotificationManager.error("Fail", "Error", 3000);
            }
            else {
                NotificationManager.success("Complete !", "Success", 3000);
                fetchEventData()
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    const getEditEvent = (data) => {
        var today = new Date(data.time);
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var hour = String(today.getHours()).padStart(2, '0');
        var minute = String(today.getMinutes() + 1).padStart(2, '0');
        var second = String(today.getSeconds()).padStart(2, '0');;
        var eventTime = yyyy + '-' + mm + '-' + dd + " " + hour + ':' + minute + ':' + second
        axios.post('/edit-event', {
            event_id: data.event_id,
            event_name: data.event_name,
            event_place: data.event_place,
            event_date: eventTime,
            event_duration: data.event_duration,
            event_description: data.event_description,
        }).then((res) => {
            if(res.data.message){
                NotificationManager.error("Fail", "Error", 3000);
            }
            else {
                NotificationManager.success("Complete !", "Success", 3000);
                fetchEventData()
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    const deleteEvent = (data) => {
        axios.post('/delete-event', {
            event_id: data
        }).then((res) => {
            if(res.data.message){
                NotificationManager.error("Fail", "Error", 3000);
            }
            else {
                NotificationManager.success("Complete !", "Success", 3000);
                fetchEventData()
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    const getAddShow = (data) => {
        axios.post('/add-show', {
            event_id: eventId,
            show_name: data.show_name,
            show_duration: data.show_duration,
            show_speaker: data.show_speaker,
        }).then((res) => {
            if(res.data.message){
                NotificationManager.error("Fail", "Error", 3000);
            }
            else {
                NotificationManager.success("Complete !", "Success", 3000);
                fetchShowData()
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    const getEditShow = (data) => {
        axios.post('/edit-show', {
            id: data.id,
            show_name: data.show_name,
            show_duration: data.show_duration,
            show_speaker: data.show_speaker,
        }).then((res) => {
            if(res.data.message){
                NotificationManager.error("Fail", "Error", 3000);
            }
            else {
                NotificationManager.success("Complete !", "Success", 3000);
                fetchShowData()
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    const deleteShow = (data) => {
        axios.post('/delete-show', {
            id: data
        }).then((res) => {
            if(res.data.message){
                NotificationManager.error("Fail", "Error", 3000);
            }
            else {
                NotificationManager.success("Complete !", "Success", 3000);
                fetchShowData()
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    const onHandledClick = (e) => {
        setShow(true)
        setLoading(true)
        setEventId(e.event_id);
        setTimeout(async () =>  {
            const data = await axios.post('/show', {
                event_id: e.event_id
            }).then((res) => {
                if(res.data.length > 0)
                    setShowData(res.data);
                else if (res.data.length === 0)
                    setShowData([])
            })
            .catch((error) => {
                console.log(error);
            })
            setLoading(false)
        }, 3000);
    }
    return (
        <div className="app">
            <Navbar/>
            <main>
                <Header/>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <MaterialTable
                                title="Event"
                                columns={columns}
                                data={eventData}
                                options={{
                                    actionsColumnIndex: -1,
                                }}
                                editable={{
                                    onRowAdd: newData =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            getAddEvent(newData);
                                        resolve();
                                        }, 1000)
                                    }),
                                    onRowUpdate: (newData) =>
                                    new Promise((resolve) => {
                                        setTimeout(() => {
                                            getEditEvent(newData);
                                            resolve();
                                        }, 1000)
                                    }),
                                    onRowDelete: oldData =>
                                    new Promise((resolve) => {
                                        setTimeout(() => {
                                            const dataDelete = [...eventData];
                                            const index = oldData.tableData.id;
                                            deleteEvent(dataDelete[index].event_id);
                                            resolve();
                                        }, 1000)
                                    }),
                                }}
                                onRowClick={(event, rowData) => onHandledClick(rowData)}
                            />
                        </div>
                    </div>
                </div>
                <Footer/>
            </main>
            <Modal show={show} onHide={() => setShow(false)} centered size="lg">
                <Modal.Body>
                    {loading ? (<div className="d-flex justify-content-center"><Spinner animation="border" /></div>) : (
                        <MaterialTable
                            title="Event"
                            columns={column}
                            data={showData}
                            options={{
                                actionsColumnIndex: -1,
                            }}
                            editable={{
                                onRowAdd: newData =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        getAddShow(newData);
                                    resolve();
                                    }, 1000)
                                }),
                                onRowUpdate: (newData) =>
                                new Promise((resolve) => {
                                    setTimeout(() => {
                                        getEditShow(newData);
                                        resolve();
                                    }, 1000)
                                }),
                                onRowDelete: oldData =>
                                new Promise((resolve) => {
                                    setTimeout(() => {
                                        const dataDelete = [...showData];
                                        const index = oldData.tableData.id;
                                        deleteShow(dataDelete[index].id);
                                        resolve();
                                    }, 1000)
                                }),
                            }}
                        />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <div className="btn btn-primary" onClick={() => setShow(false)}>
                        Close
                    </div>
                </Modal.Footer>
            </Modal>
            <NotificationContainer/>
        </div>
    );
}
export default CreateEvent;