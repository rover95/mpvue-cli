<template>
  <div class="page">

    
    
    <div class="head">
      <div class="flex flex-v flex-text up" :style="'background-color:'+headBgColor+';color:'+headColor">
        <div class="title">{{palce}}南昌县空气质量</div>
        <div class="fs24">省内{{state.provinceRank}}名</div>
          <div style="width:100%;height:384rpx;margin-top:60rpx">
              <ff-canvas
              id="f2-chart-pie"
              canvas-id="f2-chart-pie"
              :opts="opts"
            ></ff-canvas>
          </div>
          
          
        <div class="fs24" style="margin-bottom:48rpx">{{dataDate}}</div>
      </div>
      <div class="flex flex-pack-justify down">
        <div class="flex flex-v flex-text cell">
          <p class="fs28 fc-7">综合指数</p>
          <p class="fs36 fw-500">{{compositeIndex}}</p>
        </div>
        <div class="flex flex-v flex-text cell">
          <p class="fs28 fc-7">首要污染物</p>
          <p class="fs36 fw-500">{{mainPollute}}</p>
        </div>
      </div>
    </div>

    <!-- 监测项卡片 -->
    <div class="item">
      <div v-for="(i, index) in cardItems" v-bind:key="index" class="flex flex-align-center cell">
        <div class="info">
          <p class="info-before" :style="'background-color:'+i.color"></p>
          
          <p class="fs36">{{i.value}} <span class="fs20">{{i.unit}}</span> </p>
          <p class="fs28 fc-7">{{i.name}}</p>
        </div>
      </div>
    </div>

    <!-- <listCard :listData="listData"></listCard> -->
    <!-- <listCard v-if="listData" :listData="listData"></listCard> -->
    <!-- 超标统计 -->
    <div class='card-body' v-if="listData">
      <div class="card-head">
        <div class="card-title">{{listData.title}}</div>
        <div
          class="card-subheading"
          v-if="listData.date"
        >{{listData.date}}</div>
      </div>
      <div class="card-content">
        <div class="list fs28">
          <div class="list">
            <div class="head">
              <!-- <div :style="'flex:'+listData.flex[idxH]" v-for="(cellName,idxH) in listData.head" :key="idxH"  class="flex flex-v flex-text">
                <p class="fs28">{{cellName}}</p>
              </div> -->
              <div style="flex:2" class="flex flex-v flex-text">
                <p class="fs28">工地名称</p>
              </div>
              <div style="flex:1" class="flex flex-v flex-text">
                <p class="fs28">PM2.5</p>
                <p class="fs24 c-9">>{{pm25LevelValue}}</p>
              </div>
              <div style="flex:1" class="flex flex-v flex-text">
                <p class="fs28">PM10</p>
                <p class="fs24 c-9">>{{pm10LevelValue}}</p>
              </div>
              
            </div>
            <div v-if="listData.rows.length>0" class="list-body" :style="listData.maxHight?limitHight:''">
              <div>
                <div  v-for="(row,idxRow) in listData.rows" :key="idxRow" class="row">
                  <p :style="'flex:'+listData.flex[idxCell]" class="cell" v-for="(cell,idxCell) in row.rowData" :key="idxCell">{{cell}}</p>
                </div>

              </div>
              
            </div>
            <noData v-if="!listData.rows.length>0" :show="true" ></noData>
            
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// import { mapState, mapActions } from 'vuex'
import { mapState, mapActions } from 'vuex'
import listCard from "../components/listCard";
import { loginInfo } from "@/config";
import { formatTime } from "@/utils/index";
import noData from "@/components/noData";
import complateF2 from "@/utils/chart/complateF2";
const F2 = complateF2()

let chart = null;
function pieChart(canvas, width, height, data, config) {
    let padding = config && config.padding ? config.padding : [0, 0, 0, 0];
    let unit = config && config.unit ? config.unit : '';
    let innerRadius = (config && config.innerRadius) ? config.innerRadius: 0;

    chart = new F2.Chart({
        el: canvas,
        width,
        height,
        padding: padding,
    });

    if (config && config.content) {
        chart
          .guide()
          .text({
            position: ["50%", "55%"],
            content: config.content.value,
            offsetY: -15,
            style: {
              fontSize: config.content.fontSize_val || 18,
              fill: config.content.color,
              fontWeight: "bolder",
              textAlign: "center",
              textBaseLine: "middle"
            }
          });
        chart
          .guide()
          .text({
            position: ["50%", "55%"],
            content: config.content.lable,
            offsetY:20,
            style: {
              fontSize: config.content.fontSize_lab || 12,
              fill: config.content.color,
              textAlign: "center",
              textBaseLine: "middle"
            }
          });
    }
    let startAngle = 6 * Math.PI / 8
    let endAngle = 18 * Math.PI /8
    chart.source(data);
    chart.axis(false);
    chart.tooltip(false)
    chart.legend(false);
    // chart.interaction('pie-select');
    chart.coord("polar", {
      transposed: true,
      innerRadius: innerRadius,
      radius: 1,
      startAngle,
      endAngle 
    });
    let pieColor = '#ffffff';
    let pieBg = 'rgba(255,255,255,0.3)';
    if(config.content.color && config.content.color != "#fff"){
      pieColor = '#111';
      pieBg = 'rgba(0,0,0,0.3)'
    }
    chart
        .interval()
        .position("const*ratio")
        .color('memo', [pieColor,pieBg])
        .adjust("stack");
    chart.render();

    return chart;
}


