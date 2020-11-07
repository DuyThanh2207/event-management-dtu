import React from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EditIcon from '@material-ui/icons/Edit';
import FaceIcon from '@material-ui/icons/Face';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
const Header = () => {
    let history = useHistory();
    const onLogout = () => {
        history.push("/")
        sessionStorage.clear();      
    }
    return (
        <div className=" mr-2 mb-2 d-flex justify-content-between" style={{marginTop:"-10px"}}>
            <div></div>
            <h4 className="mt-3">Event Management</h4>
            <MDBDropdown size="sm">
                <MDBDropdownToggle caret color="dark" style={{borderRadius:"50%", height: "60px"}}>
                    <FaceIcon/>
                </MDBDropdownToggle>
                <MDBDropdownMenu basic>
                    {sessionStorage.getItem("account_role") !== "Admin" && (
                        <MDBDropdownItem>
                            <NavLink className="d-flex" to="/account-details">
                                <PermContactCalendarIcon/> 
                                <div className="ml-2">Account Details</div>
                            </NavLink>
                        </MDBDropdownItem>                       
                    )}
                    <MDBDropdownItem>
                        <NavLink className="d-flex" to="/change-accountinfo">
                            <EditIcon/> 
                            <div className="ml-2">Change Password</div>
                        </NavLink>
                    </MDBDropdownItem>
                    <MDBDropdownItem divider />
                    <MDBDropdownItem>
                        <div className="d-flex" onClick = {() => onLogout()}>
                            <ExitToAppIcon/> 
                            <div className="ml-2">Log Out</div> 
                        </div>
                    </MDBDropdownItem>
                </MDBDropdownMenu>
            </MDBDropdown>     
        </div>     
    );
}

export default Header;