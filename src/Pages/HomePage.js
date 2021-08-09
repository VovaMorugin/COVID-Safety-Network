import * as React from 'react'
import GoogleApiWrapper from '../Views/MapView'
import ZipcodeSelector from '../Views/ZipcodeSelector'

export default function HomePage() {

    return (
       
        
        <div className="container">
            <div className="row">
                <div className="col-2"><ZipcodeSelector/></div>
                <div className="col-10"><GoogleApiWrapper /></div>
            </div>
        </div>

    )
}