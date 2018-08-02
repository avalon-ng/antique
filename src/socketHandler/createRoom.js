import store from 'store';

const createRoom = ({ password }) => new Promise((resolve) => {
  const socket = store.state.socket;
  socket.once('createRoom', resolve);
  socket.emit('createRoom', { password });
});


export default createRoom;