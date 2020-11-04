import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import "./AddTask.css"
import "./AddTask.scss"
import Multiselect from 'react-widgets/lib/Multiselect';
const axios = require('axios');
const AddTask = (props) => {
    const [staffData, setStaffData] = useState([]);
    const { register, handleSubmit, errors } = useForm();
    const [staffTask, setStaffTask] = useState([]);
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
    })
    const getCreateAccount = (data) => {
        let tempData = staffTask.join(', ')
        let temp = {...data, staff_id: tempData}
        props.getAddTaskData(temp)
    }
    return (
        <div className="card col-3" style={{width: '100%'}}>
            <div className="card-body">
                <form onSubmit={handleSubmit(getCreateAccount)}>
                    <label>Task Name</label>
                    <input
                        className="form-control"
                        name="task_name"
                        type="text"
                        ref={register({required: true})}
                    />
                    {errors.taskName && <p>This field is required</p>}
                    <label>Task Description</label>
                    <input
                        className="form-control"
                        name="task_description"
                        type="text" 
                        ref={register({required: false})}
                    />
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