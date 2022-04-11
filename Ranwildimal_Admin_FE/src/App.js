
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
        <Navbar />
        
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/word" element={<Create />} />
        </Routes>


      </div>
    </BrowserRouter>

  );

}

export default App;
