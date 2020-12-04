<template>
  <div class="shop_goods_list">
    <section class="bg-white px-3">
      <header>
        <el-tabs v-model="tab" @tab-click="handleClick">
          <el-tab-pane label="全部" name="all"></el-tab-pane>
          <el-tab-pane label="审核中" name="checking"></el-tab-pane>
          <el-tab-pane label="出售中" name="saling"></el-tab-pane>
          <el-tab-pane label="已下架" name="off"></el-tab-pane>
          <el-tab-pane label="库存预警" name="min_stock"></el-tab-pane>
          <el-tab-pane label="回收站" name="delete"></el-tab-pane>
        </el-tabs>
      </header>
      <main>
        <!-- 表单 -->
        <header class="d-flex align-items-center justify-content-between">
          <div class="buttons">
            <el-button size="mini" type="success">发布商品</el-button>
            <el-button size="mini" type="danger" @click="openRemoveAll"
              >批量删除</el-button
            >
            <el-button size="mini">上架</el-button>
            <el-button size="mini">下架</el-button>
          </div>
          <el-form :inline="true" :model="searchMap" class="demo-form-inline">
            <el-form-item>
              <el-input
                v-model="searchMap.title"
                placeholder="要搜索的商品名称"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="info" size="mini" @click="getTableData"
                >搜索</el-button
              >
              <el-button size="mini">高级搜索</el-button>
            </el-form-item>
          </el-form>
        </header>
        <!-- 表格 -->
        <el-table
          @selection-change="handleSelectionChange"
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%; margin-top: 15px"
          border
        >
          <el-table-column type="selection" width="55" align="center">
          </el-table-column>
          <el-table-column label="商品" width="300">
            <template slot-scope="scope">
              <div class="imgName">
                <div>
                  <img :src="scope.row.cover" alt="" />
                </div>
                <div>
                  <p style="margin-bottom: 10px">{{ scope.row.title }}</p>
                  <div>
                    <div>分类：{{ scope.row.category.name }}</div>
                    <div>时间：{{ scope.row.category.update_time }}</div>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="discount"
            label="实际销售量"
            width="80"
            align="center"
          >
          </el-table-column>
          <el-table-column label="商品状态" width="60" align="center">
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.status !== 0"
                type="success"
                effect="dark"
                size="mini"
                >上架</el-tag
              >
              <el-tag
                v-if="scope.row.status === 0"
                type="danger"
                effect="dark"
                size="mini"
                >仓库</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="ischeck"
            label="审核状态"
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.ischeck === 0" class="shenhe">
                <el-button
                  type="success"
                  plain
                  size="mini"
                  @click="checkGood(scope.row.id, 1)"
                  >审核通过</el-button
                ><br />
                <el-button
                  type="danger"
                  plain
                  size="mini"
                  @click="checkGood(scope.row.id, 2)"
                  >审核拒绝</el-button
                >
              </div>
              <span v-if="scope.row.ischeck === 1">通过</span>
              <span v-if="scope.row.ischeck === 2">拒绝</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="stock"
            label="总库存"
            width="80"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="价格（元）"
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              <div class="jige">
                <span class="text-danger">￥{{ scope.row.min_oprice }}</span>
                <span class="text-muted">/￥{{ scope.row.min_price }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" align="center">
            <template>
              <div class="actions">
                <button style="color: #008080">基础设置</button>
                <button style="color: #008080">商品规格</button>
                <button style="color: #008080">商品属性</button>
                <button style="color: #008080">媒体设置</button>
                <button style="color: #008080">商品详情</button>
                <button style="color: #008080">折扣设置</button>
                <button style="color: #008080">删除商品</button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </main>
    </section>
    <footer>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paging.page"
        :page-sizes="[10, 20, 30]"
        :page-size="paging.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paging.total"
      >
      </el-pagination>
    </footer>
  </div>
</template>
<script>
import api from "@/api/shop/list";
export default {
  data() {
    return {
      tab: "all",
      //搜索数据
      searchMap: {
        title: "",
      },
      //表格数据
      tableData: [],
      //分页数据
      paging: {
        page: 1,
        limit: 10,
        total: 0,
      },
      //批量删除id数组
      removeIds: [],
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    //获取表格数据
    getTableData() {
      api
        .getGoodsList(
          this.paging.page,
          this.paging.limit,
          this.tab,
          this.searchMap.title
        )
        .then((res) => {
          console.log(res);
          if (res.msg == "ok") {
            this.tableData = res.data.list;
            this.paging.total = res.data.totalCount;
          }
        })
        .catch((err) => {
          this.$message({
            message: err,
            type: "error",
          });
        });
    },
    //选项卡切换
    handleClick(val) {
      console.log(val.label);
      console.log(this.tab);
      this.getTableData();
    },
    //分页size
    handleSizeChange(val) {
      this.paging.limit = val;
      this.getTableData();
    },
    //页码切换
    handleCurrentChange(val) {
      this.paging.page = val;
      this.getTableData();
    },
    //多选
    handleSelectionChange(val) {
      this.removeIds = [];
      val.forEach((item) => {
        this.removeIds.push(item.id);
      });
    },
    //打开批量删除弹框
    openRemoveAll() {
      this.$confirm("此操作将永久删除选中的商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.confirmRemove();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //确认批量删除
    confirmRemove() {
      api
        .deleteAll(this.removeIds)
        .then((res) => {
          if (res.msg == "ok") {
            this.$message({
              message: "删除成功呢",
              type: "success",
            });
            this.getTableData();
          }
        })
        .catch((err) => {
          this.$message({
            message: err,
            type: "error",
          });
        });
    },
    //审核
    checkGood(id, ischeck) {
      api
        .check(id, ischeck)
        .then((res) => {
          if (res.msg == "ok") {
            this.$message({
              message: "审核完成",
              type: "success",
            });
            this.getTableData();
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
.shop_goods_list {
  position: relative;
  .el-form {
    height: 28px;
    .el-form-item {
      margin-right: 10px;
      margin-bottom: 0px;
      > .el-form-item__content {
        background-color: red;
      }
    }
  }
  > section {
    height: 100%;
    padding-bottom: 60px !important;
    box-sizing: border-box;
    overflow: auto;
  }
  > footer {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-top: 1px solid #ccc;
    background-color: #fff;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
  }
  .imgName {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    > div {
      &:nth-child(1) {
        width: 60px;
        margin-right: 16px;
        img {
          width: 60px;
          height: 60px;
          box-sizing: border-box;
        }
      }
      &:nth-child(2) {
        flex: 1;
      }
    }
  }
  .shenhe {
    > button {
      &:nth-child(1) {
        margin-bottom: 10px;
      }
    }
  }

  .actions {
    width: 100%;
    height: 100%;
    > button {
      font-size: 13px;
      border: none;
      background: rgba($color: #000000, $alpha: 0);
      margin: 5px 5px;
    }
  }
}
</style>