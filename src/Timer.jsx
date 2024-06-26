import { useState, useEffect } from "react";

import TimeDisplay from "./TimeDisplay";
import Button from "./Button";

function Timer() {
  const [time, setTime] = useState(5);
  const [timer, setTimer] = useState('paused');
  const [timerId, setTimerId] = useState(null);
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    Notification.requestPermission().then(result => {
      result === 'granted' ? setPermission(true) : setPermission(false);
    })
  }, [permission])

  function notifyUser() {
    if (!permission) return;
    new Notification('Timer finished!');
  }

  function handleStart() {
    if (timer === 'running' || time === 0) return;

    if (timerId === null) {
      const intervalId = setInterval(() => {
        setTime(time => {
          if (time > 0) {
            return time - 1;
          } else {
            handlePause(intervalId);
            notifyUser();
            return time;
          }
        })
      }, 1000);
      setTimerId(intervalId);
      setTimer('running');
    }
  }

  function handlePause(intervalId) {
    const idToClear = intervalId || timerId;
    clearInterval(idToClear);
    setTimerId(null);
    setTimer('paused');
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
        {timer === 'paused' || timer === 'reset' ? <Button type="start" handleClick={handleStart} /> : <Button type="pause" handleClick={() => handlePause(null)} />}
        <Button type="reset" handleClick={handleReset} />
      </div>
    </div>
  )
}

export default Timer;
