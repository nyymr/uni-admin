<template>
  <div class="login">
    <div class="wrapper">
      <header>
        <h3>UNI-ADMIN</h3>
      </header>
      <section>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-form-item prop="username">
            <el-input
              v-model="ruleForm.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              style="width: 100%; background: #339999; color: #fff"
              @click="submit"
              v-show="!loading"
              >立即登录</el-button
            >
            <el-button
              style="width: 100%; background: #339999; color: #fff; margin: 0"
              v-show="loading"
              :loading="loading"
              >登录中…</el-button
            >
          </el-form-item>
        </el-form>
      </section>
    </div>
    <div id="loading" style="display: none"></div>
  </div>
</template>
<script>
import { login } from "../../api/login";
export default {
  data() {
    return {
      ruleForm: {},
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      loading: false,
    };
  },
  methods: {
    submit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.onLogin();
        } else {
          return false;
        }
      });
    },
    onLogin() {
      login(this.ruleForm.username, this.ruleForm.password)
        .then((res) => {
          console.log(res);
          this.loading = false;
          if (res.msg == "ok") {
            this.$message({
              message: "登录成功",
              type: "success",
            });
            let token = res.data.token;
            this.$store.dispatch("changeSetUser", res.data);
            this.$store.dispatch("changeSetToken", token);
            this.$router.push({ path: "/" });
          }
        })
        .catch((err) => {
          this.loading = false;
          this.$message({
            type: "error",
            message: "登录失败",
          });
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  .wrapper {
    width: 400px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 100px auto;
    header {
      padding: 12px 0;
      border-bottom: 1px solid #ccc;
      h3 {
        font-size: 24px;
        color: #6c757d;
        text-align: center;
        font-weight: 700;
      }
    }
    section {
      padding: 20px;
    }
  }
}
</style>