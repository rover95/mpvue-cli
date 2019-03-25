<template>
  <div class='little-card-body' :style="subheading == '首要污染物'?'position:relative!important; top:-8rpx!important':''">
    <div
      class="little-card-title"
      style="color:#010101; font-size:23rpx"
      v-if="subheading == '首要污染物'"
    >{{title}}</div>
    <div
      class="little-card-title"
      :style={color}
      v-else
    >{{title}}<span style="font-size:20rpx; color:#010101; opacity:.7"> {{unit}}</span></div>
    <div class="little-card-subheading">{{subheading}}</div>
  </div>
</template>

<script>
export default {
  name: "component-little-card",
  props: ["title", "subheading", "color", "unit"],
  data() {
    return {
      //key:value
    };
  }
};
</script>

<style scoped lang="stylus">
.little-card-body {
  width: 176rpx;
  height: 160rpx;
  text-align: center;
  background-color: #F7F8FB;
  margin: 10rpx;
  display: inline-block;

  .little-card-title {
    font-size: 30rpx;
    font-weight: 500;
    line-height: 56rpx;
    padding-top: 36rpx;
  }

  .little-card-subheading {
    font-size: 24rpx;
    font-weight: 400;
    line-height: 34rpx;
    color: #000000;
    opacity: 0.45;
  }
}
</style>
