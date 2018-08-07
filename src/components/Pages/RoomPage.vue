<template>
  <Page ref="page">
    <button @click="leaveRoom">離開</button>
  </Page>
</template>

<script>
import Page from 'components/Pages/Page';
import { leaveRoom } from 'socketHandler';
import { translate } from 'helpers';

export default {
  name: 'RoomPage',
  components: {
    Page
  },
  data() {
    return {
      name: ''
    };
  },
  methods: {
    leaveRoom: function(){
      leaveRoom();
      this.$router.push({ path: '/lobby' });
    }
  }
};
</script>

<style lang="less" module>

</style>
