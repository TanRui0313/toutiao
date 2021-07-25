/**
 * 封装tokens本地储获取删除
 */
/**
 * 获取
 */
export const getItem = key => {
  const data = window.localStorage.getItem(key);
  try {
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
};
/**
 * 储存
 */
export const setItem = (key, value) => {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(key, value);
};
/**
 * 删除
 */
export const removeItem = key => {
  console.log(key);
  window.localStorage.removeItem(key);
};
