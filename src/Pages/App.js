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

export default function App() {


    let zipcodes = Object.entries(geoData).map((data, index) =>
        data[0]
    );

    const [selectedZipcode, setZipcode] = React.useState(null)
    return (
        <ZipCodeContext.Provider value={{ selectedZipcode, setZipcode }}>
            <AuthProvider>

                <Router>

                    <Route exact path={['/', '/compare']} component={Header} />
                    <Route exact path='/'><HomePage zipcodes={zipcodes} /></Route>
                    <Route exact path='/compare'><ComparisonPage data={zipcodes} /></Route>
                    <Route path='/forgot-password' component={ForgotPassword} />
                    <Route path='/signup' component={Signup} />
                    <Route path='/login' component={Login} />
                    <Route path='/update' component={UpdateProfile} />

                </Router>
            </AuthProvider>
        </ZipCodeContext.Provider>
    )
}