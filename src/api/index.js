/**
 * 导出请求
 */
import user from "./user";
import article from "./article";
import search from "./search";
// 登录请求
export const login = user.login;
export const getCode = user.getCode;
export const getUser = user.getUser;
// 请求用户频道
export const getUserChannels = article.getUserChannels;
// 请求频道文章
export const getUserArticles = article.getUserArticles;
// 请求全部频道
export const getAllChannels = article.getAllChannels;
// 添加我的频道的请求方法
export const addUserChannel = article.addUserChannel;
// 删除用户频道
export const deleteUserChannel = article.deleteUserChannel;
// 搜索建议提示
export const getSearchSuggestion = search.getSearchSuggestion;
