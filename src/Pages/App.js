import * as React from 'react'
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'

import HomePage from './HomePage'
import ComparisonPage from './ComparisonPage'
import ZipCodeContext from '../Contexts/zipCode'

export default function App() {

    const [selectedZipcode, setZipcode] = React.useState(null)


    return (
        <Router>
            <ZipCodeContext.Provider value={{ selectedZipcode, setZipcode }}>
                <Route exact path='/'><HomePage /></Route>
                <Route exact path='/compare'><ComparisonPage /></Route>
            </ZipCodeContext.Provider>
        </Router>
    )
}