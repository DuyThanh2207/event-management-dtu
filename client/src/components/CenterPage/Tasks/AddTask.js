import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import "./AddTask.css"
import "./AddTask.scss"
import Multiselect from 'react-widgets/lib/Multiselect';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
const axios = require('axios');
const AddTask = (props) => {
    const [staffData, setStaffData] = useState([]);
    const { register, handleSubmit, errors } = useForm();
    const [staffTask, setStaffTask] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());    
    var staffId = []
    useEffect(() => {
        axios.post('/member', {
            account_id: sessionStorage.getItem("account_id")
        }).then((res) => {
            res.data.forEach((item) => {
                staffId.push(item.account_id)
            })
            setStaffData(staffId)
        })
        .catch((error) => {
            console.log(error);
        })
    },[])
    const getCreateAccount = (data) => {
        let tempData = staffTask.join(', ')
        var today = new Date(selectedDate);
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        let temp = {...data, staff_id: tempData, deadline: today}
        props.getAddTaskData(temp)
        props.changeAddStatus()
    }
    return (
        <div className="card" style={{width: '100%'}}>
            <div className="card-body">
                <form onSubmit={handleSubmit(getCreateAccount)}>
                    <label>Task Name</label>
                    <input
                        className="form-control"
                        name="task_name"
                        type="text"
                        ref={register({required: true})}
                    />
                    {errors.task_name && <p>This field is required</p>}
                    <label>Task Description</label>
                    <input
                        className="form-control"
                        name="task_description"
                        type="text" 
                        ref={register({required: false})}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Deadline"
                            value={selectedDate}
                            onChange={value => setSelectedDate(value)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <label>Staff</label>
                    <Multiselect
                        data={staffData}
                        onChange={value =>setStaffTask(value)}
                    />
                    <input type="submit" value="Create Task" className="btn btn-primary btn-block mt-4"/>
                </form>
            </div>
        </div>
    );
}
export default AddTask;