import React, { useState, useEffect, useCallback } from "react";
import Switch from "@mui/material/Switch";
import axios from "axios";
import "./word_table.css";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Visibility } from "@material-ui/icons";
import { alpha, styled } from "@mui/material/styles";
import { Card } from "@mui/material";
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

const Word_Table = () => {
  const [wordList, setWordList] = useState([]);
  const [searchData, setSearchData] = useState("");

  function getWord() {
    axios.get("http://localhost:3000/worddes/getlistall").then((res) => {
      setWordList(res.data);
    });
  }

  const updateWord = useCallback((wordDesId) => {
    return async (e) => {
      navigate("/updateWord", { state: wordDesId });
    };
  });

  const changeStatus = useCallback((wordDesId, status) => {
    return async (e) => {
      if (status == 1) {
        axios
          .put("http://localhost:3000/word/disable/" + wordDesId)
          .then((res) => {
            if (res.data === true) {
              alert("Disable success");
              window.location.reload(false);
            } else {
              alert("Disable fail");
              window.location.reload(false);
            }
          });
      } else {
        axios
          .put("http://localhost:3000/word/enable/" + wordDesId)
          .then((res) => {
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

  function moveToAddWord() {
    navigate("/word");
  }

  var navigate = useNavigate();
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
    getWord();
    await CheckSession();
    console.log("check Session" + checkSession);
    if (!checkSession) {
      navigate("/login");
    }
  }, []);
  const label = { inputProps: { "aria-label": "Switch demo" } };

  function searchRow(rows) {
    return rows.filter(
      (row) => row.Word.toLowerCase().indexOf(searchData) > -1
    );
  }

  const columns = [
    {
      name: "Image",
      selector: (row) => row.Word_Image,
      cell: (row) => (
        <div className="card-body text-center">
          {
            <img
              className="rounded-circle"
              width="80px"
              height="80px"
              src={row.Word_Image}
              alt="admin avatar"
            />
          }
        </div>
      ),
      center: true,
    },
    {
      name: "Word Name",
      selector: (row) => row.Word,
      sortable: true,
      center: true,
    },
    {
      name: "Total Search",
      selector: (row) => row.Total_Search,
      center: true,
    },
    {
      name: "View",
      selector: (row) => (
        <div className="card-body text-center">
          {
            <Visibility
              className="column_btn"
              onClick={updateWord(row.Word_Des_Id)}
            />
          }
        </div>
      ),
      center: true,
    },
    {
      name: "Status",
      selector: (row) => row.Word_Status,
      cell: (row) => (
        <div className="card-body text-center">
          {row.Word_Status === 1 ? (
            <FormControlLabel
              control={
                <GreenSwitch
                  checked
                  onClick={changeStatus(row.Word_Des_Id, row.Status)}
                />
              }
              label="Enable"
            />
          ) : (
            <FormControlLabel
              control={
                <GreenSwitch
                  onClick={changeStatus(row.Word_Des_Id, row.Status)}
                />
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
                <lable>Word Management</lable>
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
                        placeholder="Search by word name"
                        value={searchData}
                      />
                    </label>
                  </div>
                </div>
                <div className="col-md-6 text-right">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={moveToAddWord}
                  >
                    <i className="fas fa-user-plus"></i>
                    <span> Add word</span>
                  </button>
                </div>
              </div>
            </div>
            <DataTable
              columns={columns}
              data={searchRow(wordList)}
              pagination
            />
          </Card>
        </div>
        <div>
          <FooterPage />
        </div>
      </div>
    </div>
  );
};

export default Word_Table;
