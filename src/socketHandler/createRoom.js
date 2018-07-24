const createRoom = socket => () => {
  socket.emit('createRoom', {});
};

export default createRoom;