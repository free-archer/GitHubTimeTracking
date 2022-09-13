import React, { useEffect, useState } from "react";
import { IIssue } from "../types/issues";
import { setIssueTimeDB, getIssueTimeDB } from '../lib/localstore'
import internal from "stream";

const IssueItem:React.FC<IIssue>  = (props) => {
  const [time, setTime] = useState<number>(0)
  const [intervalID, setIntervalID] = useState<NodeJS.Timer>()
  const [started, setStarted] = useState<boolean>(false)

  useEffect(() => {
    setIssueTimeDB(props.id, time)
  }, [time])

  const issue_time = getIssueTimeDB(props.id)

  const startTimer = () => {
    const intervalID = setInterval(() => {

    setIntervalID(intervalID)
      
    setTime((state) => (state + 1))

    }, 
    1000)

    setStarted(true)
    
  }

  const stopTimer = () => {

    clearInterval(intervalID)
    
    setStarted(false)
    
  }
  
    return (
    
    <div className="columns">

      <div className="column column is-four-fifths py-1 height-min title-text ">
        {props.id} : {props.title}
      </div>

      <div className="column py-1">
        <button onClick={startTimer} className="button is-success is-focused small height-min">{time} Start</button>
        <button onClick={stopTimer} className="button is-error is-focused small height-min ml-1">{time} Stop</button>
      </div>

    </div>
    
  )
}

export default IssueItem;