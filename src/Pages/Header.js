import React, { useState } from 'react'
import { useAuth } from '../Contexts/AuthContext'
import { Link } from 'react-router-dom'

export default function Header() {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    async function handleLogOut() {
        setError('')
        try {
            await logout()
        } catch {
            setError('Failed to log out')
        }
    }



    return (
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                    <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"></svg>
                </a>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><a href="/" className="nav-link px-2 link-secondary">Home</a></li>
                    <li><a href="/compare" className="nav-link px-2 link-dark">Compare</a></li>
                </ul>

                <div className="col-md-3 text-end">
                    {currentUser !== null
                        ? <><Link to='update'>{currentUser.email}</Link> <a href="/" type="button" className="btn btn-outline-primary me-2" onClick={handleLogOut}>Log Out</a></>
                        : <>
                            <a href="/login" type="button" className="btn btn-outline-primary me-2">Login</a>
                            <a href="/signup" type="button" className="btn btn-primary">Sign-up</a>
                        </>

                    }

                </div>
            </header>
        </div>
    )
}