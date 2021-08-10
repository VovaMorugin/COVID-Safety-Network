import * as React from 'react'
import GoogleApiWrapper from '../Views/MapView'
import ZipcodeSelector from '../Views/ZipcodeSelector'

import geoData from '../Model/_GEODATA';




export default function HomePage() {

    let zipcodes = Object.entries(geoData).map( (data, index) =>
        data[0]
    );

    return (
       
        
        <div className="container">
            <div className="row">
                <div className="col-2"><ZipcodeSelector data={zipcodes}/></div>
                <div className="col-10"><GoogleApiWrapper /></div>
            </div>
        </div>

    )
}