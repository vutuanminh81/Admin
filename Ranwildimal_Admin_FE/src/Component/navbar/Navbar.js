import React, { useState, useEffect } from 'react';
import './style.css';
import logo from './../../Assets/image/logo_web.png';
import {
    Dashboard, DashboardOutlined, DashboardRounded, DashboardSharp, DashboardTwoTone,
    Pets, PetsOutlined, PetsRounded, PetsSharp, PetsTwoTone, SupervisorAccount,
    Person, ExitToApp
} from '@material-ui/icons';
import axios from "axios";
import { useNavigate, useLocation, Link, NavLink } from "react-router-dom";

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

    const [activeProfile, setActiveProfile] = useState(location.pathname === '/updateProfile');
    const [activeWord, setActiveWord] = useState(location.pathname === '/word' || location.pathname === '/updateWord' || location.pathname === '/word_management');
    const [activeAdmin, setActiveAdmin] = useState(location.pathname === '/add_account' || location.pathname === '/admin_management' || location.pathname === '/profile');

    useEffect(() => {
        setActiveProfile(location.pathname === '/updateProfile');
        setActiveWord(location.pathname === '/word' || location.pathname === '/updateWord' || location.pathname === '/word_management');
        setActiveAdmin(location.pathname === '/add_account' || location.pathname === '/admin_management' || location.pathname === '/profile');

    }, [location.pathname]);

    if (location.pathname === '/login') return null;
    if (location.pathname === '/') return null;


    return (
        <nav className="pcoded-navbar sidebar">
            <div className="navbar-wrapper">
                <div className="navbar-brand header-logo">
                    <Link to="/dashboard" className="b-brand">
                        <div className="b-bg">
                            <img src={logo} className="b-bg" />
                        </div>
                    </Link>

                </div>
                <div className="navbar-content scroll-div">
                    <ul className="nav pcoded-inner-navbar">
                        <li className="nav-item pcoded-menu-caption">
                            <label>Word & Photograph</label>
                        </li>
                        <li className="nav-item">

                            <NavLink to="/dashboard" className="nav-link">
                                <span className="pcoded-micon">
                                    <i className="feather icon-sidebar"></i><Dashboard /></span>
                                <span className="pcoded-mtext"> Dashboard</span></NavLink>
                        </li>

                        <li className="nav-item">

                            <NavLink to="/word_management" className="nav-link"
                                style={{
                                    background: activeWord ? '#D6534B' : 0,
                                    color: activeWord ? '#fff' : 0,
                                }}>
                                <span className="pcoded-micon">
                                    <i className="feather icon-sidebar"></i><Pets /></span>
                                <span className="pcoded-mtext"> Word Management</span></NavLink>




                        </li>
                        <li className="nav-item pcoded-menu-caption">
                            <label>Admin</label>
                        </li>

                        <li className="nav-item">

                            <NavLink to="/admin_management" className="nav-link"
                                style={{
                                    background: activeAdmin ? '#D6534B' : 0,
                                    color: activeAdmin ? '#fff' : 0,
                                }}>
                                <span className="pcoded-micon">
                                    <i className="feather icon-sidebar"></i><SupervisorAccount /></span>
                                <span className="pcoded-mtext"> Admin Management</span></NavLink>
                        </li>

                        <li className="nav-item pcoded-menu-caption">
                            <label>Personal Account</label>
                        </li>
                        <li className="nav-item">

                            <NavLink to="/updateProfile" className="nav-link"
                                style={{
                                    background: activeProfile ? '#D6534B' : 0,
                                    color: activeProfile ? '#fff' : 0,
                                }}>
                                <span className="pcoded-micon">
                                    <i className="feather icon-sidebar"></i><Person /></span>
                                <span className="pcoded-mtext"> Profile</span></NavLink>
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