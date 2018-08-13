<template>
  <Page
    ref="page"
    :class="$style.page"
  >
    <div :class="$style.login">
      <input
        v-model="name"
        placeholder="Name"
      >
      <button @click="login">Login</button>
    </div>
  </Page>
</template>

<script>
import Page from 'components/Pages/Page';
import { connect } from 'socketHandler';
import { translate } from 'helpers';

export default {
  name: 'HomePage',
  components: {
    Page
  },
  data() {
    return {
      name: ''
    };
  },
  methods: {
    login: function () {
      const { page } = this.$refs;
      const param = {
        name: this.name
      };
      page.startLoading();
      connect(param)
        .then((data) => {
          page.endLoading();
          const { result, message } = data;
          if(result) {
            this.$router.push({ path: 'lobby' });
          } else {
            page.openPopUp({ message: translate({ type: 'login', message }) });
          }
        });
    }
  }
};
</script>

<style lang="less" module>
.page {
  display: flex;
  justify-content: center;
  align-content: center;
  .login {
    display: flex;
    flex-direction: column;
    width: 250px;
    height: auto;
    align-self: center;
    
    input, button {
      height: 35px;
      border-radius: 0.2em;
      font-size: 1em;
      text-align: center;
      box-shadow: 0 0 1em 0.1em rgba(0,0,0,0.2);
    }
    input {
      -webkit-appearance: none;
      margin: 0;
      outline: 0;
      vertical-align: middle;
      margin-bottom: 30px;
      border: none;
    }
    button {
      border: 0;
      color: white;
      background-color: #353030;
      cursor: pointer;
    }
  }
}
</style>
