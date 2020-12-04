<template>
  <div class="album">
    <el-container class="album_conatiner">
      <!-- 顶部表单 -->
      <el-header>
        <el-form :inline="true" :model="searchMap" class="demo-form-inline">
          <el-form-item>
            <el-select
              v-model="searchMap.order"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in sort"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="searchMap.keyword"
              placeholder="请输入图片名称"
              size="mini"
              style="margin: 0 20px; width: 180px"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="onSearch" size="mini"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
        <div>
          <el-button
            v-show="removeIds.length"
            type="success"
            size="mini"
            @click="cancelActive"
            >取消选中</el-button
          >
          <el-button
            v-show="removeIds.length"
            type="danger"
            size="mini"
            @click="openRemoveAll"
            >批量删除</el-button
          >
          <el-button type="success" @click="addClass" size="mini"
            >创建相册</el-button
          >
          <el-button type="warning" size="mini" @click="openUpload"
            >上传图片</el-button
          >
        </div>
      </el-header>
      <!-- 图片上传弹窗 -->
      <!-- ==================================================================================================================== -->
      <el-dialog title="收货地址" :visible.sync="upload.show">
        <div class="upload-wrapper w-100 text-center">
          <el-upload
            class="upload-demo"
            drag
            accept="image/*"
            action="/dev-api/admin/image/upload"
            :data="{ image_class_id: id }"
            :headers="{ token: $store.state.token }"
            name="img"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </div>
      </el-dialog>
      <!-- ==================================================================================================================== -->
      <!-- 主体 -->
      <el-container class="album_main">
        <!-- 侧边相册分类 -->
        <el-aside width="200px">
          <ul>
            <li
              :class="
                id == item.id
                  ? 'list-group-item list-group-item-action d-flex align-items-center sum-active'
                  : 'list-group-item list-group-item-action d-flex align-items-center'
              "
              v-for="(item, index) in albumListData.list"
              :key="index"
              @click="getImageListData(item.id)"
            >
              <div class="categroy_title">{{ item.name }}</div>
              <el-dropdown
                class="ml-auto"
                @command="handleCommand"
                @visible-change="getAlbumId(item.id)"
              >
                <span class="el-dropdown-link btn btn-light btn-sm border">
                  {{ item.images_count
                  }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">修改</el-dropdown-item>
                  <el-dropdown-item command="b">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>
        </el-aside>
        <!-- 主体 -->
        <el-main>
          <!-- <AlbunList
            :imageListData="imageListDat"
            :refreshParams="{ id: id, searchMap: searchMap, imagePage }"
          ></AlbunList> -->
          <div class="albunlist">
            <div
              v-for="(item, index) in imageListData"
              :key="index"
              class="el-card box-card mb-3 position-relative is-hover-shadow"
            >
              <div class="box">
                <div
                  :class="
                    item.active == true
                      ? 'border h-100 border-danger'
                      : 'border h-100'
                  "
                >
                  <span
                    v-show="item.active == true"
                    class="badge badge-danger"
                    style="position: absolute; right: 0px; top: 0px"
                    >{{ item.activeNum }}</span
                  >
                  <img
                    :src="item.url"
                    class="w-100"
                    style="height: 110px"
                    @click="changeActive(item.id, index)"
                  />
                  <div class="p-2 text-center">
                    <el-button-group>
                      <el-button
                        size="mini"
                        icon="el-icon-view"
                        @click="seeImg(item.url)"
                      ></el-button>
                      <el-button
                        size="mini"
                        icon="el-icon-edit"
                        @click="editImg(item.name, item.id)"
                      ></el-button>
                      <el-button
                        size="mini"
                        icon="el-icon-delete"
                        @click="deleteImg(item.id)"
                      ></el-button>
                    </el-button-group>
                  </div>
                </div>
                <p
                  class="w-100 text-white px-1"
                  style="
                    background: rgba(0, 0, 0, 0.5);
                    margin-top: -25px;
                    position: absolute;
                    bottom: 47px;
                    left: 1px;
                  "
                >
                  {{ item.name }}
                </p>
              </div>
            </div>
          </div>
          <!-- 查看图片弹出框 -->
          <div class="see">
            <el-dialog :visible.sync="seeImgShow" width="40%">
              <img :src="seeImguel" alt="" />
            </el-dialog>
          </div>
          <!-- 图片名称编辑 -->
          <el-dialog title="提示" :visible.sync="editImgShow" width="30%">
            <el-form :model="editFrom">
              <el-form-item label="请写入新名称">
                <el-input v-model="editFrom.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="editImgShow = false">取 消</el-button>
              <el-button type="primary" @click="editImgx">确 定</el-button>
            </div>
          </el-dialog>
        </el-main>
      </el-container>
      <!-- 底部 -->
      <el-footer>
        <div
          class="h-100 d-flex align-items-center justify-content-center border-right"
        >
          <el-button-group>
            <el-button
              size="mini"
              :disabled="(albumPage.page - 1) * albumPage.limit <= 0"
              @click="albumPagePlus"
              >上一页</el-button
            >
            <el-button
              size="mini"
              :disabled="
                (albumPage.page + 1) * albumPage.limit - albumPage.total > 10
              "
              @click="albumPageMinus"
              >下一页</el-button
            >
          </el-button-group>
        </div>
        <div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="imagePage.page"
            :page-sizes="[10, 20, 30]"
            :page-size="imagePage.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="imagePage.total"
          >
          </el-pagination>
        </div>
      </el-footer>
    </el-container>
    <!-- 弹框组件 -->
    <AlbumEdit
      :show="edit.show"
      :title="edit.title"
      :close="close"
      :albumData="albumData"
      :getAlbumClassDate="getAlbumClassDate"
    ></AlbumEdit>
  </div>
</template>
<script>
import api from "@/api/home/album.js";
import AlbumEdit from "../../components/edit/albumEdit";
const sort = [
  {
    value: "asc",
    label: "升序",
  },
  {
    value: "desc",
    label: "降序",
  },
];
export default {
  components: {
    AlbumEdit,
  },
  data() {
    return {
      //排序
      sort,
      //相册列表
      albumListData: [],
      //图片分页数据
      imagePage: {
        page: 1,
        limit: 10,
        total: 0,
      },
      //相册分页数据
      albumPage: {
        page: 1,
        limit: 10,
        total: 0,
      },
      //搜索用数据
      searchMap: {
        order: "desc",
        keyword: "",
      },
      //图片列表
      imageListData: [],
      //弹出框数据
      edit: {
        show: false,
        title: "修改相册",
      },
      //选中相册id
      id: null,
      //编辑和新增的数据
      albumData: {
        id: null,
        name: "",
        order: 0,
      },
      //上传
      upload: {
        show: false,
      },
      //查看图片
      seeImgShow: false,
      seeImguel: "",
      //修改图片名称
      editImgShow: false,
      editFrom: {
        name: "",
        id: "",
      },
      //批量删除id数组
      removeIds: [],
    };
  },
  mounted() {
    this.getAlbumClassDate();
    console.log(this.$store.state.token);
  },
  methods: {
    //获取相册分类列表的分页数据
    getAlbumClassDate() {
      api.albumList(this.albumPage.page, this.albumPage.limit).then((res) => {
        this.albumListData = res.data;
        this.albumPage.total = res.data.totalCount;
        //展示第一个分类中的图片
        this.id = this.id || this.albumListData.list[0].id;
        this.getImageListData(this.id);
      });
    },
    //搜索
    onSearch() {
      this.getImageListData(this.id);
    },
    //图片列表的分页数据
    getImageListData(id) {
      this.id = id;
      api
        .albumClass(
          this.id,
          this.imagePage.page,
          this.imagePage.limit,
          this.searchMap.order,
          this.searchMap.keyword
        )
        .then((res) => {
          this.imageListData = res.data.list;
          this.imageListData.forEach((item) => {
            item.active = false;
            item.activeNum = 0;
          });
          this.imagePage.total = res.data.totalCount;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 新增分类
    addClass() {
      this.edit.show = true;
      this.edit.title = "新增相册";
      this.albumData.id = null;
      this.albumData.name = "";
      this.albumData.order = 0;
    },
    //获取触发的下拉菜单对应的相册的id,下拉菜单展开或者收起时触发
    getAlbumId(id) {
      this.albumData.id = id;
    },
    //下拉菜单指令,修改及删除相册
    handleCommand(command) {
      //修改相册分类
      if (command == "a") {
        this.albumListData.list.forEach((item) => {
          if (item.id == this.albumData.id) {
            this.albumData.name = item.name;
            this.albumData.order = item.order;
          }
        });

        this.edit.show = true;
        this.edit.title = "修改相册";
      } else if (command == "b") {
        this.$confirm("确定要删除这个相册?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            api.albumDeleteImg(this.albumData.id).then((res) => {
              if (res.msg == "ok") {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.getAlbumClassDate();
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
    //打开上传图片弹框
    openUpload() {
      this.upload.show = true;
    },
    //关闭弹窗方法
    close() {
      this.edit.show = false;
      this.albumData.id = null;
      this.albumData.name = "";
      this.albumData.order = 0;
    },
    //size切换
    handleSizeChange(val) {
      this.imagePage.limit = val;
      this.getImageListData(this.id);
    },
    //页码切换
    handleCurrentChange(val) {
      this.imagePage.page = val;
      this.getImageListData(this.id);
    },
    //相册上一页
    albumPagePlus() {
      this.id = null;
      this.albumPage.page--;
      this.getAlbumClassDate();
    },
    //相册下一页
    albumPageMinus() {
      this.id = null;
      this.albumPage.page++;
      this.getAlbumClassDate();
    },
    //查看图片
    seeImg(url) {
      console.log(url);
      this.seeImguel = url;
      this.seeImgShow = true;
    },
    //修改图片数据回显
    editImg(name, id) {
      this.editImgShow = true;
      this.editFrom.name = name;
      this.editFrom.id = id;
    },
    //修改图片
    editImgx() {
      api.updateImgName(this.editFrom.id, this.editFrom.name).then((res) => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.editImgShow = false;
        this.getAlbumClassDate();
      });
    },
    //删除图片
    deleteImg(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          api.removeOneImage(id).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getAlbumClassDate();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //切换图片的选中状态
    changeActive(id, i) {
      //切换选中状态
      this.imageListData[i].active = !this.imageListData[i].active;
      //如果是选中状态
      if (this.imageListData[i].active) {
        //将图片id添加到删除的id数组中
        this.removeIds.push(id);
      } else {
        //如果为非选中状态,从删除的id数组中找到这个id，移除
        this.removeIds.forEach((item, index) => {
          if (item == id) {
            this.removeIds.splice(index, 1);
          }
        });
      }
      //图片选中的编号就是这个图片id在removeIds数组中的索引+1
      this.removeIds.forEach((item, index) => {
        this.imageListData.forEach((img) => {
          if (img.id == item) {
            img.activeNum = index + 1;
          }
        });
      });
    },
    //取消选中
    cancelActive() {
      this.removeIds = [];
      this.imageListData.forEach((item) => {
        item.active = false;
      });
    },
    //打开选中删除确认弹框
    openRemoveAll() {
      this.$confirm("此操作将永久删除选中的问件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.remove();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //删除所选
    remove() {
      api
        .removeActive(this.removeIds)
        .then((res) => {
          if (res.msg == "ok") {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.removeIds = [];
            this.getAlbumClassDate();
          }
        })
        .catch((err) => {
          this.$message({
            message: err,
            type: "error",
          });
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.album_conatiner {
  position: absolute;
  inset: 0px 0px 0px;
}
.el-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ccc;
  .el-form--inline {
    display: flex;
    align-items: center;
    > .el-form-item {
      margin: 0;
    }
  }
}

.el-aside {
  position: absolute;
  top: 60px;
  left: 0px;
  bottom: 60px;
  border-right: 1px solid #ccc;
  overflow: auto;
  .categroy_title {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 90px;
  }
}
.el-main {
  position: absolute;
  inset: 60px 0px 60px 200px;
  overflow: auto;
}
.el-footer {
  width: 100%;
  padding: 0;
  border-top: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  > div {
    &:nth-child(1) {
      width: 200px;
      height: 100%;
      border-right: 1px solid #ccc;
      box-sizing: border-box;
    }
    &:nth-child(2) {
      flex: 1;
    }
  }
}
.sum-active {
  color: #67c23a !important;
  background-color: #f0f9eb !important;
  border-color: #c2e7b0 !important;
}
.see {
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__body {
    width: 100%;
    height: 100%;
    padding: 0;
    img {
      width: 100%;
    }
  }
}
.albunlist {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  > div {
    width: 15%;
    height: 160px;
    margin: 10px;
    > div {
      width: 100%;
      height: 100%;
      position: relative;
    }
  }
}
</style>

