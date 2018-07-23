import io from 'socket.io-client';
import getConfig from '../getConfig';
const { SOCKET_URL } = getConfig();

const connect = socket => () => new Promise((resolve, reject) => {
  socket = io(SOCKET_URL);
  socket.on('connect', () => resolve());
  // socket.on('message', () => {
  //   console.log('connect');
  //   socket.emit('test', 'ttt');
  // })
});

export default connect;