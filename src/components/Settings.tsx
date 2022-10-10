import React, { useEffect, useState } from "react";
import { saveGitHubKey, clearGitHubKey, getGitHubKey, getUserName, getRepositoryName } from '../lib/localstore'

const Settings: React.FC = () => {
    const [haskey, setHasKey] = useState<boolean>(false)
    const [gitHubKey, setGitHubKey] = useState<string>('')
    const [userName, setUserName] = useState<string>('')
    const [repositoryName, setRepositoryName] = useState<string>('')

    useEffect(() => {
        const key: string = getGitHubKey()
        setGitHubKey(key)
        setHasKey(key !== '')

        const user_name: string = getUserName()
        setUserName(user_name)

        const repo_name: string = getRepositoryName()
        setRepositoryName(repo_name)

    }, []
    )

    const saveKeyHandler = () => {
        if (gitHubKey !== '') {
            setHasKey(true)
            saveGitHubKey(gitHubKey)
        }
    }

    const saveSettingsHandler = () => {
        if (gitHubKey !== '') {
            setHasKey(true)
            saveGitHubKey(gitHubKey)
        }
    }    

    const clearGitHubKeyHandler = () => {
        setHasKey(false)
        clearGitHubKey()
        setGitHubKey('')
    }

    return (
        <div className="bg-gray-200 flex flex-col">
            <div className="flex flex-row items-center h-16 text-xl ml-5">

                <label className="p-2 mr-3">Key: </label>

                {!haskey &&
                    <input
                        onChange={(e) => { setGitHubKey(e.target.value) }}
                        className="px-3 rounded border border-gray-400 focus:bg-red-50"
                        type="text"
                        placeholder="Insert an app key" />
                }

                {haskey && <p className="">The Key is set</p>}

                <button onClick={clearGitHubKeyHandler} className="ml-5 px-3 border-gray-400 border rounded-xl bg-red-500 text-white hover:bg-red-400">Clear</button>
            </div>

            <div className="flex flex-row bg-gray-200 items-center h-16 text-xl ml-5">
                <label className="p-2 mr-3">User: </label>
                <input
                    value={userName}
                    onChange={(e) => { setUserName(e.target.value) }}
                    className="ml-5 px-3 rounded border border-gray-400 focus:bg-red-50"
                    type="text"
                    placeholder="Insert a user name" />
            </div>

            <div className="flex flex-row bg-gray-200 items-center h-16 text-xl ml-5">

                <label className="p-2 mr-3">Repository: </label>

                <input
                    value={repositoryName}
                    onChange={(e) => { setRepositoryName(e.target.value) }}
                    className="px-3 rounded border border-gray-400 focus:bg-red-50"
                    type="text"
                    placeholder="Insert a repository name" />
            </div>

            <button onClick={saveKeyHandler} className="border-gray-400 border ml-10 mb-5 px-3 rounded-xl bg-green-500 text-white hover:bg-green-400">Save</button>            

        </div>


    )
}

export default Settings;