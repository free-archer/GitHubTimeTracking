import { useState } from "react";
import KeySet from "../components/KeySet";
import RepositorySet from "../components/RepositorySet";
import UserSet from "../components/UserSet";

const Settings:React.FC  = () => {

    return (
        <div className="bg-gray-200 ">
            <div className="block">
                <KeySet />
            </div>
            <div className="block">
                <UserSet />
            </div>
            <div className="block">
                <RepositorySet />
            </div>
        </div>
    )
}

export default Settings;