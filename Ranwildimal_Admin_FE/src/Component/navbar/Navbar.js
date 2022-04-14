import React from 'react';
import './style.css';
import {
    Dashboard, DashboardOutlined, DashboardRounded, DashboardSharp, DashboardTwoTone,
    Pets, PetsOutlined, PetsRounded, PetsSharp, PetsTwoTone, SupervisorAccount,
    Person,ExitToApp
} from '@material-ui/icons';
function Navbar() {
    return (
        <nav className="pcoded-navbar sidebar">
            <div className="navbar-wrapper">
                <div className="navbar-brand header-logo">
                    <a href="index.html" className="b-brand">
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
                        <li className="nav-item active">

                            <a href="/dashboard" className="nav-link ">
                                <span className="pcoded-micon">
                                    <i className="feather icon-home"></i><Dashboard /></span>
                                <span className="pcoded-mtext"> Dashboard</span></a>
                        </li>
                        <li className="nav-item">
                            <a href="/word" className="nav-link"><span className="pcoded-micon">
                                <i className="feather icon-sidebar"><Pets /></i>
                            </span><span className="pcoded-mtext">Word & Photograph</span></a></li>

                        <li className="nav-item pcoded-menu-caption">
                            <label>Admin</label>
                        </li>
                        <li className="nav-item">
                            <a href="/word" className="nav-link">
                                <span className="pcoded-micon">
                                    <i className="feather icon-sidebar"><SupervisorAccount /></i>
                                </span>
                                <span className="pcoded-mtext">Admin Management</span></a></li>

                        <li className="nav-item pcoded-menu-caption">
                            <label>Personal Account</label>
                        </li>
                        <li className="nav-item">
                            <a href="/dashboard" className="nav-link ">
                                <span className="pcoded-micon">
                                    <i className="feather icon-home"><Person/></i></span>
                                <span className="pcoded-mtext">Profile</span></a>
                        </li>
                        <li className="nav-item">
                            <a href="sample-page.html" className="nav-link">
                                <span className="pcoded-micon">
                                    <i className="feather icon-sidebar"><ExitToApp/></i></span>
                                    <span className="pcoded-mtext">Logout</span></a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar