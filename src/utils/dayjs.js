import dayjs from "dayjs";
import Vue from "vue";

import "dayjs/locale/zh-cn";

dayjs.locale("zh-cn");

import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

// 全局过滤器：处理相对时间
Vue.filter("relativeTime", value => {
  return dayjs().to(dayjs(value));
});
