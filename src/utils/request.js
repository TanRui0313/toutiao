/*
 *封装 axios 请求模块
 */
import axios from "axios";

const request = axios.create({
  //配置基准请求路径
  baseURL: "http://ttapi.research.itcast.cn/"
});

export default request;
