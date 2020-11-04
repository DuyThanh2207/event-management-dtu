import React, { useEffect, useState } from 'react';
import NavbarTeam from './../../../components/CenterPage/Team/NavbarTeam';
import HeaderCenter from './../../../components/CenterPage/Header/HeaderCenter';
import Footer from './../../../components/Footer';
import TableDataRowMember from './../../../components/CenterPage/Team/TableDataRowMember';
import Alert from 'react-bootstrap/Alert'
import Fade from 'react-reveal/Fade';
import { confirmAlert } from 'react-confirm-alert';
const axios = require('axios');
const Member = () => {
    const [memberData, setMemberData] = useState([]);
    const [allMember, setAllMember] = useState([]);
    const [nameMember, setNameMember] = useState();
    const [addStatus, setAddStatus] = useState(false);
    const [idMember, setIdMember] = useState();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [messenger, setMessenger] = useState();
    useEffect(() => {
        axios.post('/member', {
            account_id: sessionStorage.getItem("account_id")
        }).then((res) => {
            setMemberData(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    })
    const onAddMember = () => {
        axios.get('/member-all')
        .then((res) => {
            setAllMember(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
        setAddStatus(!addStatus)
    }
    const getAddMember = () => {
        axios.post('/add-member', {
            account_staff_id: idMember,
            account_center_id: sessionStorage.getItem("account_id")
        }).then((res) => {
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
        })
        setAddStatus(!addStatus)
        setNameMember(" ")
    }
    const onHandleChange = (e) => {
        const memberId = e.target.value;
        if(allMember.length > 0 && memberId !== "...") {
            const user = allMember.find(u => u.account_id === memberId);
            setNameMember(user.account_name);
            setIdMember(user.account_id)
        }
        else
            setNameMember(" ");
    }
    const deleteUser = (userID) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this ?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    axios.post('/delete-member', {
                        account_staff_id: userID,
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
    }
    const mappingDataUser = () => memberData.map((value, index) =>(
        <TableDataRowMember
            key = {index}
            id = {value.account_id}
            name = {value.account_name}
            email = {value.account_email}
            value = {value}
            deleteUser = {(userID) => deleteUser(userID)}
        />
    ))
    console.log(allMember);
    return (<div>
        <HeaderCenter />
        <NavbarTeam/>
        <div className="container mt-3">
                <div className="container d-flex justify-content-end">
                    <div className="btn-group mb-3">
                        <div className="btn btn-success" onClick = {() => onAddMember()}>Add Member</div>
                    </div>
                </div>
                {memberData.length === 0 ? (<h1  className="container d-flex justify-content-center mb-3">Add some new member</h1>):null}
                <div className="row">
                    <div className="col">
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mappingDataUser()}
                            </tbody>
                        </table>
                    </div>
                    {addStatus ? (
                        <div className="col-3">
                            <div className="card" style={{width: "20rem"}}>
                                <div className="card-body">
                                    <label>ID Member</label>
                                    <select id="inputIDMember" defaultValue = "Choose..." className="form-control" onChange = {(e) => onHandleChange(e)}>
                                        <option>...</option>
                                        {allMember.length > 0 ? allMember.map((member, index) =>{
                                            return (
                                            <option key = {index} value={member.account_id}>{member.account_id}</option>)
                                        }) : null}
                                    </select>
                                    <input className="form-control mt-2" defaultValue={nameMember} disabled="disabled"></input>
                                    <div className="btn btn-block btn-primary mt-2" onClick = {() => getAddMember()}>Add Member</div>
                                </div>
                            </div>
                        </div>  
                    ) : null}
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
    </div>);
}
export default Member;