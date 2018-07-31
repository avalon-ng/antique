import store from 'store';

const getSocketStatus = () => !!store.state.socket;

export default getSocketStatus;