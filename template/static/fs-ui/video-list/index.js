// components/img-upload.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    videoList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },
  attached() {
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //播放rtmp视频
    playRtmpLive(e) {
      wx.showLoading({ title: "视频加载中..." });
      let id = e.currentTarget.dataset.videoid;
      let index = e.currentTarget.dataset.index;
      let list = this.data.videoList;
      for (let i in list) {
        list[i].isPlaying = i == index ? true : false;
      }
    
      this.setData({
        videoList: list
      });
      for (let i of this.data.videoList) {
        let videoCtx = wx.createLivePlayerContext("rtmp" + id);
        if ("rtmp" + i.id == id) {
          console.log(videoCtx);

          videoCtx.play();
          this.setData({ videoCtx });
        } else {
          videoCtx.stop();
        }
      }
    },
    //视频状态变化
    videoStateChange(e) {
      console.log("视频code:" + e.detail.code);

      if (e.detail.code == 2004) {
        console.log("视频播放开始");
        wx.hideLoading();
      }
    },
    //
    onYsFullScreenClick: function(e) {
      if (!this.data.fullScreen) {
        let ctx = wx.createLivePlayerContext(e.currentTarget.dataset.videoid);
        console.log(ctx);
        ctx.requestFullScreen({
          direction: 90
        });
        this.setData({
          videoCtx: ctx
        });
      } else {
        this.data.videoCtx.exitFullScreen({});
      }
    },
    onYsFullScreenChange: function(e) {
      this.setData({
        fullScreen: e.detail.fullScreen,
        showCoverHeader: e.detail.fullScreen ? false : true
      });
    },
    openYsFullScreenBtn: function(e) {
      let arr = this.data.showFullScreenBtn;
      arr[e.currentTarget.dataset.index] = !arr[e.currentTarget.dataset.index];
      this.setData({
        showFullScreenBtn: arr
      });
    }
  }
});
