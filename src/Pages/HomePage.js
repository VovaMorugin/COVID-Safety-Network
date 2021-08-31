import GoogleApiWrapper from '../Views/MapView'
import ZipcodeSelector from '../Views/ZipcodeSelector'

import UserZipCodes from '../Views/UserZipCodes'

export default function HomePage(props) {

    return (

        <div className="flex-container p-5">

            <div className="row">
                <div className="col-md-2 pb-5">
                    <ZipcodeSelector options={props.options} /><p />

                    <UserZipCodes />
                </div>

                <div className="col-md-10 ps-3" >


                    <div style={{
                        'position': 'relative',
                        'paddingBottom': '50%',
                        'overflow': 'hidden'
                    }}>
                        <GoogleApiWrapper />
                    </div>
                    <div className="row d-flex pt-4 justify-content-center">Level of exposure:</div>
                    <div className="row">
                        <div className="d-flex p-1 justify-content-center">
                            <div className="pe-3">Low</div>
                            <div style={{ 'backgroundColor': '#0bd474', 'width': '5%', 'borderRadius': '15px 0 0 15px' }}>&nbsp;</div>
                            <div style={{ 'backgroundColor': '#ffc900', 'width': '5%' }}>&nbsp;</div>
                            <div style={{ 'backgroundColor': '#ff9600', 'width': '5%' }}>&nbsp;</div>
                            <div style={{ 'backgroundColor': '#d9002c', 'width': '5%' }}>&nbsp;</div>
                            <div style={{ 'backgroundColor': '#790019', 'width': '5%', 'borderRadius': '0 15px 15px 0' }}>&nbsp;</div>
                            <div className="ps-3">Hight</div>
                        </div>


                    </div>
                </div>


            </div>


        </div >
    )
}