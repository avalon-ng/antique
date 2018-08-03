<template>
  <div :class="$style.users">
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
  </div>
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
  }
};
</script>

<style lang="less" module>
.users {
  border-radius: 5px;
  border: 1px solid black;
  padding: 10px;
}
.user {
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
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
