import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarContent,
} from 'react-pro-sidebar';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import EventIcon from '@material-ui/icons/Event';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import PersonIcon from '@material-ui/icons/Person';
import "../Navbar.scss"
import { useState } from 'react';
const Navbar = (props) => {
    const [collapsed, setCollapsed] = useState(false)
    return (    
        <>
            <ProSidebar
                image="https://github.com/azouaoui-med/react-pro-sidebar/blob/master/demo/src/assets/bg1.jpg?raw=true"
                collapsed={collapsed}
                toggled={props.statusToggled}
                breakPoint="md"
                >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '12px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                        >
                        {collapsed ? 
                        (<div className="d-flex justify-content-center">
                            <MenuIcon style={{ fontSize: 40 }} onClick = {() => setCollapsed(!collapsed)} />
                        </div>)
                        : 
                        (<div className="d-flex">
                            <Link to="/event">
                                <img src="https://cdn.duytan.edu.vn/images/icon/logo_dtu_footer_en.png" height="30" width="100" className="mt-2" alt="logo"/>
                            </Link>         
                            <CloseIcon style={{ fontSize: 40, marginLeft: "100px" }} onClick = {() => setCollapsed(!collapsed)}/>
                        </div>)}
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="circle">
                        <SubMenu
                            title="Event"
                            icon={<EventIcon />}
                        >
                            <MenuItem active = {true}>                 
                                <NavLink to="/event" activeStyle={{fontWeight: "bold"}}>Event All</NavLink>
                            </MenuItem>
                            <MenuItem>                         
                                <NavLink to="/event-live" activeStyle={{fontWeight: "bold"}}>Event Live</NavLink>
                            </MenuItem>
                            <MenuItem>                              
                                <NavLink to="/event-past" activeStyle={{fontWeight: "bold"}}>Event Past</NavLink>
                            </MenuItem>
                            <MenuItem>                         
                                <NavLink to="/event-future" activeStyle={{fontWeight: "bold"}}>Event Future</NavLink>
                            </MenuItem>
                        </SubMenu>
                        <SubMenu
                            title="Team Member"
                            icon={<SupervisorAccountIcon />}
                        >
                            <MenuItem active = {true}>                 
                                <NavLink activeStyle={{fontWeight: "bold"}} to="/team">Member</NavLink>
                            </MenuItem>
                        </SubMenu>
                        <SubMenu
                            title="Task"
                            icon={<AssignmentTurnedInIcon />}
                        >
                            <MenuItem active = {true}>                 
                                <NavLink activeStyle={{fontWeight: "bold"}} to="/task-all">All</NavLink>
                            </MenuItem>
                            <MenuItem>                 
                                <NavLink activeStyle={{fontWeight: "bold"}} to="/task-done">Done</NavLink>
                            </MenuItem>
                            <MenuItem>                 
                                <NavLink activeStyle={{fontWeight: "bold"}} to="/task-in-process">In Process</NavLink>
                            </MenuItem>
                            <MenuItem>                 
                                <NavLink activeStyle={{fontWeight: "bold"}} to="/task-fail">Fail</NavLink>
                            </MenuItem>
                        </SubMenu>
                        <SubMenu
                            title="Personal"
                            icon={<PersonIcon />}
                        >
                            <MenuItem active = {true}>                 
                                <NavLink activeStyle={{fontWeight: "bold"}} to="/create-event">Create Event</NavLink>
                            </MenuItem>
                            <MenuItem>                 
                                <NavLink activeStyle={{fontWeight: "bold"}} to="/finance">Finance</NavLink>
                            </MenuItem>
                            <MenuItem>                 
                                <NavLink activeStyle={{fontWeight: "bold"}} to="/chart">Chart</NavLink>
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>
            </ProSidebar>
        </>
    );
}
export default Navbar;