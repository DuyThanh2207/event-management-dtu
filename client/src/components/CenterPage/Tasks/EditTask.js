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
const EditTask = (props) => {
    const [staffData, setStaffData] = useState([]);
    const { register, handleSubmit, errors } = useForm();
    const [staffTemp, setStaffTemp] = useState(props.editData.staff_id.split(', '));
    const [dateEdit, setDateEdit] = useState();
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
        getDateEdit()
    },[])
    const getEditAccount = (data) => {
        let tempData = staffTemp.join(', ')
        var today = new Date(dateEdit);
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        var taskID = props.editData.task_id
        let temp = {...data, task_id: taskID, staff_id: tempData, deadline: today}
        props.getEditTaskData(temp);
    }
    const getDateEdit = () => {
        var temp = props.editData.deadline.replaceAll("-", ",");
        var dateTemp = temp.split(",");
        var dd = dateTemp[0]
        var mm = dateTemp[1]
        var yyyy = dateTemp[2]
        var today = yyyy + ',' + mm + ',' + dd;
        var date = new Date(today)
        setDateEdit(date);
    }
    return (
        <div className="card" style={{width: '100%'}}>
            <div className="card-body">
                <form onSubmit={handleSubmit(getEditAccount)}>
                    <label>Task Name</label>
                    <input
                        className="form-control"
                        name="task_name"
                        type="text"
                        defaultValue={props.editData.task_name}
                        ref={register({required: true})}
                    />
                    {errors.task_name && <p>This field is required</p>}
                    <label>Task Description</label>
                    <input
                        className="form-control"
                        name="task_description"
                        type="text"
                        defaultValue={props.editData.task_description}
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
                            value={dateEdit}
                            onChange={value => setDateEdit(value)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <label>Staff</label>
                    <Multiselect
                        value={staffTemp}
                        data={staffData}
                        onChange={value =>setStaffTemp(value)}
                    />
                    <input type="submit" value="Edit Task" className="btn btn-warning btn-block mt-4"/>
                    <div className="btn btn-danger btn-block mt-4" onClick={() => props.changeEditStatus()}>Cancel</div>
                </form>
            </div>
        </div>
    );
}
export default EditTask;