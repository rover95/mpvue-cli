<template>
  <div style="padding-bottom:100rpx">
    <!-- 循环行 -->
    <div v-for="(row,idxRow) in menuData" :key="idxRow">
      <div class="t-row">
        {{row.rowName}}
      </div>
      <!-- 循环cell -->
      <div class="menu-box">
        <div v-for="(cell, idxCell) in row.cells" :key="idxCell">
          <a v-if="cell.url" :href="cell.url">
            <menuCard  :isVoid="cell.isVoid || false" :imgPath="cell.imgPath" :title="cell.name"></menuCard>
          </a>
          <div v-else style="position: relative">
            <div class="cover" v-if="!cell.isVoid"></div>
            <menuCard  :isVoid="cell.isVoid || false" :imgPath="cell.imgPath" :title="cell.name"></menuCard>
          </div>
        </div>

        

      </div>
    </div>

    <!-- 上报问题 -->
    <div class="t-row">
      便民服务
    </div>
    <div class="menu-box">
      <div>
        <button open-type="getUserInfo" @getuserinfo="getUserInfo" @click="onClickUserInfo">
          <menuCard imgPath="/static/img/icon_menu/icon_wh.png" title="上报问题"></menuCard>
        </button>
      </div>
      <div>
        <button @click="goInfoPage">
          <menuCard imgPath="/static/img/icon_menu/icon_pl.png" title="我的问题"></menuCard>
        </button>
      </div>
      <div>
        <menuCard :isVoid="true"></menuCard>
      </div>
    </div>
    
  </div>
</template>

<script type="text/ecmascript-6">
import menuCard from "../components/menuCard";
import API from "@/store/flyio/apiUrl";
import Vue from 'vue'

export default {
  data() {
    return {
      menuData:[
        {
          rowName:'生态环境',
          cells:[
            {
              url:null,
              name: '自然保护',
              imgPath:'/static/img/icon_menu/icon_sy.png'
            },
            {
              url:'./ecotope/airQuality',
              name: '空气质量',
              imgPath:'/static/img/icon_menu/icon_kq.png'
            },
            {
              url:'./ecotope/waterQuality',
              name: '水质质量',
              imgPath:'/static/img/icon_menu/icon_sd.png'
            },
          ]
        },
        {
          rowName:'社会治理',
          cells:[
            {
              url:'./social/cityManagement',
              name: '数字城管',
              imgPath:'/static/img/icon_menu/icon_cg.png'
            },
            {
              url:null,
              name: '危货监测',
              imgPath:'/static/img/icon_menu/icon_wh.png'
            },
            {
              url:'./social/smartSite',
              name: '智慧工地',
              imgPath:'/static/img/icon_menu/icon_gd.png'
            },
          ]
        },
        {
          rowName:'民生事业',
          cells:[
            {
              url:'./livelihood/publicSentiment',
              name: '民情反馈',
              imgPath:'/static/img/icon_menu/icon_person.png'
            },
            {
              url:null,
              name: '政府扶持',
              imgPath:'/static/img/icon_menu/icon_zf.png'
            },
            {
              url:'./livelihood/smartToilet',
              name: '智慧公厕',
              imgPath:'/static/img/icon_menu/icon_gc.png'
            },
          ]
        },
        {
          rowName:'产业经济',
          cells:[
            {
              url:null,
              name: '企业统计',
              imgPath:'/static/img/icon_menu/icon_qy.png'
            },
            {
              url:null,
              name: '经济指标',
              imgPath:'/static/img/icon_menu/icon_q.png'
            },
            {
              isVoid:true
            }
          ]
        },
        // {
        //   rowName:'便民服务',
        //   cells:[
        //     {
        //       url:'./workflow/templateList',
        //       name: '问题上报',
        //       imgPath:'/static/img/icon_menu/icon_wh.png'
        //     },
        //     {
        //       isVoid:true
        //     },
        //     {
        //       isVoid:true
        //     }
        //   ]
        // }
      ]
    }
  },
  created() {
    return {

    }
  },
  components: {
    menuCard
  },
  methods: {
    //跳转评论页
    goInfoPage(){
      let openid = wx.getStorageSync('openid');
      let workflowUserInfo = wx.getStorageSync('workflowUserInfo');
      if(workflowUserInfo){
        let pageUser = workflowUserInfo.auth?'adminUser':'ordinaryUser';
        wx.navigateTo({
          url:`/pages/workflow/list?pageUser=${pageUser}`
        })
      }else{
        if(openid){
          this.userLogin(openid)
        }else{
          this.getOpenId();
        }
      }
      
    },
    // 获取openid
    getOpenId(){
      wx.login({
        success:(res)=> {
          if (res.code) {
            console.log(res.code);
            wx.request({
              url: API.getOpenId.replace('{code}',res.code),
              success:res=>{
                console.log(res);
                wx.setStorageSync('openid', res.data.openid);
                this.userLogin(res.data.openid);
                
              }
            })
          } else {
            console.log('微信用户验证失败' + res.errMsg)
          }
        }
      })
    },
    //用户登录
    userLogin(openId){
      let data = {username:openId,password:'000000'}
      Vue.iBox
      .http(API.workflowLogin,data)({
        method: "post"
      })
      .then(res => {
        console.log(res);
          if(res.authorized){
            let Authorization=null;
            // let encodeBasic = `Basic ${btoa(encodeURIComponent(`${data.username}:${data.password}`))}`;
            let encodeBasic = 'Basic '+ Buffer(`${data.username}:${data.password}`).toString('base64');
            console.log(encodeBasic)
            wx.setStorageSync('workflowUserInfo',{
              auth:false,
              username: data.username,
              Authorization: encodeBasic
            })
            this.goInfoPage();
          }else{
            wx.showToast({
              title: '用户信息获取失败',
              icon: 'none',
            })
          }
      }).catch(err=>{
        console.log(err);
        wx.showToast({
          title: '用户信息获取失败',
          icon: 'none',
        })
      });
    },
    //获取用户信息
    getUserInfo(e){
      console.log(e);
      let storageUserInfo = wx.getStorageSync('wxUserInfo');
      // if(storageUserInfo){
      //   return
      // }
      let userInfo = e.mp.detail.userInfo;
      if(userInfo){
        wx.setStorageSync('wxUserInfo',userInfo);
        wx.navigateTo({
          url:'/pages/workflow/templateList'
        })
      }else{
         wx.showToast({
            title: '授权失败',
            icon: 'none',
          })
      }
      
    },
    //如果有本地用户数据先跳转了再说
    onClickUserInfo(){
      // let userInfo = wx.getStorageSync('wxUserInfo');
      // if(userInfo){
      //   wx.navigateTo({
      //     url:'/pages/workflow/templateList'
      //   })
      // }
    },
  }
}
</script>

<style scoped lang="stylus">
.t-row{
  width 100%
  padding 48rpx 0
  text-align center
  font-size 28rpx
  color rgba(0, 0, 0, 0.45)
}
.menu-box{
  
  display flex
  justify-content space-between
  align-items center
  padding 0 34rpx
  .cover{
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    background-color rgba(244,245,248,0.9)
    border-radius 6rpx
    z-index 9
  }
}
.menu-cell{
  margin 0 34rpx
}
</style>
