import axios from "axios";
import React, { useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import "../Login/bootstrap.css";
import "../Login/Login.css";

import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  NavLink,
  Navigate,
} from "react-router-dom";
import Create from "../Word_Management/Create";
import { click } from "@testing-library/user-event/dist/click";
const md5 = require("md5");
axios.defaults.withCredentials = true;

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
    <div className="ftco-section">
      <div className="ftco-div">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5"></div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-10">
              <div className="wrap d-md-flex">
                <div className="img"></div>
                <div className="login-wrap p-4 p-md-5">
                  <div className="d-flex">
                    <div className="w-200">
                      <h3 className="mt-4">Ranwildimal Login</h3>
                    </div>
                  </div>
                  <form action="#" className="signin-form">
                    <div className="form-group mb-3">
                      <label className="label" for="name">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Email"
                        onChange={(event) => setEmail(event.target.value)}
                        required
                      />
                      <small id="emailHelp" className="text-danger form-text">
                        {emailError}
                      </small>
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" for="password">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        onChange={(event) => setPassword(event.target.value)}
                        required
                      />
                      <small
                        id="passworderror"
                        className="text-danger form-text">
                        {passwordError}
                      </small>
                    </div>
                    <div className="form-group">
                      <button
                        type="submit"
                        className="form-control btn btn-primary rounded submit px-3 mt-3"
                        onClick={(e)=>Login(e,navigate)}
                        >Login
                      </button>
                    </div>
                    <div className="form-group d-md-flex">
                      <div className="w-50 text-left">
                        <label className="checkbox-wrap checkbox-primary mb-0"></label>
                      </div>
                      <div className="w-50 text-md-right"></div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
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
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  console.log(request.email + " " + request.password);
  axios
    .get("http://localhost:3000/session")
    .then((respn) => {
      //alert("Loginsucess");
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(request.email + " " + request.password);
  axios
    .get(
      "http://localhost:3000/login/" +
        request.email +
        "/" +
        md5(request.password),
      request
    )
    .then((respn) => {
      if (respn.data === true) {
        alert("Loginsucess");
        check = true;
        navigate("/dashboard");
      } else {
        alert("Wrong user name or password");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export default LoginForm;
