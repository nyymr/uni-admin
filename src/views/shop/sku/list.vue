<template>
  <div class="sku">
    <section class="bg-white px-3">
      <header>
        <el-button size="mini" type="success">添加规格</el-button>
        <el-button size="mini" type="danger" @click="openRemoveAll"
          >批量删除</el-button
        >
      </header>
      <!-- 表格 -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"> </el-table-column>
        <el-table-column label="规格名称" align="center" prop="name">
        </el-table-column>
        <el-table-column label="规格值" align="center" prop="default">
        </el-table-column>
        <el-table-column label="排序" align="center" prop="order">
        </el-table-column>
        <el-table-column label="状态" align="center" prop="status">
          <template slot-scope="scope">
            <el-button
              class="is-plain"
              size="mini"
              @click="changeSkuStatus(scope.row.id, scope.row.status)"
              :type="scope.row.status ? 'success' : 'danger'"
              >{{ scope.row.status ? "启用" : "禁用" }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="">
            <el-button-group>
              <el-button type="primary" class="is-plain" size="mini"
                >修改</el-button
              >
              <el-button type="danger" class="is-plain" size="mini"
                >删除</el-button
              >
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <!-- 分页 -->
    <footer>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paging.page"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="paging.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paging.total"
      >
      </el-pagination>
    </footer>
  </div>
</template>
<script>
import api from "@/api/shop/sku";
export default {
  data() {
    return {
      paging: {
        page: 1,
        limit: 10,
        total: 0,
      },
      tableData: [],
      ids: [],
    };
  },
  created() {
    this.getSkuList();
  },
  methods: {
    handleSizeChange(val) {
      this.paging.limit = val;
      this.getSkuList();
    },
    handleCurrentChange(val) {
      this.paging.page = val;
      this.getSkuList();
    },
    //获取数据
    getSkuList() {
      api
        .skuList(this.paging.page, this.paging.limit)
        .then((res) => {
          if (res.msg == "ok") {
            this.tableData = res.data.list;
            this.paging.total = res.data.totalCount;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //修改商品规格状态
    changeSkuStatus(id, status) {
      console.log(id, status);
      if (status == 1) {
        api.changeStatus(id, 0).then((res) => {
          if (res.msg == "ok") {
            this.getSkuList();
            this.$message({
              message: "禁用成功",
              type: "success",
            });
          }
        });
      } else if (status == 0) {
        api.changeStatus(id, 1).then((res) => {
          if (res.msg == "ok") {
            this.getSkuList();
            this.$message({
              message: "启用成功",
              type: "success",
            });
          }
        });
      }
    },
    //复选框切换
    handleSelectionChange(val) {
      this.ids = val.map((item) => {
        return item.id;
      });
      console.log(this.ids);
    },
    //打开批量删除弹框
    openRemoveAll() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.removeAll();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //确认批量删除
    removeAll() {
      api
        .removeSkuItems(this.ids)
        .then((res) => {
          if (res.msg == "ok") {
            this.getSkuList();
            this.$message({
              message: "删除成功",
              type: "success",
            });
          }
        })
        .catch((err) => {
          this.$message({
            message: "演示数据，禁止删除",
            type: "error",
          });
        });
    },
  },
  computed: {},
};
</script>
<style lang="scss" scoped>
.sku {
  > section {
    height: 100%;
    padding-bottom: 60px !important;
    box-sizing: border-box;
    overflow: auto;
    > header {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  }
  > footer {
    height: 60px;
    border-top: 1px solid #ccc;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 20px;
    box-sizing: border-box;
    background-color: #fff;
  }
}
</style>