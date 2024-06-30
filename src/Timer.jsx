import TimeDisplay from "./TimeDisplay";
import Button from "./Button";

function Timer(props) {
  return (
    <div className="timer">
      <TimeDisplay timeRemaining={props.time}/>
      <div className="controls">
        {props.timer === 'paused' || props.timer === 'reset' ? <Button type="start" handleClick={props.handleStart} /> : <Button type="pause" handleClick={() => props.handlePause(null)} />}
        <Button type="reset" handleClick={props.handleReset} />
      </div>
    </div>
  )
}

export default Timer;
