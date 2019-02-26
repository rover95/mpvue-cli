
<template>
  <div class='card-body'>
    <div class="card-head">
      <div class="card-title">{{listData.title}}</div>
      <div
        class="card-subheading"
        v-if="listData.date"
      >{{listData.date}}</div>
    </div>
    <div class="card-content">
      <noData
        v-if="!listData.rows.length>0"
        :show="true"
      ></noData>
      <div
        v-if="listData.rows.length>0"
        class="list fs28"
      >
        <div class="list">
          <!-- 表头 -->
          <div v-if="listData.headIsObj" class="head fles-align-start">
            <div :style="'flex:'+listData.flex[idxH]" v-for="(cellName,idxH) in listData.head" :key="idxH"  class="flex flex-v flex-text">
              <p class="fs28">{{cellName.name}}</p>
              <p v-if="cellName.unit" class="fs24 c-9 fw-300">{{cellName.unit}}</p>
            </div>
          </div>
          <div v-else class="head">
            <div
              :style="'flex:'+listData.flex[idxH]"
              v-for="(cellName,idxH) in listData.head"
              :key="idxH"
              class="flex flex-v flex-text"
            >
              <p class="fs28">{{cellName}}</p>
            </div>
          </div>
          <!-- 表身 -->
          <div
            v-if="listData.rows.length>0"
            class="list-body"
            :style="listData.maxHight?limitHight:''"
          >
            <div>
              <div
                v-for="(row,idxRow) in listData.rows"
                :key="idxRow"
                class="row"
              >
                <p
                  :style="'flex:'+listData.flex[idxCell]"
                  class="cell"
                  v-for="(cell,idxCell) in row.rowData"
                  :key="idxCell"
                >{{cell}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
import noData from "@/components/noData";

export default {
  data() {
    return {};
  },
  props: ["listData"],
  created() {
    console.log(this.listData);
  },
  computed: {
    limitHight() {
      return `height: ${this.listData.maxHight};overflow: scroll;`;
    }
  },
  components: {
    noData
  },
  methods: {}
};
</script>

<style scoped lang="stylus">

.card-body {
  position: relative;
  width: 686rpx;
  background-color: white;
  margin: 32rpx auto;
  border-radius: 15rpx;
  border: none;
  box-shadow: 0 6rpx 30rpx rgba(218, 223, 235, 0.65);
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
  padding: 48rpx;
}

.list {
  background-color: #fff;
  border-radius: 12rpx;
  font-size: 40rpx;

  .head {
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    padding-bottom: 20rpx;
    font-size: 28rpx;
    font-weight: 700;
    color: #222;

    div {
      width: 33.333%;
    }
  }
  .fles-align-start{
    align-items flex-start
  }
  .list-body {
    // height 40vh
    // overflow scroll
  }

  .row {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 104rpx;
    overflow: hidden;
    // line-height 104rpx
    border-top: 1px solid #eee;

    .cell {
      text-align: center;
      width: 33.333%;
    }
  }
}

.row {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 104rpx;
  line-height: 104rpx;
  font-size: 28rpx;
  border-top: 1px solid #eee;

  .cell {
    text-align: center;
    width: 33.333%;
    line-height: 30rpx;
    max-height: 104rpx;
    color: rgba(0, 0, 0, 0.85);
  }
}
</style>
