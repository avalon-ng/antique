<template>
  <Page
    ref="page"
    :class="$style.page"
  >
    <div :class="$style.control">
      <button
        :class="$style.button"
        @click="clickCreate"
      >
        Create
      </button>
      <button
        :class="$style.button"
        @click="clickJoin"
      >
        Join
      </button>
    </div>
    <div
      slot="popup"
    >
      <div
        v-if="isShowing === 'create'"
        :class="$style.popup"
      >
        <input
          v-model="password"
          :class="$style.input"
          placeholder="房間密碼，無則留空"
        >
        <button
          :class="$style.button"
          @click="createRoom"
        >
          Create
        </button>
      </div>
      <div
        v-else-if="isShowing === 'join'"
        :class="$style.popup"
      >
        <input
          :class="$style.input"
          v-model="number"
          placeholder="房間號碼"
        >
        <input
          :class="$style.input"
          v-model="password"
          placeholder="房間密碼，無則留空"
        >
        <button
          :class="$style.button"
          @click="joinRoom({ number, password })"
        >
          Join
        </button>
      </div>
    </div>
    <div :class="$style.list">
      <RoomList
        :join-room="joinRoom"
        :rooms="rooms"
      />
      <UserList
        :users="users"
      />
    </div>
    <div
      :class="$style['messages-panel']"
    >
      <Messages
        :messages="messages"
        :class="$style.messages"
      />
      <div>
        <input
          v-model="message"
          :class="$style.input"
          placeholder="輸入你想說的話"
        >
        <button
          :class="$style.button"
          @click="sendMessage({ content: message })"
        >
          送出
        </button>
      </div>
    </div>
  </Page>
</template>

<script>
import Page from 'components/Pages/Page';
import Messages from 'components/Messages';
import RoomList from './RoomList';
import UserList from './UserList';
import { translate } from 'helpers';
import {
  createRoom,
  joinRoom,
  updateLobbyStatus,
  sendMessage,
  updateMessages
} from 'socketHandler';
export default {
  name: 'LobbyPage',
  components: {
    Page,
    RoomList,
    UserList,
    Messages
  },
  data() {
    return {
      number: '',
      password: '',
      rooms: [],
      users: [],
      message: '',
      messages: [],
      isShowing: ''
    };
  },
  created: function() {
    this.updateLobbyStatus();
    this.updateMessages();
  },
  methods: {
    clickCreate: function() {
      const { page } = this.$refs;
      this.isShowing = 'create';
      page.openPopUp({ component: true });
    },
    clickJoin: function () {
      const { page } = this.$refs;
      this.isShowing = 'join';
      page.openPopUp({ component: true });
    },
    createRoom: function() {
      const { page } = this.$refs;
      const { password } = this;
      page.startLoading();
      createRoom({ password })
        .then(({ result, data, message }) => {
          page.endLoading();
          if (!result) {
            page.openPopUp({ message: translate({ type: 'createRoom', message }) });
            return;
          }
          
          updateLobbyStatus();
          const { number } = data;
          this.$router.push({ path: `room/${number}` });
        })
        .catch((e) => {
          page.endLoading();
          page.openPopUp({ message: e.message });
        });
    },
    joinRoom: async function({ number, password }) {
      const { page } = this.$refs;
      page.startLoading();
      joinRoom({ number, password })
        .then(({ result, data, message }) => {
          page.endLoading();
          if (!result) {
            page.openPopUp({ message: translate({ type: 'joinRoom', message }) });
            return;
          }
          
          updateLobbyStatus();
          const { number } = data;
          this.$router.push({ path: `room/${number}` });
        })
        .catch((e) => {
          page.endLoading();
          page.openPopUp({ message: e.message });
        });
    },
    updateLobbyStatus: function() {
      updateLobbyStatus({ onEvent: this.getLobbyStatus });
    },
    getLobbyStatus: function({ result, data, message }) {
      if (result) {
        this.rooms = data.rooms;
        this.users = data.users;
      }
    },
    updateMessages: function() {
      updateMessages({ onEvent: this.getMessages });
    },
    sendMessage: function({ content }) {
      sendMessage({ content });
    },
    getMessages: function({ result, data }) {
      if (result) {
        this.messages = data.messages;
      }
    },
  }
};
</script>

<style lang="less" module>

@import '~styles/device';

.page {
  display: flex;
  flex-direction: column;
}
  
.popup {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.button, .input {
  width: 250px;
  height: 35px;
  border-radius: 0.2em;
  font-size: 1em;
  text-align: center;
  box-shadow: 0 0 1em 0.1em rgba(0,0,0,0.2);
}

.input {
  -webkit-appearance: none;
  margin: 0;
  outline: 0;
  vertical-align: middle;
  margin-bottom: 30px;
  border: none;
}

.button {
  border: 0;
  color: white;
  background-color: #353030;
  cursor: pointer;
  width: 250px;
}

.close {
  cursor: pointer;
}

.messages-panel {
  height: 300px;
}
@media @desktop {
  .list {
    display: flex;
    width: 100%;
    height: 300px;
    > div {
      width: 50%;
    }
  }
  .message-input {
    width: 100%;
  }
  .message-button {
    width: 50px;
  }
}


@media @mobile {
  .list {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 600px;
    > div {
      width: 100%;
      height: 300px;
    }
  }
}
</style>
