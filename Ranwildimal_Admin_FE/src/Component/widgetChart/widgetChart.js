import React, { PureComponent } from 'react'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import "./widgetChart.css"

export default function WidgetChart() {
    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
    ];

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

    return (
        <div className='widgetChart'>
            <div className='chartTitle'>Scan and Search</div>
            <div className='chartPie'>
                <ResponsiveContainer width="100%" aspect={2.5/ 1}>
                    <PieChart width={200} height={200}>
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
