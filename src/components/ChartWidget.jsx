import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useDashboardStore } from "../store";
const ChartWidget = () => {
    const { darkMode } = useDashboardStore(); 
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((response) => response.json())
            .then((json) => {
                setData(json.slice(0, 5).map((post, index) => ({
                    name: `Post ${index + 1}`,
                    value: Math.floor(Math.random() * 10) + 1,
                })));
            });
    }, []);

    return (
        <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                    <XAxis dataKey="name" tick={{ fill: darkMode ? "white" : "black" }} />
                    <YAxis tick={{ fill: darkMode ? "white" : "black" }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ color: darkMode ? "white" : "black" }} />
                    <Bar dataKey="value" fill="lightgreen" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ChartWidget;
