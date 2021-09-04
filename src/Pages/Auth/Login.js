import React, { useRef, useState } from "react"
import { useAuth } from '../../Contexts/AuthContext'
import { Link, useHistory } from "react-router-dom"

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.goBack()
        } catch {
            setError("Failed to sign in")
        }

        setLoading(false)
    }

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className='w-100' style={{ maxWidth: '400px' }}>
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4">Log In</h2>
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

                            <button type="submit" disabled={loading} className="w-100 btn btn-primary mt-4">Log In</button>
                        </form>
                        <div className="w-100 text-center mt-3">
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>
                    </div>
                </div>
                <div className="w-100 text-center mt-2">
                    Need an account? <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </div>

    )
}