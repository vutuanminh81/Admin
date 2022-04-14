import React, { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import "./table.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

var count = 1;

const Word_Table = () => {
  var navigate = useNavigate();
  var checkSession;
  var CheckSession = async () => {
    await axios.get("http://localhost:3000/get_session").then(async (respn) => {
      console.log("/////////   " + respn.data);
      if (respn.data === true) {
        checkSession = true;
      } else {
        checkSession = false;
      }
    });
  };

  useEffect(async () => {
    await CheckSession();
    console.log("check Session" + checkSession);
    if (!checkSession) {
      navigate("/login");
    }
  });
  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <div className="limiter">
      <div className="container-table100">
        <div className="wrap-table100">
          <div>
            <input
              type="submit"
              name="ex_button"
              id="btn_add_exemple"
              className="register"
              value="Create"
            />
          </div>
          <div className="table100">
            <table>
              <thead>
                <tr className="table100-head">
                  <th className="column1">Username</th>
                  <th className="column2">Fullname</th>
                  <th className="column3">Phone Number</th>
                  <th className="column4">Address</th>
                  <th className="column5">View</th>
                  <th className="column6">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="column1">2017-09-29 01:22</td>
                  <td className="column2">200398</td>
                  <td className="column3">iPhone X 64Gb Grey</td>
                  <td className="column4">$999.00</td>
                  <td className="column5">
                    <a href="https://www.w3schools.com">W3Schools</a>
                  </td>
                  <td className="column6">
                    <div>
                      <Switch {...label} defaultChecked />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="column1">2017-09-29 01:22</td>
                  <td className="column2">200398</td>
                  <td className="column3">iPhone X 64Gb Grey</td>
                  <td className="column4">$999.00</td>
                  <td className="column5">
                    <a href="https://www.w3schools.com">W3Schools</a>
                  </td>
                  <td className="column6">
                    <div>
                      <Switch {...label} defaultChecked />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Word_Table;
