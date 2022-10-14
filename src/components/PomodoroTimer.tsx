import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { parseMinutesSec } from '../lib/timerHelpers'


const PomodoroTimer: React.FC = () => {
    const [time, setTime] = useState<number>(0)
    const [minutes, setMinutes] = useState<number>(0)
    const [intervalID, setIntervalID] = useState<NodeJS.Timer>()
    const [started, setStarted] = useState<boolean>(false)
  
    const Timer = (time:number, oldTime:Date) => {
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

    useEffect(() => {
        setMinutes((state) => (Math.trunc(time / 60)))
    }, [time])

    const onClickTimer = () => {
        if (started) {
            stopTimer()
        } else {
            startTimer()
        }
    }

    const startTimer = () => {
        const curTime = new Date()
    
        const interval = Timer(time, curTime)
    
        setIntervalID(interval)
    
        setStarted(state => true)
      }
    
      const stopTimer = () => {
        setStarted(state => false)
        setTime(0)
    
        clearInterval(intervalID)
      }
    

return (
    <div onClick={onClickTimer} >
        <CircularProgressbar value={minutes} maxValue={45} text={parseMinutesSec(time)} 
        className="h-30 cursor-pointer"
        styles={buildStyles({
            // Rotation of path and trail, in number of turns (0-1)
            rotation: 0,

            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: 'butt',
        
            // Text size
            textSize: '20px',
        
            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.1,
        
            // Can specify path transition in more detail, or remove it entirely
            // pathTransition: 'none',
        
            // Colors
            textColor: '#B2384F',
            trailColor: '#B2384F',
          })}        
        />
    </div>
    )
}

export default PomodoroTimer;