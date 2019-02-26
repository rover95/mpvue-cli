import Vue from 'vue'
import API from "../../flyio/apiUrl";
const state = {
  user: null,
};
// 登录
const LOGIN_SUCCESS = "LOGIN_SUCCESS";


const mutations = {
  LOGIN_SUCCESS:(state,res)=>{
    const obj = state;
    obj.user = res
  },
};

const actions = {
  login({ commit },data) {
    let url = API.login
    return Vue.iBox.http(url,data)({
      method: 'post'
    }).then(function (res) {
      commit(LOGIN_SUCCESS,res);
      wx.setStorageSync('user',res);
      return res
    }, function (err) {
      console.log(err)
      return err
    })
  },
}

export default {
  state,
  mutations,
  actions
};