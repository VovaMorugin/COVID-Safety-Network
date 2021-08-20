import React from 'react'
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomePage from './HomePage'
import ComparisonPage from './ComparisonPage'
import ZipCodeContext from '../Contexts/zipCode'
import Header from './Header'
import Signup from './Signup'
import Login from './Login'
import { AuthProvider } from '../Contexts/AuthContext'
import ForgotPassword from './ForgotPassword'
import UpdateProfile from './UpdateProfile'
export default function App() {

    const [selectedZipcode, setZipcode] = React.useState(null)
    return (
        <AuthProvider>

            <Router>
                <ZipCodeContext.Provider value={{ selectedZipcode, setZipcode }}>
                    <Route exact path={['/', '/compare']} component={Header} />
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/compare' component={ComparisonPage} />

                    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                        <div className='w-100' style={{ maxWidth: '400px' }}>
                            <Route path='/forgot-password' component={ForgotPassword} />
                            <Route path='/signup' component={Signup} />
                            <Route path='/login' component={Login} />
                            <Route path='/update' component={UpdateProfile} />
                        </div>
                    </Container>

                </ZipCodeContext.Provider>
            </Router>
        </AuthProvider>

    )
}