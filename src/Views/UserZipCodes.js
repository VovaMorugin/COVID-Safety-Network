import { useContext, useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useAuth } from "../Contexts/AuthContext"
import ZipCodeContext from '../Contexts/zipCode'

export default function UserZipCodes() {
    const { selectedZipcode, setZipcode } = useContext(ZipCodeContext)
    const { userZipCodes, deleteZipCode, addZipCode, currentUser } = useAuth()
    const [alreadySaved, setAlreadySaved] = useState(false)

    useEffect(() => {
        console.log(alreadySaved)
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

    const handleLoad = (zipCode) => {
        setZipcode(zipCode)
    }
    return (
        <div>
            {currentUser != null && selectedZipcode != null && !alreadySaved &&
                <Button variant="primary" onClick={handleSave}>Add to favourites ({selectedZipcode})</Button>}

            {userZipCodes && currentUser != null && selectedZipcode != null && alreadySaved &&
                <Button variant="danger" onClick={handleDelete}>Remove from favourites ({selectedZipcode})</Button>}

            {userZipCodes != null && Object.keys(userZipCodes).length > 0 ?
                Object.keys(userZipCodes).length === 1 ? <div>
                    Favorite zip codes:
                <Button variant="outline-primary" style={{ 'width': '100%' }} onClick={() => handleLoad(Object.values(userZipCodes)[0])}>{Object.values(userZipCodes)[0]}</Button>
                </div>
                    :
                    <div>
                        Favorite zip codes:
                         <select className="ui fluid search dropdown"
                            value={selectedZipcode}
                            onInput={(e) => handleLoad(e.target.value)}

                        >
                            {Object.keys(userZipCodes).map((key, index) =>
                                <option key={index} zipcodeid={key}>
                                    {userZipCodes[key]}
                                </option>
                            )}
                        </select>
                    </div> : null}
        </div>

    )
}
