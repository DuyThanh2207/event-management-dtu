import React from 'react';
import { NavLink } from 'react-router-dom';
const NavbarEvent = () => {
    return (
        <div>
            <div className="app-sidebar sidebar-shadow">
                <div className="app-header__logo">
                    <div className="logo-src" />
                    <div className="header__pane ml-auto">
                        <div>
                        <button type="button" className="hamburger close-sidebar-btn hamburger--elastic" data-class="closed-sidebar">
                            <span className="hamburger-box">
                            <span className="hamburger-inner" />
                            </span>
                        </button>
                        </div>
                    </div>
                </div>
                <div className="app-header__mobile-menu">
                    <div>
                        <button type="button" className="hamburger hamburger--elastic mobile-toggle-nav">
                        <span className="hamburger-box">
                            <span className="hamburger-inner" />
                        </span>
                        </button>
                    </div>
                </div>
                <div className="app-header__menu">
                    <span>
                        <button type="button" className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
                        <span className="btn-icon-wrapper">
                            <i className="fa fa-ellipsis-v fa-w-6" />
                        </span>
                        </button>
                    </span>
                </div>
                <div className="scrollbar-sidebar">
                    <div className="app-sidebar__inner">
                        <ul className="vertical-nav-menu">
                            <li className="app-sidebar__heading">Event</li>
                            <li>
                                <NavLink className="nav-link" to="/event">
                                    <i className="metismenu-icon pe-7s-rocket" /> Event All
                                </NavLink>
                                <NavLink className="nav-link" to="/event-live">
                                    <i className="metismenu-icon pe-7s-rocket" /> Event Live
                                </NavLink>
                                <NavLink className="nav-link" to="/event-past">
                                    <i className="metismenu-icon pe-7s-rocket" /> Event Past
                                </NavLink>
                                <NavLink className="nav-link" to="/event-future">
                                    <i className="metismenu-icon pe-7s-rocket" /> Event Future
                                </NavLink>
                            </li>
                            <li className="app-sidebar__heading">Team Member</li>
                            <li>
                                <NavLink className="nav-link" to="/team">
                                    <i className="metismenu-icon pe-7s-display2" /> Member
                                </NavLink>
                            </li>
                            <li className="app-sidebar__heading">Task</li>
                            <li>
                                <NavLink className="nav-link" to="/task-all">
                                    <i className="metismenu-icon pe-7s-eyedropper" /> All
                                </NavLink>
                                <NavLink className="nav-link" to="/task-done">
                                    <i className="metismenu-icon pe-7s-eyedropper" /> Done
                                </NavLink>
                                <NavLink className="nav-link" to="/task-in-process">
                                    <i className="metismenu-icon pe-7s-eyedropper" /> In Process
                                </NavLink>
                                <NavLink className="nav-link" to="/task-fail">
                                    <i className="metismenu-icon pe-7s-eyedropper" /> Fail
                                </NavLink>
                            </li>
                            <li className="app-sidebar__heading">Personal</li>
                            <li>
                                <NavLink className="nav-link" to="/change-accountinfo">
                                    <i className="metismenu-icon pe-7s-diamond" /> Create Event
                                </NavLink>
                                <NavLink className="nav-link" to="/change-accountinfo">
                                    <i className="metismenu-icon pe-7s-rocket" /> Finance
                                </NavLink>
                                <NavLink className="nav-link" to="/change-accountinfo">
                                    <i className="metismenu-icon pe-7s-display2" /> Chart
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavbarEvent;