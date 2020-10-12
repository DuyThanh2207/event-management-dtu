import React from 'react';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import logo from './Logo.jpg'
const Login = () => {
    const { register, handleSubmit, errors } = useForm();
    let history = useHistory();
    const onClickHandler = () => {
        history.push("/event")
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-8">
                    <div className="d-flex justify-content-center mb-5" style = {{marginTop:"120px"}}>
                        <img src="https://pbs.twimg.com/profile_images/1211688669/logoDT-png_400x400.png" style={{width: '200px', height: '200px'}}/>
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
                            <form>
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
                                <input type="submit" value="Login" className="btn btn-block btn-primary mt-5"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="d-flex justify-content-end mr-5 mt-5">
                
                
            </div> */}
        </div>    
    );
}

export default Login;