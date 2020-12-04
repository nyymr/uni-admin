<template>
  <div class="back-index">
    <header>
      <div>
        <i class="el-icon-user-solid"></i>
        <div>
          <p>30</p>
          <p>关注人数（个）</p>
        </div>
      </div>
      <div>
        <i class="el-icon-s-finance"></i>
        <div>
          <p>120</p>
          <p>订单笔数（笔）</p>
        </div>
      </div>
      <div>
        <i class="el-icon-s-order"></i>
        <div>
          <p>4183.80</p>
          <p>今日订单总金额（元）</p>
        </div>
      </div>
      <div>
        <i class="el-icon-s-data"></i>
        <div>
          <p>190</p>
          <p>本月销量（笔）</p>
        </div>
      </div>
    </header>
    <section>
      <div class="left_wrapper">
        <div class="left_top">
          <div>
            <span>店铺及商品</span>
            <span style="color: #1d8e8e">需要关注的店铺信息及待处理事项</span>
          </div>
          <div>
            <div>
              <p><b>64</b></p>
              <p>出售中</p>
            </div>
            <div>
              <p><b>10</b></p>
              <p>待回复</p>
            </div>
            <div>
              <p><b>0</b></p>
              <p>库存预警</p>
            </div>
            <div>
              <p><b>3</b></p>
              <p>仓库中</p>
            </div>
          </div>
        </div>
        <div class="left_bottom">
          <div>
            <span>交易提示</span>
            <span style="color: #1d8e8e">需要立即处理的交易订单</span>
          </div>
          <div>
            <div>
              <p><b>0</b></p>
              <p>待付款</p>
            </div>
            <div>
              <p><b>10</b></p>
              <p>待发货</p>
            </div>
            <div>
              <p><b>0</b></p>
              <p>已发货</p>
            </div>
            <div>
              <p><b>3</b></p>
              <p>已收货</p>
            </div>
            <div>
              <p><b>3</b></p>
              <p>退款中</p>
            </div>
            <div>
              <p><b>3</b></p>
              <p>待售后</p>
            </div>
          </div>
        </div>
      </div>
      <div><div id="echarts"></div></div>
    </section>
    <footer>
      <div>
        <div>
          <span>销售情况统计</span>
          <span style="color: #1d8e8e"
            >按周期统计商家店铺的订单量和订单金额</span
          >
        </div>
        <div>
          <div class="sellNum">
            <div>昨日销量</div>
            <div>
              <p>订单金额（元）12</p>
              <p>订单量（件）12</p>
            </div>
          </div>
          <div class="sellNum">
            <div>本月销量</div>
            <div>
              <p>订单金额（元）12</p>
              <p>订单量（件）12</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <span>单品销售排名</span>
          <span style="color: #1d8e8e"
            >按周期统计商家店铺的订单量和订单金额</span
          >
        </div>
        <div>
          <el-table :data="tableData" height="200" border style="width: 100%">
            <el-table-column type="index" label="#" width="40">
            </el-table-column>
            <el-table-column prop="text" label="商品信息"> </el-table-column>
            <el-table-column prop="num" label="销量"> </el-table-column>
          </el-table>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import echart from "echarts";
export default {
  data() {
    return {
      option: {
        title: {
          text: "堆叠区域图",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top",
              },
            },
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      },
      tableData: [
        {
          text: "小天鹅（LittleSwan）滚筒洗衣机...",
          num: 9,
        },
        {
          text: "小天鹅（LittleSwan）滚筒洗衣机...",
          num: 9,
        },
        {
          text: "小天鹅（LittleSwan）滚筒洗衣机...",
          num: 9,
        },
        {
          text: "小天鹅（LittleSwan）滚筒洗衣机...",
          num: 9,
        },
        {
          text: "小天鹅（LittleSwan）滚筒洗衣机...",
          num: 9,
        },
      ],
    };
  },
  mounted() {
    let myEchart = echart.init(document.getElementById("echarts"));
    myEchart.setOption(this.option);
  },
};
</script>
<style lang="scss" scoped>
.back-index {
  padding: 20px 24px;
  margin-top: -55px;
  > header {
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div {
      width: 23.5%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      box-sizing: border-box;
      padding: 16px;
      background-color: #fff;
      box-shadow: 0px 0px 5px 0px gainsboro;
      transition: all 0.5s;
      > i {
        font-size: 30px;
        padding: 10px;
        margin-right: 16px;
        color: #fff;
      }
      &:hover {
        transform: scale(1.03);
      }
      &:nth-child(1) {
        > i {
          background-color: #007bff;
        }
      }
      &:nth-child(2) {
        > i {
          background-color: #28a745;
        }
      }
      &:nth-child(3) {
        > i {
          background-color: #dc3545;
        }
      }
      &:nth-child(4) {
        > i {
          background-color: #ffc107;
        }
      }
      > div {
        p {
          &:nth-child(1) {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 10px;
          }
          &:nth-child(2) {
            font-size: 14px;
            color: #555;
          }
        }
      }
    }
  }
  section {
    width: 100%;
    height: 370px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;
    > div {
      width: 49%;
      height: 100%;
      &:nth-child(1) {
        > div {
          width: 100%;
          height: 170px;
          box-shadow: 0px 0px 5px 0px gainsboro;
          &.left_top {
            margin-bottom: 30px;
          }
          > div {
            &:nth-child(1) {
              height: 60px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 20px;
              box-sizing: border-box;
              border-bottom: 1px solid #eee;
            }
            &:nth-child(2) {
              height: 110px;
              display: flex;
              align-items: center;
              justify-content: space-evenly;
              > div {
                text-align: center;
                background-color: #f5f5f5;
                padding: 20px;
                &:hover {
                  background-color: #dae0e5;
                }
                > p {
                  width: 100%;
                }
              }
            }
          }
        }
      }
      &:nth-child(2) {
        box-shadow: 0px 0px 5px 0px gainsboro;
        box-sizing: border-box;
        padding: 20px;

        #echarts {
          width: 95%;
          height: 95%;
          margin: 2.5%;
        }
      }
    }
  }
  > footer {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    > div {
      width: 49%;
      box-shadow: 0px 0px 5px 0px gainsboro;
      box-sizing: border-box;
      background-color: #fff;
      > div {
        width: 100%;
        &:nth-child(1) {
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          box-sizing: border-box;
          border-bottom: 1px solid #eee;
        }
        &:nth-child(2) {
          padding: 16px;
          box-sizing: border-box;
        }
        .sellNum {
          width: 100%;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          &:nth-child(1) {
            margin-bottom: 16px;
          }
          > div {
            height: 100%;
            box-sizing: border-box;
            &:nth-child(1) {
              width: 90px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #eee;
              border: 1px solid #ccc;
            }
            &:nth-child(2) {
              flex: 1;
              p {
                height: 50%;
                width: 100%;
                box-sizing: border-box;
                padding-left: 16px;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                border: 1px solid #ccc;
              }
            }
          }
        }
      }
    }
  }
}
</style>