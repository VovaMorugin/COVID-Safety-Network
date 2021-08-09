import { Map, InfoWindow, GoogleApiWrapper, Polygon } from 'google-maps-react';
import React from 'react';
import geoData from '../Model/_GEODATA'


function MapContainer(props) {
    const defaultCenter = {
        lat: 33.06997875622593,
        lng: -116.60778304343944
    }

    const colors = ['red', 'yellow', 'green', 'blue']
    return (
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
                    onClick={() => console.log(data[0])}
                />
            ))}

        </Map>
    );

}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
})(MapContainer)