
import './App.css';
import Word_Table from './Layout/Table/Admin_Table'

import Create from './Layout/Word_Management/Create';
import Navbar from './Component/navbar/Navbar';
import Profile from './Layout/Admin_Management/Profile';
import UpdateWord from "./Layout/Word_Management/Update";
import Dashboard from './Layout/Dashboard/Dashboard';
import UpdateProfile from './Layout/Admin_Management/Update_Profile';
import LoginForm from './Layout/Login/LoginForm';
import AdminTable from './Layout/Table/Admin_Table';
import Home from './Layout/Home/home';

import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  NavLink,
  useNavigate
} from "react-router-dom";

import Add_Account from './Layout/Home/home';




function App() {
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

}

export default App;
