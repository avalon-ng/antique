const MESSAGES = {
  login: {
    'Duplicate': '名稱重複'
  }
};

export default ({ type, message }) => {
  return (MESSAGES[type] && MESSAGES[type][message]) || '錯誤';
};