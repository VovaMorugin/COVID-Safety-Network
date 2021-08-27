import React from 'react'
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import HomePage from './HomePage'
import ComparisonPage from './ComparisonPage'
import ZipCodeContext from '../Contexts/zipCode'
import Header from './Header'
import Signup from './Signup'
import Login from './Login'
import { AuthProvider } from '../Contexts/AuthContext'
import ForgotPassword from './ForgotPassword'
import UpdateProfile from './UpdateProfile'
import geoData from '../Model/GEODATA';
import zipCodeInfo from '../Model/ZIPCODES'
export default function App() {


    let zipcodes = Object.entries(geoData).map((data, index) =>
        data[0]
    )

    let options = Object.entries(geoData).map((data, index) => {

        return { value: `${data[0]}`, label: `${data[0]} ${zipCodeInfo[data[0]].cityName}` }
    }


    )
    console.log(zipCodeInfo[91901].cityName, 'object')
    const [selectedZipcode, setZipcode] = React.useState(null)
    return (
        <ZipCodeContext.Provider value={{ selectedZipcode, setZipcode }}>
            <AuthProvider>

                <Router>

                    <Route exact path={['/', '/compare']} component={Header} />
                    <Route exact path='/'><HomePage zipcodes={zipcodes} /></Route>
                    <Route exact path='/compare'><ComparisonPage data={zipcodes} options={options} /></Route>
                    <Route path='/forgot-password' component={ForgotPassword} />
                    <Route path='/signup' component={Signup} />
                    <Route path='/login' component={Login} />
                    <Route path='/update' component={UpdateProfile} />

                </Router>
            </AuthProvider>
        </ZipCodeContext.Provider>
    )
}