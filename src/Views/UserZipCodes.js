import { useContext, useState, useEffect } from 'react'
import { ListGroup, Button } from 'react-bootstrap'
import { useAuth } from "../Contexts/AuthContext"
import ZipCodeContext from '../Contexts/zipCode'

export default function UserZipCodes() {
    const { selectedZipcode, setZipcode } = useContext(ZipCodeContext)
    const { userZipCodes, deleteZipCode, addZipCode } = useAuth()
    const [alreadySaved, setAlreadySaved] = useState(false)

    useEffect(() => {
        console.log(userZipCodes)
        for (const id in userZipCodes) {
            if (userZipCodes[id] == selectedZipcode) {
                setAlreadySaved(true)
                break
            }
            setAlreadySaved(false)
        }
    }, [userZipCodes, selectedZipcode])


    const handleOnClick = () => {
        addZipCode(selectedZipcode)
    }
    return (
        <div>
            {selectedZipcode != null && <Button variant="primary" disabled={alreadySaved} onClick={handleOnClick}>Save selected zipcode ({selectedZipcode})</Button>}
            {userZipCodes != null && Object.keys(userZipCodes).length > 0 ?
                <div> Saved Zip codes:
                    <ListGroup>
                        {Object.keys(userZipCodes).map(function (key, index) {
                            return <ListGroup.Item key={index}>
                                <Button style={{ 'width': '90%' }} variant="light" size="sm" onClick={() => setZipcode(userZipCodes[key])}>{userZipCodes[key]}</Button>
                                <Button style={{ 'width': '10%' }} className="float-end" size="sm" variant="outline-danger" onClick={() => deleteZipCode(userZipCodes[key])}>x</Button>
                            </ListGroup.Item>

                        })}

                    </ListGroup>
                </div> : null}
        </div>

    )
}
