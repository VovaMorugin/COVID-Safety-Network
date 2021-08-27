import { useAuth } from '../Contexts/AuthContext'

export default function Header() {

    const { currentUser, logout } = useAuth()
    async function handleLogOut() {
        await logout()
    }

    return (
        <nav className="navbar navbar-expand-sm bg-white navbar-light border-bottom">
            <div className="container-fluid px-5">
                <div className="navbar-brand">Covid Safety Network</div>

                <button className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navmenu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-between" id="navmenu">
                    <div className="navbar-nav">
                        <a href="/" className="nav-item nav-link text-primary">Home</a>
                        <a href="/compare" className="nav-item nav-link text-primary">Compare</a>
                    </div>
                    {currentUser !== null
                        ? <div className="navbar-nav">
                            <div className="nav-item dropdown">
                                <div className="nav-link dropdown-toggle text-primary" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-person-circle"> </i>
                                    {currentUser.email}
                                </div>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item text-primary" href="/update"><i className="bi bi-gear"> </i>Settings</a></li>

                                    <li><hr className="dropdown-divider" /></li>
                                    <li><div className="dropdown-item text-primary" onClick={handleLogOut}><i className="bi bi-box-arrow-left"> </i>Log Out</div></li>
                                </ul>


                            </div>
                        </div>
                        : <div className="navbar-nav">
                            <a href="/login" className="nav-item nav-link text-primary"><i className="bi bi-box-arrow-in-right"> </i>Login </a>
                            <a href="/signup" className="nav-item nav-link text-primary"><i className="bi bi-person-plus-fill"> </i>Sign up </a>
                        </div>}
                </div>
            </div>
        </nav>
    )
}