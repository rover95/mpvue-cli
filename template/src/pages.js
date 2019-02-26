//格式化引用路径
function importVant(vantUI, FsUI) {
  let obj = {};
  if (!Array.isArray(vantUI)) {
    return {}
  }
  vantUI.map(val => {
    obj[`van-${val}`] = `../../static/vant/${val}/index`;
  })
  if (FsUI) {
    FsUI.map(val => {
      obj[val] = `../../static/fs-ui/${val}/index`;
    });
  }
  return obj

}

module.exports = [
  // {
  //   path: "pages/counter", // 页面路径，同时是 vue 文件相对于 src 的路径
  // },
  {
    path: "pages/index", // 页面路径，同时是 vue 文件相对于 src 的路径
    config: {
      usingComponents: importVant(["notice-bar", "icon", "cell"])
    }
  },
  {
    path: "pages/menu",
    config: {
      usingComponents: importVant([
        "icon",
        "checkbox-group",
        "checkbox",
        "popup",
        "cell",
        "cell-group"
      ])
    }
  },
  {
    path: "pages/comingSoon",
    config: {
      usingComponents: importVant(["icon"])
    }
  },
  {
    path: "pages/person",
    config: {
      navigationBarBackgroundColor: "#1af",
      navigationBarTitleText: "个人中心",
      navigationBarTextStyle: "light",
      usingComponents: importVant([
        "icon",
        "cell-group",
        "cell",
        "collapse",
        "collapse-item"
      ])
    }
  },
];
