import { Map, InfoWindow, GoogleApiWrapper, Polygon } from 'google-maps-react';
import React from 'react';
import geoData from '../Model/GEODATA'
import CaseModal from './CaseModal'
import ZipCodeContext from '../Contexts/zipCode'
import zipCodeInfo from '../Model/ZIPCODES'
function MapContainer(props) {



    const defaultCenter = {
        lat: 33.06997875622593,
        lng: -116.60778304343944
    }
    //Connects context
    const { selectedZipcode, setZipcode } = React.useContext(ZipCodeContext)

    const colors = ['red', 'yellow', 'green', 'blue']

    //set Zipcode on map click
    const handleOnClick = (zipCode) => () => {
        setZipcode(parseInt(zipCode))
    }
    //set null to current selected zipcode if modal is closed
    const handleOnClose = () => setZipcode(() => null)

    return (
        <div>
            <Map
                google={props.google}
                zoom={10}
                initialCenter={defaultCenter}
            >
                {Object.entries(geoData).map((data, index) => (
                    <Polygon
                        key={index}
                        paths={data[1]}
                        strokeOpacity={0.8}
                        strokeWeight={2}
                        fillColor={colors[Math.floor(Math.random() * colors.length)]}
                        strokeWeight={0}
                        fillOpacity={0.35}
                        onClick={handleOnClick(data[0])}
                    >

                    </Polygon>

                ))}

                <InfoWindow
                
                    position={selectedZipcode !== null ? zipCodeInfo[selectedZipcode].cityCenter : defaultCenter}
                    visible={selectedZipcode !== null ? true : false}
                    onClose={handleOnClose}
              
                >
                    <CaseModal selectedZipcode={selectedZipcode} />
                </InfoWindow>

            </Map>

        </div>
    );

}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
})(MapContainer)