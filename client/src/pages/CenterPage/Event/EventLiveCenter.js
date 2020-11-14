import React, { useEffect, useState } from 'react';
import Header from './../../../components/Header';
import Navbar from './../../../components/CenterPage/Navbar';
import Footer from './../../../components/Footer';
const axios = require('axios');
const EventLiveCenter = () => {
    const [eventData, setEventData] = useState([]);
    const [searchText, setSearchText] = useState(" ");
    useEffect(() => {
        axios.post('/event-live-center', {
            account_id: sessionStorage.getItem("account_id")
        }).then((res) => {
            if(res.data.length > 0)
                setEventData(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    },[])
    var dataSearch = []
    eventData.forEach((item) => {
        if (item.event_name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 || item.event_place.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 || item.account_name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
            dataSearch.push(item)
    })
    const showEvent = () =>
        dataSearch.map((value, index) =>(
            <div className="col-12 mt-5" style={{marginLeft: '-50px'}}>
                <div className="card" style={{width: '100%'}}>
                    <div className="container mt-3 mb-3 col-11">
                        <div className="mb-3">
                            <h2 style={{color: '#00839d'}}>{value.event_name}</h2>
                        </div>
                        <div className="mb-3">
                            Addres: {value.event_place}
                        </div>
                        <div className="mb-2">
                            Date: {value.event_date}
                        </div>
                        <div className="mb-2">
                            Time Start: {value.event_time}
                        </div>
                        <div className="mb-2">
                            Duration: {value.event_duration} Hours
                        </div>
                        <hr />
                        Event Center: {value.center_id}
                    </div>
                </div>
            </div>
        )   
    )
    return (
        <div className="app">
            <Navbar/>
            <main>
                <Header/>
                <div className="container mt-3 mb-5">
                    <div className="row d-flex">
                        <div className="col-3 d-flex">
                            <input type="text" className="form-control" placeholder="Search" onChange = {(e) => setSearchText(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row ml-5 mb-5">
                        {showEvent()}
                    </div>
                </div>
                <Footer/>
            </main>
        </div>        
    );
}

export default EventLiveCenter;