import React from 'react';
import './style.css';
import logo from './logo_03.png';
import {
    Dashboard, DashboardOutlined, DashboardRounded, DashboardSharp, DashboardTwoTone,
    Pets, PetsOutlined, PetsRounded, PetsSharp, PetsTwoTone, SupervisorAccount,
    Person, ExitToApp
} from '@material-ui/icons';
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

axios.defaults.withCredentials = true;

async function Logout(e, navigate) {
    e.preventDefault();
    var check = false;
    await axios.get('http://localhost:3000/logout');
    navigate("/login");
}

function Navbar() {
    var navigate = useNavigate();
    let location = useLocation();

    if (location.pathname === '/login') return null;
    
    return (
        <nav className="pcoded-navbar sidebar">
            <div className="navbar-wrapper">
                <div className="navbar-brand header-logo">
                    <a href="index.html" className="b-brand">
                        <div className="b-bg">
                            <img src={logo} className="b-bg" />
                        </div>
                    </a>

                </div>
                <div className="navbar-content scroll-div">
                    <ul className="nav pcoded-inner-navbar">
                        <li className="nav-item pcoded-menu-caption">
                            <label>Word & Photograph</label>
                        </li>
                        <li className="nav-item active">

                            <a href="/dashboard" className="nav-link ">
                                <span className="pcoded-micon">
                                    <i className="feather icon-sidebar"></i><Dashboard /></span>
                                <span className="pcoded-mtext"> Dashboard</span></a>
                        </li>
                        <li className="nav-item">
                            <a href="/word" className="nav-link"><span className="pcoded-micon">
                                <i className="feather icon-sidebar"><Pets /></i>
                            </span><span className="pcoded-mtext">Word Management</span></a></li>

                        <li className="nav-item pcoded-menu-caption">
                            <label>Admin</label>
                        </li>
                        <li className="nav-item">
                            <a href="/admin_managemnet" className="nav-link">
                                <span className="pcoded-micon">
                                    <i className="feather icon-sidebar"><SupervisorAccount /></i>
                                </span>
                                <span className="pcoded-mtext text-sidebar">Admin Management</span></a></li>

                        <li className="nav-item pcoded-menu-caption">
                            <label>Personal Account</label>
                        </li>
                        <li className="nav-item">
                            <a href="/updateProfile" className="nav-link ">
                                <span className="pcoded-micon">
                                    <i className="feather icon-home"><Person /></i></span>
                                <span className="pcoded-mtext">Profile</span></a>
                        </li>
                        <li className="nav-item">
                            <a href='#' onClick={(e) => Logout(e, navigate)} className="nav-link">
                                <span className="pcoded-micon">
                                    <i className="feather icon-sidebar"><ExitToApp /></i></span>
                                <span className="pcoded-mtext">Logout</span></a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar