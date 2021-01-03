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
        <header class="d-flex align-items-center justify-content-between">
          <!-- 按钮组 -->
          <div class="buttons">
            <el-button size="mini" type="success">发布商品</el-button>
            <el-button
              size="mini"
              v-show="tab != 'delete'"
              type="danger"
              @click="openRemoveAll"
              >批量删除</el-button
            >
            <el-button size="mini" v-show="tab == 'delete'" type="warning"
              >恢复商品</el-button
            >
            <el-button size="mini" v-show="tab == 'delete'" type="danger"
              >彻底删除</el-button
            >
            <el-button
              size="mini"
              v-show="
                tab != 'delete' &&
                tab != 'min_stock' &&
                tab != 'checking' &&
                tab != 'saling'
              "
              @click="changeStatus(1)"
              >上架</el-button
            >
            <el-button
              size="mini"
              v-show="
                tab != 'delete' &&
                tab != 'min_stock' &&
                tab != 'checking' &&
                tab != 'off'
              "
              @click="changeStatus(0)"
              >下架</el-button
            >
          </div>
          <!-- 表单 -->
          <el-form
            v-show="!deepSearchShow"
            :inline="true"
            :model="searchMap"
            class="demo-form-inline"
          >
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
              <el-button size="mini" @click="deepSearchShow = true"
                >高级搜索</el-button
              >
            </el-form-item>
          </el-form>
        </header>
        <!-- 高级搜索 -->
        <el-card v-show="deepSearchShow" class="box-card bg-light">
          <div slot="header" class="clearfix">
            <span>高级搜索</span>
            <el-button
              style="float: right; padding: 3px 0; color: #007373"
              type="text"
              @click="deepSearchShow = false"
              >收起</el-button
            >
          </div>
          <div class="text item">
            <el-form
              :inline="true"
              label-width="100px"
              :model="searchMap"
              class="demo-form-inline"
              ref="searchForm"
            >
              <el-form-item label="商品名称" prop="title">
                <el-input
                  v-model="searchMap.title"
                  placeholder="商品名称"
                  size="mini"
                ></el-input>
              </el-form-item>
              <el-form-item label="商品分类" prop="category">
                <el-select
                  v-model="searchMap.category"
                  placeholder="请选择商品分类"
                  size="mini"
                >
                  <el-option
                    v-for="(i, index) in categoryData"
                    :label="i.name"
                    :value="i.category_id"
                    :key="index"
                  >
                    <!-- <template slot="—">
                      <el-option
                        v-for="(item, index) in i.children"
                        :key="index"
                        :label="item.name"
                        :value="item.category_id"
                      >
                      </el-option>
                    </template> -->
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="info" size="mini" @click="getTableData"
                  >搜索</el-button
                >
                <el-button size="mini" @click="reset">清空筛选条件</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
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
      deepSearchShow: false,
      searchMap: {
        title: "",
        category: "",
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
      //分类数据
      categoryData: [],
    };
  },
  created() {
    this.getTableData();
    this.getCategoryData();
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
    //获取商品分类列表
    getCategoryData() {
      api
        .categoryData()
        .then((res) => {
          console.log(res);
          if (res.msg == "ok") {
            this.categoryData = res.data;
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
      if (!this.removeIds.length) {
        this.$message({
          type: "error",
          message: "请先选中需要上传的信息",
        });
        return;
      }
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
    //批量上架，下架
    changeStatus(status) {
      api
        .changestatus(this.removeIds, status)
        .then((res) => {
          if (res.msg == "ok") {
            this.$message.success("操作成功");
            this.removeIds = [];
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
    //重置搜索表单
    reset() {
      this.$refs["searchForm"].resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
.shop_goods_list {
  position: relative;
  .el-form {
    height: 40px;
    .el-form-item {
      margin-right: 10px;
      margin-bottom: 0px;
      > .el-form-item__content {
        background-color: red;
      }
    }
  }

  .box-card {
    margin: 16px 0;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
  .box-card /deep/ .el-card__header {
    padding: 8px 10px;
  }
  .box-card /deep/ .el-card__body {
    padding: 20px;
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