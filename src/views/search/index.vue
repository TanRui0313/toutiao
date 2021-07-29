<template>
  <div class="search-container">
    <!-- 搜索栏》事件监听 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        background="#3296FA"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索历史记录 -->
    <search-result v-if="isResultShow" />
    <!-- /搜索历史记录 -->

    <!-- 联想建议 -->
    <search-suggestion v-else-if="searchText" :searchText="searchText" />
    <!-- /联想建议 -->

    <!-- 搜索结果 -->
    <search-history v-else />

    <!-- 搜索结果 -->
  </div>
</template>

<script>
import SearchHistory from "./components/search-history";
import SearchSuggestion from "./components/search-suggestion";
import SearchResult from "./components/search-result";
export default {
  name: "search-container",
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult,
  },
  data() {
    return {
      isResultShow: false,
      searchText: "",
    };
  },

  created() {},

  methods: {
    onSearch(val) {
      console.log(val);
      this.isResultShow = true;
    },
    onCancel() {
      this.$router.back();
    },
  },
};
</script>

<style scoped lang='less'>
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>
