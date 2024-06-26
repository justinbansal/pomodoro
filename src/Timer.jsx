import Button from "./Button";

function Timer() {
  let time = 25;

  return (
    <div className="timer">
      <span>{time}</span>
      <div className="controls">
        <Button type="start"/>
        <Button type="pause"/>
        <Button type="reset"/>
      </div>
    </div>
  )
}

export default Timer;
