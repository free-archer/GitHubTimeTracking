import { Navbar } from 'flowbite-react';
import { Routes, Route, Link } from 'react-router-dom'
import Main from '../pages/Main';
import Settings from '../pages/Settings';
const logo = require('../lib/img/GitHub-Mark-32px.png')

const NavBar: React.FC = () => {

    return (
<>
            <Navbar
                fluid={true}
                rounded={true}
                color={"#FDF2F2"}
            >
            {/* <div className="bg-slate-600">                 */}
                <Link to={"/"} className="navbar-item">
                    <div className='flex items-center'>
                        <img
                            src={logo}
                            className="mr-3 h-6 sm:h-9"
                            alt="Flowbite Logo"
                        />
                        GitHub Time Tracking
                    </div>
                </Link>

                <Link to={"/settings"} >
                    Settings
                </Link>
                {/* </div> */}
            </Navbar>

            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
</>
    )
}

export default NavBar;