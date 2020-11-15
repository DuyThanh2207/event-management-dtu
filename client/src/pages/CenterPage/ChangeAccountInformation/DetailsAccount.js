import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Header from '../../../components/Header';
import Footer from './../../../components/Footer';
import Navbar from './../../../components/CenterPage/Navbar';
import { useHistory } from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';
const axios = require('axios');
function DetailsAccount() {
    let history = useHistory();
    const [email, setEmail] = useState()
    const [name, setName] = useState()
    const [edit, setEdit] = useState(true)
    const handleSubmit = () => {
        axios.post('/edit-account-details', {
            account_id: sessionStorage.getItem("account_id"),
            account_name: name,
            account_email: email
        }).then((res) => {
            if(res.data.message){
                NotificationManager.error(res.data.message, "Error", 3000);
            }
            else {
                NotificationManager.success("Complete !", "Success", 3000);
                setEdit(true)
                fetchAccountData()
            }
        })
        .catch((error) => {
            console.log(error);
		})
    }
    const fetchAccountData = async () => {
        const data = await axios.post('/account-details', {
            account_id: sessionStorage.getItem("account_id")
        }).then((res) => {
            if(res.data.length > 0){
                console.log(res.data);
                setEmail(res.data[0].account_email)
                setName(res.data[0].account_name)
            } 
        })
        .catch((error) => {
            console.log(error);
		})
    }
    useEffect(() => {
        fetchAccountData()
	}, [])
    return (
        <div className="app">
            <Navbar/>
            <main>
                <Header/>
                <div className="container mt-5 d-flex justify-content-center">
                    <div className="card" style={{width: '50%'}}>
                        <div className="card-body d-flex justify-content-center">
                            <ValidatorForm
                                onSubmit={handleSubmit}
                                style={{ width : "100%" }}
                            >
                                <div className="d-flex justify-content-between">
                                    <h2 className="mt-3">Account Details</h2>
                                    <div className="btn btn-warning" onClick={() => setEdit(false)}>Edit</div>
                                </div>            
                                {edit ? 
                                    (<div>
                                        <TextValidator
                                        disabled 
                                        style={{ width : "100%" }}
                                        label="Name"
                                        value={name}
                                        />
                                        <br />
                                        <TextValidator
                                            disabled 
                                            style={{ width : "100%" }}
                                            label="Email"
                                            value={email}
                                        />             
                                    </div>)
                                    :
                                    (<div>
                                        <TextValidator
                                            style={{ width : "100%" }}
                                            label="Name"
                                            onChange={(event) => setName(event.target.value)}
                                            value={name}
                                            validators={['required']}
                                            errorMessages={['This field is required']}
                                        />
                                        <br/>
                                        <TextValidator
                                            style={{ width : "100%" }}
                                            label="Email"
                                            onChange={(event) => setEmail(event.target.value)}
                                            value={email}
                                            validators={['required']}
                                            errorMessages={['This field is required']}
                                        />
                                        <br />
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            type="submit"
                                        >
                                            Submit
                                        </Button>
                                        <Button
                                            className="ml-3"
                                            variant="contained"
                                            onClick={() => setEdit(true)}
                                        >
                                            Cancel
                                        </Button>
                                    </div>)}
                            </ValidatorForm>
                        </div>
                    </div>               
                </div>
                <Footer/>
            </main>
            <NotificationContainer/>
        </div>
    );
}

export default DetailsAccount;