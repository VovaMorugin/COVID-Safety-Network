import React, { useRef, useState } from "react"
import { useAuth } from '../../Contexts/AuthContext'
import { Link, useHistory } from "react-router-dom"

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }
        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError("Failed to create an account")
        }

        setLoading(false)
    }

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className='w-100' style={{ maxWidth: '400px' }}>
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4">Sign Up</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group" id="email">
                                <label className="form-label">Email</label>
                                <input className="form-control" type="email" ref={emailRef} required />
                            </div>
                            <div className="form-group" id="password">
                                <label className="form-label">Password</label>
                                <input className="form-control" type="password" ref={passwordRef} required />
                            </div>
                            <div className="form-group" id="password-confirm">
                                <label className="form-label">Password Confirmation</label>
                                <input className="form-control" type="password" ref={passwordConfirmRef} required />
                            </div>
                            <button type="submit" disabled={loading} class="w-100 btn btn-primary mt-4">Sign Up</button>
                        </form>
                    </div>
                </div>
                <div className="w-100 text-center mt-2">
                    Already have an account? <Link to="/login">Log In</Link>
                </div>
            </div>
        </div>
    )
}