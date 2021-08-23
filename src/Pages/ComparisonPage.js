import { useState, useEffect } from 'react'

import { getCombinedData } from '../utils/utils'
import ComparisonGraph from '../Views/ComparisonGraph'
export default function ComparisonPage(props) {
    const [firstZipCode, setFirstZipCode] = useState(null)
    const [secondZipCode, setSecondZipCode] = useState(null)
    const [data, setData] = useState(null)
    const possibilities = props.data


    useEffect(() => {
        if (firstZipCode != null & secondZipCode != null) {
            getCombinedData(firstZipCode, secondZipCode)
                .then((data) => {
                    setData(data)
                    console.log(data)
                })
        }
    }, [firstZipCode, secondZipCode])



    return (

        <div className="container-fluid">

            <div className="row">

                <div className="col-2" >
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

                <div className="col-10">
                    {/* put graph here */}

                    <ComparisonGraph data={data} firstZipCode={firstZipCode} secondZipCode={secondZipCode} />
                </div>

            </div>
        </div>
    )
}