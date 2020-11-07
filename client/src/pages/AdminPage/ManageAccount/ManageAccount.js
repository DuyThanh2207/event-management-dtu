import React, { useEffect, useState } from 'react';
import CreateAccountForm from '../../../components/AdminPage/ManageAccount/CreateAccountForm';
import 'react-confirm-alert/src/react-confirm-alert.css'
import Header from './../../../components/Header';
import Footer from './../../../components/Footer';
import Navbar from './../../../components/AdminPage/Navbar';
import MaterialTable from 'material-table';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
const axios = require('axios');
const ManageAccount = () => {
    const [createStatus, setCreateStatus] = useState(false);
    const [dataUser, setDataUser] = useState([]);
    const [columns, setColumns] = useState([
        { title: 'ID', field: 'account_id', editable: 'never' },
        { title: 'Name', field: 'account_name', editable: 'onUpdate' },
        { title: 'Account', field: 'account_username', editable: 'onUpdate' },
        { title: 'Email', field: 'account_email', editable: 'onUpdate' },
        {
          title: 'Role',
          field: 'account_role',
          lookup: { "DTU Event Center": 'DTU Event Center', 'DTU Event Staff':'DTU Event Staff' },
        },
      ]);
    const fetchData = () => {
        axios.get('/account').then((res) => {
            setDataUser(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    useEffect(() => {
        fetchData()
    },[])
    const showCreate = () => {
        if(createStatus === true)
            return (<CreateAccountForm 
                        getAddData = {(data) => getAddData(data)}
                        changeCreateStatus = {() => changeCreateStatus()}
                    />)
        else
            return null;
    }
    const getAddData = (data) => {
        axios.post('/create-user', {
            account_id: data.id.toUpperCase(),
            account_name: data.name,
            account_username: data.username.toLowerCase(),
            account_password: data.password,
            account_email: data.email,
            account_role: data.role
            })
        .then((res) => {
            if(res.data.message){
                NotificationManager.error("Fail", "Error", 3000);
            }
            else {
                NotificationManager.success("Complete !", "Success", 3000);
                fetchData()
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const changeCreateStatus = () => {
        setCreateStatus(!createStatus)
    }
    const deleteUser = (userID) => {
        axios.post('/delete-user', {
            account_id: userID,
        })
        .then((res) => {
            if(res.data.message){
                NotificationManager.error("Fail", "Error", 3000);
            }
            else {
                NotificationManager.success("Complete !", "Success", 3000);
                fetchData()
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };
    const getEditUser = (user) => {
        axios.post('/edit-user', {
            account_id: user.account_id.toUpperCase(),
            account_name: user.account_name,
            account_username: user.account_username.toLowerCase(),
            account_email: user.account_email,
            account_role: user.account_role
        })
        .then((res) => {
            if(res.data.message){
                NotificationManager.error("Fail", "Error", 3000);
            }
            else {
                NotificationManager.success("Complete !", "Success", 3000);
                fetchData()
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }     
    return (
        <div className="app">
            <Navbar/>
            <main>
                <Header/>
                <div className="container">
                    <div className="container">
                        <div className="btn-group mb-3">
                            <button type="button" className="btn btn-success" onClick = {() => changeCreateStatus()}>Create Account</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <MaterialTable
                                title="Account"
                                columns={columns}
                                data={dataUser}
                                options={{
                                    actionsColumnIndex: -1,
                                }}
                                editable={{
                                    onRowUpdate: (newData) =>
                                    new Promise((resolve) => {
                                        setTimeout(() => {
                                            getEditUser(newData);
                                            resolve();
                                        }, 1000)
                                    }),
                                    onRowDelete: oldData =>
                                    new Promise((resolve) => {
                                        setTimeout(() => {
                                            const dataDelete = [...dataUser];
                                            const index = oldData.tableData.id;
                                            deleteUser(dataDelete[index].account_id);
                                            resolve();
                                        }, 1000)
                                    }),
                                }}
                            />
                        </div>
                        {showCreate()}
                    </div>
                </div>
                <Footer/>
            </main>
            <NotificationContainer/>
        </div>
        );
}
export default ManageAccount;