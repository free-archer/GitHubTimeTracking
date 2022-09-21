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
    <div className="field is-grouped">
      <label className="label p-2 mr-3">User: </label>
      <input
        value={userName}
        onChange={(e) => {setUserName(e.target.value)}} 
        className="input" 
        type="text" 
        placeholder="Insert a user name"/>

        <button onClick={(e) => saveUserName(userName)} className="button is-info ml-3">Save</button>
    </div>
  )
}

export default UserSet