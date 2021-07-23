/*
 *封装登录的请求方法
 */
import request from "@/utils/request";

export default {
  login(data) {
    return request({
      url: "app/v1_0/authorizations",
      method: "POST",
      data
    });
  }
};
