import React, { useState, useEffect, useCallback } from "react";
import Switch from "@mui/material/Switch";
import "./table.css";
import axios from "axios";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";
import {Visibility} from '@material-ui/icons';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';

const GreenSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: "#4E8A3E",
    '&:hover': {
      backgroundColor: alpha("#4E8A3E", theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: "#4E8A3E",
  },
}));
axios.defaults.withCredentials = true;
var count = 1;
const label = { inputProps: { "aria-label": "Switch demo" } };


function AdminTable() {
  const [listUser, setListUser] = useState([]);
  const [toggle, setToggle] = useState(true);
  var navigate = useNavigate();

  var checkSession=false;
  var CheckSession = async () => {
    await axios.get("http://localhost:3000/get_session").then(async (respn) => {
      console.log("/////////   " + respn.data);
      if (respn.data === true) {
        checkSession = true;
      } else {
        checkSession = false;
      }
    }).catch((error) =>{
      checkSession = false;
    });
  };

  useEffect(async () => {
    await CheckSession();
    console.log("check Session" + checkSession);
    if (!checkSession) {
      navigate("/login");
    }
  });

  const changeStatus = useCallback((email, status) => {
    return async (e) => {
      if (status == 1) {
        axios.put("http://localhost:3000/admin/delete/" + email).then((res) => {
          if (res.data === true) {
            alert("Disable success");
            window.location.reload(false);
          } else {
            alert("Disable fail");
            window.location.reload(false);
          }
        });
      } else {
        axios.put("http://localhost:3000/admin/enable/" + email).then((res) => {
          if (res.data === true) {
            alert("Enable success");
            window.location.reload(false);
          } else {
            alert("Enable fail");
            window.location.reload(false);
          }
        });
      }
    };
  });

  const updateAdmin = useCallback((email) => {
    return async (e) => {
      navigate("/profile", { state: email });
    };
  });

  function moveToAdd() {
    navigate("/add_account");
  }

  function getUser() {
    axios.get("http://localhost:3000/admin/").then((res) => {
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
          <div className="table_head">
            <div className="table_lable">
              <lable>Admin Management</lable>
            </div>
            <input
              type="submit"
              name="ex_button"
              id="btn_add_exemple"
              className="register table_btn"
              value="Add new account"
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
                        {item.Admin_Id == 1 ? null : (
                          <Visibility className="column_btn" onClick={updateAdmin(item.User_Name)}/>
                        )}
                        
                      </td>
                      <td className="column6">
                        <div className="column_swbtn">
                          {(item.Admin_Id == 1 && null) ||
                            (item.Status == 1 && (
                              <FormControlLabel 
                                control={
                                  <GreenSwitch defaultChecked 
                                    onClick={changeStatus(
                                      item.User_Name,
                                      item.Status
                                    )}
                                  />
                                }
                                label="Enable"
                              />
                            )) || (
                              <FormControlLabel 
                                defaultChecked
                                control={
                                  <Switch
                                    onClick={changeStatus(
                                      item.User_Name,
                                      item.Status
                                    )}
                                  />
                                }
                                label="Disable"
                              />
                            )}
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
export default AdminTable;
