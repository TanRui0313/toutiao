/*
*登录页面功能实现 
*/

<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon slot="left" name="cross" @click="$router.back()" />
    </van-nav-bar>
    <van-form ref="loginFrom" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="formAuthentication.mobile"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        required
        clearable
        type="number"
        name="code"
        placeholder="请输入验证码"
        :rules="formAuthentication.code"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <!-- 发送验证码按钮 -->
        <template #button>
          <van-count-down
            slot="button"
            :time="1000 * 10"
            format="ss 秒后再次发送验证码"
            @finish="isCountDownShow = false"
            v-if="isCountDownShow"
          />
          <van-button
            v-else
            native-type="button"
            class="send-sms-btn"
            round
            size="small"
            type="default"
            @click="sendCodeHandler"
            >发送验证码</van-button
          >
        </template></van-field
      >
      <!-- 登录按钮 -->
      <div class="login-btn-wrap">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getCode } from "@/api";
import { createNamespacedHelpers } from "vuex";
const { mapMutations } = createNamespacedHelpers("user");
export default {
  name: "LoginPage",
  data() {
    return {
      user: {
        mobile: "",
        code: "",
      },
      // 表单验证规则
      formAuthentication: {
        mobile: [
          {
            required: true,
            message: "请填写用户名",
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          {
            required: true,
            message: "请填写验证码",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
      // 计时器显示与隐藏
      isCountDownShow: false,
    };
  },
  methods: {
    ...mapMutations(["updateTokens"]),
    // 登录按钮
    async onSubmit() {
      // console.log("submit", values);
      // 登录加载
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: "登录中...", // 提示消息
      });

      try {
        let res = await login(this.user);
        console.log("点击登录成功", res);
        // 登录成功提示
        this.$toast.success("登录成功");
        // 将登录成功后返回的tokens储存到本地
        this.updateTokens(res.data.data);
        // 登录成功
        this.$router.back();
      } catch (err) {
        if (err.response.status === 400) {
          // console.log("登录失败");
          //  提示 success 或者 fail 的时候，会先把其它的 toast 先清除
          this.$toast.fail("登录失败，手机号或验证码错误");
        } else {
          console.log("登录失败，请稍后重试", err);
        }
      }
    },
    // 发送验证码
    async sendCodeHandler() {
      try {
        await this.$refs.loginFrom.validate("mobile");
      } catch (err) {
        return console.log("验证失败", err);
      }
      // 点击显示计时器
      this.isCountDownShow = true;
      try {
        let res = await getCode(this.user.mobile);
        console.log("点击发送验证码成功", res);
        this.$toast("验证码发送成功");
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false;
        if (err.response.status === 429) {
          // console.log("登录失败");
          //  提示 success 或者 fail 的时候，会先把其它的 toast 先清除
          this.$toast("发送太频繁，请稍后再试");
        } else {
          this.$toast("验证码发送失败", err);
        }
      }
    },
  },
};
</script>
<style scoped lang="less">
.login-container {
  .van-icon {
    color: #fff;
  }
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>