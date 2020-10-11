import React from 'react';
import { useForm } from "react-hook-form";
import "./CreateAccountForm.css"
const CreateAccountForm = (props) => {
    const { register, handleSubmit, errors } = useForm();
    const getCreateAccount = (data) => {
        props.getAddData(data)
        props.changeCreateStatus()
    }
    return (
        <div className="card col-3" style={{width: '100%'}}>
            <div className="card-body">
                <form onSubmit={handleSubmit(getCreateAccount)}>
                    <label>ID User</label>
                    <input
                        className="form-control"
                        name="id"
                        type="text"
                        ref={register({required: true})}
                    />
                    {errors.id && <p>This field is required</p>}
                    <label>Name</label>
                    <input
                        className="form-control"
                        name="name"
                        type="text" 
                        ref={register({required: true})}
                    />
                    {errors.name && <p>This field is required</p>}
                    <label>Account</label>
                    <input
                        className="form-control"
                        name="username"
                        type="text"
                        ref={register({required: true})}
                    />
                    {errors.username && <p>This field is required</p>}
                    <label>Password</label>
                    <input
                        className="form-control"
                        name="password"
                        type="password" 
                        ref={register({required: true})}
                    />
                    {errors.password && <p>This field is required</p>}
                    <label>Email</label>
                    <input
                        className="form-control"
                        name="email"
                        type="email" 
                        placeholder="name@example.com" 
                        ref={register({required: true})}
                    />
                    {errors.email && <p>This field is required</p>}
                    <label>Role</label>
                    <select className="form-control" name="role" ref={register}>
                        <option selected>Choose Role...</option>
                        <option value="DTU Event Center">DTU Event Center</option>
                        <option value="DTU Event Staff">DTU Event Staff</option>
                    </select>
                    <input type="submit" value="Create Account" className="btn btn-primary btn-block mt-4"/>
                </form>
            </div>
        </div>
    );
}
export default CreateAccountForm;