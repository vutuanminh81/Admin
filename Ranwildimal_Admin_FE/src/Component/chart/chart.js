import axios from "axios";
import React , { useEffect, useState } from "react"
import "./chart.css"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
//data, title, grid, datakey

export default function Chart() {
    const [rpdata, setData]= useState([]);
    useEffect(() => {
        try {
            axios.get("http://localhost:3000/reports/getData").then(res=>{
                setData(res.data);
            });
            console.log(rpdata);
        } catch (err) {
            console.log(err);
        }
    },[]);
    return (
        <div className="chart">
            <h3 className="chartTitle">Reports</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <LineChart data= {rpdata}>
                    
                    <Line type="monotone" stroke="#4E8A3E" dataKey="report" fill="#D6534B" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <CartesianGrid stroke="#e0dfdf" strokeDasharray="3 3" />
                    <Tooltip/>
                    <Legend />


                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}



