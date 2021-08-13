import React, { useEffect, useState } from 'react'
import { getData } from '../Model/APIManager'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts'

export default function CaseModal({ selectedZipcode }) {

    const [data, setData] = useState([
        { date: "06/19/2021", cases: 5 },
        { date: "06/12/2021", cases: 5 },
        { date: "07/3/2021", cases: 13 },
        { date: "07/17/2021", cases: 39 },
        { date: "07/10/2021", cases: 13 },
        { date: "07/24/2021", cases: 52 },
        { date: "07/31/2021", cases: 71 }
    ])

    useEffect(() => {
        getData(selectedZipcode)
            .then((result) => setData(result))
            .catch(() => console.log('error'))
    }, [selectedZipcode])

    return (
        <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cases" stroke="#82ca9d" activeDot={{ r: 8 }} />
        </LineChart>

    )

}