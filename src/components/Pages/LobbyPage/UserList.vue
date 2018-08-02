<template>
  <div :class="$style.users">
    <div
      v-for="user in users"
      :key="user.name"
      :class="$style.user"
    >
      <div>{{ user.name }}</div>
      <div :class="$style.number" v-if="user.number !== 'lobby'">{{ user.number }}</div>
      <div :class="$style.status">{{ translate({ type: 'userStatus', message: user.status }) }}</div>
    </div>
  </div>
</template>

<script>
import { updateUserStatus } from 'socketHandler';
import { translate } from 'helpers';
export default {
  name: 'UserList',
  data: function() {
    return {
      users: [],
      translate
    };
  },
  created: function() {
    this.updateUserStatus();
  },
  methods: {
    updateUserStatus: function() {
      updateUserStatus({ onEvent: this.getUsersStatus });
    },
    getUsersStatus: function({ result, data, message }) {
      if (result) {
        this.users = data.users;
      }
    }
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
