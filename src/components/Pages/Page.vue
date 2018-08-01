<template>
  <div>
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
        <img :src="closeImage"> 
      </button>
      <div :class="$style.content">{{ popupMessage }}</div>
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
  data: () => {
    return {
      isLoading: false,
      isPopUp: false,
      closeImage: IMAGE_CLOSE,
      popupMessage: ''
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
    openPopUp: function(message) {
      this.popupMessage = message;
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
	outline: 0;
	border: 0;
	padding: 0;
	background: transparent;
	cursor: pointer;
	display: block !important; // ios bug
  width: 20px;
  height: 20px;
  float: right;
  margin-right: 15px;
  margin-top: 15px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>

