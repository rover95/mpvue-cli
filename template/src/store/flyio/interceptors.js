import Fly from 'flyio'
const request = new Fly()
const user = wx.getStorageSync('user')
// const workflowUserInfo = wx.getStorageSync("workflowUserInfo");



const buildUrl = url => {
  if (user == null) {
    return apiurl;
  }
  let connector = url.indexOf('?') === -1 ? '?' : '&';
  return `${url}${connector}token=${user.token}`;
};


request.interceptors.request.use((request) => {
  request.url = buildUrl(request.url);
  let Authorization;
  // if (workflowUserInfo) {
  //   Authorization = workflowUserInfo.Authorization;
  // }else{
  //   let userInfo = wx.getStorageSync("workflowUserInfo");
  //   Authorization = userInfo.Authorization;
  // }
  let userInfo = wx.getStorageSync("workflowUserInfo");
  Authorization = userInfo.Authorization;
  request.headers = { Authorization };

  return request
})

request.interceptors.response.use(
  (response, promise) => {
    return promise.resolve(response.data)
  },
  (err, promise) => {
    return promise.reject(err)
  }
)
export default request
