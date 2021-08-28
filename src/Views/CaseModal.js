import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts'
import zipCodeInfo from '../Model/ZIPCODES'

export default function CaseModal({ data, selectedZipcode }) {
    console.log(selectedZipcode, 'sdfsdfdf')

    return (
        <div className="d-flex flex-column">
            {selectedZipcode !== null && <div className="d-flex justify-content-center"><h5>Number of new COVID-19 cases for {zipCodeInfo[selectedZipcode].cityName} {selectedZipcode}</h5></div>}
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 5,
                    left: 0,
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
        </div>
    )

}