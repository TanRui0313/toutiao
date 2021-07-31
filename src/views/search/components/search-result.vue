<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearch } from "@/api";
export default {
  name: "SearchResult",
  components: {},
  props: {
    searchText: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        const { data } = await getSearch({
          page: this.page, // 页码
          per_page: this.perPage, // 每页大小
          q: this.searchText, // 搜索关键字
        });
        console.log(data);
        this.list.push(...data.data.results);
        this.loading = false;
        if (data.data.results.length) {
          this.page++;
        } else {
          this.finished = true; // 没有数据了，将加载状态设置结束，不再 onLoad
        }
      } catch (err) {
        this.error = true;
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="less"></style>
