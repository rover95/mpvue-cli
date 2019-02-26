<template>
  <div>
    <!-- rtmp摄像头 -->
    <block wx:for="{{rtmpVideoList}}" wx:key="k">
      <block style="width:100%;height:488rpx;">
        <!-- 播放ing -->
        <view style="width:100%;height:400rpx; position:relative;" wx:if="{{rtmpVideoList[index].isPlaying}}">
          <live-player style="width:100%;height:100%;" id="{{'rtmp'+item.id}}" mode="live" src="{{item.yingshi.rtmpAddress}}" bindfullscreenchange="onYsFullScreenChange" autoplay bindstatechange="videoStateChange"
            object-fit="fillCrop">
            <cover-view bindtap='openYsFullScreenBtn' style="width:100%; height: 393rpx; position:absolute;" data-index='{{index}}' />
            <cover-view wx:if="{{showFullScreenBtn[index]}}" style="flex: 1;width:100%;height:95rpx;background:{{fullBcakground}};position:absolute;bottom:0px;left:0;right:0;display:flex;align-items:center;justify-content: space-between;">
              <cover-view class='bottom_box' style="padding-left:30rpx;">
                <cover-view class="bottom_button" />
              </cover-view>
              <cover-view class='bottom_box' style="display:flex;align-items:center;width:33rpx;padding-right:30rpx;" data-videoid="{{'rtmp'+item.id}}" bindtap='onYsFullScreenClick'
                data-index='{{index}}'>
                <cover-image class="bottom_button" style="width:33rpx;height:33rpx;" src="../../images/fullscreen.png" />
              </cover-view>
            </cover-view>
          </live-player>
        </view>
        <!-- 待播放 -->
        <view style="width:100%;height:400rpx;background:rgb(0,0,0); position:relative; display: flex;justify-content: center;align-items: center;"
          wx:if="{{!rtmpVideoList[index].isPlaying}}">
          <image class="playActive" style="width:100rpx;height:100rpx;" src="../../images/toPlay.png" data-videoid="{{'rtmp'+item.id}}" data-index='{{index}}' bindtap='playRtmpLive'
          />
        </view>
        <!-- 摄像头名称 -->
        <view class='play-info-container'>
          <view class='paly-name'>实时视频</view>
          <view class='paly-name' style="color:rgb(138,138,138);font-size:26rpx;" data-index='{{index}}'>{{item.name}}</view>
        </view>
      </block>
    </block>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      ipc: [
        {
          id: 129,
          name: "模拟厂房",
          type: "yingshi",
          rtmp:
            "rtmp://rtmp.open.ys7.com/openlive/cd2289e5f717498ba6457e7989538000.hd\t",
          stations: [{ id: 1195, name: "123", factorId: 1 }],
          originalModel: {
            id: 129,
            name: "模拟厂房",
            channelNo: 1,
            hasPTZ: false,
            longitude: null,
            latitude: null,
            nvr: {
              id: null,
              name: null,
              address: null,
              vendor: null,
              username: null,
              password: null,
              channelsTotal: null
            },
            p2p: { uid: null, userName: null, password: null },
            yingshi: {
              serialNo: "559441054\t",
              rtmpAddress:
                "rtmp://rtmp.open.ys7.com/openlive/cd2289e5f717498ba6457e7989538000.hd\t",
              hlsAddress:
                "http://hls.open.ys7.com/openlive/cd2289e5f717498ba6457e7989538000.hd.m3u8\t"
            },
            pushServer: { id: null, name: null, address: null },
            stations: [{ id: 1195, name: "123", factorId: 1 }],
            type: "yingshi"
          }
        }
      ]
    };
  },
  created() {},
  components: {},
  methods: {}
};
</script>

<style scoped lang="stylus">
</style>
