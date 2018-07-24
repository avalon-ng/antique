<template>
  <div
    :class="$style.popup"
    @click="closePopUp"
  >
    <div
      :class="[containerClass, $style.container]"
    >
      <slot/>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    'container-class': {
      type: String,
      default: ''
    },
    'on-click-outer': {
      type: Function,
      required: true
    }
  },
  methods: {
    closePopUp: function() {
      this.onClickOuter();
    }
  }
};
</script>

<style lang="less" module>
@import '~styles/device';

.title{
  color: black;
}

.confirm, .cancel {
  user-select: none;
  width: 80px;
  height: 25px;
  color: #EBEBEB;
  font-size: 12px;
  justify-content: center;
  display: flex;
  align-items: center;
  letter-spacing: 3px;
  margin-left: 8px;
  margin-right: 8px;
  cursor: pointer;
}

.close {
  cursor: pointer;
}

.confirm {
  background-color: #3E3A39;
}
.cancel {
  background-color: #898989;
}

@media @desktop {
  .popup {
    z-index: 999;
    background-color:rgba(0, 0, 0, .5); 
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .container {
    width: 650px;
    height: 510px;
    border-radius: 17px; 
    background-color: #F2F2F2; 
  }
  .content-container {
    height: 330px;
    margin-top: 45px;
    margin-left: 68px;
    margin-right: 68px;
    width: calc(100% - 68px * 2);
    background-color: #FFFFFF;
  }
  .content {
    padding: 17px;
    color: #696261;
    font-size: 11px;
    line-height: 20px;
    letter-spacing: 1px;
  }
  .title {
    padding-top: 20px;
    padding-bottom: 10px;
    margin-left: 35px;
    margin-right: 35px;
    width: calc(100% - 35px * 2);
    text-align: center;
    border-bottom: 1px solid #696261;
    font-size: 20px;
    font-weight: 500;
  }
  .bottom {
    display: flex;
    justify-content: center;
    width: 100%;
    padding-top: 25px;
  }
  .close {
    height: 16px;
    position: absolute;
    margin-left: 620px;
    margin-top: 22px;
  }
}


@media @mobile {
  .popup {
    z-index: 999;
    background-color:rgba(0, 0, 0, .5); 
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .container {
    margin-left: 5%;
    margin-right: 5%;
    width: 90%;
    height: 510px;
    border-radius: 17px; 
    background-color: #F2F2F2; 
  }
  .content {
    overflow-y: scroll;
    background-color: #FFFFFF; 
    margin-top: 20px;
    margin-left: calc(17px + 5%);
    width: calc(100% - 17px * 2 - 5% * 2 - 17px * 2 );
    height: 70%;
    color: #696261;
    font-size: 11px;
    line-height: 20px;
    letter-spacing: 1px;
    padding-left: 17px;
    padding-right: 17px;
  }
  .title {
    padding-top: 20px;
    padding-bottom: 10px;
    margin-left: 30px;
    margin-right: 30px;
    width: calc(100% - 30px * 2);
    text-align: center;
    border-bottom: 1px solid #696261;
    font-size: 20px;
    font-weight: 500;
  }
  .bottom {
    display: flex;
    justify-content: center;
    width: 100%;
    padding-top: 25px;
  }
  .close {
    height: 16px;
    right: 8%;
    margin-top: 6%;
    position: absolute;
  }
}
</style>
