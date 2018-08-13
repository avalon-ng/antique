<template>
  <iscroll-view
    ref="iscroll"
    :class="$style.users"
  >
    <div
      v-for="user in users"
      :key="user.name"
      :class="$style.user"
    >
      <div>{{ user.name }}</div>
      <div
        v-if="user.number !== 'lobby'"
        :class="$style.number"
      >
        {{ user.number }}
      </div>
      <div :class="$style.status">{{ translate({ type: 'userStatus', message: user.status }) }}</div>
    </div>
  </iscroll-view>
</template>

<script>
import { translate } from 'helpers';
export default {
  name: 'UserList',
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  data: function() {
    return {
      translate
    };
  },
  updated: function() {
    const iscroll = this.$refs.iscroll;
    iscroll.refresh();
  }
};
</script>

<style lang="less" module>
.users {
  touch-action: none;
  overflow: hidden;
  width: 100%;
  padding: 10px;
  border-radius: 0.2em;
  box-shadow: 5px 5px 1em 0.1em rgba(0,0,0,0.2);
}
.user {
  border-bottom: 1px solid #aaaaaa;
  font-size: 0.9em;
  display: flex;
  align-items: center;
  width: 100%;
  height: 45px;
  margin-bottom: 5px;
  div {
    margin-left: 10px;
    margin-right: 10px;
  }
  .detail {
    display: none;
  }
  .status, .number {
    margin-left: auto;
  }
}
</style>
