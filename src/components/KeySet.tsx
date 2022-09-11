import React, { useEffect, useState } from "react";
import { saveGitHubKey, clearGitHubKey } from '../lib/localstore'

const KeySet:React.FC<{gitHubKey:string}> = (props) => {
  const [haskey, setHasKey] = useState<boolean>(false)

  const saveKeyHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    saveGitHubKey(event.currentTarget.value)
    setHasKey(true)
  }

  const clearGitHubKeyHandler = ()=> {
    setHasKey(false)
    clearGitHubKey()
  }

  useEffect(() => {
    setHasKey((state) => (props.gitHubKey !== '' || haskey)) 
   }, [haskey])

return (
    <div className="flex">

      { !haskey && 
      <input
        onChange={saveKeyHandler} 
        className="input" 
        type="text" 
        placeholder="Insert an app key"/>
      }
        
        {haskey && <a onClick={clearGitHubKeyHandler}>Clear key</a>}
    </div>
  )
}
  
export default KeySet;