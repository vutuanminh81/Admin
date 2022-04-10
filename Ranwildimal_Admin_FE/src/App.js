import logo from './logo.svg';
import './App.css';
import LoginForm from './Layout/Login/LoginForm';
import Create from './Layout/Word_Management/Create';

import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom"
import Navbar from './Component/navbar/Navbar';


function App() {
  return (
    <div className="App">
      <Navbar/>

      {/* <Switch>
        <Route path='/dashboard'>
          <Dashboard/>
        </Route>
        <Route path='/word'>
          <LoginForm/>
        </Route>
        <Route path='/'>
          <LoginForm/>
        </Route>
      </Switch> */}
      {/* <Create/> */}
    </div>
  );

}

export default App;
