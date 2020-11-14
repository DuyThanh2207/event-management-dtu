import React, { useEffect, useState } from "react";
import Header from '../../../components/Header';
import Navbar from '../../../components/CenterPage/Navbar';
import Footer from '../../../components/Footer';
import MaterialTable from 'material-table';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './../../../pages/CenterPage/Tasks/GiveTask.css';
import Spinner from 'react-bootstrap/Spinner'
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EventIcon from '@material-ui/icons/Event';
const axios = require('axios');
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");  
  }
const Finance = () => {
    const [eventDataAvailable, setEventDataAvailable] = useState([]);
    const [eventDataUnavailable, setEventDataUnavailable] = useState([]);
    const [financeData, setFinanceData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [eventId, setEventId] = useState();
    const [columns, setColumns] = useState([
        { title: 'Finance ID', field: 'id', editable: 'never', hidden: true},
        { title: 'Finance Name', field: 'finance_spending_description', validate: rowData => rowData.finance_spending_description === "" ? 'Finance Name cannot be empty' : '',},
        { title: 'Finance Spending ( VNĐ )', field: 'finance_spending', validate: rowData => rowData.finance_spending === "" ? 'Finance Spending cannot be empty' : '',},
    ]);
    const fetchFinanceData = async () => {
        const data = await axios.post('/finance', {
            event_id: eventId
        }).then((res) => {
            if(res.data.length > 0){
                setFinanceData(res.data);
                financeData.forEach((item) => {
                    item.finance_spending = numberWithCommas(item.finance_spending)
                })
            }
            else if (res.data.length === 0)
                setFinanceData([])
        })
        .catch((error) => {
            console.log(error);
        })
        setLoading(false)
    }
    useEffect(() => {
        axios.post('/event-center-available', {
            account_id: sessionStorage.getItem("account_id")
        }).then((res) => {
            if(res.data.length > 0)
            setEventDataAvailable(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
        axios.post('/event-center-unavailable', {
            account_id: sessionStorage.getItem("account_id")
        }).then((res) => {
            if(res.data.length > 0)
            setEventDataUnavailable(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    },[])
    const getAddFinance = (data) => {
        axios.post('/add-finance', {
            event_id: eventId,
            finance_spending_description: data.finance_spending_description,
            finance_spending: data.finance_spending,
        }).then((res) => {
            if(res.data.message){
                NotificationManager.error("Fail", "Error", 3000);
            }
            else {
                NotificationManager.success("Complete !", "Success", 3000);
                fetchFinanceData()
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    const getEditFinance = (data) => {
        var financeSpending = data.finance_spending.replaceAll(",","")
        axios.post('/edit-finance', {
            id: data.id,
            finance_spending_description: data.finance_spending_description,
            finance_spending: financeSpending,
        }).then((res) => {
            if(res.data.message){
                console.log(res.data.message);
                NotificationManager.error("Fail", "Error", 3000);
            }
            else {
                NotificationManager.success("Complete !", "Success", 3000);
                fetchFinanceData()
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    const deleteFinance = (data) => {
        axios.post('/delete-finance', {
            id: data
        }).then((res) => {
            if(res.data.message){
                NotificationManager.error("Fail", "Error", 3000);
            }
            else {
                NotificationManager.success("Complete !", "Success", 3000);
                fetchFinanceData()
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    const onHandledClick = (e) => {
        setLoading(true)
        setEventId(e.event_id);
        setTimeout(async () =>  {
            const data = await axios.post('/finance', {
                event_id: e.event_id
            }).then((res) => {
                if(res.data.length > 0){
                    setFinanceData(res.data);
                }
                else if (res.data.length === 0)
                    setFinanceData([])
            })
            .catch((error) => {
                console.log(error);
            })
            setLoading(false)
        }, 3000);
    }
    financeData.forEach((item) => {
        item.finance_spending = numberWithCommas(item.finance_spending);
    })
    return (
        <>
            <div className="app">
                <Navbar/>
                <main>
                    <Header/>
                    <div className="container mt-3">
                        <div className="row">
                            <div className="col">
                                <div className="card" style={{width: "100%"}}>
                                    <div className="card-body">
                                        <div className="d-flex justify-content-center">
                                            <h2>EVENT</h2>
                                        </div>
                                        <List component="nav" subheader={
                                            <ListSubheader component="div">
                                                Available Event
                                            </ListSubheader>
                                        }>
                                            {eventDataAvailable.length > 0 && eventDataAvailable.map((value, index) => (
                                                <ListItem button onClick = {() => onHandledClick(value)} data-toggle="modal" data-target=".taskModalAvailable">
                                                    <ListItemIcon>
                                                        <EventIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={value.event_name}/>
                                                </ListItem>
                                            ))}
                                        </List>
                                        <List component="nav" subheader={
                                            <ListSubheader component="div">
                                                Unavailable Event
                                            </ListSubheader>
                                        }>
                                            {eventDataUnavailable.length > 0 && eventDataUnavailable.map((value, index) => (
                                                <ListItem button onClick = {() => onHandledClick(value)} data-toggle="modal" data-target=".taskModalUnavailable">
                                                    <ListItemIcon>
                                                        <EventIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={value.event_name}/>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </div>
                                </div>
                            </div>               
                        </div>                                                        
                    </div>
                    <Footer/>
                </main>
            </div>
            <div className="modal modalfade taskModalAvailable" tabIndex="-1" role="dialog" >
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-body">
                            {loading ? (<div className="d-flex justify-content-center"><Spinner animation="border" /></div>) : (
                                <div className="row">
                                    <div className="col">
                                        <MaterialTable
                                            title="Task"
                                            columns={columns}
                                            data={financeData}
                                            options={{
                                                actionsColumnIndex: -1,
                                            }}
                                            editable={{
                                                onRowAdd: newData =>
                                                new Promise((resolve, reject) => {
                                                    setTimeout(() => {
                                                        getAddFinance(newData);
                                                    resolve();
                                                    }, 1000)
                                                }),
                                                onRowUpdate: (newData) =>
                                                new Promise((resolve) => {
                                                    setTimeout(() => {
                                                        getEditFinance(newData);
                                                        resolve();
                                                    }, 1000)
                                                }),
                                                onRowDelete: oldData =>
                                                new Promise((resolve) => {
                                                    setTimeout(() => {
                                                        const dataDelete = [...financeData];
                                                        const index = oldData.tableData.id;
                                                        deleteFinance(dataDelete[index].id);
                                                        resolve();
                                                    }, 1000)
                                                }),
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal modalfade taskModalUnavailable" role="dialog" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-body">
                            {loading ? (<div className="d-flex justify-content-center"><Spinner animation="border" /></div>) : (
                                <div className="row">
                                    <div className="col">
                                        <MaterialTable
                                            title="Task"
                                            columns={columns}
                                            data={financeData}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <NotificationContainer/>
    </>);
}
export default Finance;