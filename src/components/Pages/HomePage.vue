<template>
  <div>
    <button @click="login">Login</button>
    <input
      :model="name"
      placeholder="name"
    >
    <Loading v-if="isLoading" />
    <PopUp
      v-if="isPopUp"
      :container-class="$style.popup"
    >
      <button :class="$style.close">
        <img :src="closeImage"> 
      </button>
    </PopUp>
  </div>
</template>

<script>
import { getMethods } from 'socketHandler';
import Loading from 'components/Loading';
import IMAGE_CLOSE from 'assets/close.png';
import PopUp from 'components/PopUp';
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
      name
    };
  },
  methods: {
    login: function () {
      this.isLoading = true;
      connect()
        .then(() => {
          this.isLoading = false;
          this.$router.push({ path: 'lobby' });
        });
    }
  }
};
</script>

<style lang="less" module>
.popup {
  width: 350px;
  height: 200px;
}
.close {
	outline: 0;
	border: 0;
	padding: 0;
	background: transparent;
	cursor: pointer;
	display: block !important; // ios bug
  width: 25px;
  height: 25px;
  float: right;
  margin-right: 15px;
  margin-top: 15px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
