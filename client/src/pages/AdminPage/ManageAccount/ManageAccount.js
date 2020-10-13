import React, { useEffect, useState } from 'react';
import TableDataRow from '../../../components/AdminPage/ManageAccount/TableDataRow';
import CreateAccountForm from '../../../components/AdminPage/ManageAccount/CreateAccountForm';
import EditAccountForm from '../../../components/AdminPage/ManageAccount/EditAccountForm';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import Alert from 'react-bootstrap/Alert'
import Fade from 'react-reveal/Fade';
import Header from './../../../components/AdminPage/Header/Header';
import NavbarManageAccount from './../../../components/AdminPage/ManageAccount/NavbarManageAccount';
import Footer from './../../../components/AdminPage/Footer/Footer';
const axios = require('axios');
const ManageAccount = () => {
    const [createStatus, setCreateStatus] = useState(false);
    const [dataUser, setDataUser] = useState([]);
    const [editStatus, setEditStatus] = useState(false);
    const [editData, setEditData] = useState();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [messenger, setMessenger] = useState();
    const [searchText, setSearchText] = useState(" ");
    useEffect(() => {
        axios.get('/account').then((res) => {
            setDataUser(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    })
    const showCreate = () => {
        if(createStatus === true)
            return (<CreateAccountForm 
                        getAddData = {(data) => getAddData(data)}
                        changeCreateStatus = {() => changeCreateStatus()}
                    />)
        else
            return null;
    }
    const changeEditStatus = () => {
        setEditStatus(!editStatus)
        setCreateStatus(false)
    }
    const getEditData = (dataEdit) => {
        setEditData(dataEdit)
    }
    const getAddData = (data) => { 
        axios.post('/create-user', {
            account_id: data.id,
            account_name: data.name,
            account_username: data.username,
            account_password: data.password,
            account_email: data.email,
            account_role: data.role
          })
          .then((res) => {
            if(res.data.message){
                setIsFailed(true)
                setTimeout(() => setIsFailed(false), 3000);
                setMessenger(res.data.message)
            }
            else {
                setIsSuccess(true)
                setTimeout(() => setIsSuccess(false), 3000);
                setMessenger("Complete !")
            }
        })
          .catch((error) => {
            console.log(error);
          });
    }
    const showEditForm = () => {
        if(editStatus === true)
            return (              
                <EditAccountForm 
                    editData = {editData}
                    getEditUser = {(user) => getEditUser(user)}
                    changeEditStatus = {() => changeEditStatus()}
                />
            )
        else
            return null;
    }
    const changeCreateStatus = () => {
        setCreateStatus(!createStatus)
        setEditStatus(false)
    }
    const deleteUser = (userID) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this ?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    axios.post('/delete-user', {
                        account_id: userID,
                    })
                    .then((res) => {
                        if(res.data.message){
                            setIsFailed(true)
                            setTimeout(() => setIsFailed(false), 3000);
                            setMessenger(res.data.message)
                        }
                        else {
                            setIsSuccess(true)
                            setTimeout(() => setIsSuccess(false), 3000);
                            setMessenger("Complete !")
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                }
              },
              {
                label: 'No',
                onClick: () => null
              }
            ]
        });
    };
    var dataSearch = []
    dataUser.forEach((item) => {
        if (item.account_name.toLowerCase().indexOf(searchText) !== -1 || item.account_id.toLowerCase().indexOf(searchText) !== -1 || item.account_username.toLowerCase().indexOf(searchText) !== -1 || item.account_email.toLowerCase().indexOf(searchText) !== -1 || item.account_role.toLowerCase().indexOf(searchText) !== -1)
            dataSearch.push(item)
    })
    const mappingDataUser = () => dataSearch.map((value, index) =>(
        <TableDataRow
            key = {index}
            id = {value.account_id}
            name = {value.account_name}
            username = {value.account_username}
            email = {value.account_email}
            role = {value.account_role}
            value = {value}
            changeEditStatus = {() => changeEditStatus()}
            getEditData = {(dataEdit) => getEditData(dataEdit)}
            deleteUser = {(userID) => deleteUser(userID)}
        />
    ))
    const getEditUser = (user) => {
        axios.post('/edit-user', {
            account_id: user.id,
            account_name: user.name,
            account_username: user.username,
            account_email: user.email,
            account_role: user.role
          })
          .then((res) => {
            if(res.data.message){
                setIsFailed(true)
                setTimeout(() => setIsFailed(false), 3000);
                setMessenger(res.data.message)
            }
            else {
                setIsSuccess(true)
                setTimeout(() => setIsSuccess(false), 3000);
                setMessenger("Complete !")
            }
        })
          .catch((error) => {
            console.log(error);
          });
    }
    const getSearchText = (e) => {
        setSearchText(e.target.value.toLowerCase())
    }
    return (
        <>
            <Header/>
            <NavbarManageAccount/>
            <div className="container mt-3">
                <div className="container d-flex justify-content-between">
                    <div className="input-group mb-3" style={{maxWidth: '500px'}}>
                        <input type="text" className="form-control" placeholder="Search..." onChange = {(e) => getSearchText(e)}/>
                    </div>
                    <div className="btn-group mb-3 d-flex justify-content-end">
                        <button type="button" className="btn btn-success" onClick = {() => changeCreateStatus()}>Create Account</button>
                    </div>
                </div>
                {dataUser.length === 0 ? (<h1  className="container d-flex justify-content-center mb-3">Add some new account</h1>):null}
                <div className="row">
                    <div className="col">
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Account</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mappingDataUser()}
                            </tbody>
                        </table>
                    </div>
                    {showCreate()}
                    {showEditForm()}
                </div>
            </div>
            <div className="d-flex justify-content-end mt-5">
                <br/>
                {isSuccess ? (
                    <Fade right>
                        <Alert variant="success">
                            {messenger}
                        </Alert>
                    </Fade>      
                ) : null}  
                {isFailed ? (
                    <Fade right>
                        <Alert variant="danger">
                            {messenger}
                        </Alert>
                    </Fade>      
                ): null}   
            </div> 
            <Footer/>   
        </>);
}
export default ManageAccount;