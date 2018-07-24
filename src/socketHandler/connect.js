import io from 'socket.io-client';
import getConfig from '../getConfig';
const { SOCKET_URL } = getConfig();

const connect = socket => (param) => new Promise((resolve) => {
  const { name } = param;
  socket = io(SOCKET_URL);
  socket.on('connect', () => {
    socket.emit('login', { name });
  });
  socket.on('login', resolve);
  // socket.on('message', () => {
  //   console.log('connect');
  //   socket.emit('test', 'ttt');
  // })
});

export default connect;