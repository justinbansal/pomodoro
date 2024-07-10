function notificationsReducer({ permission, showModal}, action) {
  if (action.type === 'enable') {
    Notification.requestPermission().then(result => {
      localStorage.setItem('permission', result === 'granted' ? JSON.stringify(true) : localStorage.setItem('permission', JSON.stringify(false)));
      if (result === 'granted') {
        return { permission: true, showModal: false }
      } else {
        return { permission: false, showModal: false }
      }
    });
    localStorage.setItem('visited', JSON.stringify(true));
    return { permission: true, showModal: false };
  } else if (action.type === 'disable') {
      localStorage.setItem('visited', JSON.stringify(true));
      localStorage.setItem('permission', JSON.stringify(false));
      return {
        permission: false, showModal: false,
      }
  } else if (action.type === 'accepted') {
    return {
      permission: permission,
      showModal: false,
    }
  } else if (action.type === 'rejected') {
    return {
      permission: false, showModal: true
    }
  } else {
    throw Error(`Unknown action: ${action.type}`);
  }
}

export default notificationsReducer;
