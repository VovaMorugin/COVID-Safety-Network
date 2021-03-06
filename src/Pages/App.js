import React from 'react'
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import HomePage from './HomePage'
import ComparisonPage from './ComparisonPage'
import ZipCodeContext from '../Contexts/zipCode'
import Header from './Header'
import Signup from './Auth/Signup'
import Login from './Auth/Login'
import { AuthProvider } from '../Contexts/AuthContext'
import ForgotPassword from './Auth/ForgotPassword'
import UpdateProfile from './Auth/UpdateProfile'
import geoData from '../Model/GEODATA';
import zipCodeInfo from '../Model/ZIPCODES'
import Footer from '../Pages/Footer'

export default function App() {


    let options = Object.entries(geoData).map((data, index) => {
        return { value: `${data[0]}`, label: `${data[0]} ${zipCodeInfo[data[0]].cityName}` }
    })

    const [selectedZipcode, setZipcode] = React.useState(null)
    return (
        <ZipCodeContext.Provider value={{ selectedZipcode, setZipcode }}>
            <AuthProvider>
                <Router>
                        <Route exact path={['/', '/compare']} component={Header} />
                        <Route exact path='/'><HomePage options={options} /></Route>
                        <Route exact path='/compare'><ComparisonPage options={options} /></Route>
                        <Route path='/forgot-password' component={ForgotPassword} />
                        <Route path='/signup' component={Signup} />
                        <Route path='/login' component={Login} />
                        <Route path='/update' component={UpdateProfile} />
                        <Route exact path={['/', '/compare']} component={Footer} />
                </Router>
            </AuthProvider>
        </ZipCodeContext.Provider>
    )
}