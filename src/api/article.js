/*
 *封装频道文章请求方法
 */
import request from "@/utils/request";

export default {
  // 请求用户频道
  getUserChannels() {
    return request({
      method: "GET",
      url: "/app/v1_0/user/channels"
    });
  },
  // 请求频道文章
  getUserArticles(params) {
    console.log(1);
    return request({
      method: "GET",
      url: "/app/v1_1/articles",
      params
    });
  }
};
