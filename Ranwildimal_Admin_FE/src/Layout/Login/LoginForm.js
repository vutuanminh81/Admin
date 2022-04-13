import axios from "axios";
import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "../Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";


import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  NavLink,
  Navigate
} from "react-router-dom";
import Create from "../Word_Management/Create";
import { click } from "@testing-library/user-event/dist/click";
const md5 = require("md5");



function LoginForm() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordError, setpasswordError] = useState("");
    const [emailError, setemailError] = useState("");
    var navigate = useNavigate();

    const handleValidation = (event) => {
        let formIsValid = true;

        if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            formIsValid = false;
            setemailError("Email Not Valid");
            return false;
        } else {
            setemailError("");
            formIsValid = true;
        }

        if (!password.match(/^[a-zA-Z]{8,22}$/)) {
            formIsValid = false;
            setpasswordError(
                "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
            );
            return false;
        } else {
            setpasswordError("");
            formIsValid = true;
        }

        return formIsValid;
    };



    return (
        <div className="App">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-4">
                        <form id="loginform" onSubmit={(e) => Login(e, navigate)}>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                                <small id="emailHelp" className="text-danger form-text">
                                    {emailError}
                                </small>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="password"
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <small id="passworderror" className="text-danger form-text">
                                    {passwordError}
                                </small>
                            </div>
                            <div className='form-group'>
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

function Login(e, navigate) {
    e.preventDefault();
    var check = false;
    let request = {
        email: document.getElementById('email').value,
        password: md5(document.getElementById('password').value),
    }

    console.log(request.email + " " + request.password)
    axios.get('http://localhost:3000/login/'+request.email+'/'+md5(request.password), request)
    .then(respn => {
        if(respn.data === true){
            alert("Loginsucess");
            check = true;
            navigate("/dashboard");
        }else{
            alert("Wrong user name or password")
        }
    })
    .catch( err => {
        console.log(err);
    })

}

export default LoginForm
