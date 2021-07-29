<template>
  <div class="home-container">
    <!-- 搜索框 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 滑动列表 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <!-- 文章列表 -->
        <article-list :channel="item" />
      </van-tab>
      <template #nav-right>
        <div class="placeholder"></div>
        <div class="hamburger-btn">
          <i @click="show = true" class="toutiao toutiao-gengduo"></i>
        </div>
      </template>
    </van-tabs>
  </div>
</template>
<script>
import { getUserChannels } from "@/api";
import ArticleList from "./components/article-list.vue";
export default {
  name: "HomePage",
  components: { ArticleList },
  props: {},
  data() {
    return {
      active: 0,
      channels: [],
    };
  },
  created() {
    this.loadUserChannels();
  },
  methods: {
    async loadUserChannels() {
      try {
        const { data } = await getUserChannels();
        console.log(data);
        this.channels = data.data.channels;
      } catch (err) {
        console.log("列表请求失败", err);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  padding-bottom: 100px;
  padding-top: 180px;

  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
      color: aliceblue;
    }
  }
  /deep/ .channel-tabs {
    .van-tabs__nav {
      padding: 0;

      .van-tab {
        min-width: 200px;
        height: 80px;
        border-right: 1px solid #edeff3;
        .van-tab__text {
          font-size: 28px;
          color: #777777;
        }
      }
      .van-tab--active .van-tab__text {
        color: #333 !important;
      }
      .van-tabs__line {
        width: 31px !important;
        height: 6px;
        background: rgba(50, 150, 250, 1);
        border-radius: 3px;
        bottom: 8px;
      }
    }
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 2;
      width: 100%;
    }
  }
  .placeholder {
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }
  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 68px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;
    i.toutiao {
      font-size: 33px;
    }
    &:before {
      content: "";
      position: absolute;
      left: 0;
      width: 1px;
      height: 100%;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
}
</style>