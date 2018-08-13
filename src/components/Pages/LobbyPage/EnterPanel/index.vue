<template>
  <div ref="panel">
    <div
      v-if="isPassword"
      :class="[$style['password-panel'], isActive ? $style.active : '']"
    >
      <input
        v-model="password"
        placeholder="密碼"
        type="search"
      >
      <label
        v-if="!isActive"
        :for="room.number"
        :class="$style.key"
        @click="togglePanel(true)"
      >
        <font-awesome-icon icon="key" />
      </label>
      <label
        v-else
        :for="room.number"
        :class="$style.enter"
        @click="enterRoom({ number: room.number, password })"
      >
        <font-awesome-icon icon="sign-in-alt" />
      </label>
    </div>
    <div
      v-else
      :class="$style['no-password-panel']"
    >
      <label
        :for="room.number"
        :class="$style.enter"
        @click="enterRoom({ number: room.number })"
      >
        <font-awesome-icon icon="sign-in-alt" />
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EnterPanel',
  props: {
    joinRoom: {
      type: Function,
      required: true,
    },
    isPassword: {
      type: Boolean,
      required: true
    },
    room: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      password: '',
      isActive: false
    };
  },
  created() {
    document.body.addEventListener('click', this.clickOuter);
  },
  destroyed() {
    document.body.removeEventListener('click', this.clickOuter);
  },
  methods: {
    togglePanel: function(value) {
      this.isActive = value;
    },
    enterRoom: function({ number, password }) {
      this.joinRoom({ number, password });
    },
    clickOuter: function(e) {
      if(!this.$refs.panel.contains(e.target)) {
        this.togglePanel(false);
      }
    }
  }
};
</script>

<style lang="less" module>

.enter, .key {
  cursor: pointer;
  margin-left: auto;
}

.enter {
  font-size: 20px;
}

.key {
  font-size: 20px;
}

.password-panel, .no-password-panel {
  display: flex;
  align-items: center;

  input, label {
    appearance: none;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent; 
  }

  label {
    position: absolute;
    right: 0;
    cursor: pointer;
    padding: 7px;
    border: 2px solid #cdcdcd;
    box-shadow: 0 0 1px 1px rgba(0,0,0,0.1);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    color: #444444;
    background-color: #fcfcfc;
  }

  input {
    color: inherit;
    vertical-align: middle;
    letter-spacing: initial;
    border: none;
    margin: 0;
    outline: 0;
    padding: 0;
    position: absolute;
    right: 0;
    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    transition: all .5s ease;
    text-align: center;
    width: 250px;
    height: 25px;
    font-size: 1em;
    text-align: center;
    border-radius: 0.2em;
    margin-right: 20px;
    box-shadow: 0 0 2px 2px rgba(0,0,0,0.1);
  }

}

.password-panel {
  input[type='search'] {
    max-width: 0px;
  }
}

.password-panel.active {
  input[type='search'] {
    max-width: 150px;
  }
}


</style>
