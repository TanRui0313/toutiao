<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(item, index) in suggestion"
      :key="index"
      @click="$emit('search', item)"
    >
      <template #title>
        <span v-html="highlight(item)"></span>
      </template>
      <template #icon>
        <van-icon name="search"></van-icon>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from "@/api";
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  components: {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      suggestion: [],
    };
  },
  computed: {},
  watch: {
    searchText: {
      handler: debounce(function (val) {
        this.loadSearchSuggestion(val);
      }, 1000),
      immediate: true,
    },
  },
  created() {},
  methods: {
    async loadSearchSuggestion(q) {
      const { data } = await getSearchSuggestion(q);
      console.log(data);
      this.suggestion = data.data.options;
    },
    highlight(item) {
      const highlightStr = `<span class="active">${this.searchText}</span>`;
      const reg = new RegExp(this.searchText, "gi");
      // text.replace(/匹配的内容/gi, highlightStr)
      return item.replace(reg, highlightStr);
    },
  },
};
</script>

<style scoped lang="less">
.search-suggestion {
  /deep/.active {
    color: deepskyblue;
  }
}
</style>