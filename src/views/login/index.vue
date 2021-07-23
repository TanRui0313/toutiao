/*
*登录页面功能实现 
*/

<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录" />
    <van-form @submit="onSubmit">
      <van-field v-model="user.mobile" name="用户名" placeholder="用户名">
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        required
        clearable
        type="number"
        name="密码"
        placeholder="密码"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-button class="send-sms-btn" round size="small" type="default"
            >发送验证码</van-button
          >
        </template></van-field
      >
      <div class="login-btn-wrap">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from "@/api";
export default {
  name: "LoginPage",
  data() {
    return {
      user: {
        mobile: "",
        code: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      // console.log("submit", values);
      try {
        let res = await login(this.user);
        console.log(res);
      } catch (err) {
        if (err.response.status === 400) {
          console.log("登录失败");
        }
      }
    },
  },
};
</script>
<style scoped lang="less">
.login-container {
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