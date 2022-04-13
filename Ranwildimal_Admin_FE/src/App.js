
import './App.css';

import Create from './Layout/Word_Management/Create';
import Navbar from './Component/navbar/Navbar';


import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  NavLink
} from "react-router-dom";
import Dashboard from './Layout/Dashboard/Dashboard';




function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className='containers'>
          <div className='navbarr'>
            <Navbar/>
          </div>
          

          <div className='otherPages'>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/word" element={<Create />} />
            </Routes>
          </div>
        </div>



      </div>
    </BrowserRouter>

  );

}

export default App;
