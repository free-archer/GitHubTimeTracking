import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const PomodoroTimer: React.FC = () => {
    const [time, setTime] = useState<number>(0)


return (
    <CircularProgressbar value={time} maxValue={45} text={time.toString()} 
    className="h-20"
    />
    )
}

export default PomodoroTimer;