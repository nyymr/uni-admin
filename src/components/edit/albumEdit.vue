<template>
  <div>
    <el-dialog :title="title" :visible.sync="show" :before-close="handleClose">
      <el-form label-width="100px" :model="albumData" ref="ruleForm">
        <el-form-item label="相册名称" prop="name">
          <el-input
            v-model="albumData.name"
            autocomplete="off"
            placeholder="请输入相册名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="相册排序" prop="order">
          <el-input-number
            v-model="albumData.order"
            :min="1"
            :max="10"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import api from "../../api/home/album";
export default {
  props: {
    title: {
      type: String,
      default: "修改相册",
    },
    show: {
      type: Boolean,
      default: false,
    },
    albumData: {
      type: Object,
    },
    close: Function,
    getAlbumClassDate: Function,
  },
 
  methods: {
    handleClose() {
      this.close();
    },
    submit() {
      //修改
      if (this.albumData.id) {
        console.log(this.albumData);
        api
          .editAlbumName(
            this.albumData.id,
            this.albumData.order,
            this.albumData.name
          )
          .then((res) => {
            if (res.msg == "ok") {
              this.handleClose();
              this.getAlbumClassDate();
              this.$message({
                message: "修改成功",
                type: "success",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        //增加
        api
          .addAlbumName(this.albumData.order, this.albumData.name)
          .then((res) => {
            if (res.msg == "ok") {
              this.handleClose();
              this.getAlbumClassDate();
              this.$message({
                message: "创建成功",
                type: "success",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
