import GoogleApiWrapper from '../Views/MapView'
import ZipcodeSelector from '../Views/ZipcodeSelector'

import UserZipCodes from '../Views/UserZipCodes'

export default function HomePage(props) {



    return (

        <div className="container">

            <div className="row">

                <div className="col-lg-2">
                    <ZipcodeSelector data={props.zipcodes} /><p />

                    <UserZipCodes />
                </div>

                <div className="col-lg-10">
                    <GoogleApiWrapper />

                </div>

            </div>

        </div>


    )
}