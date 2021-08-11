import * as React from 'react'
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'

import HomePage from './HomePage'
import ComparisonPage from './ComparisonPage'


export default function App(){
    return (
        <Router>
            <Route exact path='/'><HomePage/></Route>
            <Route exact path='/compare'><ComparisonPage/></Route>
        </Router>
    )
}