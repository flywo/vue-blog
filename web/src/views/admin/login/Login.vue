<template>
  <div class="l-back">
    <div class="box">
      <h1>登录</h1>
      <el-form :model="model" status-icon :rules="rules" ref="form">
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="model.username"
            clearable
            placeholder="请输入用户名"
            onkeyup="value=value.replace(/[^\w_]/g,'')"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="model.password"
            clearable
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="button">
            <el-button type="primary" @click="login">登录</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { post } from "@/request/request.js";
export default {
  name: "AdminLogin",
  data() {
    return {
      model: {
        username: null,
        password: null,
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名！",
            trigger: "blur",
          },
          { min: 5, max: 10, message: "长度在5到10个字符！", trigger: "blur" },
        ],
        password: [
          {
            required: true,
            message: "请输入密码！",
            trigger: "blur",
          },
          { min: 5, max: 10, message: "密码长度不正确！", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          post(
            "/user/login",
            null,
            {
              username: this.model.username,
              password: this.model.password,
            },
            false,
            true,
            () => {
              this.$message.success("登录成功！");
              this.$router.push("/admin-list");
            }
          );
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.l-back {
  display: flex;
  height: 100%;
  width: 100%;
  .box {
    margin: auto;
    width: 300px;
    background-color: white;
    box-shadow: 0 16px 32px 0 rgba(0, 0, 0, 0.08);
    border-radius: 32px;
    padding: 20px;
    h1 {
      font-size: 40px;
    }
    .button {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  }
}
</style>