import React, { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import EventIcon from "@material-ui/icons/Event";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import "../Navbar.scss";
import { useState } from "react";
const axios = require("axios");
const Navbar = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [number, setNumber] = useState(0);
  useEffect(() => {
    axios
      .post("/task-staff-inprocess", {
        staff_id: sessionStorage.getItem("account_username"),
      })
      .then((res) => {
        if (!res.data.message) {
          setNumber(res.data.length);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return (
    <>
      <ProSidebar
        image="https://colorlib.com/etc/bootstrap-sidebar/sidebar-10/images/bg_1.jpg"
        collapsed={collapsed}
        toggled={props.statusToggled}
        breakPoint="md"
      >
        <SidebarHeader>
          <div
            style={{
              padding: "12px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {collapsed ? (
              <div className="d-flex justify-content-center">
                <MenuIcon
                  style={{ fontSize: 40 }}
                  onClick={() => setCollapsed(!collapsed)}
                />
              </div>
            ) : (
              <div className="d-flex">
                <Link to="/event">
                  <img
                    src="https://cdn.duytan.edu.vn/images/icon/logo_dtu_footer_en.png"
                    height="30"
                    width="100"
                    className="mt-2"
                    alt="logo"
                  />
                </Link>
                <CloseIcon
                  style={{ fontSize: 40, marginLeft: "100px" }}
                  onClick={() => setCollapsed(!collapsed)}
                />
              </div>
            )}
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem title="Event" icon={<EventIcon />}>
              <NavLink to="/event" activeStyle={{ fontWeight: "bold" }}>
                Event
              </NavLink>
            </MenuItem>
            <MenuItem
              title="Task"
              icon={<AssignmentTurnedInIcon />}
              suffix={<span className="badge red">{number}</span>}
            >
              <NavLink activeStyle={{ fontWeight: "bold" }} to="/task-all">
                Task
              </NavLink>
            </MenuItem>
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </>
  );
};
export default Navbar;
