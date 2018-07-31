<template>
  <Page>
    <button @click="createRoom">create</button>
    <button @click="joinRoom">join</button>
    <input placeholder="room number">
  </Page>
</template>

<script>
import Page from 'components/Pages/Page';
import { createRoom, joinRoom } from 'socketHandler';
export default {
  name: 'LobbyPage',
  components: {
    Page
  },
  methods: {
    createRoom: () => {
      createRoom()
        .then(({ result, data }) => {
          const { number } = data;
          console.log(number);
        });
    },
    joinRoom: () => {
      joinRoom();
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
