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
    // console.log(1);
    return request({
      method: "GET",
      url: "/app/v1_1/articles",
      params
    });
  },
  // 全部频道请求
  getAllChannels() {
    return request({
      method: "GET",
      url: "/app/v1_0/channels"
    });
  },
  // 添加我的频道的请求方法
  addUserChannel(channel) {
    // console.log("添加频道");
    return request({
      method: "PATCH",
      url: "/app/v1_0/user/channels",
      data: {
        channels: [channel]
      }
    });
  },
  // 删除用户频道
  deleteUserChannel(channelId) {
    return request({
      method: "DELETE",
      url: `/app/v1_0/user/channels/${channelId}`
    });
  },
  // 文章详情请求
  getArticleById(articleId) {
    console.log("文章详情");
    return request({
      method: "GET",
      url: "/app/v1_0/articles/" + articleId
    });
  }
};
