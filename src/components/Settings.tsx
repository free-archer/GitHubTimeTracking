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
        <div className="bg-gray-200 flex flex-row w-100">
            <div className="basis-48 ">
                <label className="flex h-10 p-2 mr-3">Key: </label>
                <label className="flex p-2 mr-3">User: </label>
                <label className="flex p-2 mr-3">Repository: </label>
            </div>

            <div className="basis-80 ">
                <div className="flex items-center h-10">

                    {!haskey &&
                        <input
                            onChange={(e) => { setGitHubKey(e.target.value) }}
                            className="rounded border border-gray-400 focus:bg-red-50"
                            type="text"
                            placeholder="Insert an app key" />
                    }

                    {haskey && <p className="">The Key is set</p>}

                </div>

                <div className="flex items-center h-10">

                    <input
                        value={userName}
                        onChange={(e) => { setUserName(e.target.value) }}
                        className="rounded border border-gray-400 focus:bg-red-50"
                        type="text"
                        placeholder="Insert a user name" />
                </div>

                <div className="flex items-center h-10">
                    <input
                        value={repositoryName}
                        onChange={(e) => { setRepositoryName(e.target.value) }}
                        className="rounded border border-gray-400 focus:bg-red-50"
                        type="text"
                        placeholder="Insert a repository name" />
                </div>

            </div>

            <div className="basis-20 ">
                <button onClick={clearGitHubKeyHandler} className="items-center h-10 px-3 border-gray-400 border rounded-xl bg-red-500 text-white hover:bg-red-400">Clear</button>
                <div className="flex items-center h-10"></div>
                <div className="flex items-center h-10"></div>
                <button onClick={saveSettingsHandler} className="items-center h-10 px-8 border-gray-400 border mb-5 rounded-xl bg-green-500 text-white hover:bg-green-400">Save</button>
            </div>

        </div>
    )
}

export default Settings;