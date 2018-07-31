import store from 'store';

const createRoom = () => new Promise((resolve) => {
  const socket = store.state.socket;
  socket.on('createRoom', resolve);
  socket.emit('createRoom');
});


export default createRoom;