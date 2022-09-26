import {Routes, Route, Link} from 'react-router-dom'
import Main from '../pages/Main';
import Settings from '../pages/Settings';

const NavBar:React.FC  = () => {

    return (
        <>
        <nav className="navbar is-info mb-5" role="navigation" aria-label="main navigation">
            <div className="navbar-menu">
                <div className="navbar-start">
                
                    <Link to={"/"} className="navbar-item">
                        GitHub Time Tracking
                    </Link>

                    <Link to={"/settings"} className="navbar-item">
                        Settings
                    </Link>
                </div>
            </div>
        </nav>

        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/settings" element={<Settings />} />
        </Routes>
        </>
    )
}

export default NavBar;