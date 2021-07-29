/*
 *封装搜索的请求方法
 */
import request from "@/utils/request";
export default {
  //  搜索提示建议
  getSearchSuggestion(q) {
    // console.log("搜索建议");
    return request({
      method: "GET",
      url: "/app/v1_0/suggestion",
      params: {
        q
      }
    });
  }
};
