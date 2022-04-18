import React, { useState, useEffect, useCallback } from "react";
import Switch from "@mui/material/Switch";
import "./table.css";
import axios from "axios";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";
import { Visibility } from "@material-ui/icons";
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import { Card } from "@mui/material";
import DataTable from "react-data-table-component";
import Navbar from "../../Component/navbar/Navbar";
import FooterPage from "../../Component/footer/footer";

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#4E8A3E",
    "&:hover": {
      backgroundColor: alpha("#4E8A3E", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
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
  const [searchData, setSearchData] = useState("");
  var checkSession = false;
  var CheckSession = async () => {
    await axios
      .get("http://localhost:3000/get_session")
      .then(async (respn) => {
        console.log("/////////   " + respn.data);
        if (respn.data === true) {
          checkSession = true;
        } else {
          checkSession = false;
        }
      })
      .catch((error) => {
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

  function searchRow(rows) {
    return rows.filter(
      (row) => row.User_Name.toLowerCase().indexOf(searchData) > -1
    );
  }

  const updateAdmin = useCallback((email) => {
    return async (e) => {
      navigate("/profile", { state: email });
    };
  });

  function moveToAddAdmin() {
    navigate("/add_account");
  }

  
  useEffect(() => {
    async function getUser() {
      await axios.get("http://localhost:3000/admin/").then((res) => {
        setListUser(res.data);
        console.log(listUser);
      });
    }
    getUser();
  }, []);
  const columns = [
    {
      name: "Username",
      selector: (row) => row.Word_Image,
      cell: (row) => row.User_Name,
      center: true,
    },
    {
      name: "Fullname",
      selector: (row) => row.Full_Name,
      sortable: true,
      center: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.Phone_Number,
      center: true,
    },
    {
      name: "Address",
      selector: (row) => row.Address,
      center: true,
    },
    {
      name: "View",
      selector: (row) => (
        <div className="card-body text-center">
          {row.Admin_Id == 1 ? null : (
            <Visibility
              className="column_btn"
              onClick={updateAdmin(row.User_Name)}
            />
          )}
        </div>
      ),
      center: true,
    },
    {
      name: "Status",
      selector: (row) => row.Word_Status,
      cell: (row) => (
        <div className="card-body text-center">
          {(row.Admin_Id == 1 && null) ||
            (row.Status == 1 && (
              <FormControlLabel
                control={
                  <GreenSwitch
                    defaultChecked
                    onClick={changeStatus(row.User_Name, row.Status)}
                  />
                }
                label="Enable"
              />
            )) || (
              <FormControlLabel
                defaultChecked
                control={
                  <Switch onClick={changeStatus(row.User_Name, row.Status)} />
                }
                label="Disable"
              />
            )}
        </div>
      ),
      center: true,
    },
  ];
  return (
    <div className="containers">
      <div className="navbarr">
        <Navbar />
      </div>
      <div className="otherPages">
    <div className="container-fluid">
      <Card>
        <div className="table_head">
          <div className="table_lable">
            <lable>Admin Management</lable>
          </div>
        </div>
        <div className="card-header py-3">
          <div className="row">
            <div className="col-md-6 ">
              <div
                className="text-lg-end dataTables_filter"
                id="dataTable_filter"
              >
                <label className="form-label ">
                  <input
                    onChange={(e) => setSearchData(e.target.value)}
                    type="text"
                    className="form-control form-control-sm justify-content-end"
                    aria-controls="dataTable"
                    placeholder="Search by email"
                    value={searchData}
                  />
                </label>
              </div>
            </div>
            <div className="col-md-6 text-right">
              <button
                className="btn btn-primary btn-sm"
                onClick={moveToAddAdmin}
              >
                <i className="fas fa-user-plus"></i>
                <span> Add a admin</span>
              </button>
            </div>
          </div>
        </div>
        <DataTable columns={columns} data={searchRow(listUser)} pagination />
      </Card>
    </div>
    <div>
          <FooterPage/>
        </div>
        </div>
    </div>
    
  );
}
export default AdminTable;
