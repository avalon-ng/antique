<template>
  <div>
    <slot />
  </div>
</template>

<script>
import { getSocketStatus } from 'socketHandler';
export default {
  name: 'LobbyPage',
  created: function() {
    const isConnected = getSocketStatus();
    if(!isConnected) {
      this.$router.push({ path: '/' });
    }
  }
};
</script>

<style scoped>
</style>
