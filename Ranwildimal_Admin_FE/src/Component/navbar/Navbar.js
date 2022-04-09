import React from 'react';
import './style.css';

import {
    NavLink
  } from "react-router-dom"

class Navbar extends React.Component {
    render() {
        return (
            <nav className="pcoded-navbar">
                <div className="navbar-wrapper">
                    <div className="navbar-brand header-logo">
                        <a href="/dashboard" className="b-brand">
                            <div className="b-bg">
                                <i className="feather icon-trending-up"></i>
                            </div>
                            <span className="b-title">RANWILDIMAL</span>
                        </a>

                    </div>
                    <div className="navbar-content scroll-div">
                        <ul className="nav pcoded-inner-navbar">
                            <li className="nav-item pcoded-menu-caption">
                                <label>Word & Photograph</label>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/dashboard" className="nav-link" activeClassName="active"><span className="pcoded-micon"><i className="feather icon-home"></i></span><span className="pcoded-mtext">Dashboard</span></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/words" className="nav-link" activeClassName="active"><span className="pcoded-micon"><i className="feather icon-sidebar"></i></span><span className="pcoded-mtext">Word & Photograph</span></NavLink></li>

                            <li className="nav-item pcoded-menu-caption">
                                <label>Other</label>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/logout" className="nav-link" activeClassName="active"><span className="pcoded-micon"><i className="feather icon-sidebar"></i></span><span className="pcoded-mtext">Logout</span></NavLink></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar