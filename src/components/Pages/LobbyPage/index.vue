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
    <RoomList :join-room="joinRoom"/>
  </Page>
</template>

<script>
import Page from 'components/Pages/Page';
import RoomList from './RoomList';
import { createRoom, joinRoom, updateRoomStatus } from 'socketHandler';
import { translate } from 'helpers';
export default {
  name: 'LobbyPage',
  components: {
    Page,
    RoomList
  },
  data() {
    return {
      number: '',
      password: ''
    };
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
          
          updateRoomStatus();
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
          
          updateRoomStatus();
          const { number } = data;
          this.$router.push({ path: `room/${number}` });
        })
        .catch((e) => {
          page.endLoading();
          page.openPopUp(e.message);
        });
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
