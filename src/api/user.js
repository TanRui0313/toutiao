/*
 *封装登录的请求方法
 */
import request from "@/utils/request";
import store from "@/store";
export default {
  // 登录请求
  login(data) {
    return request({
      url: "app/v1_0/authorizations",
      method: "POST",
      data
    });
  },
  // 发送验证码请求
  getCode(mobile) {
    // console.log("发送验证码请求成功");
    return request({
      method: "GET",
      url: `/app/v1_0/sms/codes/${mobile}`
    });
  },
  // 获取用户信息
  getUser() {
    // console.log("获取用户信成功");
    return request({
      url: "/app/v1_0/user",
      method: "GET",
      headers: {
        Authorization: `Bearer ${store.state.user.tokens.token}`
      }
    });
  }
};
