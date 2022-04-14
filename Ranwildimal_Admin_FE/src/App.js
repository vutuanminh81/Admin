
import './App.css';
import Word_Table from'./Layout/Table/Word_Table'

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
import LoginForm from './Layout/Login/LoginForm';




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
              
              <Route path='/' element={<Dashboard/>}>
                
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
    // <Word_Table/>
  );

}

export default App;
