import React, { useEffect, useState } from "react";
import { IDBIssue } from "../types/dbissues";
// import { setIssueTimeDB, toDay } from '../lib/localstore'

const Total:React.FC<props> = (props) => {

  const parseTime = (time:number):string => {
    const hours = Math.trunc(time / 3600)
    const minutes = Math.trunc(time / 60 % 60)
    const seconds = Math.trunc(time % 60)

    return (`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
  }
  
    return (
    
    <div className="columns _issues has-text-weight-bold has-text-link">

      <div className="column column is-four-fifths py-1 height-min title-text ">
        <span className="_total">Total this day</span>
      </div>

      <div className="column py-1">
        <div className="">
            <span className="p-2 px-4 _total">{parseTime(props.total)}</span>
        </div>
      </div>

    </div>
    
  )
}

export default Total;

type props = {
    total: number
}