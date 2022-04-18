import React, { useEffect, useState } from "react";
import "./home.css";
import FooterPage from "../../Component/footer/footer";
import axios from "axios";
import Create from "../Word_Management/Create";
import Navbar from "../../Component/navbar/Navbar";
import Profile from "../Admin_Management/Profile";
import Dashboard from "../Dashboard/Dashboard";
import UpdateProfile from "../Admin_Management/Update_Profile";
import LoginForm from "../Login/LoginForm";
import AdminTable from "../Table/Admin_Table";
import Add_Account from "../Admin_Management/Add_Account";

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  Outlet,
} from "react-router-dom";
import Update from "../Word_Management/Update";
axios.defaults.withCredentials = true;

function Loading() {
  return (
    <div className="App">
      {/* {document.getElementById("mainNav").hidden=true} */}
      <div className="loading_container">
        <div className="loading">
          <label>Loading...</label>
        </div>
      </div>
    </div>
  );
}
export default Loading;
