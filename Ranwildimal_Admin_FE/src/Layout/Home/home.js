import React from 'react';
import "./home.css"


import Create from '../Word_Management/Create';
import Navbar from '../../Component/navbar/Navbar';
import Profile from '../Admin_Management/Profile';
import Dashboard from '../Dashboard/Dashboard';
import UpdateProfile from '../Admin_Management/Update_Profile';
import LoginForm from '../Login/LoginForm';
import AdminTable from '../Table/Admin_Table';
import Add_Account from '../Admin_Management/Add_Account';
import {
    BrowserRouter,
    Route,
    Routes,
    useLocation
} from "react-router-dom";

function Home() {
    
    let location = useLocation();
    if (location.pathname === '/login') 
    return (
        <LoginForm/>
    );
    
    
    return (
            <div className="App">
                <div className='containers'>
                    <div className='navbarr'>
                        <Navbar />
                    </div>
                    <div className='otherPages'>
                        <Routes>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/word" element={<Create />} />
                            <Route path="/login" element={<LoginForm />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/admin_managemnet" element={<AdminTable />} />
                            <Route path="/updateProfile" element={<UpdateProfile />} />
                            <Route path="/add_account" element={<Add_Account />} />


                            <Route path='/' element={<Dashboard />}>

                            </Route>
                        </Routes>
                    </div>
                </div>
            </div>
    );
}

export default Home
