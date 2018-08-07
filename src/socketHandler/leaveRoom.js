import store from 'store';

const leaveRoom = () => new Promise((resolve) => {
  const socket = store.state.socket;
  socket.once('leaveRoom', resolve);
  socket.emit('leaveRoom');
});


export default leaveRoom;