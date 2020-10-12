import React from 'react';
import { useForm } from "react-hook-form";
import "./style.css";
const ChangeAccountInfomation = () => {
    const { register, handleSubmit, errors } = useForm();
    const getEditAccount = (data) => {
        console.log(data);
    }
    return (
        <div>
            <div className="container mt-5 d-flex justify-content-center">
                <div className="card" style={{width: '50%'}}>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(getEditAccount)}>
                            <label>Old Password</label>
                            <input
                                className="form-control"
                                name="oldPassword"
                                type="password"
                                ref={register({required: true})}
                            />
                            {errors.oldPassword && <p>This field is required</p>}
                            <label>New Password</label>
                            <input
                                className="form-control"
                                name="newPassword"
                                type="password"
                                ref={register({required: true})}
                            />
                            {errors.newPassword && <p>This field is required</p>}
                            <input type="submit" value="Apply" className="btn btn-primary btn-block mt-4"/>                 
                        </form>  
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangeAccountInfomation;