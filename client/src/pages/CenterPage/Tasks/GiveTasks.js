import React, { useEffect, useState } from "react";
import Header from '../../../components/Header';
import Navbar from '../../../components/CenterPage/Navbar';
import Footer from '../../../components/Footer';
import TableDataRowTask from '../../../components/CenterPage/Tasks/TableDataRowTask';
import AddTask from "../../../components/CenterPage/Tasks/AddTask";
import EditTask from './../../../components/CenterPage/Tasks/EditTask';
const axios = require('axios');
const GiveTasks = () => {
    const [taskData, setTaskData] = useState([]);
    const [eventData, setEventData] = useState([]);
    const [eventId, setEventId] = useState();
    const [showAddTask, setShowAddTask] = useState(false);
    const [editStatus, setEditStatus] = useState(false);
    const [editData, setEditData] = useState();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [messenger, setMessenger] = useState();
    useEffect(() => {
        axios.post('/event-task', {
            account_id: sessionStorage.getItem("account_id")
        }).then((res) => {
            if(res.data.length > 0)
                setEventData(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    })
    const changeEditStatus = () => {
        setEditStatus(!editStatus)
        setShowAddTask(false)
    }
    const getEditData = (dataEdit) => {
        setEditData(dataEdit)
    }
    const showTask = () => taskData.map((value, index) =>(
        <TableDataRowTask
            key = {index}
            order = {index}
            value = {value}
            name = {value.task_name}
            description = {value.task_description}
            deadline = {value.deadline}
            status = {value.status}
            staff = {value.staff_id}
            getEditData = {(dataEdit) => getEditData(dataEdit)}
            changeEditStatus = {() => changeEditStatus()}
        />
    ))
    const onHandledClick = (e) => {
        setEventId(e.target.value);
        axios.post('/tasks-data', {
            event_id: e.target.value
        }).then((res) => {
            if(res.data.length > 0)
                setTaskData(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
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
            window.location.reload()
        })
        .catch((error) => {
            console.log(error);
        })
        setShowAddTask(!showAddTask)
        setEditStatus(false)
    }
    return (<div>
        <div class="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
            <Header />
            <div className="app-main">
                <Navbar/>
                <div className="app-main__outer">
                    <div className="app-main__inner">
                        <div className="row">
                            <div className="container mt-3">
                                <div className="row">
                                    <div className="col">
                                        <div className="card" style={{width: "100%"}}>
                                            <div className="card-body">
                                                <div className="d-flex justify-content-center">
                                                    <h2>EVENT</h2>
                                                </div>
                                                <select id="event" defaultValue = "Choose..." className="form-control" onChange = {(e) => onHandledClick(e)}>
                                                    <option>...</option>
                                                    {eventData.length > 0 && eventData.map((value, index) =>{
                                                        return (
                                                        <option key = {index} value={value.event_id}>{value.event_name}</option>)
                                                    })}
                                                </select>
                                                <div className="mt-3">
                                                    {taskData.length > 0 && (
                                                        <div>
                                                            <div className="btn-group">
                                                                <div className="btn btn-primary mb-3" onClick = {() => setShowAddTask(!showAddTask)}>CREATE TASK</div>
                                                            </div>
                                                            <table className="table">
                                                                <thead className="thead-dark">
                                                                    <tr>
                                                                        <th scope="col">#</th>
                                                                        <th scope="col">Task</th>
                                                                        <th scope="col">Task Description</th>
                                                                        <th scope="col">Deadline</th>
                                                                        <th scope="col">Status</th>
                                                                        <th scope="col">Staff</th>
                                                                        <th scope="col">Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {showTask()}
                                                                </tbody>
                                                            </table>
                                                        </div>                                   
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {showAddTask && <AddTask getAddTaskData = {(data) => getAddTaskData(data)}/>}     
                                    {editStatus && <EditTask 
                                        editData = {editData}
                                    />}          
                                </div>                                                        
                            </div>
                        </div>
                        <Footer/> 
                    </div>
                </div>
            </div>   
        </div>
    </div>);
}
export default GiveTasks;