<template>
  <div>
    <button @click="login">Login</button>
    <input
      v-model="name"
      placeholder="name"
    >
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
import { getMethods } from 'socketHandler';
import Loading from 'components/Loading';
import IMAGE_CLOSE from 'assets/close.png';
import PopUp from 'components/PopUp';
import { translate } from 'helpers';
const { connect } = getMethods();

export default {
  name: 'HomePage',
  components: {
    Loading,
    PopUp
  },
  data() {
    return {
      isLoading: false,
      isPopUp: false,
      closeImage: IMAGE_CLOSE,
      name,
      popupMessage: ''
    };
  },
  methods: {
    closePopUp: function() {
      this.popupMessage = '';
      this.isPopUp = false;
    },
    login: function () {
      const param = {
        name: this.name
      };
      this.isLoading = true;
      connect(param)
        .then((data) => {
          this.isLoading = false;
          const { result, message } = data;
          if(result) {
            this.$router.push({ path: 'lobby' });
          } else {
            this.isPopUp = true;
            this.popupMessage = translate({ type: 'login', message });
          }
        });
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
