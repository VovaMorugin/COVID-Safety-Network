import React, { useRef, useState } from "react"
import { useAuth } from '../../Contexts/AuthContext'
import { Link, useHistory } from "react-router-dom"

export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        const promises = []
        setLoading(true)
        setError("")

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises)
            .then(() => {
                history.push("/")
            })
            .catch(() => {
                setError("Failed to update account")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className='w-100' style={{ maxWidth: '400px' }}>
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4">Update Profile</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group" id="email">
                                <label className="form-label">Email</label>
                                <input className="form-control" type="email" ref={emailRef} required defaultValue={currentUser.email} />
                            </div>

                            <div className="form-group" id="password">
                                <label className="form-label">Password</label>
                                <input className="form-control" type="password" ref={passwordRef} required placeholder="Leave blank to keep the same" />
                            </div>
                            <div className="form-group" id="password-confirm">
                                <label className="form-label">Password Confirmation</label>
                                <input className="form-control" type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same" />
                            </div>
                            <button type="submit" disabled={loading} class="w-100 btn btn-primary mt-4">Update</button>
                        </form>
                    </div>
                </div>
                <div className="w-100 text-center mt-2">
                    <Link to="/">Cancel</Link>
                </div>
            </div>
        </div>
    )
}