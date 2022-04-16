import axios from "axios";
import React  , { useEffect, useState } from 'react'
import "./dashboardFeature.css"
function DashboardFeature() {
    const [worcount, setData]= useState([]);
    const [reportcount, setReport]= useState([]);
    const [admintcount, setAdmin]= useState([]);

    useEffect(() => {
        try {
            axios.get("http://localhost:3000/worddes//numberlist").then(res=>{
                setData(res.data);
            });
            console.log(worcount);
        } catch (err) {
            console.log(err);
        }
    },[]);
    useEffect(() => {
        try {
            axios.get("http://localhost:3000/reports/count").then(res=>{
                setReport(res.data);
            });
            console.log(reportcount);
        } catch (err) {
            console.log(err);
        }
    },[]);
    useEffect(() => {
        try {
            axios.get("http://localhost:3000/admin/count").then(res=>{
                setAdmin(res.data);
            });
            console.log(admintcount);
        } catch (err) {
            console.log(err);
        }
    },[]);
  return (
    <div className='featured'>
        <div className='featureItem_1'>
            <span className='featuredTitle'>Total Words</span>
            <div className='featuredNumberContainer'>
                <span className='featureNumber'>{worcount}</span>
                
            </div>
            
        </div>
        <div className='featureItem_2'>
            <span className='featuredTitle'>Total Report</span>
            <div className='featuredNumberContainer'>
                <span className='featureNumber'>{reportcount}</span>
                
            </div>
            
        </div>
        <div className='featureItem_3'>
            <span className='featuredTitle'>Total Admin</span>
            <div className='featuredNumberContainer'>
                <span className='featureNumber'>{admintcount}</span>
                
            </div>
            
        </div>
    </div>
  )
}

export default DashboardFeature