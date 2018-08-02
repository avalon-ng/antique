import io from 'socket.io-client';
import store from 'store';
import getConfig from '../getConfig';
const { SOCKET_URL } = getConfig();

const connect = (param) => new Promise((resolve) => {
  const { name } = param;
  const socket = io(SOCKET_URL);
  socket.on('connect', () => {
    socket.emit('login', { name });
  });
  socket.once('login', (data) => {
    const { result } = data;
    if (result) {
      store.dispatch('connect', { socket });
    } else {
      socket.disconnect();
    }
    resolve(data);
  });
});

export default connect;