<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div v-if="tokens" class="userInfo header">
      <!-- 基本信息 -->
      <div class="base">
        <div class="left">
          <van-image fit="cover" :src="user.photo" class="avatar" round />
          <span class="name">{{ user.name }}</span>
        </div>
        <div class="right">
          <van-button type="default" size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <!-- 粉丝、关注 -->
      <div class="data">
        <div class="data-item">
          <span>{{ user.art_count }}</span>
          <span>头条</span>
        </div>
        <div class="data-item">
          <span>{{ user.follow_count }}</span>
          <span>关注</span>
        </div>
        <div class="data-item">
          <span>{{ user.fans_count }}</span>
          <span>粉丝</span>
        </div>
        <div class="data-item">
          <span>{{ user.like_count }}</span>
          <span>获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录 -->
    <div v-else class="login header">
      <img
        class="mobile-img"
        src="~@/assets/mobile.png"
        @click="$router.push('/login')"
      />
      <span class="text">
        <span @click="$router.push('/login')">登录 / </span>
        <span>注册</span>
      </span>
    </div>
    <!-- 收藏，历史 -->
    <van-grid class="nav-grid" :column-num="2" clickable>
      <van-grid-item text="收藏">
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
        <span class="text" slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item text="文字">
        <template #icon>
          <i class="toutiao toutiao-lishi"></i>
        </template>
        <span class="text" slot="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!--小智同学  -->
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <!-- 退出按钮 -->
    <van-cell
      v-if="tokens"
      @click="onLogout"
      class="logout-cell"
      title="退出登录"
      center
    />
  </div>
</template>

<script>
import { getUser } from "@/api";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("user");
export default {
  name: "MyPage",
  data() {
    return {
      user: "",
    };
  },

  computed: {
    ...mapState(["tokens"]),
  },
  created() {
    // 如果用户登录了，则请求加载用户信息数据
    if (this.tokens) {
      this.loadUserInfo();
    }
  },
  methods: {
    ...mapMutations(["removeTokens"]),
    onLogout() {
      this.$dialog
        .confirm({
          title: "确认退出吗？",
        })
        .then(() => {
          this.removeTokens();
          // this.$store.commit("removeTokens", null);
        })
        .catch();
    },
    async loadUserInfo() {
      try {
        const res = await getUser();
        // console.log(res);
        this.user = res.data.data;
        console.log(this.user);
      } catch (error) {}
    },
  },
};
</script>

<style lang="less" scoped>
.my-container {
  // 点击登录
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .mobile-img {
      width: 132px;
      height: 132px;
    }
    .text {
      font-size: 28px;
      color: #fff;
    }
  }
  // 用户界面
  .userInfo {
    .base {
      height: 231px;
      padding: 76px 32px 23px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 2px solid #fff;
        }
        .name {
          font-size: 29px;
          margin-left: 22px;
        }
      }
    }
    .data {
      display: flex;
      //水平平分
      justify-content: space-around;
      .data-item {
        height: 130px;
        display: flex;
        // align-items: center;
        justify-content: center; //上下平分
        flex-direction: column; //元素在垂直排列
        color: #fff;
        span:nth-child(1) {
          font-size: 36px;
          margin-bottom: 15px;
        }
        span:nth-child(2) {
          font-size: 23px;
        }
      }
    }
  }
}
// 收藏历史
.nav-grid {
  background: #fff;
  .toutiao {
    font-size: 45px;
  }
  .toutiao-shoucang {
    color: #eb5253;
  }
  .toutiao-lishi {
    color: #ff9d1d;
  }
  .text {
    color: #000;
    margin-top: 8px;
    font-size: 28px;
  }
}
// 退出按钮
.logout-cell {
  height: 100px;
  text-align: center;
  color: #eb5253;
  margin: 10px 0;
  font-size: 30px;
}
</style>