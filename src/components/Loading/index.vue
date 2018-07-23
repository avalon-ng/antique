<template>
  <div v-if="isInner" class="className">
    <div class="spinner" />
  </div>
  <div v-else class="loading">
    <div class="spinner" />
  </div>
</template>

<script>
export default {
  props: {
    type: String
  },
  data: function() {
    return {
      isInner: this.type === 'inner'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.loading {
	width: 100vw;
	height: 100vh;
	position: fixed;
	background-color: rgba(0, 0, 0, 0.5);
	top: 0;
	left: 0;
	z-index: 99999;
	display: flex;
	justify-content: center;
	align-items: center;
}

.loading-inner {
  width: 100%;
  height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

@-webkit-keyframes rotate-forever {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-moz-keyframes rotate-forever {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotate-forever {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.spinner {
  -webkit-animation-duration: 0.75s;
  -moz-animation-duration: 0.75s;
  animation-duration: 0.75s;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-name: rotate-forever;
  -moz-animation-name: rotate-forever;
  animation-name: rotate-forever;
  -webkit-animation-timing-function: linear;
  -moz-animation-timing-function: linear;
  animation-timing-function: linear;
  height: 30px;
  width: 30px;
  border: 8px solid white;
  border-right-color: transparent;
  border-radius: 50%;
  display: inline-block;
}

.spinner {
	display: flex;
}
</style>
