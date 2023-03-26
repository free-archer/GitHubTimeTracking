import React, { useContext } from "react";
import {Routes, Route, Link} from 'react-router-dom'
import Main from '../pages/Main';
import SettingsPage from '../pages/SettingsPage';
import { SettingsContext } from "../lib/SettingsContext";

const logo = require('../lib/img/GitHub-Mark-32px.png')

const NavBar:React.FC  = () => {
    const settingsContext = useContext(SettingsContext)

    const githubUrl = `https://github.com/${settingsContext.settings.username}/${settingsContext.settings.reponame}/issues`

    return (
        <>    
        <nav className="container-xl flex flex-row bg-[#3B8BEA] text-[#c3dbf5] text-xl p-5 w-full h-20 items-center">

            <a href={githubUrl} target="_blank">
                <img className="ml-3 h-10" src={logo}/>
            </a>

            <Link to={"/"} className="flex ml-10 hover:text-[#e6e3d4] hover:border-b-2 hover:border-solid hover:border-[#e6e3d4] active:border-b-2 active:border-solid active:border-blue-300 ">
                GitHub Time Tracking
            </Link>

            <a href={githubUrl+"/new/choose"} target="_blank" className="flex ml-10 hover:text-[#e6e3d4] hover:border-b-2 hover:border-solid hover:border-[#e6e3d4] active:border-b-2 active:border-solid active:border-blue-300">
                New Issue
            </a>                    

            <div className="grow"></div>

            <Link to={"/settings"} className="mr-10 hover:text-[#e6e3d4] hover:border-b-2 hover:border-solid hover:border-[#e6e3d4] active:border-b-2 active:border-solid active:border-blue-300 ">
                Settings
            </Link>
        </nav>

        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/settings" element={<SettingsPage />} />
        </Routes>
        </>
    )
}

export default NavBar;