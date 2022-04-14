
import './App.css';
import Word_Table from'./Layout/Table/Admin_Table'

import Create from './Layout/Word_Management/Create';
import Navbar from './Component/navbar/Navbar';
import Profile from './Layout/Admin_Management/Profile';


import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  NavLink,
  useNavigate
} from "react-router-dom";
import Dashboard from './Layout/Dashboard/Dashboard';
import UpdateProfile from './Layout/Admin_Management/Update_Profile';
import LoginForm from './Layout/Login/LoginForm';
import Admin_Management from './Layout/Table/Admin_Table';
import Add_Account from './Layout/Admin_Management/Add_Account';




function App() {
  // var navigate = useNavigate();
  return (
    <BrowserRouter>
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
              <Route path="/profile" element={<Profile/>} />
              <Route path="/admin_managemnet" element={<Admin_Management/>} />
              <Route path="/updateProfile" element={<UpdateProfile/>} />
              <Route path="/add_account" element={<Add_Account/>} />
                {/* navigate("/login"); */}
              
              <Route path='/' element={<Dashboard/>}>
                
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );

}

export default App;
