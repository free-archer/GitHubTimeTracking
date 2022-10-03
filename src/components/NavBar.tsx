import {Routes, Route, Link} from 'react-router-dom'
import Main from '../pages/Main';
import Settings from '../pages/Settings';

const NavBar:React.FC  = () => {

    return (
        <>    
        <nav className="container-xl flex flex-row bg-sky-900 text-gray-100 text-xl p-5 w-full h-20 items-center">
               
            <Link to={"/"} className="ml-10 hover:text-blue-300 hover:border-b-2 hover:border-solid hover:border-blue-300 active:border-b-2 active:border-solid active:border-blue-300 ">
                GitHub Time Tracking
            </Link>

            <div className="grow"></div>

            <Link to={"/settings"} className="mr-10 hover:text-blue-300 hover:border-b-2 hover:border-solid hover:border-blue-300 active:border-b-2 active:border-solid active:border-blue-300 ">
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