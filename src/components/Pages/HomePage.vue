<template>
  <Page ref="page">
    <button @click="login">Login</button>
    <input
      v-model="name"
      placeholder="name"
    >
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
            page.openPopUp(translate({ type: 'login', message }));
          }
        });
    }
  }
};
</script>

<style lang="less" module>

</style>
