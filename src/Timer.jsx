import { useState } from "react";

import TimeDisplay from "./TimeDisplay";
import Button from "./Button";

function Timer() {
  const [time, setTime] = useState(5);
  const [timer, setTimer] = useState('paused');
  const [timerId, setTimerId] = useState(null);

  function handleStart() {
    if (timer === 'running') return;
    let intervalId = setInterval(() => {
      setTime(time => {
        if (time > 0) {
          return time - 1;
        } else {
          handlePause();
          return time;
        }
      })
    }, 1000)

    setTimer('running');
    setTimerId(intervalId);
  }

  function handlePause() {
    setTimer('paused');
    clearInterval(timerId);
    setTimerId(null);
  }

  function handleReset() {
    setTimer('reset');
    clearInterval(timerId);
    setTimerId(null);
    setTime(5);
  }

  return (
    <div className="timer">
      <TimeDisplay timeRemaining={time}/>
      <div className="controls">
        <Button type="start" handleClick={handleStart}/>
        <Button type="pause" handleClick={handlePause}/>
        <Button type="reset" handleClick={handleReset}/>
      </div>
    </div>
  )
}

export default Timer;
