import React from "react";
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
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import "../Navbar.scss";
import { useState } from "react";
const NavbarEvent = (props) => {
  const [collapsed, setCollapsed] = useState(false);
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
              <div className="d-flex ml">
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
                Event All
              </NavLink>
            </MenuItem>
            <MenuItem title="Manage" icon={<SupervisorAccountIcon />}>
              <NavLink
                activeStyle={{ fontWeight: "bold" }}
                to="/manage-account"
              >
                Manage Account
              </NavLink>
            </MenuItem>
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </>
  );
};
export default NavbarEvent;
