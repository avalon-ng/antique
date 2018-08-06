import store from 'store';

const sendMessage = ({ content }) => {
  const socket = store.state.socket;
  socket.emit('sendMessage', { content });
};

export default sendMessage;