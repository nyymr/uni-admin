<template>
  <div class="sku">
    <section class="bg-white px-3">
      <header>
        <el-button size="mini" type="success">添加类型</el-button>
        <el-button size="mini" type="danger">批量删除</el-button>
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
            <el-tag :type="scope.row.status ? 'success' : 'danger'">{{
              scope.row.status ? "启用" : "禁用"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="">
            <el-button-group>
              <el-button
                type="primary"
                class="el-button el-button--primary el-button--mini is-plain"
                >上一页</el-button
              >
              <el-button type="primary">下一页</el-button>
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
    //复选框切换
    handleSelectionChange() {},
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