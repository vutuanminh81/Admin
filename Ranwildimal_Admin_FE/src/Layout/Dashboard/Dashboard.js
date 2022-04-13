import React from 'react'
import Chart from '../../Component/chart/chart'
import DashboardFeature from '../../Component/dashboardFeature/dashboardFeature'
import WidgetBoard from '../../Component/widgetBoard/widgetBoard'
import WidgetChart from '../../Component/widgetChart/widgetChart'
// import { rpdata } from '../../Data/reportData'


import './Dashboard.css'


class Dashboard extends React.Component {
  
  render() {
    // console.log("......."+rpdata.length)
    return (
      <>
      <DashboardFeature/>
      
      <Chart/>
      <div className='homeWidgets'>
        <WidgetBoard/>
        <WidgetChart/>
      </div>
      </> 
      
    )
    // console.log("......."+rpdata);
  }
}

export default Dashboard