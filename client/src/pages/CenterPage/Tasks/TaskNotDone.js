import React, { useEffect, useState } from "react";
import Header from '../../../components/Header';
import Navbar from '../../../components/CenterPage/Navbar';
import Footer from '../../../components/Footer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EventIcon from '@material-ui/icons/Event';
import MaterialTable from 'material-table';
import './GiveTask.css'
import ListSubheader from '@material-ui/core/ListSubheader';
import Spinner from 'react-bootstrap/Spinner'
const axios = require('axios');
const TaskNotDone = () => {
    const [taskData, setTaskData] = useState([]);
    const [eventDataAvailable, setEventDataAvailable] = useState([]);
    const [loading, setLoading] = useState(false);
    const [columns, setColumns] = useState([
        { title: 'Task', field: 'task_name'},
        { title: 'Task Description', field: 'task_description'},
        { title: 'Status', field: 'status'},
        { title: 'Deadline', field: 'deadline', type: 'date'},
        { title: 'Staff', field: 'staff_id'},
    ]);
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
        })
        .catch((error) => {
            console.log(error);
        })
    },[])
    const onHandledClick = (e) => {
        setLoading(true)
        setTimeout(async () =>  {
            const data = await axios.post('/task-not-done', {
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
                                                <ListItem button onClick = {() => onHandledClick(value)} data-toggle="modal" data-target=".taskModal">
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
            <div class="modal modalfade taskModal" tabindex="-1" role="dialog" >
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content">
                        <div class="modal-body">
                            {loading ? (<div className="d-flex justify-content-center"><Spinner animation="border" /></div>) : (
                                <div className="row">
                                    <div className="col">
                                        <MaterialTable
                                            title="Task"
                                            columns={columns}
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
        </>                
    );
}
export default TaskNotDone;