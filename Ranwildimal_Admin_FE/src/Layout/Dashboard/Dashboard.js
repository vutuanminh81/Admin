import React, { useEffect } from "react";
import Chart from "../../Component/chart/chart";
import Navbar from "../../Component/navbar/Navbar";
import FooterPage from "../../Component/footer/footer";
import DashboardFeature from "../../Component/dashboardFeature/dashboardFeature";
import WidgetBoard from "../../Component/widgetBoard/widgetBoard";
import WidgetChart from "../../Component/widgetChart/widgetChart";
// import { rpdata } from '../../Data/reportData'

import "./Dashboard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

function Dashboard() {
  var navigate = useNavigate();
  var checkSession = false;
  var CheckSession = async () => {
    await axios.get("http://localhost:3000/get_session").then(async (respn) => {
      console.log("/////////   " + respn.data);
      if (respn.data === true) {
        checkSession = true;
      } else {
        checkSession = false;
      }
    }).catch((error) => {
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

  return (
    <>
      <div className="containers">
        <div className="navbarr">
          <Navbar />
        </div>
        <div className="otherPages">
          <DashboardFeature />

          <Chart />
          <div className="homeWidgets">
            <WidgetBoard />
            <WidgetChart />
          </div>
          <div>
            <FooterPage />
          </div>
        </div>
      </div>
    </>
  );
  // console.log("......."+rpdata);
}

export default Dashboard;
