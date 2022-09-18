import React, { useEffect, useState } from "react";
import { IDBIssue } from "../types/dbissues";
import { setIssueTimeDB, toDay } from '../lib/localstore'
import { ILabel } from "../types/issues";
import { CSSProperties } from "react";

const IssueItem:React.FC<IDBIssue>  = (props) => {
  const [time, setTime] = useState<number>(props.curtime || 0)
  const [intervalID, setIntervalID] = useState<NodeJS.Timer>()
  const [started, setStarted] = useState<boolean>(false)

  // useEffect(() => {

  //   setTime(state => (() =>( || 0))
  // })
  
  useEffect(() => {
    if (time !== 0) {
      setIssueTimeDB(props.id, started, time)
    }
  }, [time, started])

  const startTimer = () => {
    const curTime = new Date()

    const interval = Timer(curTime)

    setIntervalID(interval)

    setStarted(state => true)
  }

  const stopTimer = () => {
    setStarted(state => false)

    clearInterval(intervalID)
  }

  const Timer = (oldTime:Date) => {
    const interval = setInterval(
      () => {
            setTime((state) => {
              const curTime = new Date()
              const delta:number = curTime.getTime() - oldTime.getTime()

              return time+delta/1000
            })

        },
     800)

    return interval
  }  


  const parseTime = (time:number):string => {
    const hours = Math.trunc(time / 3600)
    const minutes = Math.trunc(time / 60 % 60)
    const seconds = Math.trunc(time % 60)

    return (`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
  }

  const labelColor = ():CSSProperties => {
    const bgcolor:string = '#'+props.label?.color || '#FFF'

    return {
      border: '1px',
      borderColor: bgcolor,
      borderStyle: "solid"
    }
  }
  
  return (
    
    <div className="columns _issues">

      <div className="column column is-four-fifths py-1 height-min title-text mt-1" style={labelColor()} >
        <a href={props.url}>{props.title} </a>
      </div>

      <div className="column py-1">

        {started === false
          ? <button onClick={startTimer} className="_btntimer button is-success is-focused small height-min p-2">{parseTime(time)}</button>
          : <button onClick={stopTimer} className="_btntimer button is-danger is-focused small height-min p-2">{parseTime(time)}</button>
        }

        <button className="_btntimer button is-link is-outlined small height-min p-2 ml-2">{parseTime(props.total)}</button>
      </div>

    </div>
    
  )
}

export default IssueItem;