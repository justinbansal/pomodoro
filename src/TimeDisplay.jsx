import styled from "styled-components";

function TimeDisplay({timeRemaining}) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining - minutes * 60;
  const formattedSeconds = seconds.toString().padStart(2, 0);

  return (
    <>
      <span>{minutes}:{formattedSeconds}</span>
    </>
  )
}

export default TimeDisplay;
