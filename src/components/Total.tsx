import React, { useEffect, useState } from "react";

const Total:React.FC<props> = (props) => {

  const parseTime = (time:number):string => {
    const hours = Math.trunc(time / 3600)
    const minutes = Math.trunc(time / 60 % 60)
    const seconds = Math.trunc(time % 60)

    return (`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
  }
  
    return (
    
    <div className="flex flex-row font-bold ">

      <div className="basis-5/6">
        <span className="_total">Total this day</span>
      </div>

      <div className="basis-1/6 py-1">
        <div className="">
            <span className="p-2 px-4 ml-2 align-middle">{parseTime(props.total)}</span>
        </div>
      </div>

    </div>
    
  )
}

export default Total;

type props = {
    total: number
}