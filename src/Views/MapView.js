import { Map, InfoWindow, GoogleApiWrapper, Polygon } from 'google-maps-react';
import React from 'react';
import geoData from '../Model/GEODATA'
import ZIPCODE_INFO from '../Model/ZIPCODES'
import CaseModal from './CaseModal'
function MapContainer(props) {

    const defaultCenter = {
        lat: 33.06997875622593,
        lng: -116.60778304343944
    }

    const [showingInfoWindow, setShowingInfoWindow] = React.useState(false)
    const [modalCoordinates, setModalCoordinates] = React.useState(defaultCenter)

    const colors = ['red', 'yellow', 'green', 'blue']


    function handleOnClick(t, map, coord) {
        setShowingInfoWindow(true)
        const { latLng } = coord
        setModalCoordinates({
            lat: latLng.lat(),
            lng: latLng.lng()
        })

    }

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
                        onClick={handleOnClick}
                    >

                    </Polygon>

                ))}
                <InfoWindow
                    position={modalCoordinates}
                    visible={showingInfoWindow}
                >
                    <CaseModal />
                </InfoWindow>

            </Map>

        </div>
    );

}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
})(MapContainer)