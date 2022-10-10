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
    <div className="flex flex-row bg-gray-200 items-center h-16 text-xl ml-5">

      <label className="p-2 mr-3">Repository: </label>

      <input
        value={repositoryName}
        onChange={(e) => {setRepositoryName(e.target.value)}} 
        className="px-3 rounded border border-gray-400 focus:bg-red-50" 
        type="text" 
        placeholder="Insert a repository name"/>

        <button onClick={(e) => saveRepositoryName(repositoryName)} className="border-green-800 border ml-10 px-3 rounded-xl bg-green-500 text-white hover:bg-green-400">Save</button>
        
    </div>
  )
}
  
export default RepositorySet;