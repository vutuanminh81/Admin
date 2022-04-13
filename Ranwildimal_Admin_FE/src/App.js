
import './App.css';

import Create from './Layout/Word_Management/Create';
import Navbar from './Component/navbar/Navbar';
import Profile from './Profile/Profile';


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
        <div className='container'>
          <div className='navbarr'>
            <Navbar />
          </div>
          <div className='otherPages'>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/word" element={<Create />} />
              <Route path="/login" element={<LoginForm />} />
              
              <Route exact path='/'>
                {/* navigate("/login"); */}
              </Route>
            </Routes>
          </div>
        </div>



      </div>
    </BrowserRouter>
    // <Profile/>
  );

}

export default App;
