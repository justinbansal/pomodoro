export const initialState = {
  time: 5,
  timer: 'paused',
  timerId: null,
}

function timerReducer(state = initialState, action) {
  const { time, timer, timerId } = state;
  if (action.type === 'started') {
    return { ...state, timer: 'running' };
  } else if (action.type === 'paused') {
      return { ...state, timer: 'paused', timerId: null };
  } else if (action.type === 'reset') {
      return { time: 5, timer: 'reset', timerId: null };
  } else if (action.type === 'update') {
    return { ...state, time: time - 1, timerId: action.intervalId };
  } else {
    throw Error(`Unknown action: ${action.type}`);
  }
}

export default timerReducer;
