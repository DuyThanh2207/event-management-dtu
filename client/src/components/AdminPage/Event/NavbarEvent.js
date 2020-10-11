import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbarEvent.css'
const NavbarEvent = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark" style={{backgroundColor: 'red', height: '120px'}}>
                <div className="form-group ml-5">
                    <div className="navbar-brand ml-5 col" style={{fontSize: '30px', color: '#ffffff'}}>Events</div>
                    <div className="collapse navbar-collapse ml-5 mt-3 col" id="collapsibleNavId">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item active mr-5">
                                <NavLink to="/event/event-all" className="nav-link">ALL</NavLink>
                            </li>
                            <li className="nav-item active mr-5">
                                <NavLink to="/event/event-live" className="nav-link">LIVE</NavLink>
                            </li>
                            <li className="nav-item active mr-5">
                                <NavLink to="/event/event-past" className="nav-link">PAST</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            
        </div>);
}

export default NavbarEvent;