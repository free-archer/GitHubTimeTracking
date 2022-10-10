import React, { useEffect, useState } from "react";
import { clearGitHubKey, saveSettings, getSettings } from '../lib/localstore'
import { ISettings } from '../types/settings'

const Settings: React.FC = () => {
    const [haskey, setHasKey] = useState<boolean>(false)
    const [gitHubKey, setGitHubKey] = useState<string>('')
    const [userName, setUserName] = useState<string>('')
    const [repositoryName, setRepositoryName] = useState<string>('')

    useEffect(() => {
        const settings:ISettings = getSettings()

        setGitHubKey(settings.key)
        setHasKey(settings.key !== '')

        setUserName(settings.username)
        setRepositoryName(settings.reponame)
    }, []
    )

    const saveSettingsHandler = () => {
        if (gitHubKey !== '') {
            setHasKey(true)
        }
        const settings:ISettings = {
            key: gitHubKey,
            username: userName,
            reponame: repositoryName
        }

        saveSettings(settings)
    }

    const clearGitHubKeyHandler = () => {
        setHasKey(false)
        clearGitHubKey()
        setGitHubKey('')
    }

    return (
        <div className="bg-gray-200 flex flex-row w-100">
            <div className="basis-48 ">
                <label className="flex h-8 p-2 mr-3">Key: </label>
                <label className="flex p-2 mr-3">User: </label>
                <label className="flex p-2 mr-3">Repository: </label>
            </div>

            <div className="basis-80 ">
                <div className="flex items-center h-8">

                    {!haskey &&
                        <input
                            onChange={(e) => { setGitHubKey(e.target.value) }}
                            className="rounded border border-gray-400 focus:bg-red-50"
                            type="text"
                            placeholder="Insert an app key" />
                    }

                    {haskey && <p className="">The Key is set</p>}

                </div>

                <div className="flex items-center h-8">

                    <input
                        value={userName}
                        onChange={(e) => { setUserName(e.target.value) }}
                        className="rounded border border-gray-400 focus:bg-red-50"
                        type="text"
                        placeholder="Insert a user name" />
                </div>

                <div className="flex items-center h-8">
                    <input
                        value={repositoryName}
                        onChange={(e) => { setRepositoryName(e.target.value) }}
                        className="rounded border border-gray-400 focus:bg-red-50"
                        type="text"
                        placeholder="Insert a repository name" />
                </div>

            </div>

            <div className="basis-20">
                <button onClick={clearGitHubKeyHandler} className="flex h-8 px-3 border-gray-400 border rounded-xl bg-red-500 text-white hover:bg-red-400">Clear key</button>
                <div className="flex h-8"></div>
                <div className="flex h-8"></div>
                <button onClick={saveSettingsHandler} className="h-8 px-8 border-gray-400 border mb-5 rounded-xl bg-green-500 text-white hover:bg-green-400">Save</button>
            </div>

        </div>
    )
}

export default Settings;