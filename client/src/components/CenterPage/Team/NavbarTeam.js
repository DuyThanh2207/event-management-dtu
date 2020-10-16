import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavbarTeam.css'
const NavbarTeam = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark" style={{backgroundColor: 'red', height: '120px'}}>
                <div className="form-group ml-5">
                    <div className="navbar-brand ml-5 col" style={{fontSize: '30px', color: '#ffffff'}}>Team</div>
                    <div className="collapse navbar-collapse ml-5 mt-3 col" id="collapsibleNavId">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item active mr-5">
                                <NavLink to="/team/member" className="nav-link">MEMBER</NavLink>
                            </li>
                            <li className="nav-item active mr-5">
                                <NavLink to="/team/give-tasks" className="nav-link">GIVE TASK</NavLink>
                            </li>
                            <li className="nav-item active mr-5">
                                <NavLink to="/team/tasks-done" className="nav-link">DONE</NavLink>
                            </li>
                            <li className="nav-item active mr-5">
                                <NavLink to="/team/tasks-not-done" className="nav-link">NOT DONE</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            
        </div>);
}

export default NavbarTeam;