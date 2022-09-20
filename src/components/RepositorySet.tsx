import React, { useEffect, useState } from "react";
import { saveRepositoryName, getRepositoryName } from '../lib/localstore'

const RepositorySet:React.FC = () => {
  const [repositoryName, setRepositoryName] = useState<string>('')

  useEffect(() => {
    const name:string = getRepositoryName()
    setRepositoryName(name)
  }, []
  )

return (
    <div className="field is-grouped">
      <input
        value={repositoryName}
        onChange={(e) => {setRepositoryName(e.target.value)}} 
        className="input" 
        type="text" 
        placeholder="Insert a repository name"/>

        <button onClick={(e) => saveRepositoryName(repositoryName)} className="button is-info ml-3">Save</button>
    </div>
  )
}
  
export default RepositorySet;