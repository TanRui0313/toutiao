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
    <search-result v-if="isResultShow" :searchText="searchText" />
    <!-- /搜索历史记录 -->

    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      @search="onSearch"
      :searchText="searchText"
    />
    <!-- /联想建议 -->

    <!-- 搜索结果 -->
    <search-history
      v-else
      :searchHistories="searchHistories"
      @search="onSearch"
      @delAllHistories="searchHistories = []"
    />

    <!-- 搜索结果 -->
  </div>
</template>

<script>
import SearchHistory from "./components/search-history";
import SearchSuggestion from "./components/search-suggestion";
import SearchResult from "./components/search-result";
import { setItem, getItem } from "@/utils/storage";
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
      searchHistories: getItem("searchHistories") || [],
    };
  },
  watch: {
    searchHistories(val) {
      // console.log(val);
      setItem("searchHistories", val);
    },
  },
  methods: {
    onSearch(val) {
      console.log(val);
      this.searchText = val;
      const index = this.searchHistories.indexOf(val);
      // console.log(index);//-1
      if (index !== -1) {
        this.searchHistories.splice(index, 1);
      }
      this.searchHistories.unshift(val);
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
  padding-top: 106px;
  .van-search {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-search__action {
    color: #fff;
  }
}
</style>
