import store from 'store';

const updateRoomStatus = ({ onEvent } = {}) => new Promise((resolve) => {
  const socket = store.state.socket;
  socket.on('updateRoomStatus', onEvent || resolve);
  socket.emit('updateRoomStatus', {});
});


export default updateRoomStatus;