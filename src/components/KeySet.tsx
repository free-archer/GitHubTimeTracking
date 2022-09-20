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
  <div className="field is-grouped">
      { !haskey && 
      <input
        onChange={(e) => {setGitHubKey(e.target.value)}} 
        className="input" 
        type="text" 
        placeholder="Insert an app key"/>
      }

      { haskey && <p className="p-3">The Key is set</p>}
        
        <button onClick={saveKeyHandler} className="button is-info ml-3">Save</button>
        <button onClick={clearGitHubKeyHandler} className="button is-danger ml-3">Clear</button>
    </div>
  )
}
  
export default KeySet;