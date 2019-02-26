<template>
  <div style="padding-bottom:100rpx">
    <!-- 循环cell -->
      <div class="menu-box">
        <div v-for="(cell, idxCell) in menuData[0].cells" :key="idxCell" style="margin-top:34rpx" class="cell">
          <a v-if="cell.url" :href="cell.url">
            <menuCard  :isVoid="cell.isVoid || false" :imgPath="cell.imgPath" :bgcolor="cell.bgcolor" :title="cell.name"></menuCard>
          </a>
          <div v-else style="position: relative">
            <div class="cover" v-if="!cell.isVoid"></div>
            <menuCard  :isVoid="cell.isVoid || false" :imgPath="cell.imgPath" :title="cell.name"></menuCard>
          </div> 
          
        </div>

        <div style="margin-top:34rpx" class="cell" @click="addMenu">
          <menuCard  :isVoid="addBtn.isVoid || false" :imgPath="addBtn.imgPath" :bgcolor="addBtn.bgcolor" :title="addBtn.name"></menuCard>
        </div>

      </div>

      <!-- 菜单选择弹出层 -->
      <van-popup :show="pickerShow" @close="onClose" position="bottom" :overlay="true">
        <van-checkbox-group :value="result" @change="onChange">
          <van-cell-group >
            <van-cell
              v-for="(item,index) in list"
              :key="index"
              :title="item"
              clickable
              :data-name="item"
            >
              <van-checkbox :class="'checkboxes-'+ item" :name="item" />
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </van-popup>
      
    
  </div>
</template>

<script type="text/ecmascript-6">
import menuCard from "../components/menuCard";
import API from "@/store/flyio/apiUrl";
import Vue from 'vue'

export default {
  data() {
    return {
      list: ['a', 'b', 'c'],
      result: ['a', 'b'],
      pickerShow: false,
      menuData:[
        {
          // rowName:'菜单行',
          cells:[
            {
              url:'./comingSoon',
              name: '人员定位',
              bgcolor:'#cf1',
              imgPath:'/static/img/icon_menu/icon_dw.png'
            },
            {
              url:'./comingSoon',
              name: '我的小区',
              bgcolor:'#f16',
              imgPath:'/static/img/icon_menu/icon_xq.png'
            },
            {
              url:'./comingSoon',
              name: '房产管理',
              // isVoid:true,
              bgcolor:'#95f',
              imgPath:'/static/img/icon_menu/icon_fc.png'
            },
            {
              url:'./comingSoon',
              name: '账号关联',
              bgcolor:'#d7c',
              imgPath:'/static/img/icon_menu/icon_gl.png'
            },
            {
              url:'./comingSoon',
              name: '有线电视',
              bgcolor:'#19d',
              imgPath:'/static/img/icon_menu/icon_ds.png'
            },
            {
              url:'./comingSoon',
              name: '车位管理',
              // isVoid:true,
              bgcolor:'#d72',
              imgPath:'/static/img/icon_menu/icon_cw.png'
            },
          ]
        },
      ],
      addBtn:{
        url:'./comingSoon',
        name: '',
        bgcolor:'#eee',
        imgPath:'/static/img/icon_menu/icon_add.png'
      },
    }
  },
  created() {
    this.renderMenu = this.menuData
  },
  components: {
    menuCard
  },
  methods: {
    onClose() {
      this.pickerShow = false;
    },
    addMenu(e){
      console.log(e);
      this.pickerShow = true;
    },
    onChange(event) {
      
      this.result = event.mp.detail
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
  // justify-content space-between
  flex-wrap wrap
  align-items center
  padding 0 20rpx
  .cell{
    display flex
    justify-content center
    width 33.333%
    box-sizing border-box
  }
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

</style>
