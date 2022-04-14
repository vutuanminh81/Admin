import React, { useState, useEffect, useCallback } from "react";
import Switch from "@mui/material/Switch";
import "./table.css";
import axios from "axios";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from "react-router-dom";

var count = 1;
const label = { inputProps: { "aria-label": "Switch demo" } };
const Word_Table = () => {
  const [listUser, setListUser] = useState([]);
  const [toggle, setToggle] = useState(true);
  var navigate = useNavigate();
  const changeStatus = useCallback( (email,status) => {
    return async (e) => {
      if(status == 1){
        axios.put("http://localhost:3000/admin/delete/"+email).then(res=>{
          if(res.data === true){
            alert("Disable success");
            window. location. reload(false);
          }else{
            alert("Disable fail");
            window. location. reload(false);
          }
        });
      }else{
        axios.put("http://localhost:3000/admin/enable/"+email).then(res=>{
          if(res.data === true){
            alert("Enable success");
            window. location. reload(false);
          }else{
            alert("Enable fail");
            window. location. reload(false);
          }
        });
      }
    }
  });

  const updateAdmin = useCallback( (email) => {
    return async (e) => {
      navigate("/update",{state : email});
    }
  });

  function moveToAdd(){
    navigate("/add_account");
  }

  function getUser() {
    axios.get("http://localhost:3000/admin").then((res) => {
      setListUser(res.data);
      console.log(listUser);
    });
  }
  useEffect(() => {
    getUser();
    console.log(listUser);
  }, []);
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
              onClick={moveToAdd}
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
                  {listUser.map((item, index) => {
                    return (
                      <tr>
                        <td className="column1">{item.User_Name}</td>
                        <td className="column2">{item.Full_Name}</td>
                        <td className="column3">{item.Phone_Number}</td>
                        <td className="column4">{item.Address}</td>
                        <td className="column5">
                          <button onClick={updateAdmin(item.User_Name)}>update</button>
                        </td>
                        <td className="column6">
                          <div>
                          {
                            item.Status == 1 && <FormControlLabel control={<Switch defaultChecked onClick={changeStatus(item.User_Name, item.Status)} />} label="Label" />
                            || <FormControlLabel defaultChecked  control={<Switch onClick={changeStatus(item.User_Name, item.Status)} />} label="Disabled" />
                          }
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Word_Table;
