import { useState, useEffect } from 'react';

import './App.css';

import Timer from "./Timer";
import Modal from "./Modal";

function App() {
  const [permission, setPermission] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState(5);
  const [timer, setTimer] = useState('paused');
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    navigator.serviceWorker.register("sw.js");
    const userVisited = JSON.parse(localStorage.getItem('visited'));
    const userPermission = JSON.parse(localStorage.getItem('permission'));

    if (userVisited && userPermission) {
      setShowModal(false);
      setPermission(true);
    } else {
      setShowModal(true);
      setPermission(false);
    }
  }, [])

  function notifyUser() {
    if (!permission) return;
    // Notification not supported on Chrome on Android
    //new Notification('Timer finished! 🍅');

    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification("Timer finished! 🍅", {
        body: `Your ${time} minute timer is up. Way to stay focused.`,
        vibrate: [200, 100, 200, 100, 200, 100, 200],
      });
    });
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

  function handleEnableNotifications() {
    Notification.requestPermission().then(result => {
      result === 'granted' ? setPermission(true) : setPermission(false);
      localStorage.setItem('permission', result === 'granted' ? JSON.stringify(true) : localStorage.setItem('permission', JSON.stringify(false)));
    });
    localStorage.setItem('visited', JSON.stringify(true));
    setShowModal(false);
  }

  function handleDisableNotifications() {
    setPermission(false);
    setShowModal(false);
    localStorage.setItem('visited', JSON.stringify(true));
    localStorage.setItem('permission', JSON.stringify(false));
  }

  return (
    <>
      <h1>Pomodoro Timer 🍅</h1>
      <Timer time={time} timer={timer} handlePause={handlePause} handleReset={handleReset} handleStart={handleStart}/>
      {showModal ?
        <Modal handleEnableNotifications={handleEnableNotifications} handleDisableNotifications={handleDisableNotifications}/>
      : ''}
    </>
  )
}

export default App;
