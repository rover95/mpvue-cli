<template>
  <div class="page">
    <div class="head">
      <div class="flex head-row">
        <div class="head-img">
          <open-data type="userAvatarUrl"></open-data>
        </div>
        <div class="head-info">
          <open-data type="userNickName"></open-data>
          <div>天上人间小区</div>
        </div>
      </div>
    </div>

    <div class="row-box">
      <van-cell-group>
        <van-cell
          title="我的位置"
          icon="location"
          is-link
        />
        <van-cell
          title="个人信息"
          icon="manager"
          is-link
        />
         <van-cell
          title="我的记录"
          icon="todo-list"
          is-link
        />
        <van-cell
          title="缴费"
          icon="gold-coin"
          is-link
        />
        <van-cell
          title="联系方式"
          icon="phone"
          is-link
        />
       
      </van-cell-group>
    </div>

    <div class="btn">退出登录</div>

  </div>
</template>

<script type="text/ecmascript-6">
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      
    };
  },
  created() {
    
  },
  onShow(){
    
  },
  components: {},
  computed: {
    
  },
  methods: {
    
  }
};
</script>

<style scoped lang="stylus">

.head{
  position relative
  margin-top -1px
  height 30vh
  background linear-gradient(to bottom, #1af , #09c)
  color #fff
  font-size 28rpx
  .head-row{
    position absolute
    bottom 30rpx
    left 30rpx
  }
  .head-img{
    width 110rpx
    height 110rpx
    border-radius 50%
    border 4px solid #17c
    overflow hidden
    margin-right 30rpx
  }
  .head-info{
    display flex
    flex-direction column
    justify-content center
    div{
      margin-top 10rpx
    }
  }
}
.row-box{
  margin-top 20rpx
}
.btn{
  display block
  text-align center
  background-color #f51
  color #fff
  margin 20rpx 30rpx
  font-size 28rpx
  padding 20rpx 0
  border-radius 6rpx
}

</style>
