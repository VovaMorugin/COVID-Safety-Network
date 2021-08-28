import { useState, useEffect } from 'react'
import { getCombinedData, getData } from '../utils/utils'
import { getLatestDataForAllZipCodes } from '../Model/APIManager'

import ComparisonGraph from '../Views/ComparisonGraph'
import ComparisonTable from '../Views/ComparisonTable'
import { useAuth } from "../Contexts/AuthContext"
import Select from 'react-select'

export default function ComparisonPage(props) {
    const [data, setData] = useState(null)
    const [tableData, setTableData] = useState(null)
    const { userZipCodes } = useAuth()
    const [selectedLocations, setSelectedLocations] = useState(null)

    const options = props.options
    //For graph

    useEffect(() => {
        if (selectedLocations != null) {
            getData(selectedLocations)
                .then((data) => {
                    setData(data)
                })
        }
    }, [selectedLocations])

    //For table
    useEffect(() => {
        getLatestDataForAllZipCodes()
            .then((result) => setTableData(result))
            .catch(() => console.log('error'))
    }, [])


    return (

        <div className="container my-5">
            <div className="d-flex flex-column">
                <div className="mb-5">
                    {/* put graph here */}
                    <Select options={options} isMulti={true} onChange={(values) => setSelectedLocations(values)} />
                </div>
                <div className="d-flex">
                    {/* put graph here */}
                    <ComparisonGraph data={data} selectedLocations={selectedLocations} />
                </div>
            </div>

            {/* <div className="row" style={{ marginTop: '80px' }}>

                <div className="col-lg-2">
                </div> */}

            {/* <div className="col-lg-4" >
                    <ComparisonTable zipcode={firstZipCode} data={tableData} />
                </div>

                <div className="col-lg-4" >
                    <ComparisonTable zipcode={secondZipCode} data={tableData} />
                </div> */}


            {/* </div> */}
        </div>
    )
}