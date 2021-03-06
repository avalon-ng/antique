import store from 'store';

const joinRoom = ({ number, password }) => new Promise((resolve) => {
  const socket = store.state.socket;
  socket.once('joinRoom', resolve);
  socket.emit('joinRoom', { number, password });
});


export default joinRoom;