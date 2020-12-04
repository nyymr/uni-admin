<template>
  <div class="shop_goods_list">
    <section class="bg-white px-3">
      <header>
        <el-tabs v-model="activeName"
          ><!-- @tab-click="handleClick" -->
          <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
          <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿" name="fourth"
            >定时任务补偿</el-tab-pane
          >
        </el-tabs>
      </header>
      <main>
        <!-- 表单 -->
        <header class="d-flex align-items-center justify-content-between">
          <div class="buttons">
            <el-button size="mini" type="success">发布商品</el-button>
            <el-button size="mini" type="danger">批量删除</el-button>
            <el-button size="mini">上架</el-button>
            <el-button size="mini">下架</el-button>
          </div>
          <el-form :inline="true" :model="searchMap" class="demo-form-inline">
            <el-form-item>
              <el-input
                v-model="searchMap.name"
                placeholder="要搜索的商品名称"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="info" size="mini">搜索</el-button>
              <el-button size="mini">高级搜索</el-button>
            </el-form-item>
          </el-form>
        </header>
        <!-- 表格 -->
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          border
        >
          <el-table-column type="selection" width="55" align="center">
          </el-table-column>
          <el-table-column label="商品" width="320">
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
            width="100"
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
                <el-button type="success" plain size="mini">成功按钮</el-button
                ><br />
                <el-button type="danger" plain size="mini">警告按钮</el-button>
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
                <span>￥{{ scope.row.min_oprice }}</span>
                <span>/￥{{ scope.row.min_price }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" align="center">
            <template>
              <div class="caozuo">
                <button>基础设置</button>
                <button>商品规格</button>
                <button>商品属性</button>
                <button>媒体设置</button>
                <button>商品详情</button>
                <button>折扣设置</button>
                <button>删除商品</button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </main>
    </section>
    <footer></footer>
  </div>
</template>
<script>
import api from "@/api/shop/list";
export default {
  data() {
    return {
      activeName: "",
      //搜索数据
      searchMap: {
        name: "",
      },
      //表格数据
      tableData: [],
      //分页数据
      paging: {
        page: 1,
        limit: 10,
        total: 0,
      },
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    //获取表格数据
    getTableData() {
      api
        .getGoodsList(this.paging.page, this.paging.limit)
        .then((res) => {
          console.log(res);
          if (res.msg == "ok") {
            this.tableData = res.data.list;
            this.paging.total = res.data.total;
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
  .el-form-item {
    margin-right: 10px;
    margin-bottom: 0px;
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
        margin-right: 10px;
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
      margin: 10px 0px;
    }
  }
  .jige {
    > span {
      &:nth-child(1) {
        color: brown;
      }
    }
  }
  .caozuo {
    width: 100%;
    height: 100%;
    > button {
      border: none;
      background: rgba($color: #000000, $alpha: 0);
      margin: 5px 5px;
    }
  }
}
</style>