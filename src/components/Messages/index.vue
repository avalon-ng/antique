<template>
  <div :class="$style.messages">
    <div
      v-for="(message, index) in messages"
      :key="index"
      :class="$style.message"
    >
      <div :class="$style.from">{{ message.from }}</div>：
      <div :class="$style.content">{{ message.content }}</div>
      <div :class="$style.date">{{ message.date }}</div>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'RoomList',
  props: {
    messages: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="less" module>
.messages {
  border-radius: 5px;
  border: 1px solid black;
  padding: 10px;
  height: 200px;
}
.message {
  display: flex;
  .date {
    margin-left: auto;
  }
  .content {
    color: grey;
  }
}
</style>
