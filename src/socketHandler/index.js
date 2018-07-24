import connect from './connect';
// import createRoom from './createRoom';

let socket = {};
let methods = {
  connect
};

Object.keys(methods).forEach(key => {
  const originFn = methods[key];
  methods[key] = param => {
    return originFn(socket)(param);
  };
});

const getMethods = () => methods;

export {
  getMethods
};