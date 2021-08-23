import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ComparisonGraph(props) {

    return (
        <ResponsiveContainer width="80%" minHeight="500px">
            {props.data != null ? <LineChart
                data={props.data}
                width={500}
                height={300}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                    <Line type="monotone" dataKey={props.firstZipCode} stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey={props.secondZipCode} stroke="#82ca9d" activeDot={{ r: 8 }} />
                </LineChart>

                : <LineChart>
                    <XAxis />
                    <YAxis />
                </LineChart>}

        </ResponsiveContainer>
    )
}
