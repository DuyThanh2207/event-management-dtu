import React, { useEffect, useState } from "react";
import NavbarTeam from './../../../components/CenterPage/Team/NavbarTeam';
import HeaderCenter from './../../../components/CenterPage/Header/HeaderCenter';
import Footer from './../../../components/Footer';
import TableDataRowTask from './../../../components/CenterPage/Team/TableDataRowTask';
import AddTask from "../../../components/CenterPage/Team/AddTask";
const axios = require('axios');
const GiveTasks = () => {
    const [taskData, setTaskData] = useState([]);
    const [eventData, setEventData] = useState([]);
    const [eventId, setEventId] = useState();
    const [showAddTask, setShowAddTask] = useState(false);
    useEffect(() => {
        axios.post('/event-task', {
            account_id: sessionStorage.getItem("account_id")
        }).then((res) => {
            setEventData(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    })
    const showTask = () => taskData.map((value, index) =>(
        <TableDataRowTask
            key = {index}
            order = {index}
            name = {value.task_name}
            description = {value.task_description}
            staff = {value.staff_id}
        />
    ))
    const onHandledClick = (e) => {
        setEventId(e.target.value);
        axios.post('/tasks-data', {
            event_id: e.target.value
        }).then((res) => {
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
            center_id: sessionStorage.getItem("account_id")
        }).then((res) => {
            setTaskData(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
        setShowAddTask(!showAddTask)
    }
    return (<div>
        <HeaderCenter />
        <NavbarTeam/>
        <div className="container mt-5">
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
                                            <div className="btn btn-primary mb-3" onClick = {() => setShowAddTask(true)}>CREATE TASK</div>
                                        </div>
                                        <table className="table">
                                            <thead className="thead-dark">
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Task</th>
                                                    <th scope="col">Task Description</th>
                                                    <th scope="col">Staff</th>
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
            </div>
        </div>
        <Footer/>
    </div>);
}
export default GiveTasks;