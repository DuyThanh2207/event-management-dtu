import React from 'react';
import { useForm } from "react-hook-form";
import "./CreateAccountForm.css"
const EditAccountForm = (props) => {
    const { register, handleSubmit, errors } = useForm();
    let dataEdit = {'id':props.editData.account_id}
    const onGetEditUser = (data) => {
        dataEdit = {...dataEdit, ...data}
        props.changeEditStatus()
        props.getEditUser(dataEdit)
    }
    return (
        <div className="card col-3" style={{width: '100%'}}>
            <div className="card-body">
                <form onSubmit={handleSubmit(onGetEditUser)}>
                    <label>Name</label>
                    <input
                        defaultValue={props.editData.account_name}
                        className="form-control"
                        name="name"
                        type="text" 
                        ref={register({required: true})}
                    />
                    {errors.name && <p>This field is required</p>}
                    <label>Account</label>
                    <input
                        defaultValue={props.editData.account_username}
                        className="form-control"
                        name="username"
                        type="text"
                        ref={register({required: true})}
                    />
                    {errors.username && <p>This field is required</p>}
                    <label>Email</label>
                    <input
                        defaultValue={props.editData.account_email}
                        className="form-control"
                        name="email"
                        type="email" 
                        placeholder="name@example.com" 
                        ref={register({required: true})}
                    />
                    {errors.email && <p>This field is required</p>}
                    <label>Role</label>
                    <select className="form-control" name="role" defaultValue={props.editData.account_role} ref={register}>
                        <option>Choose Role...</option>
                        <option value="DTU Event Center">DTU Event Center</option>
                        <option value="DTU Event Staff">DTU Event Staff</option>
                    </select>
                    <input type="submit" value="Edit Account" className="btn btn-warning btn-block mt-4"/>
                </form>
            </div>
        </div>
    );
}

export default EditAccountForm;