import React, { useEffect, useState } from "react";
import Header from '../../../components/Header';
import Navbar from '../../../components/CenterPage/Navbar';
import Footer from '../../../components/Footer';
import AddTask from "../../../components/CenterPage/Tasks/AddTask";
import EditTask from './../../../components/CenterPage/Tasks/EditTask';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EventIcon from '@material-ui/icons/Event';
import MaterialTable from 'material-table';
import EditIcon from '@material-ui/icons/Edit';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './GiveTask.css'
import ListSubheader from '@material-ui/core/ListSubheader';
import Spinner from 'react-bootstrap/Spinner'
const axios = require('axios');
const GiveTasks = () => {
    const [taskData, setTaskData] = useState([]);
    const [eventDataAvailable, setEventDataAvailable] = useState([]);
    const [eventDataUnavailable, setEventDataUnavailable] = useState([]);
    const [eventId, setEventId] = useState();
    const [showAddTask, setShowAddTask] = useState(false);
    const [editStatus, setEditStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editData, setEditData] = useState();
    const [columns, setColumns] = useState([
        { title: 'Task', field: 'task_name'},
        { title: 'Task Description', field: 'task_description'},
        { title: 'Deadline', field: 'deadline', type: 'date'},
        { title: 'Status', field: 'status', editable: 'never'},
        { title: 'Staff', field: 'staff_id'},
        { title: 'Edit', render: rowData => <div className="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit" onClick = {() => getEditData(rowData)}><EditIcon/></div>},
    ]);
    const [column, setColumn] = useState([
        { title: 'Task', field: 'task_name'},
        { title: 'Task Description', field: 'task_description'},
        { title: 'Deadline', field: 'deadline', type: 'date'},
        { title: 'Status', field: 'status', editable: 'never'},
        { title: 'Staff', field: 'staff_id'},
    ]);
    const fetchData = () => {
        setTimeout(async () =>  {
            const data = await axios.post('/tasks-data', {
                event_id: eventId
            }).then((res) => {
                if(res.data.length > 0)
                    setTaskData(res.data);
                else if (res.data.length === 0)
                    setTaskData([])
            })
            .catch((error) => {
                console.log(error);
            })
            setLoading(false)
        }, 3000);
    }
    useEffect(() => {
        axios.post('/check-task')
        .then(() => {
            axios.post('/event-center-available', {
                account_id: sessionStorage.getItem("account_id")
            }).then((res) => {
                if(res.data.length > 0)
                setEventDataAvailable(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
            axios.post('/event-center-unavailable', {
                account_id: sessionStorage.getItem("account_id")
            }).then((res) => {
                if(res.data.length > 0)
                setEventDataUnavailable(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
        })
        .catch((error) => {
            console.log(error);
        })
    },[])
    const changeEditStatus = () => {
        setEditStatus(false)
    }
    const getEditData = (dataEdit) => {
        setEditData(dataEdit)
        setEditStatus(true)
        setShowAddTask(false)
    }
    const onHandledClick = (e) => {
        setLoading(true)
        setEventId(e.event_id);
        setTimeout(async () =>  {
            const data = await axios.post('/tasks-data', {
                event_id: e.event_id
            }).then((res) => {
                if(res.data.length > 0)
                    setTaskData(res.data);
                else if (res.data.length === 0)
                    setTaskData([])
            })
            .catch((error) => {
                console.log(error);
            })
            setLoading(false)
        }, 3000);
    }
    const getAddTaskData = (data) => {
        axios.post('/add-task', {
            event_id: eventId,
            task_name: data.task_name,
            task_description: data.task_description,
            staff_id: data.staff_id,
            deadline: data.deadline,
            center_id: sessionStorage.getItem("account_id")
        }).then((res) => {
            if(res.data.message){
                NotificationManager.error("Fail", "Error", 3000);
            }
            else {
                NotificationManager.success("Complete !", "Success", 3000);
                fetchData()
            }
        })
        .catch((error) => {
            console.log(error);
        })
        setShowAddTask(false)
    }
    const getEditTaskData = (data) => {
        axios.post('/edit-task', {
            task_name: data.task_name,
            task_description: data.task_description,
            staff_id: data.staff_id,
            deadline: data.deadline,
            task_id: data.task_id
        }).then((res) => {
            if(res.data.message){
                NotificationManager.error("Fail", "Error", 3000);
            }
            else {
                NotificationManager.success("Complete !", "Success", 3000);
                fetchData()
            }
        })
        .catch((error) => {
            console.log(error);
        })
        setEditStatus(false)
    }
    const deleteTask = (data) => {
        axios.post('/delete-task', {
            task_id: data
        }).then((res) => {
            if(res.data.message){
                NotificationManager.error("Fail", "Error", 3000);
            }
            else {
                NotificationManager.success("Complete !", "Success", 3000);
                fetchData()
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    return (
        <>
            <div className="app">
                <Navbar/>
                <main>
                    <Header/>
                    <div className="container mt-3">
                        <div className="row">
                            <div className="col">
                                <div className="card" style={{width: "100%"}}>
                                    <div className="card-body">
                                        <div className="d-flex justify-content-center">
                                            <h2>EVENT</h2>
                                        </div>
                                        <List component="nav" subheader={
                                            <ListSubheader component="div">
                                                Available Event
                                            </ListSubheader>
                                        }>
                                            {eventDataAvailable.length > 0 && eventDataAvailable.map((value, index) => (
                                                <ListItem button onClick = {() => onHandledClick(value)} data-toggle="modal" data-target=".taskModalAvailable">
                                                    <ListItemIcon>
                                                        <EventIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={value.event_name}/>
                                                </ListItem>
                                            ))}
                                        </List>
                                        <List component="nav" subheader={
                                            <ListSubheader component="div">
                                                Unavailable Event
                                            </ListSubheader>
                                        }>
                                            {eventDataUnavailable.length > 0 && eventDataUnavailable.map((value, index) => (
                                                <ListItem button onClick = {() => onHandledClick(value)} data-toggle="modal" data-target=".taskModalUnavailable">
                                                    <ListItemIcon>
                                                        <EventIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={value.event_name}/>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </div>
                                </div>
                            </div>               
                        </div>                                                        
                    </div>
                    <Footer/>
                </main>
            </div>
            <div class="modal modalfade taskModalAvailable" tabindex="-1" role="dialog" >
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content">
                        <div class="modal-body">
                            {loading ? (<div className="d-flex justify-content-center"><Spinner animation="border" /></div>) : (
                                <div>
                                    <div className="btn-group mb-3">
                                        <button type="button" className="btn btn-success" onClick = {() => setShowAddTask(!showAddTask)}>Add Task</button>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <MaterialTable
                                                title="Task"
                                                columns={columns}
                                                data={taskData}
                                                options={{
                                                    actionsColumnIndex: -1,
                                                }}
                                                editable={{
                                                    onRowDelete: oldData =>
                                                    new Promise((resolve) => {
                                                        setTimeout(() => {
                                                            const dataDelete = [...taskData];
                                                            const index = oldData.tableData.id;
                                                            deleteTask(dataDelete[index].task_id);
                                                            resolve();
                                                        }, 1000)
                                                    }),
                                                }}
                                            />
                                        </div>
                                        {showAddTask && (
                                            <div className="col-3">
                                                <AddTask 
                                                    getAddTaskData = {(data) => getAddTaskData(data)}
                                                    changeAddStatus = {() => setShowAddTask(false)}
                                                />
                                            </div>
                                        )}
                                        {editStatus && (
                                            <div className="col-3">
                                                <EditTask 
                                                    editData = {editData}
                                                    changeEditStatus = {() => changeEditStatus()}
                                                    getEditTaskData = {(data) => getEditTaskData(data)}
                                                />
                                            </div>
                                        )} 
                                    </div>
                                </div>
                            )}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal modalfade taskModalUnavailable" role="dialog" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content">
                        <div class="modal-body">
                            {loading ? (<div className="d-flex justify-content-center"><Spinner animation="border" /></div>) : (
                                <div className="row">
                                    <div className="col">
                                        <MaterialTable
                                            title="Task"
                                            columns={column}
                                            data={taskData}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <NotificationContainer/>
        </>                
    );
}
export default GiveTasks;