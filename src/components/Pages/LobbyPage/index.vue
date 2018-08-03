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
  </Page>
</template>

<script>
import Page from 'components/Pages/Page';
import RoomList from './RoomList';
import UserList from './UserList';
import { createRoom, joinRoom, updateLobbyStatus } from 'socketHandler';
import { translate } from 'helpers';
export default {
  name: 'LobbyPage',
  components: {
    Page,
    RoomList,
    UserList
  },
  data() {
    return {
      number: '',
      password: '',
      rooms: [],
      users: []
    };
  },
  created: function() {
    this.updateLobbyStatus();
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
    }
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
