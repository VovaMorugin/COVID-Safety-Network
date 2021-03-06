import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ComparisonGraph(props) {

    const [dataType, setDataType] = useState('per_thousand')

    const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#00B3E6',
        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
        '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
        '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
        '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
        '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
        '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
        '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];


    return (

        <div className="col-12" >

            {props.data != null && props.data.length ? <div className="d-flex justify-content-evenly pb-3">
                {dataType === 'positive_tests_in_7_day_testing'
                    ? <h2>The graph shows the absolute number of new cases in the selected location by week.</h2>
                    : <h2>The graph shows the relative ratio of new cases per thousand people for the selected location by week</h2>}
            </div> : null}
            <ResponsiveContainer width={'100%'} minHeight={'400px'}>

                {props.data != null && props.data.length > 0 ?
                    <LineChart
                        data={props.data}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        {props.selectedLocations.map((zipCode, index) =>

                            <Line key={index}
                                type="monotone"
                                dataKey={`${zipCode.label}.${dataType}`}
                                name={`${zipCode.label}`}
                                stroke={colorArray[index]}
                                activeDot={{ r: 8 }}
                            />
                        )}
                    </LineChart>

                    : <div className="d-flex align-items-center justify-content-center" style={{ backgroundImage: "url(/placeholder.png", minHeight: '500px', 'backgroundSize': '100% 100%' }}>
                        <h1>Select locations</h1>
                    </div>}
            </ResponsiveContainer>


            {props.data != null && props.data.length ? <div className="d-flex justify-content-evenly">
                <button className="btn btn-primary" disabled={dataType === 'positive_tests_in_7_day_testing'} onClick={() => setDataType('positive_tests_in_7_day_testing')}>Show absolute numbers</button>
                <button className="btn btn-primary" disabled={dataType === 'per_thousand'} onClick={() => setDataType('per_thousand')}>Show cases per thousand</button>
            </div> : null}

        </div>
    )
}
