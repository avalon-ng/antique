<template>
  <div :class="[$style.page, propsClass]">
    <slot />
    <Loading v-if="isLoading" />
    <PopUp
      v-if="isPopUp"
      :container-class="$style.popup"
      :close-pop-up="closePopUp"
    >
      <button
        :class="$style.close"
        @click="closePopUp"
      >
        ×
      </button>
      <div
        v-if="popupComponent"
        :class="$style.content"
      >
        <slot name="popup" />
      </div>
      <div
        v-else
        :class="$style.content"
      >
        {{ popupMessage }}
      </div>
    </PopUp>
  </div>
</template>

<script>
import { getSocketStatus } from 'socketHandler';
import Loading from 'components/Loading';
import IMAGE_CLOSE from 'assets/close.png';
import PopUp from 'components/PopUp';

export default {
  name: 'LobbyPage',
  components: {
    Loading,
    PopUp
  },
  data: function() {
    return {
      isLoading: false,
      isPopUp: false,
      closeImage: IMAGE_CLOSE,
      popupMessage: '',
      popupComponent: false,
      propsClass: this.class
    };
  },
  created: function() {
    const isConnected = getSocketStatus();
    if(!isConnected) {
      this.$router.push({ path: '/' });
    }
  },
  methods: {
    closePopUp: function() {
      this.popupMessage = '';
      this.isPopUp = false;
    },
    openPopUp: function({ message, component }) {
      if (message) {
        this.popupComponent = false;
        this.popupMessage = message;
      } else if (component) {
        this.popupComponent = true;
        this.popupMessage = '';
      }
      this.isPopUp = true;
    },
    startLoading: function() {
      this.isLoading = true;
    },
    endLoading: function() {
      this.isLoading = false;
    }
  }
};
</script>


<style lang="less" module>
.page {
  background-color: #fcfcfc;
  width: 100%;
  height: 100%;
}
.content {
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
}
.popup {
  width: 350px;
  height: auto;
}
.close {
	outline: 0 !important;
	border: 0 !important;
	padding: 0 !important;
	background: transparent !important;
	cursor: pointer !important;
	display: block !important; // ios bug
  width: 20px !important;
  height: 20px !important;
  float: right !important;
  margin-right: 15px !important;
  margin-top: 10px !important;
  font-size: 30px !important;
  font-weight: bold !important;
  color: black !important;
  border: 0 !important;
  box-shadow: none !important;
}
</style>

