const MESSAGES = {
  login: {
    Duplicate: '名稱重複'
  },
  createRoom: {
    Joined: '已經加入房間'
  },
  joinRoom: {
    Joined: '已經加入房間',
    Number: '無效的房間號碼',
    Password: '密碼錯誤',
    Playing: '遊戲進行中',
    Amount: '人數超過限制'
  }
};

export default ({ type, message }) => {
  return (MESSAGES[type] && MESSAGES[type][message]) || '錯誤';
};