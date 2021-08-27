import { useContext, useState, useEffect } from 'react'
import { useAuth } from "../Contexts/AuthContext"
import ZipCodeContext from '../Contexts/zipCode'
import zipCodeInfo from '../Model/ZIPCODES'
export default function UserZipCodes() {
    const { selectedZipcode, setZipcode } = useContext(ZipCodeContext)
    const { userZipCodes, deleteZipCode, addZipCode, currentUser } = useAuth()
    const [alreadySaved, setAlreadySaved] = useState(false)

    useEffect(() => {
        for (const id in userZipCodes) {
            if (userZipCodes[id] == selectedZipcode) {
                setAlreadySaved(true)
                break
            }
            setAlreadySaved(false)
        }
    }, [userZipCodes, selectedZipcode])


    const handleSave = () => {
        addZipCode(selectedZipcode)
    }

    const handleDelete = () => {
        let zipCodeId = null
        for (const key in userZipCodes) {
            console.log(userZipCodes[key])
            if (userZipCodes[key] == selectedZipcode) {
                zipCodeId = key
            }
        }
        if (zipCodeId !== null) {
            deleteZipCode(zipCodeId)
        }
        setAlreadySaved(false)
    }

    const handleLoad = (target) => {

        setZipcode(target.options[target.selectedIndex].getAttribute('zipcode'))
    }
    return (
        <div className="d-grid">
            {currentUser != null && selectedZipcode != null && !alreadySaved &&
                <button type="button" className="btn btn-primary btn-block" onClick={handleSave}>Add to favourites ({selectedZipcode})</button>}

            {userZipCodes && currentUser != null && selectedZipcode != null && alreadySaved &&
                <button type="button" className="btn btn-danger btn-block" onClick={handleDelete}>Remove from favourites ({selectedZipcode})</button>}

            {userZipCodes != null && Object.keys(userZipCodes).length > 0 ?

                <>

                    <select className="ui fluid search dropdown"
                        value='Saved locations:'
                        onInput={(e) => handleLoad(e.target)}
                    >
                        <option key='-1'>Saved locations:</option>
                        {Object.keys(userZipCodes).map((key, index) => {
                            console.log(key)
                            return <option key={index} zipcode={userZipCodes[key]}>
                                {`${userZipCodes[key]} ${zipCodeInfo[userZipCodes[key]].cityName}`}
                            </option>
                        })}
                    </select>
                </> : null}
        </div>

    )
}