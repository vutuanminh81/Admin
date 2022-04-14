import React from "react"
import "./chart.css"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
//data, title, grid, datakey
export default function chart() {
    const rpdata = [
        {
            "day": "13/3",
            "reports": 30
        },
        {
            "day": "13/3",
            "reports": 200
        },
        {
            "day": "13/3",
            "reports": 400
        },
        {
            "day": "13/3",
            "reports": 30
        },
        {
            "day": "13/3",
            "reports": 50
        },
        {
            "day": "13/3",
            "reports": 100
        },
        {
            "day": "13/3",
            "reports": 20
        },
    ]
    return (
        <div className="chart">
            <h3 className="chartTitle">Reports</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <LineChart data= {rpdata}>
                    
                    <Line type="monotone" dataKey="reports" fill="#315527" />
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



