import React, { useEffect, useState } from "react";
import { IDBIssue } from "../types/dbissues";
import { setIssueTimeDB, toDay } from '../lib/localstore'
import { CSSProperties } from "react";

const editImg = require('../lib/img/Pencil-icon16.png')
const saveImg = require('../lib/img/Save-icon16.png')

const IssueItem:React.FC<IDBIssue>  = (props) => {
const [time, setTime] = useState<number>(props.curtime || 0)
const [intervalID, setIntervalID] = useState<NodeJS.Timer>()
const [started, setStarted] = useState<boolean>(false)
const [editedTime, setEditedTime] = useState<string>('00:00')
const [editMode, setEditMode] = useState<boolean>(false)

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

  const parseEditTime = (time:number):string => {
    const sTime = parseTime(time)

    return sTime.slice(0, -3)
  }

  const labelColor = (label_color:string):CSSProperties => {
    const bgcolor:string = '#'+label_color || '#FFF'

      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(bgcolor)
      if (!result) {
        return {}
      }
      
      const red = parseInt(result[1], 16)
      const green = parseInt(result[2], 16)
      const blue = parseInt(result[3], 16)

      let color = ''
      if ( 0.299 * red + 0.587 * green + 0.114 * blue > 127.5 ) {
        color = '#010101'
      } else {
        color = '#FFF'
      }
        
    return {
      color: color,
      backgroundColor: bgcolor,

    }
  }

  const saveEditedTime = (value:string) => {
    if (!value || value?.length != 5 ) {
      console.log("Entered incorrect value")
      return
    }
    const hours:string = value.slice(0, 2)
    const minutes:string = value.slice(3, 5)

    const newtime:number = +hours*3600 + +minutes*60
  }
  
  const editTimeHelper = () => {
    debugger
    if (!editMode) {
      setEditMode(!editMode)
      setEditedTime(parseEditTime(time))
    } else {
      setEditMode(!editMode)

      if (!editedTime || editedTime.length != 5 ) {
        console.log("Entered incorrect value")
        return
      }
      const hours:string = editedTime.slice(0, 2)
      const minutes:string = editedTime.slice(3, 5)
  
      const newtime:number = +hours*3600 + +minutes*60

      setTime((state) => newtime)

    }
  }
    
  return (
    
    <div className="columns _issues">

      <div className="column column is-four-fifths py-1 height-min title-text mt-1" >

        <a className="_issue_text" href={props.url}>{props.title} </a>
        
        {props.labels.map((label) => (
          <button 
            className="_label"
            style={labelColor(label.color)} > 
            {label.name}
          </button>
        )) 
        }

      </div>

      <div className="column py-1">

        {started === false
          ? <button onClick={startTimer} className="_btntimer button is-success is-focused small height-min p-2">{parseTime(time)}</button>
          : <button onClick={stopTimer} className="_btntimer button is-danger is-focused small height-min p-2">{parseTime(time)}</button>
        }

        <img className="ml-2" src={editMode ? saveImg : editImg} onClick={editTimeHelper}></img>

        {editMode && 
          <input
            value={editedTime}
            onChange={(e) => {setEditedTime(e.target.value)}} 
            className="_edittime input ml-3" 
            type="text" 
            placeholder="00:00"
          />
        }
      </div>

    </div>
    
  )
}

export default IssueItem;