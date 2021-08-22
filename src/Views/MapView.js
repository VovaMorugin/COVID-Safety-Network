import { Map, InfoWindow, GoogleApiWrapper, Polygon } from 'google-maps-react';
import React, { useEffect, useState } from 'react';
import geoData from '../Model/GEODATA'
import CaseModal from './CaseModal'
import ZipCodeContext from '../Contexts/zipCode'
import zipCodeInfo from '../Model/ZIPCODES'
import { getDataForZipCode, getDataForHeatmap } from '../Model/APIManager'



function MapContainer(props) {

    const defaultCenter = {
        lat: 33.06997875622593,
        lng: -116.60778304343944
    }
    //Connects context
    const { selectedZipcode, setZipcode } = React.useContext(ZipCodeContext)
    const [worstInfectionRate, setWorstInfectionRate] = React.useState(0)
    const [infectionRatesByZipcode, setInfectionRatesByZipcode] = React.useState(null)
    const [data, setData] = useState(null)

    useEffect(() => {    
        getDataForZipCode(selectedZipcode)
            .then((result) => setData(result))
            .catch(() => console.log('error'))
    }, [selectedZipcode])

    useEffect(() => {
        getDataForHeatmap()
            .then((result) => {
                setWorstInfectionRate(result.worstInfectionRate)
                setInfectionRatesByZipcode(result.infectionRatesByZipcode)
            })
            .catch(() => console.log('error'))
    }, [])

    function getColor(zipCode) {
        var infectionRate = null
        if (infectionRatesByZipcode.hasOwnProperty(zipCode)) {
            infectionRate = infectionRatesByZipcode[zipCode]
        } else {
            for (const key in infectionRatesByZipcode) {
                if (key.includes(zipCode.toString())) {
                    infectionRate = infectionRatesByZipcode[key]
                    break
                }
            }
        }

        if (infectionRate < 0.2 * worstInfectionRate) {
            return '#0bd474'
        } else if (infectionRate < 0.4 * worstInfectionRate) {
            return '#ffc900'
        } else if (infectionRate < 0.6 * worstInfectionRate) {
            return '#ff9600'
        } else if (infectionRate < 0.8 * worstInfectionRate) {
            return '#d9002c'
        } else if (infectionRate > 0.8 * worstInfectionRate) {
            return '#790019'
        }

    }


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
                style={{ width: '80%', height: '80%' }}
                zoom={10}
                
                initialCenter={defaultCenter}
            >
                {infectionRatesByZipcode !== null && Object.entries(geoData).map((data, index) => (
                    <Polygon
                        key={index}
                        paths={data[1]}
                        strokeOpacity={0.8}
                        strokeWeight={2}
                        fillColor={getColor(data[0])}
                        strokeWeight={0}
                        fillOpacity={0.35}
                        onClick={handleOnClick(data[0])}
                    >

                    </Polygon>

                ))}

                {data !== null && <InfoWindow

                    position={selectedZipcode !== null ? zipCodeInfo[selectedZipcode].cityCenter : defaultCenter}
                    visible={selectedZipcode !== null ? true : false}
                    onClose={handleOnClose}
                >

                    <CaseModal data={data} />
                </InfoWindow>}

            </Map>

        </div>
    );

}

export default GoogleApiWrapper({
    apiKey: "AIzaSyAEzJ6VzdITMwC_iIJyp9Kt0IWKrzw7H60"
    // apiKey: (process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
})(MapContainer)