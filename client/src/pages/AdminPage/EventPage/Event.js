import React from 'react';
import Header from './../../../components/Header';
import Navbar from './../../../components/AdminPage/Navbar';
import Footer from './../../../components/Footer';
const Event = () => {
    return (<div>
        <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
            <Header/>
            <div class="app-main">
                <Navbar/>
                <div class="app-main__outer">
                    <div class="app-main__inner">
                        <Footer/>
                    </div>
                </div>
            </div>
        </div>     
    </div>);
}

export default Event;