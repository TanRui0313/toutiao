<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template v-if="isDeleteShow">
        <span @click="$emit('delAllHistories')">全部删除</span>
        <span @click="isDeleteShow = false">完成</span>
      </template>
      <van-icon name="delete" v-else @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index"
      @click="delHistories(item, index)"
    >
      <van-icon name="close" v-show="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isDeleteShow: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    delHistories(item, index) {
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1);
      } else {
        this.$emit("search", item);
      }
    },
  },
};
</script>

<style scoped lang="less"></style>
