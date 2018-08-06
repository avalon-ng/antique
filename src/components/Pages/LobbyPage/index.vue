<template>
  <Page ref="page">
    <button @click="createRoom">create</button>
    <button @click="joinRoom({ number, password })">join</button>
    <input
      v-model="number"
      placeholder="room number"
    >
    <input
      v-model="password"
      placeholder="room password"
    >
    <RoomList
      :join-room="joinRoom"
      :rooms="rooms"
    />
    <UserList
      :users="users"
    />
    <Messages
      :messages="messages"
    >
      <input
        v-model="message"
        placeholder="輸入你想說的話"        
      >
      <button @click="sendMessage({ content: message })">送出</button>
    </Messages>
  </Page>
</template>

<script>
import Page from 'components/Pages/Page';
import Messages from 'components/Messages';
import RoomList from './RoomList';
import UserList from './UserList';
import { translate } from 'helpers';
import {
  createRoom,
  joinRoom,
  updateLobbyStatus,
  sendMessage,
  updateMessages
} from 'socketHandler';
export default {
  name: 'LobbyPage',
  components: {
    Page,
    RoomList,
    UserList,
    Messages
  },
  data() {
    return {
      number: '',
      password: '',
      rooms: [],
      users: [],
      message: '',
      messages: []
    };
  },
  created: function() {
    this.updateLobbyStatus();
    this.updateMessages();
  },
  methods: {
    createRoom: function() {
      const { page } = this.$refs;
      const { password } = this;
      page.startLoading();
      createRoom({ password })
        .then(({ result, data, message }) => {
          page.endLoading();
          if (!result) {
            page.openPopUp(translate({ type: 'createRoom', message }));
            return;
          }
          
          updateLobbyStatus();
          const { number } = data;
          this.$router.push({ path: `room/${number}` });
        })
        .catch((e) => {
          page.endLoading();
          page.openPopUp(e.message);
        });
    },
    joinRoom: function({ number, password }) {
      const { page } = this.$refs;
      page.startLoading();
      joinRoom({ number, password })
        .then(({ result, data, message }) => {
          page.endLoading();
          if (!result) {
            page.openPopUp(translate({ type: 'joinRoom', message }));
            return;
          }
          
          updateLobbyStatus();
          const { number } = data;
          this.$router.push({ path: `room/${number}` });
        })
        .catch((e) => {
          page.endLoading();
          page.openPopUp(e.message);
        });
    },
    updateLobbyStatus: function() {
      updateLobbyStatus({ onEvent: this.getLobbyStatus });
    },
    getLobbyStatus: function({ result, data, message }) {
      if (result) {
        this.rooms = data.rooms;
        this.users = data.users;
      }
    },
    updateMessages: function() {
      updateMessages({ onEvent: this.getMessages });
    },
    sendMessage: function({ content }) {
      sendMessage({ content });
    },
    getMessages: function({ result, data }) {
      if (result) {
        this.messages = data.messages;
      }
    },
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
