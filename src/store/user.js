/**
 * 封装将tokens存储到本地储存
 * 持久化，
 */
const TOUTIAO_TOKENS = "TOUTIAO_TOKENS";
import { getItem, setItem } from "../utils/storage";
export default {
  namespaced: true,
  state: {
    tokens: getItem(TOUTIAO_TOKENS)
  },
  mutations: {
    updateTokens(state, data) {
      console.log("储存tokens成功");
      state.tokens = data;
      setItem(TOUTIAO_TOKENS, data);
    }
  }
};
