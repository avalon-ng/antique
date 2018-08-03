import store from 'store';

const updateLobbyStatus = ({ onEvent } = {}) => new Promise((resolve) => {
  const socket = store.state.socket;
  socket.on('updateLobbyStatus', onEvent || resolve);
  socket.emit('updateLobbyStatus', {});
});


export default updateLobbyStatus;