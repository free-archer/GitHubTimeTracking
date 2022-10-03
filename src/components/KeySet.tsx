import React, { useEffect, useState } from "react";
import { saveGitHubKey, clearGitHubKey, getGitHubKey } from '../lib/localstore'

const KeySet:React.FC = () => {
  const [haskey, setHasKey] = useState<boolean>(false)
  const [gitHubKey, setGitHubKey] = useState<string>('')

  const saveKeyHandler = () => {
    if (gitHubKey !== '') {
      setHasKey(true)
      saveGitHubKey(gitHubKey)
    }
  }

  const clearGitHubKeyHandler = ()=> {
    setHasKey(false)
    clearGitHubKey()
    setGitHubKey('')
  }

  useEffect(() => {
    const key:string = getGitHubKey()
    setGitHubKey(key)
    setHasKey(key !== '')
  }, []
  )

return (
  <div className="flex flex-row items-center h-16 text-xl ml-5">

    <label className="p-2 mr-3">Key: </label>

      { !haskey && 
      <input
        onChange={(e) => {setGitHubKey(e.target.value)}} 
        className="px-3 rounded border border-gray-400 focus:bg-red-50" 
        type="text" 
        placeholder="Insert an app key"/>
      }

      { haskey && <p className="">The Key is set</p>}
        
        <button onClick={saveKeyHandler} className="border-gray-400 border ml-10 px-3 rounded-xl bg-green-500 text-white hover:bg-green-400">Save</button>
        <button onClick={clearGitHubKeyHandler} className="ml-5 px-3 border-gray-400 border rounded-xl bg-red-500 text-white hover:bg-red-400">Clear</button>
    </div>
  )
}
  
export default KeySet;