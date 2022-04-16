import axios from "axios";
import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import "./widgetChart.css"

export default function WidgetChart() {
    const [data, setData]= useState([]);

    const COLORS = ['#4E8A3E', '#D6534B'];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    useEffect(() => {
        try {
            axios.get("http://localhost:3000/worddes/getScanSearch").then(res=>{
                setData(res.data);
            });
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    },[]);

    

    return (

        <div className='widgetChart'>
            <div className='chartTitle'>Scan and Search</div>
            <div className='chartPie'>
                <ResponsiveContainer width="100%" height="100%" aspect={2/ 1}>
                    <PieChart width= "1000px" height="1000px">
                        <Pie data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={100}
                            startAngle={90}
                            endAngle={450}
                            fill="#315527"
                            dataKey="value">
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />

                    </PieChart>
                </ResponsiveContainer>
            </div>

        </div>
    )
}
