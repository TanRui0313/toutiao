<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      :success-text="successtext"
      :success-duration="1500"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(item, index) in articles"
          :key="index"
          :title="item.title"
        /> -->
        <article-item
          v-for="(item, index) in articles"
          :key="index"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getUserArticles } from "@/api";
import ArticleItem from "./article-item.vue";
export default {
  name: "ArticleList",
  components: { ArticleItem },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      articles: [],
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null, // 请求下一页数据的时间戳
      error: false, // 是否加载失败
      isRefreshLoading: false,
      successtext: "",
    };
  },
  created() {},
  methods: {
    // 底部刷新
    async onLoad() {
      // console.log(this.channel);
      try {
        const { data } = await getUserArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1,
        });
        // console.log(data);
        this.articles.push(...data.data.results);
        this.loading = false;
        // 4. 判断数据是否加载结束
        if (data.data.results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp;
        } else {
          // 没有数据了，设置加载状态结束，不再触发上拉加载更多了
          this.finished = true;
        }
      } catch (err) {
        this.loading = false; // 关闭 loading 效果
        this.error = true; // 开启错误提示
      }
    },
    // 下拉刷新
    async onRefresh() {
      try {
        const { data } = await getUserArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1,
        });
        // console.log(data);
        this.articles.unshift(...data.data.results);
        this.isRefreshLoading = false;
        this.successtext = `刷新成功`;
      } catch (err) {
        this.isRefreshLoading = false; // 关闭 loading 效果
        this.$toast("刷新失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.article-list {
  height: 83vh;
  overflow: auto;
}
</style>