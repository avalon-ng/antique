<template>
  <div>
    <button v-on:click="createRoom">create</button>
    <button v-on:click="joinRoom">join</button>
    <input placeholder="room number" />
  </div>
</template>

<script>
export default {
  name: 'LobbyPage',
  props: {
    msg: String
  },
  methods: {
    createRoom: () => {
      console.log(123);
    },
    joinRoom: () => {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
