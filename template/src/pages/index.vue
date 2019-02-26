<template>
  <div class="page">
    <swiper style="height: 40vw;" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
      :circular="circular" :duration="duration">
      <block v-for="(item, j) in images" :key="j">
        <swiper-item>
          <image :src="item.url" class="slide-image" mode="scaleToFill" :data-url="item.url" />
        </swiper-item>
      </block>
    </swiper>

    <div style="margin:10rpx 0;">
      <van-notice-bar
        left-icon="volume-o"
        text="各位业主注意，由于管道维修小区将下月一号停水一天，请相互转告"
      />
    </div>
    
    
    <van-cell
      title="松盛花园小区-1栋408"
      value="切换"
      is-link
      :border="false"
    />
    <div class="flex data-row">
      <div class="flex-text flex-v data-cell" v-for="(item,i) in energyData" :key="i">
        <div class="name">{{item.name}}</div>
        <div class="value" :style="item.color?'color:'+item.color:''">{{item.value}}</div>
        <div class="unit" :style="item.color?'color:'+item.color:''">{{item.unit}}</div>
      </div>
      <a href="./energyUsage/energyUsage" class="flex-text">
        <div class="fs28">历史数据</div>
        <van-icon name="arrow" />
      </a>
    </div>

    <div class="flex data-row">
      
      <div class="flex-text flex-v data-cell" v-for="(item,i) in envData" :key="i">
        <div class="name">{{item.name}}</div>
        <div class="value" :style="item.color?'color:'+item.color:''">{{item.value}}</div>
        <div class="unit">{{item.unit}}</div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
// import { mapState, mapActions } from 'vuex'
import { mapState, mapActions } from 'vuex'



export default {
  data() {
    return {
      indicatorDots: true,
      circular: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      envData:[
        {
          name:'PM2.5',
          value:'98',
          color:'#f44',
          unit:'μg/m3'
        },
        {
          name:'二氧化碳',
          value:'7.5',
          unit:'μg/m3'
        },
        {
          name:'甲醛',
          value:65,
          unit:'μg/m3'
        },
        {
          name:'温度',
          value:16,
          unit:'°C'
        },
        {
          name:'湿度',
          value:64,
          unit:'%RH'
        },
      ],
      energyData:[
        {
          name:'今日用水',
          value:3.1,
          color:'#fc1',
          unit:'吨'
        },
        {
          name:'今日用电',
          value:10.1,
          color:'#f33',
          unit:'度'
        },
        {
          name:'一氧化碳',
          value:0,
          unit:'安全',
          color:'#1d3'
        },
      ],
      images:[
        {
          url:'http://img5.imgtn.bdimg.com/it/u=1598181894,1714655447&fm=15&gp=0.jpg'
        },
        {
          url:'http://img4.imgtn.bdimg.com/it/u=3615685430,928832598&fm=26&gp=0.jpg'
        },
        {
          url:'http://img5.imgtn.bdimg.com/it/u=1856680407,167071694&fm=15&gp=0.jpg'
        },
      ],
    }
  },
  computed: {
  },
  created() {
  },
  onLoad() {
    console.log(this.$store);
    const { dispatch } = this.$store;
    
  },
  components: {
  },
  methods: {
    
  },
}
</script>

<style scoped lang="stylus">
.page{
    box-sizing border-box
    background-color #eee
    padding-bottom 40px
    box-sizing border-box
    min-height 100vh
    .data-row{
      display flex
      justify-content space-around
      align-items center
      padding 15px
      margin-top 1px
      background-color #fff
      .data-cell{
        .name{
          font-size 16px
        }
        .value{
          font-size 24px
          color #1af
        }
        .unit{
          font-size 12px
          color #999
        }
      }
    }
    .dataName{
      font-size: 12px;
      display: inline-block;
      text-align: right;
      width: 50px;
    }
    .dataStyle{
      color: aqua;
      font-weight: 500;
      text-shadow: 0px 0px 10px aqua;
    }
    .slide-image{
      width: 100vw;
      height: 100%;
    }
    .menu-box{
      background-color #fff
      padding 20rpx 40rpx
      margin-bottom 10rpx
      .menu-row{
        display flex
        justify-content space-between
        align-content center
        margin-top 20rpx
        .cell{
          width 50px
        }
      }
    }
    .cell{
      display flex
      flex-direction column
      justify-content center
      align-items center
      font-size 24rpx
      color #333
      // margin 0 34rpx
      .img-box{
        display flex
        justify-content center
        align-items center
        width 80rpx
        height 80rpx
        margin-bottom 16rpx
        // background-color #159
        border-radius 50% 
        img{
          width 40rpx
          height 40rpx
        }
      }
      
    }
  }
</style>

