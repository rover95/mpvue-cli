// components/img-upload.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    fileArr: {
      type: String,
      value: []
    },
    id: { type: String},
    maxFile:{
      type: Number,
      value:9
    },
    hasVideo:{
      type: Boolean,
      value: false
    },
    maxFileSize:{
      type:Number,
      value:2
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgArr: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /* 照片/相机 */
    setCamIma() {
      if (this.data.imgArr.length < 9) {
        wx.showActionSheet({
          itemList: this.data.hasVideo ? ["图片", "视频"] : ["图片"],
          success: res => {
            if (!res.cancel) {
              if (res.tapIndex == 0) {
                this.chooseWxImage("album");
              } else {
                this.chooseWxVideo("camera");
              }
            }
          }
        });
      } else {
        wx.showToast({
          title: "达到最大上传数量",
          icon: "none"
        });
      }
    },

    chooseWxImage(type) {
      wx.chooseImage({
        count: this.data.maxFile - this.data.imgArr.length,
        sizeType: ["compressed"],
        // sourceType: [type],
        success: res => {
          console.log(res);
          
          let tempImgArr = [];
          for (let i in res.tempFiles){
            let file = res.tempFiles[i]
            if (file.size <= this.data.maxFileSize * 1024*1024) {
              tempImgArr.push({ path: file.path, isVideo: false });
            } else {
              wx.showToast({
                title: `仅能上传${
                  this.data.maxFileSize
                }MB以下的文件`,
                icon: "none"
              });
            }
          }
          this.setData({
            imgArr: this.data.imgArr.concat(tempImgArr)
          });
          this.imgArrChange()
        }
      });
    },
    chooseWxVideo(type) {
      wx.chooseVideo({
        // sourceType: [type],
        count: 1,
        maxDuration: 60,
        camera: "back",
        success: res => {
          console.log(res);
          let tempImgArr = [];
          if (res.size <= this.data.maxFileSize * 1024 * 1024) {
            tempImgArr.push({ path: res.tempFilePath, isVideo: true });
          } else {
            wx.showToast({
              title: `仅能上传${
                this.data.maxFileSize
                }MB以下的文件`,
              icon: "none"
            });
          }
          this.setData({
            imgArr: this.data.imgArr.concat(tempImgArr)
          });
          this.imgArrChange()
        }
      });
    },

    previewImage(e) {
      let url = [];
      for (let i in this.data.imgArr) {
        url.push(this.data.imgArr[i].path);
      }
      wx.previewImage({
        current: this.data.imgArr[e.currentTarget.dataset.index].path,
        urls: url
      });
    },
    /* 删除图片 */
    deleteImg(e) {
      let index = e.currentTarget.dataset.index;
      let imgs = this.data.imgArr;
      imgs.splice(index, 1);
      this.setData({
        imgArr: imgs,
      });
      this.imgArrChange();
    },
    //触发自定义事件返回当前图片列表
    imgArrChange(){
      this.triggerEvent("onFileChang", { id:this.id, file: this.data.imgArr});
    },
    /* 文件上传 */
    uploadFile(i, length) {
      wx.showLoading({ title: "上传中..." });
      wx.uploadFile({
        url: getApp().globalData.imageUrl +
          "_file-server/upload?token=" +
          this.data.TOKEN,
        filePath: this.data.Image[i],
        name: "file",
        success: res => {
          console.log(
            getApp().globalData.imageUrl +
              "_file-server/upload?token=" +
              this.data.TOKEN
          );
          console.log(res);
          if (res.statusCode == 200) {
            let path = JSON.parse(res.data);
            let Image = this.data.Image;
            Image[i] = path.uploaded;
            this.setData({
              Image: Image,
              imageRender: Image.map(val => {
                let obj = {
                  image: val,
                  isImage: true
                };
                if (val.match(/\.mp4/)) {
                  obj.isImage = false;
                }
                return obj;
              })
            });
          } else {
            let path = JSON.parse(res.data);
            let Image = this.data.Image;
            Image.splice(i, 1);
            this.setData({
              Image: Image,
              imageRender: Image.map(val => {
                let obj = {
                  image: val,
                  isImage: true
                };
                if (val.match(/\.mp4/)) {
                  obj.isImage = false;
                }
                return obj;
              })
            });
          }
        },
        fail: err => {
          wx.showToast({ title: "上传失败", icon: "none" });
        },
        complete: res => {
          wx.hideLoading();
          i++;
          if (i == length) {
            this.setData({
              isChange: true
            });
          } else {
            this.uploadDIY(i, this.data.Image.length);
          }
        }
      });
    }
  }
});
