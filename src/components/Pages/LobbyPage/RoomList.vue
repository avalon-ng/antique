<template>
  <div :class="$style.rooms">
    <div
      v-for="room in rooms"
      :key="room.number"
      :class="$style.room"
    >
      <div>房號：{{ room.number }}</div>
      <input
        v-if="room.password"
        v-model="passwords[room.number]"
        placeholder="password"
      >
      <div>房間人數：{{ room.users.length }}/{{ room.maxUserAmount }}</div>
      <div>遊戲人數：{{ room.minPlayerAmount }} ~ {{ room.maxPlayerAmount }}</div>
      <div :class="$style.detail">
        <div>{{ room.users }}</div>
        <div>{{ room.players }}</div>
      </div>
      <div>{{ translate({ message:room.status, type: 'roomStatus' }) }}</div>
      <button
        v-if="room.status === 'waiting'"
        @click="joinRoom({ number: room.number, password: passwords[room.number] })"
      >
        <span>進入</span>
      </button>
    </div>
  </div>
</template>

<script>
import { updateRoomStatus } from 'socketHandler';
import { translate } from 'helpers';
export default {
  name: 'RoomList',
  props: {
    joinRoom: {
      type: Function,
      required: true,
    }
  },
  data: function() {
    return {
      rooms: [],
      passwords: {},
      translate
    };
  },
  created: function() {
    this.updateRoomStatus();
  },
  methods: {
    updateRoomStatus: function() {
      updateRoomStatus({ onEvent: this.getRoomsStatus });
    },
    getRoomsStatus: function({ result, data, message }) {
      if (result) {
        this.rooms = data.rooms;
      }
    }
  }
};
</script>

<style lang="less" module>
.rooms {
  border-radius: 5px;
  border: 1px solid black;
  padding: 10px;
}
.room {
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
  button {
    margin-left: auto;
  }
}
</style>
