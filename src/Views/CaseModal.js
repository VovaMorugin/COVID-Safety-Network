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
    console.log(data, 'sdfsdfdf')

    return (
        <div className="d-flex flex-column">
            {selectedZipcode !== null && 
           
            <div className="d-flex pb-2 justify-content-center"><h5>{zipCodeInfo[selectedZipcode].cityName} {selectedZipcode}</h5></div>}
            <LineChart
                width={500}
                height={200}
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
                {/* <Legend /> */}
                <Line type="monotone" dataKey="cases" stroke="#82ca9d" />

            </LineChart>
            <div className="d-flex pt-2 justify-content-center">Number of new COVID-19 cases per thousand people by week.</div>
        </div>
    )

}