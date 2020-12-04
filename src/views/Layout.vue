<template>
  <div class="layout">
    <el-container class="layout-container">
      <el-header class="layout-header d-flex align-items-center">
        <a class="h5 text-light mb-0 mr-auto">UNI-ADMIN</a>
        <el-menu
          :default-active="active"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="handleSelect"
        >
          <el-menu-item
            v-for="(item, i) in tree"
            :key="i"
            :index="i.toString()"
            >{{ item.name }}</el-menu-item
          >
          <el-submenu index="999">
            <template slot="title">
              <el-avatar
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                size="small"
                style="margin: 0 5px"
              ></el-avatar>
              <span>{{ username }}</span>
            </template>
            <el-menu-item index="9999" @click="onLogout">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            :default-active="$route.path"
            text-color="#000"
            active-text-color="#008080"
            class="el-menu-vertical-demo"
            router
          >
            <el-menu-item
              v-for="item in child"
              :key="item.id"
              :index="'/' + removeIndex(item.frontpath)"
              align="left"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="layout-main">
          <div style="width: 100%"><Crumb></Crumb></div>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>

function setSectionHeight() {
  let section = document.getElementsByTagName("section")[1];
  section.style.height = document.documentElement.clientHeight - 60 + "px";
}
// window.onreset = setSectionHeight();
import { logout } from "../api/login";
import Crumb from "../components/crumb";
export default {
  components: {
    Crumb,
  },
  data() {
    return {
      active: this.$storage.getActive() || "0",
    };
  },
  computed: {
    tree() {
      return this.$store.state.userInfo.tree;
    },
    child() {
      return this.$store.state.userInfo.tree[this.active].child;
    },
    username() {
      return this.$store.state.userInfo.username;
    },
  },
  watch: {
    "$route.path": function (val) {
      if (val == "/index") {
        this.active = "0";
        this.$storage.setActive(this.active);
      }
    },
  },
  mounted() {
    setSectionHeight();
    window.onresize = () => {
      setSectionHeight();
    };
  },
  methods: {
    handleSelect(val) {
      if (parseInt(val) < 10) {
        this.active = val;
        this.$storage.setActive(this.active);
        if (this.child != []) {
          console.log(this.removeIndex(this.child[0].frontpath));
          this.$router.push({
            path: "/" + this.removeIndex(this.child[0].frontpath),
          });
        }
      }
    },
    //退出登录
    async onLogout() {
      const res = await logout();
      console.log(res);
      if (res.msg == "ok") {
        this.$storage.exit();
        this.$store.dispatch("clearVueX");
        this.$router.push("/login");
        this.$message({
          message: "退出成功",
          type: "success",
        });
      }
    },
    //定义去除index方法
    removeIndex(str) {
      //判断最后一个“/”后面的值是不是index
      let lastIndex = str.lastIndexOf("/");
      //截取“/”后面的index
      let val = str.substring(lastIndex + 1, str.length);
      //判断截取'/'后面的值是不是index
      if (val === "index") {
        return str.substring(lastIndex, -1);
      }
      return str;
    },
  },
};
</script>
<style lang="scss" scoped>
.layout-container {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: hidden;
  section {
    height: 100%;
  }
}
.layout-main {
  position: relative;
  > div {
    &:nth-child(2) {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 55px;
    }
  }
}
.layout-header {
  background-color: #545c64;
}
.el-menu {
  min-height: 100%;
}
</style>