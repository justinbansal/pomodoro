function Modal(props) {
  return (
    <div className="modal">
      <div className="modal-text">
        <p>Enable notifications to get the best experience.</p>
      </div>

      <button onClick={props.handleEnableNotifications}>Yes 👍</button>
      <button onClick={props.handleDisableNotifications}>No thanks</button>
    </div>
  )
}

export default Modal;
