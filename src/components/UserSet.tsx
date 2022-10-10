import React, { useEffect, useState } from "react";
import { saveUserName, getUserName } from '../lib/localstore'

const UserSet:React.FC = () => {
  const [userName, setUserName] = useState<string>('')

  useEffect(() => {
    const name:string = getUserName()
    setUserName(name)
  }, []
  )

return (
    <div className="flex flex-row bg-gray-200 items-center h-16 text-xl ml-5">
      <label className="p-2 mr-3">User: </label>
      <input
        value={userName}
        onChange={(e) => {setUserName(e.target.value)}} 
        className="ml-5 px-3 rounded border border-gray-400 focus:bg-red-50" 
        type="text" 
        placeholder="Insert a user name"/>

        <button onClick={(e) => saveUserName(userName)} className="border-green-800 border ml-10 px-3 rounded-xl bg-green-500 text-white hover:bg-green-400">Save</button>
    </div>
  )
}

export default UserSet