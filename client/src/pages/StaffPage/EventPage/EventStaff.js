import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import Navbar from '../../../components/StaffPage/Navbar';
import Footer from '../../../components/Footer';
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Resources,
  MonthView,
  Toolbar,
  DateNavigator,
  TodayButton,
  Appointments,
  AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";
const axios = require('axios');
const EventStaff = () => {
    const [eventData, setEventData] = useState([]);
    const [dataUser, setDataUser] = useState([]);
    const appointments = eventData.map((item) => {
        let dd = item.event_date.slice(0, 2);
        let mm = item.event_date.slice(3, 5)-1;
        let yyyy = item.event_date.slice(6, 10);
        let hh = item.event_time.slice(0, 2);
        let mn = item.event_time.slice(3, 5);
        let hhEnd = parseInt(hh) + parseInt(item.event_duration)
        let startDateTemp = new Date(yyyy, mm, dd, hh, mn)  
        let endDateTemp = new Date(yyyy, mm, dd, hhEnd, mn)
        return {
            id: item.event_id,
            title: item.event_name,
            location: item.event_place,
            members: [item.center_id],
            startDate: startDateTemp,
            endDate: endDateTemp
          }
    })
    const owners = dataUser.map((item) => {
        let color = " "
        if(item.account_color !== null)
            color = item.account_color
        return ({
            text: item.account_name,
            id: item.account_id,
            color: color
        })
    }) 
    const location = eventData.map((item) => {
        return ({ id: item.event_place, text: item.event_place })
    })
    var filteredList = [...new Set(location.map(JSON.stringify))].map(JSON.parse);
    const resources = [
        {
            fieldName: "members",
            title: "Members",
            instances: owners,
            allowMultiple: true
        },
        {
            fieldName: 'location',
            title: 'Location',
            instances: filteredList
        },
      ];
    useEffect(() => {
        axios.post('/event-staff', {
            staff_id: "%"+sessionStorage.getItem("account_id")+"%"
        }).then((res) => {
            if(res.data.length > 0)
                setEventData(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
        axios.get('/account-center').then((res) => {
            setDataUser(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    },[])
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd; 
    return (
        <div className="app">
            <Navbar/>
            <main>
                <Header/>
                <div className="container mt-3 mb-5">
                    {/* {dataUser.map((item) => {
                        return (    
                            <>
                                <span style={{backgroundColor: item.account_color, borderRadius:"50%", height: "10px", width: "10px", display: "inline-block"}}></span>
                                <div>{item.account_name}</div>
                                <br/>
                            </>
                        )
                    })} */}
                    <Paper>
                        <Scheduler data={appointments}>
                            <ViewState defaultCurrentDate={today} />
                            <MonthView />
                            <Toolbar />
                            <DateNavigator />
                            <TodayButton />
                            <Appointments />
                            <AppointmentTooltip />
                            {/* <AppointmentForm /> */}
                            <Resources data={resources} mainResourceName="members" />
                            {/* <DragDropProvider /> */}
                        </Scheduler>
                    </Paper>
                </div>
                <Footer/>
            </main>
        </div>           
    );
}

export default EventStaff;