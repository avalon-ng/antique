import store from 'store';

const getSocketStatus = () => !!store.getters.getSocket;

export default getSocketStatus;