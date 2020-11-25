import React, { useEffect, useState } from 'react';
import Header from './../../../components/Header';
import Navbar from './../../../components/CenterPage/Navbar';
import Footer from './../../../components/Footer';
import MaterialTable from 'material-table';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
const axios = require('axios');
const Member = () => {
    const [memberData, setMemberData] = useState([]);
    const [allMember, setAllMember] = useState([]);
    const [addStatus, setAddStatus] = useState(false);
    const [idMember, setIdMember] = useState();
    const [columns, setColumns] = useState([
        { title: 'ID', field: 'account_id'},
        { title: 'Name', field: 'account_name'},
        { title: 'Email', field: 'account_email'},
    ]);
    const fetchData = () => {
        axios.post('/member', {
            account_id: sessionStorage.getItem("account_id")
        }).then((res) => {
            setMemberData(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
        axios.get('/member-all')
        .then((res) => {
            if(res.data.length > 0){
                setAllMember(res.data);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    useEffect(() => {
        fetchData()
    },[])
    const getAddMember = () => {
        axios.post('/add-member', {
            account_staff_id: idMember,
            account_center_id: sessionStorage.getItem("account_id")
        }).then((res) => {
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
        })
        setAddStatus(!addStatus)
    }
    const deleteUser = (userID) => {
        axios.post('/delete-member', {
            staff_id: "%" + userID + "%",
            account_staff_id: userID,
        })
        .then((res) => {
            if(res.data.message){
                NotificationManager.error(res.data.message, "Error", 3000);
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
                            <button type="button" className="btn btn-success" onClick = {() => setAddStatus(!addStatus)}>Add Member</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <MaterialTable
                                title="Account"
                                columns={columns}
                                data={memberData}
                                options={{
                                    actionsColumnIndex: -1,
                                }}
                                editable={{
                                    onRowDelete: oldData =>
                                    new Promise((resolve) => {
                                        setTimeout(() => {
                                            const dataDelete = [...memberData];
                                            const index = oldData.tableData.id;
                                            deleteUser(dataDelete[index].account_id);
                                            resolve();
                                        }, 1000)
                                    }),
                                }}
                            />
                        </div>
                        {addStatus && (
                            <div className="col-3">
                                <div className="card" style={{width: "20rem"}}>
                                    <div className="card-body">
                                        <label>ID Member</label>
                                        <select id="inputIDMember" defaultValue = "Choose..." className="form-control" onChange = {(e) => setIdMember(e.target.value)}>
                                            <option>...</option>
                                                {allMember.length > 0 ? allMember.map((member, index) =>{
                                                    return (
                                                    <option key = {index} value={member.account_id}>{member.account_id + " - " + member.account_name}</option>)
                                                }) : null}
                                            </select>
                                            <div className="btn btn-block btn-primary mt-2" onClick = {() => getAddMember()}>Add Member</div>
                                    </div>
                                </div>
                            </div>  
                        )}                    
                    </div>
                </div>
                <Footer/>
            </main>
            <NotificationContainer/>
        </div>
    );
}
export default Member;