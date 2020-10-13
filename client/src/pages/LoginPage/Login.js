import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import HeaderLogin from './../../components/LoginPage/HeaderLogin';
import Footer from './../../components/AdminPage/Footer/Footer';
const axios = require('axios');
const Login = () => {
    const { register, handleSubmit, errors } = useForm();
    const [isFail, setIsFail] = useState(false);
    let history = useHistory();
    const onClickHandler = (data) => {
        axios.post('/login', {
            account_username: data.userName,
            account_password: data.password,
          })
          .then((res) => {
            if(res.data.message){
                setIsFail(true)
            }
            else {
                setIsFail(false)
                console.log(res.data[0]);
                sessionStorage.setItem("loggedIn", true);
                sessionStorage.setItem("account_id", res.data[0].account_id);
                sessionStorage.setItem("account_name", res.data[0].account_name);
                sessionStorage.setItem("account_username", res.data[0].account_username);
                sessionStorage.setItem("account_password", res.data[0].account_password);
                sessionStorage.setItem("account_email", res.data[0].account_email);
                sessionStorage.setItem("account_role", res.data[0].account_role);
                if(sessionStorage.getItem("account_role") === "Admin"){
                    history.push("/event")
                }
                else if(sessionStorage.getItem("account_role") === "DTU Event Center"){
                    alert("DTU Event Center")
                }
                else if(sessionStorage.getItem("account_role") === "DTU Event Staff"){
                    alert("DTU Event Staff")
                }
            }
        })
          .catch((error) => {
            console.log(error);
          });
    }
    return (
        <div>
            <HeaderLogin/>
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        <div className="d-flex justify-content-center mb-5" style = {{marginTop:"120px"}}>
                            <img src="https://pbs.twimg.com/profile_images/1211688669/logoDT-png_400x400.png" alt = "logo" style={{width: '200px', height: '200px'}}/>
                        </div>
                        <div className="d-flex justify-content-center">
                            <h1 style={{color:"#a3312e"}}>Event Management DTU</h1>
                        </div>
                    </div>
                    <div className="col-4 mt-5">
                        <div className="card mr-5 mt-5"  style={{height: '350px'}}>
                            <div className="card-header ">
                                <h3>Sign in</h3>
                            </div>
                            <div className="card-body ml-3 mr-3">
                                <form onSubmit={handleSubmit(onClickHandler)}>
                                    <div className="mb-5">
                                        <h4>Username</h4>
                                        <div className="d-flex mt-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fas fa-user" /></span>
                                            </div>
                                            <br/>                         
                                            <input
                                                className="form-control"
                                                name="userName"
                                                type="text"
                                                ref={register({required: true})}
                                            />
                                            {errors.userName && <p>This field is required</p>}
                                        </div>
                                    </div>                            
                                    <h4>Password</h4>
                                    <div className="d-flex mt-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-key" /></span>
                                        </div> 
                                        <br/>  
                                        <input
                                            className="form-control"
                                            name="password"
                                            type="password"
                                            ref={register({required: true})}
                                        />
                                        {errors.password && <p>This field is required</p>}
                                    </div>
                                    {isFail ? (<div style={{backgroundColor:"#a3312e", color:"white", height:"30px"}} className="mt-3 d-flex align-items-center">
                                        <div className="ml-3">
                                            Wrong Username / password
                                        </div>                                 
                                    </div>)
                                    :null}
                                    <input type="submit" value="Login" className="btn btn-block btn-primary mt-5"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            <Footer/> 
        </div>  
    );
}

export default Login;