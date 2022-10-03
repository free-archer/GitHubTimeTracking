import React, { useEffect, useState } from "react";
import { IDBIssue } from "../types/dbissues";
import { setIssueTimeDB, toDay } from '../lib/localstore'
import { CSSProperties } from "react";

const editImg = require('../lib/img/Pencil-icon16.png')
const saveImg = require('../lib/img/Save-icon16.png')

const IssueItem: React.FC<IDBIssue> = (props) => {
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

  const Timer = (oldTime: Date) => {
    const interval = setInterval(
      () => {
        setTime((state) => {
          const curTime = new Date()
          const delta: number = curTime.getTime() - oldTime.getTime()

          return time + delta / 1000
        })

      },
      800)

    return interval
  }


  const parseTime = (time: number): string => {
    const hours = Math.trunc(time / 3600)
    const minutes = Math.trunc(time / 60 % 60)
    const seconds = Math.trunc(time % 60)

    return (`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
  }

  const parseEditTime = (time: number): string => {
    const sTime = parseTime(time)

    return sTime.slice(0, -3)
  }

  const labelColor = (label_color: string): CSSProperties => {
    const bgcolor: string = '#' + label_color || '#FFF'

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(bgcolor)
    if (!result) {
      return {}
    }

    const red = parseInt(result[1], 16)
    const green = parseInt(result[2], 16)
    const blue = parseInt(result[3], 16)

    let color = ''
    if (0.299 * red + 0.587 * green + 0.114 * blue > 127.5) {
      color = '#020202'
    } else {
      color = '#FFF'
    }

    return {
      color: color,
      backgroundColor: bgcolor,

    }
  }

  const editTimeHelper = () => {
    if (!editMode) {
      stopTimer()

      setEditMode(!editMode)

      setEditedTime(parseEditTime(time))

    } else {

      setEditMode(!editMode)

      if (!editedTime || editedTime.length != 5) {
        console.log("Entered incorrect value")
        return
      }
      const hours: string = editedTime.slice(0, 2)
      const minutes: string = editedTime.slice(3, 5)

      const newtime: number = +hours * 3600 + +minutes * 60

      setTime((state) => newtime)

    }
  }

  return (
    <div className="flex flex-row border-b text-gray-800 h-10 items-center">

      <div className="basis-5/6" >

        <div className="inline-flex flex-wrap items-center">
          <a className="block" href={props.url}>{props.title} </a>

          {props.labels.map((label) => (
            <div
              className="flex border-solid border border-gray-800 rounded-full mx-1 px-2 text-xs"
              style={labelColor(label.color)} >
              <span className="">{label.name}</span>
            </div>
          ))
          }
        </div>
      </div>

      <div className="basis-1/6 flex flex-row items-center">

        {started === false
          ? <div onClick={startTimer} 
              className={`w-18 h-8 ml-3 border-green-300 border px-2 rounded flex items-center " ${time !== 0 ? ' bg-green-300' : ''}`}> 
                <div className="flex">  {parseTime(time)} </div>
          </div>
          : <div onClick={stopTimer} 
              className="h-8 w-18 ml-3 border-red-400 border rounded bg-red-400 px-2 flex items-center"> 
               <div className="flex"> {parseTime(time)} </div>
          </div>
        }



        <div className="flex items-center mx-2" onClick={editTimeHelper}>
          {editMode ?
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-8 flex">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          :
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-8 flex">
            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
            <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
          </svg>
          } 
        </div>

        {editMode &&
          <input
            value={editedTime}
            onChange={(e) => { setEditedTime(e.target.value) }}
            className="h-8 w-16 border-red-500 border-solid border text-center"
            type="text"
            placeholder="00:00"
          />
        }
        
      </div>

    </div>

  )
}

export default IssueItem;