export default {
  data() {
    return {
      opts: {
        lazyLoad: true
      },
      pm25LevelValue:75,
      pm10LevelValue:150,
      AQIColor:[
        "#999",
        "#00E400",
        "#FFFF00",
        "#FF7E00",
        "#FF0000",
        "#99004C",
        "#7E0023"
      ],
      AQILevel:['无','优','良','轻度污染','中度污染','重度污染','严重污染'],
      headBgColor:'#999',
      headColor:'#fff',
      place:'南昌县',
      // rank:'--',
      compositeIndex:'--',
      mainPollute:'--',
      AQI:'--',
      dataDate:'--',
      cardItems:[
        {
          name:'PM2.5',
          value:'--'
        },
        {
          name:'PM10',
          value:'--'
        },
        {
          name:'SO2',
          value:'--'
        },
        {
          name:'NO2',
          value:'--'
        },
        {
          name:'O3',
          value:'--'
        },
        {
          name:'CO',
          value:'--'
        },
      ],
      listData:null,
      dayDate: formatTime(new Date()),
    }
  },
  computed: {
    ...mapState({
      state: state=>state['home/home']
    }),
    
    // ...mapState('home/home',['user']),
  },
  created() {
  },
  onLoad() {
    console.log(this.$store);
    const { dispatch } = this.$store;
    //登录
    dispatch("login",loginInfo).then((res)=> {
      console.log(res);
      // console.log(this.state.user,this.$store,this.$store.state['home/home'].user);
    });
 
    
    
  },
  components: {
    listCard,
    noData
  },
  methods: {
    //渲染仪表盘
    renderPieChart(val,level){
      let data = [
          {
              ratio: val,
              memo: "AQI",
              const: "const"
          },
          {
              ratio: 500-val,
              memo: "总数",
              const: "const"
          },
      ];
      if(level>6){
        level = 6
      }
      this.headBgColor = this.AQIColor[level];
      this.headColor = this.AQIColor[level] == "#FFFF00"?"#111":"#fff"
      let config = {
        content:{
          lable:this.AQILevel[level],
          value:val,
          fontSize_val:40,
          color:this.headColor,
          fontSize_lab:14
        },
        innerRadius:0.8
      }
      
      this.$mp.page
        .selectComponent("#f2-chart-pie")
        .init((canvas, width, height) => {
          pieChart(canvas, width, height, data,config);
        });

        
        
    },
    //渲染排名列表
    renderRankList(res){
      let listData ={
        title: '工地扬尘超标统计',
        date: this.dayDate,
        flex:[2,1,1],
        head: ['工地名称','PM2.5','PM10'],
        rows: []
      }
      let rows = res.filter(val=>{
        if(val.pm2_5>this.pm25LevelValue || val.pm10>this.pm10LevelValue){
          return true
        }else{
          return false
        }
      })

      listData.rows = rows.map((val, idx) => {
          return {
            rowData: [val.name, val.pm2_5,val.pm10]
          }
      });
      this.listData = listData
    },
  },
}
</script>

<style scoped lang="stylus">
  .page{
    padding 32rpx
    box-sizing border-box
    background-color #eee
    min-height 100vh
    .head{
      border-radius 12rpx
      overflow hidden
      margin-bottom 26rpx
      .up{
        color #fff
        min-height 50vh
        padding-top 32rpx
        background-color #0d0
        .title{
          display block
          font-size 32rpx
        }
      }
      .down{
        background-color #fff
        .cell{
          height 140rpx
          width 50%
          text-align center
        }
      }
    }
    .list-body{
      // padding 48rpx;
    }
    .item{
      display flex
      flex-wrap wrap
      justify-content space-between
      .cell{
        width 332rpx
        height 140rpx
        margin-top 22rpx
        border-radius 12rpx
        background-color #fff

        .info{
          position relative
          display flex
          justify-content center
          height 100%
          flex-direction column
          padding-left 136rpx
          .info-before{
          // content ''
          display inline-block
          position absolute
          top 46rpx
          left 40rpx
          width 48rpx
          height 48rpx
          background-color #0d0
          border-radius 50%
        }
        }
        
      }
    }
    .list{
      background-color #fff
      border-radius 12rpx
      font-size 40rpx
      .head{
        display flex
        justify-content space-around
        align-items center
        text-align center
        // padding-bottom 20rpx
        font-size 28rpx
        font-weight 700
        color #222
        div{
          width 33.333%
        }
      }
      .list-body{
        // height 40vh
        // overflow scroll
      }
      .row{
        display flex
        justify-content space-around
        align-items center
        height 104rpx
        overflow hidden
        // line-height 104rpx
        border-top 1px solid #eee
        .cell{
          text-align center
          width 33.333%

        }
      }
    }
    .row{
      display flex
      justify-content space-around
      align-items center
      height 104rpx
      line-height 104rpx
      font-size 28rpx
      border-top 1px solid #eee
      .cell{
        text-align center
        width 33.333%
        line-height 30rpx
        max-height 104rpx
        color rgba(0, 0, 0, 0.85)
      }
    }
  }
.card-body {
  position: relative;
  width: 686rpx;
  background-color: white;
  margin: 32rpx auto;
  border-radius: 15rpx;
  border none;
  box-shadow 0 6rpx 30rpx rgba(218, 223, 235, 0.65)
}
.card-head {
  text-align: center;
  padding: 32rpx 0;
  border-bottom: 2rpx solid #f2f4f7;
}

.card-title {
  height: 44rpx;
  font-size: 32rpx;
  font-weight: 600;
  opacity: 0.7;
}

.card-subheading {
  height: 34rpx;
  font-size: 24rpx;
  opacity: 0.45;
}

.card-content {
  padding: 20rpx 48rpx;
}
</style>

