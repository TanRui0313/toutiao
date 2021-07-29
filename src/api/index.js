/**
 * 导出请求
 */
import user from "./user";
import article from "./article";
// 登录请求
export const login = user.login;
export const getCode = user.getCode;
export const getUser = user.getUser;
// 用户频道文章请求
export const getUserChannels = article.getUserChannels;
export const getUserArticles = article.getUserArticles;
