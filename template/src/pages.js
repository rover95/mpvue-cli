//格式化引用路径
function importVant(vantUI, FsUI) {
  let obj = {};
  if (!Array.isArray(vantUI)) {
    return {}
  }
  vantUI.map(val => {
    obj[`van-${val}`] = `../../static/vant/${val}/index`;
  })
  if (FsUI){
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
      usingComponents: {
        "ff-canvas": "../../static/f2-canvas/f2-canvas"
      }
    }
  },
  {
    path: "pages/menu"
  },
  {
    path: "pages/person",
    config: {
      usingComponents: importVant(["cell-group", "cell","collapse","collapse-item"])
    }
  },
  
];
