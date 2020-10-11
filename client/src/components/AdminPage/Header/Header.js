import React from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { NavLink, Link } from 'react-router-dom';
const Header = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark" style={{backgroundColor: '#eeeeee', width: '100%'}}>
                <NavLink className="navbar-brand ml-5" to="/event">
                    <img style={{width: '150px', height: '50px'}} src="https://cdn.duytan.edu.vn/images/icon/logo-duy-tan_vn.png" alt="Event Management DTU" />
                </NavLink>
                <div className="collapse navbar-collapse ml-5 " id="collapsibleNavId">
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/event" style={{color: 'black'}}>EVENT</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/manage-account" style={{color: 'black'}}>MANAGE ACCOUNT</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="justify-content-end row d-flex mr-3">
                    <div className="mt-2">
                        <NotificationsIcon fontSize = "large"/>
                    </div>      
                    <Link to="/change-password" className="d-flex nav-link">
                        <AccountCircleIcon fontSize="large" color ="action"/>
                        <strong className="mt-1 ml-1" style={{color: 'black'}}>ADMIN</strong>
                    </Link>
                    <div className="mt-2">
                        <ExitToAppIcon fontSize="large"/>       	
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;