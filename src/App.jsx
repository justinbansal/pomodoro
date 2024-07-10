import { useReducer, useEffect } from 'react';

import timerReducer, { initialState } from './timerReducer';
import notificationsReducer from './notificationsReducer';
import './App.css';

import Timer from "./Timer";
import Modal from "./Modal";

function App() {
  const [notificationsState, notificationsDispatch] = useReducer(notificationsReducer, {
    permission: false,
    showModal: false,
  });
  const [timerState, timerDispatch] = useReducer(timerReducer, initialState);

  useEffect(() => {
    navigator.serviceWorker.register("sw.js");
    const userVisited = JSON.parse(localStorage.getItem('visited'));
    const userPermission = JSON.parse(localStorage.getItem('permission'));

    if (userVisited && userPermission) {
      notificationsDispatch({ type: 'accepted'});
    } else {
      notificationsDispatch({ type: 'rejected'});
    }
  }, [])

  useEffect(() => {
    if (timerState.timer === 'running') {
      const intervalId = setInterval(() => updateTime(intervalId), 1000);

      if (timerState.time === 0) {
        handlePause();
        notifyUser();
      }

      return () => clearInterval(intervalId);
    }
  })

  function notifyUser() {
    if (!notificationsState.permission) return;
    // Notification not supported on Chrome on Android
    //new Notification('Timer finished! 🍅');

    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification("Timer finished! 🍅", {
        body: `Your ${timerState.time} minute timer is up. Way to stay focused.`,
        vibrate: [200, 100, 200, 100, 200, 100, 200],
      });
    });
  }

  function handleStart() {
    timerDispatch({
      type: 'started',
    });
  }

  function updateTime(intervalId) {
    timerDispatch({
      type: 'update',
      intervalId
    })
  }

  function handlePause() {
    timerDispatch({
      type: 'paused'
    });
  }

  function handleReset() {
    timerDispatch({
      type: 'reset',
    });
  }

  function handleEnableNotifications() {
    notificationsDispatch({
      type: 'enable'
    })
  }

  function handleDisableNotifications() {
    notificationsDispatch({
      type: 'disable'
    })
  }

  return (
    <>
      <h1>Pomodoro Timer 🍅</h1>
      <Timer time={timerState.time} timer={timerState.timer} handlePause={handlePause} handleReset={handleReset} handleStart={handleStart}/>
      {notificationsState.showModal ?
        <Modal handleEnableNotifications={handleEnableNotifications} handleDisableNotifications={handleDisableNotifications}/>
      : ''}
    </>
  )
}

export default App;
