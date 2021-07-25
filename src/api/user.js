/*
 *封装登录的请求方法
 */
import request from "@/utils/request";

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
    console.log("发送验证码请求成功");
    return request({
      method: "GET",
      url: `/app/v1_0/sms/codes/${mobile}`
    });
  }
};
