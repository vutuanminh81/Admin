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

function Home() {
  let location = useLocation();
  if (location.pathname === "/login") return <LoginForm />;

  return (
    <div className="App">
      <div className="containers">
        <div className="navbarr">
          <Navbar />
        </div>
        <div className="otherPages">
          <Routes>
            <Route path="/dashboard" element={<PrivateRoute />}>
              <Route exact path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="/word" element={<PrivateRoute/>}>
              <Route exact path="/word" element={<Create />} />
            </Route>
            <Route path="/profile" element={<PrivateRoute/>}>
              <Route exact path="/profile" element={<Profile />} />
            </Route>
            <Route path="/admin_managemnet" element={<PrivateRoute/>}>
              <Route exact path="/admin_managemnet" element={<AdminTable />} />
            </Route>
            <Route path="/updateProfile" element={<PrivateRoute/>}>
              <Route exact path="/updateProfile" element={<UpdateProfile />} />
            </Route>
            <Route path="/add_account" element={<PrivateRoute/>}>
              <Route exact path="/add_account" element={<Add_Account />} />
            </Route>
            <Route path="/updateWord" element={<PrivateRoute/>}>
              <Route exact path="/updateWord" element={<Update />} />
            </Route>
            <Route path="/login" element={<LoginForm />} />
            {/* <Route path="/profile" element={<Profile />} />
            <Route path="/admin_managemnet" element={<AdminTable />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />
            <Route path="/add_account" element={<Add_Account />} />
            <Route path="/updateWord" element={<Update />} /> */}
            <Route path="/" element={<PrivateRoute/>}>
              <Route exact path="/" element={<Dashboard />} />
            </Route>
            {/* <Route path="/" element={<Dashboard />}></Route> */}
          </Routes>
          <div>
            <FooterPage />
          </div>
        </div>
      </div>
    </div>
  );
}

function PrivateRoute() {
  //var checkSession = false;
  const [checkSession, setCheckSession] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  useEffect(() => {
    var CheckSession = async () => {
      await axios.get("http://localhost:3000/get_session").then(async (respn) => {
        console.log("/////////   " + respn.data);
        if (respn.data === true) {
          setCheckSession(respn.data);
        } else {
          setCheckSession(respn.data);
        }
      }).catch((error) =>{
        setCheckSession(false);
      });;
    //   console.log(result.data);
      setLoadingComplete(true);
    };
    CheckSession();
  }, []);
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  if (loadingComplete) {
    console.log("oke...");
    console.log(checkSession);
    return checkSession ? <Outlet /> : <Navigate to="/login" />;
  } else {
    console.log("Loading...");
    return <div> Loading...</div>;
  }
}
export default Home;
