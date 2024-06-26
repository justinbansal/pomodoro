function Button({type, handleClick}) {
  return (
    <>
      <button className={type} onClick={handleClick}>{type}</button>
    </>
  )
}

export default Button;
