export default {
  // 关于接口loading的配置
  loading: {
    limitTime: 0, // 接口请求在xxxms内完成则不展示loading
    loadingShow: () => {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
    },
    loadingHide: () => {
      wx.hideLoading()
    }
  },
  // 接口请求的默认配置
  reqConfig: {
    isLoading: true, // 是否展示loading，默认为true
    isErrorDefaultTip: true, // 是否展示默认错误提示，默认为true
    errorAction: false // 是否使用自定义的错误处理方法，默认为false，如设置true则需在views层catch错误
  },
  // fly的默认配置
  flyConfig: {
    method: 'get'
  },
  // 运行成功的判别标识  例如res.returnCode === '0'即成功
  resSuccess: {
    // key: 'error_code', // 与后台规定的表示响应成功的变量
    // value: 0 // 与后台规定的表示响应成功code
  },
  // 异常情况
  resError: {
    // 异常默认提示的方法
    tipShow: (err) => {
      let errInfo = null;
      try {
        errInfo = err.response.data.message;
      } catch (error) {
        
      }
      wx.showToast({
        title: (err && errInfo) || "请求失败",
        icon: "none",
        mask: true
      });
    }
  }
}
