<template>
  <div>
    <button v-on:click="login">Login</button>
    <input placeholder="name" />
    <Loading v-if="isLoading" />
  </div>
</template>

<script>
import { getMethods } from 'socketHandler';
import Loading from 'components/Loading';
const { connect } = getMethods();

export default {
  name: 'HomePage',
  components: {
    Loading
  },
  methods: {
    login: function() {
      this.isLoading = true;
      connect()
        .then(() => {
          this.isLoading = false;
          this.$router.push({ path: 'lobby' });
        });
    }
  },
  data() {
    return {
      isLoading: false
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
