import {Routes, Route, Link} from 'react-router-dom'
import Main from '../pages/Main';
import Settings from '../pages/Settings';

const NavBar:React.FC  = () => {

    return (
        <>    
        <nav className="container-xl flex bg-sky-900 text-gray-100 text-xl p-5">
               
            <Link to={"/"} className="grow ">
                GitHub Time Tracking
            </Link>

            <Link to={"/settings"} className="">
                Settings
            </Link>
        </nav>

        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/settings" element={<Settings />} />
        </Routes>
        </>
    )
}

export default NavBar;