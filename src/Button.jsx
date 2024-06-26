function Button({type, handleClick}) {
  return (
    <>
      <button onClick={handleClick}>{type}</button>
    </>
  )
}

export default Button;
