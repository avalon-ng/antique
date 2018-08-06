import store from 'store';

const updateMessages = ({ onEvent } = {}) => new Promise((resolve) => {
  const socket = store.state.socket;
  socket.on('sendMessage', onEvent || resolve);
  socket.emit('updateMessages');
});


export default updateMessages;