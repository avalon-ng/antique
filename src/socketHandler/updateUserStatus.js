import store from 'store';

const updateUserStatus = ({ onEvent } = {}) => new Promise((resolve) => {
  const socket = store.state.socket;
  socket.on('updateUserStatus', onEvent || resolve);
  socket.emit('updateUserStatus', {});
});


export default updateUserStatus;