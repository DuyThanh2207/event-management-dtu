import React, { useEffect, useState } from 'react';
import NavbarEvent from './../../../components/AdminPage/Event/NavbarEvent';
import Footer from './../../../components/AdminPage/Footer/Footer';
import HeaderCenter from './../../../components/CenterPage/Header/HeaderCenter';
const axios = require('axios');
const EventPastCenter = () => {
    const [eventData, setEventData] = useState([]);
    const [searchText, setSearchText] = useState(" ");
    useEffect(() => {
        axios.post('/event-past-center', {
            account_name: sessionStorage.getItem("account_name")
        }).then((res) => {
            setEventData(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    })
    var dataSearch = []
    eventData.forEach((item) => {
        if (item.event_name.toLowerCase().indexOf(searchText) !== -1 || item.event_place.toLowerCase().indexOf(searchText) !== -1 || item.account_name.toLowerCase().indexOf(searchText) !== -1)
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
                        Event Center: {value.account_name}
                    </div>
                </div>
            </div>
        )   
    )
    return (
        <>
            <HeaderCenter/>
            <NavbarEvent/>
            <div className="container mt-5">
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
        </>           
    );
}

export default EventPastCenter;