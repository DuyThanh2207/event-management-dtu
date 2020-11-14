import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import "./style.css";
import Header from '../../../components/Header';
import Footer from './../../../components/Footer';
import { useHistory } from "react-router-dom";
import Navbar from './../../../components/CenterPage/Navbar';
const axios = require('axios');
const ChangePassword = () => {
    const { register, handleSubmit, errors } = useForm();
    const [messenger, setMessenger] = useState();
    const [isNotice, setIsNotice] = useState(false);
    let history = useHistory();
    const getEditAccount = (data) => {
        if(data.oldPassword === data.newPassword){
            setIsNotice(true)
            setMessenger("New password is can't same with old password")
        }
        else {
            axios.post('/change-password', {
                new_password : data.newPassword,
                old_password : data.oldPassword,
                account_id : sessionStorage.getItem("account_id")
              })
              .then((res) => {
                if(res.data.message){
                    setIsNotice(true)
                    setMessenger(res.data.message)
                }
                else{
                    alert("Success !")
                    history.push("/event")
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
    return (
        <div className="app">
            <Navbar/>
            <main>
                <Header/>
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
                                    {isNotice ? (<p className="mt-3">{messenger}</p>):null}
                                    <input type="submit" value="Apply" className="btn btn-primary btn-block mt-4"/>                 
                                </form>  
                            </div>
                        </div>               
                    </div>
                <Footer/>
            </main>
        </div>
    );
}

export default ChangePassword;