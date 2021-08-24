import { useState, useEffect } from 'react'
import { getCombinedData } from '../utils/utils'
import { getLatestDataForAllZipCodes } from '../Model/APIManager'

import ComparisonGraph from '../Views/ComparisonGraph'
import ComparisonTable from '../Views/ComparisonTable'



export default function ComparisonPage(props) {
    const [firstZipCode, setFirstZipCode] = useState(null)
    const [secondZipCode, setSecondZipCode] = useState(null)
    const [data, setData] = useState(null)
    const [tableData, setTableData] = useState(null)


    const possibilities = props.data

    //For graph
    useEffect(() => {
        if (firstZipCode != null & secondZipCode != null) {
            getCombinedData(firstZipCode, secondZipCode)
                .then((data) => {
                    setData(data)
                    console.log(data)
                })
        }
    }, [firstZipCode, secondZipCode])


    //For table
    useEffect(() => {
        getLatestDataForAllZipCodes()
            .then((result) => setTableData(result))
            .catch(() => console.log('error'))
    }, [])



    return (

        <div className="container">

            <div className="row">

                <div className="col-lg-2" >
                    {/* put selectors here */}
                    <div className="row" style={{ minHeight: '100px' }}>
                        Enter in first zipcode:

                    <select className="ui fluid search dropdown"
                            onInput={(e) => setFirstZipCode(e.target.value)}
                            value={firstZipCode} >
                            {possibilities.map((zipcode, index) =>

                                <option key={index}>
                                    {zipcode}
                                </option>)}

                        </select>
                    </div>

                    <div className="row" >
                        Enter in second zipcode:

                    <select className="ui fluid search dropdown"
                            onInput={(e) => setSecondZipCode(e.target.value)}
                            value={secondZipCode} >
                            {possibilities.map((zipcode, index) =>

                                <option key={index}>
                                    {zipcode}
                                </option>)}

                        </select>
                    </div>

                </div>

                <div className="col-lg-10">
                    {/* put graph here */}

                    <ComparisonGraph data={data} firstZipCode={firstZipCode} secondZipCode={secondZipCode} />
                </div>

            </div>

            <div className="row" style={{marginTop: '80px'}}>

                <div className="col-lg-2">
                </div>

                <div className="col-lg-4" >
                    <ComparisonTable zipcode={firstZipCode} data ={tableData} />
                </div>

                <div className="col-lg-4" >
                    <ComparisonTable zipcode={secondZipCode} data ={tableData} />
                 </div>


            </div>
        </div>

        
    )
}