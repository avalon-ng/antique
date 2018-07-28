const createRoom = state => () => {
  state.socket.emit('createRoom', {});
};

export default createRoom;