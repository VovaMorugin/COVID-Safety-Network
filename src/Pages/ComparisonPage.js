import { useState, useEffect } from 'react'
import { getDataForGraph } from '../utils/utils'
import ComparisonGraph from '../Views/ComparisonGraph'
import { useAuth } from "../Contexts/AuthContext"
import Select from 'react-select'
import zipCodeInfo from '../Model/ZIPCODES'

export default function ComparisonPage(props) {
    const [data, setData] = useState(null)
    const { userZipCodes, currentUser } = useAuth()
    const [selectedLocations, setSelectedLocations] = useState(null)
    const [favourites, setFavourites] = useState([])


    useEffect(() => {
        if (userZipCodes !== null && userZipCodes !== 'undefined' && currentUser != null) {
            setFavourites(Object.entries(userZipCodes).map((data, index) => {
                return { value: `${data[1]}`, label: `${data[1]} ${zipCodeInfo[data[1]].cityName}` }
            }))
            
        } else {
            setFavourites([])
        }
    }, [userZipCodes, currentUser])


    useEffect(() => {
        if (selectedLocations != null) {
            getDataForGraph(selectedLocations)
                .then((data) => {
                    setData(data)
                })
        }
    }, [selectedLocations])

    //removes user's favourites from main list of all locations to avoid duplicates
    let filteredOptions = props.options.filter(o1 => !favourites.some(o2 => o1.value === o2.value));

    const options = [
        {
            label: 'Favourites',
            options: favourites
        },
        {
            label: 'All locations',
            options: filteredOptions
        }
    ]

    return (

        <div className="container my-5">
            <div className="d-flex flex-column">
                <div className="mb-5">
                    {/* put graph here */}
                    <Select options={options} isMulti={true} onChange={(values) => setSelectedLocations(values)} />
                </div>
                <div className="d-flex">
                    {/* put graph here */}
                    <ComparisonGraph data={data} selectedLocations={selectedLocations} />
                </div>
            </div>
        </div>
    )
}