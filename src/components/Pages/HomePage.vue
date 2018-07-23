<template>
  <div>
    <button v-on:click="login">Login</button>
    <input placeholder="name" />
    <Loading v-if="isLoading" />
    <PopUp :containerClass="$style.popup">
      <button :class="$style.close">
        <img :src="closeImage" /> 
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
  methods: {
    login: function() {
      this.isLoading = true;
      connect()
        .then(() => {
          this.isLoading = false;
          this.$router.push({ path: 'lobby' });
        });
    }
  },
  data() {
    return {
      isLoading: false,
      closeImage: IMAGE_CLOSE
    }
  }
}
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
