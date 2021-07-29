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
        to="/search"
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
          <i
            @click="isEditChannelShow = true"
            class="toutiao toutiao-gengduo"
          ></i>
        </div>
      </template>
    </van-tabs>
    <!-- 频道编辑 -->
    <van-popup
      class="edit-channel-popup"
      v-model="isEditChannelShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <channel-edit
        @update-active="onMyChannelHandler"
        :active="active"
        :myChannels="channels"
      ></channel-edit>
    </van-popup>
    <!-- /频道编辑 -->
  </div>
</template>
<script>
import { getUserChannels } from "@/api";
import ArticleList from "./components/article-list.vue";
import ChannelEdit from "./components/channel-edit.vue";
import { mapGetters } from "vuex";
import { getItem } from "@/utils/storage";
export default {
  name: "HomePage",
  components: { ArticleList, ChannelEdit },
  props: {},
  data() {
    return {
      active: 0,
      channels: [],
      isEditChannelShow: false,
    };
  },
  created() {
    this.loadUserChannels();
  },
  computed: {
    ...mapGetters(["tokens"]),
  },
  methods: {
    //获取用户频道
    async loadUserChannels() {
      try {
        let channles = [];
        const localChannels = getItem("TOUTIAO_CHANNELS");
        if (this.tokens || !localChannels) {
          // 登录 或者 本地没有存储 获取后端数据
          const { data } = await getUserChannels();
          this.channels = data.data.channels;
          return false;
        } else {
          // 未登录并且本地没有数据
          channles = localChannels;
          // console.log("未登录并且本地没有数据");
        }
        this.channels = channles;
      } catch (err) {
        console.log("列表请求失败", err);
      }
    },
    // 我的频道点击跳转
    onMyChannelHandler(index, isEditChannelShow) {
      this.active = index;
      // 隐藏频道编辑
      this.isEditChannelShow = isEditChannelShow;
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
  .edit-channel-popup {
    padding-top: 100px;
    box-sizing: border-box;
  }
  .active {
    color: red;
  }
}
</style>