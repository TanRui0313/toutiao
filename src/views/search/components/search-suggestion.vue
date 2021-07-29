<template>
  <div class="search-suggestion">
    <van-cell v-for="(item, index) in suggestion" :key="index" :title="item">
      <template #icon>
        <van-icon name="search"></van-icon>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from "@/api";
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
      handler(val) {
        console.log(val);
        //触发搜索建议事件
        this.loadSearchSuggestion(val);
      },
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
  },
};
</script>

<style scoped lang="less"></style>