import { useState } from "react";

import Button from "./Button";

function Timer() {
  const [time, setTime] = useState(25);
  const [timer, setTimer] = useState('paused');
  const [timerId, setTimerId] = useState(null);

  function handleStart() {
    if (timer === 'running') return;
    let timerId = setInterval(() => {
      setTime(time => {
        if (time > 0) {
          return time - 1;
        }
      })
    }, 1000)

    setTimer('running');
    setTimerId(timerId);
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

    setTime(25);
  }

  return (
    <div className="timer">
      <span>{time}</span>
      <div className="controls">
        <Button type="start" handleClick={handleStart}/>
        <Button type="pause" handleClick={handlePause}/>
        <Button type="reset" handleClick={handleReset}/>
      </div>
    </div>
  )
}

export default Timer;
