import * as React from 'react'
import {Link} from 'react-router-dom'
export default function ZipcodeSelector() {
    return (
        <div><Link to='/compare'><button type="button" className="btn btn-primary">Compare zipcodes</button></Link></div>
    )
}