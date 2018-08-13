<template>
  <iscroll-view
    ref="iscroll"
    :class="$style.rooms"
  >
    <div
      v-for="room in rooms"
      :key="room.number"
      :class="$style.room"
    >
      <div>{{ room.number }}</div>
      <div>房間人數：{{ room.users.length }}/{{ room.maxUserAmount }}</div>
      <div>遊戲人數：{{ room.minPlayerAmount }} ~ {{ room.maxPlayerAmount }}</div>
      <div :class="$style.detail">
        <div>{{ room.users }}</div>
        <div>{{ room.players }}</div>
      </div>
      <div>{{ translate({ message:room.status, type: 'roomStatus' }) }}</div>
      <EnterPanel 
        v-if="room.status === 'waiting'"
        :is-password="room.password"
        :join-room="joinRoom"
        :room="room"
      />
    </div>
  </iscroll-view>
</template>

<script>
import EnterPanel from './EnterPanel';
import { translate } from 'helpers';
export default {
  name: 'RoomList',
  components: {
    EnterPanel
  },
  props: {
    joinRoom: {
      type: Function,
      required: true,
    },
    rooms: {
      type: Array,
      required: true
    }
  },
  data: function() {
    return {
      passwords: {},
      translate
    };
  },
  updated: function() {
    const iscroll = this.$refs.iscroll;
    iscroll.refresh();
  },
  methods: {
  }
};
</script>

<style lang="less" module>
.rooms {
  touch-action: none;
  overflow: hidden;
  width: 100%;
  padding: 10px;
  border-radius: 0.2em;
  box-shadow: 5px 5px 1em 0.1em rgba(0,0,0,0.2);
}
.room {
  font-size: 0.9em;
  text-align: center;
  border-bottom: 1px solid #aaaaaa;
  display: flex;
  align-items: center;
  width: 100%;
  height: 45px;
  position: relative;
  div {
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    align-self: center;
  }
  .detail {
    display: none;
  }
}
</style>
