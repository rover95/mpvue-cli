<template>
  <div>
    <div v-if="!isVoid" class="cell">
      <div class="img-box" :style="'background-color:'+bgcolor">
        <img :src="imgPath" alt="">
      </div>
      <p>{{title}}</p>
    </div>
    <div v-else class="cell voidBox"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      
    }
  },
  props:['imgPath','title','isVoid','bgcolor'],
  created() {
    
  },
  components: {

  },
  methods: {

  }
}
</script>

<style scoped lang="stylus">
.cell{
  display flex
  flex-direction column
  justify-content center
  align-items center
  font-size 28rpx
  width 206rpx
  height 208rpx
  // margin 0 34rpx
  background rgba(244,245,248,1)
  border-radius 6rpx
  .img-box{
    display flex
    justify-content center
    align-items center
    width 90rpx
    height 88rpx
    margin-bottom 16rpx
    // background-color #159
    border-radius 50% 
    img{
      
      width 50rpx
      height 50rpx
    }
  }
  
}
.voidBox{
  background-color rgba(0,0,0,0)
}
</style>
