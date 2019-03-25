<template>
  <div class="page">
    <div class='card-body'>
      <div class="person-card">
        <div id="person-img-div">
          <img
            id="person-img"
            src="../../static/img/flag.png"
          />
        </div>
        <div id="person-title">
          南昌县人民政府
        </div>
        <div id="person-subheading">
          拼争四个率先，建设五个昌南
        </div>
      </div>

    </div>


    <div v-if="workflowAuth">
      <div class="usernameCell" style="">
        <van-cell
          title="当前用户"
          :value="workflowUsername"
          @click="toListPage"
        />
      </div>
      
       <div class='card-body'>
        <a :href="'/pages/workflow/list?type='+ item.type" v-for="(item,idx) in workList" :key="idx">
          <van-cell
            :title="item.name"
            :value="item.value"
            is-link
            @click="toListPage"
          />
        </a>
        
        <!-- <van-collapse :value="activeNames" @change="onCollapseChange">
          <van-collapse-item :name="item.name" 
            v-for="(item,idx) in workList" :key="idx"
            :title="item.name"
            :value="item.value" >
            <van-cell v-for="(row,i) in item.list" :key="i" is-link :id="idx+'-'+i" :title="row.name || '未命名'" @click="onWorkflowItemClick"></van-cell>
          </van-collapse-item>
        </van-collapse> -->
      </div>
      <div style="margin-top: 30rpx;">
        <div @click="logout" class="btn" style="background-color:#f44">
          退出登录
        </div>
      </div>
    </div>
    
    <div v-else>
      <a href="/pages/workflow/login" class="btn">
        登录
      </a>
      
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      activeNames:[],
      workflowAuth:false,//用户工作流登录状态
      dispatch: this.$store.dispatch,
      workflowUsername:'--',
      workList:[
        {
          name:'待办事项',
          value:'--',
          type:'active',
          list:[]
        },
        {
          name:'已办事项',
          value:'--',
          type:'history',
          list:[]
        }
      ]
    };
  },
  created() {
    // this.initPage();
    
  },
  onShow(){
    let app = getApp();
    // if(app.isPersonPageReload){
    //   this.initPage();
    //   app.isPersonPageReload = false;
    // }
    this.initPage();
    
  },
  components: {},
  computed: {
    ...mapState({
      workflow: state => state["workflow/index"]
    })
  },
  methods: {
    // 退出登录
    logout(){
      wx.removeStorageSync('workflowUserInfo');
      wx.removeStorageSync('wxUserInfo');
      wx.showLoading({
        title: '登出...',
      })
      setTimeout(() => {
        wx.hideLoading();
        this.initPage();
      }, 1000);
    },
    // 获取页面数据
    initPage(){
      try {
        let workflowUser = wx.getStorageSync('workflowUserInfo')
        if(workflowUser.auth){
          this.workflowAuth = true;
          this.workflowUser = workflowUser;
          this.workflowUsername = workflowUser.username;
          this.getWorkflowList();
          this.getHistoryWorkflowList();
        }else{
          this.workflowAuth = false;
        }
      } catch (error) {
        this.workflowAuth = false
      }
    },
    //获取待办任务列表
    getWorkflowList(){
      this.dispatch('getListWillDeal',{username:this.workflowUser.username,start:-1}).then(res=>{
        console.log(res,this.$store);
        this.workList[0].value = this.workflow.listWillDeal.total
        
      })
      // wx.request({
      //   url:`http://10.8.30.35:8887/fs-wfw/rest/runtime/tasks?assignee=${this.workflowUser.username}`,
      //   header:{
      //     Authorization:'Basic a2FmZWl0dTowMDAwMDA='
      //   },
      //   success:res=>{
      //     console.log(res.data);
      //     this.workList[0].value = res.data.size
      //     this.workList[0].list = res.data.data.map(val=>{
      //       val.type = 'active';
      //       return val;
      //     })
      //   }
      // })
    },
    // 获取已办任务列表
    getHistoryWorkflowList(){
      this.dispatch('getListDealt',{username:this.workflowUser.username,start:-1}).then(res=>{
         this.workList[1].value = this.workflow.listDealt.total
      })
      // wx.request({
      //   url:`http://10.8.30.35:8887/fs-wfw/rest/history/historic-process-instances?involvedUser=${this.workflowUser.username}`,
      //   header:{
      //     Authorization:'Basic a2FmZWl0dTowMDAwMDA='
      //   },
      //   success:res=>{
      //     console.log(res.data);
      //     this.workList[1].value = res.data.total
      //     this.workList[1].list = res.data.data.map(val=>{
      //       val.processInstanceId = val.id;
      //       val.type = 'done';
      //       return val;
      //     })
      //   }
      // })
    },
    onWorkflowItemClick(e){
      console.log(e);
      let ids = e.target.id
      let idx = ids.split('-')
      let item = this.workList[idx[0]].list[idx[1]]
      let id = item.id
      let processInstanceId = item.processInstanceId
      wx.navigateTo({
        url:`/pages/workflow/info?type=${item.type}`
      })
    },
    // 折叠面板点击
    onCollapseChange(event) {
      // console.log(event);
      this.activeNames = event.mp.detail
    }
  }
};
</script>

<style scoped lang="stylus">
.btn{
  display block
  text-align center
  background-color #1b4
  color #fff
  margin 0 30rpx
  font-size 28rpx
  padding 25rpx 0
  border-radius 6rpx
}
.person-card {
  text-align: center;

  #person-img-div {
    margin: 104rpx auto 32rpx;

    #person-img {
      width: 140rpx;
      height: 140rpx;
      color: rgba(0, 0, 0, 0.85);
      line-height: 56px;
    }
  }

  #person-title {
    font-size: 40rpx;
    font-weight: 600;
  }

  #person-subheading {
    font-size: 26rpx;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
    line-height: 36px;
    margin: 0rpx auto 104rpx;
  }
}
.usernameCell{
  margin-bottom 30rpx
  margin 0 30rpx
  border-radius 10rpx
  overflow hidden
}
</style>
