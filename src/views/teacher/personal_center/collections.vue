<template>
  <div class="collection">

    <div class="wrap-content">

      <div class="wrap-content-right">
        <div class="wrap-content-right-wrap">
          <div class="wrap-content-right-wrap-top">
            <div class="top1">
              <p>试题收藏夹目录</p>
              <p>
                <el-button type="text">新增收藏夹</el-button>
              </p>
            </div>
            <ul>
              <li class="top2" v-for="i in 3">
                <p>填空题</p>
                <p>编辑 删除</p>
              </li>
            </ul>
          </div>

          <div class="wrap-content-right-wrap-bottom">
            <el-card class="box-card" shadow="hover" v-for="i in 10">
              <section class="content">
                <div class="qt1">
                  <img src="@/assets/test1.png" />
                  When $a \ne 0$, there are two solutions to \(ax^2 + bx + c = 0\) and they are
                  $x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$
                  1、“实际平均续航里程”是指电动汽车的行驶总里程与充电次数的比值，是反映电动汽车性能的重要指标．某汽车生产厂家为了解某型号电动汽车的“实际平均续航里程”，收集了使用该型号电动汽车1年以上的部分客户的相关数据，按年龄不超过40岁和年龄在40岁以上将客户分为A，B两组，从A，B组各抽取10位客户的电动汽车的“实际平均续航里程”数据整理成图，其中“⊙”表示A组的客户，“*”表示B组的客户．
                </div>
                <div class="qt2">
                  <ul>
                    <li style="width: 24%;" class="selectoption">
                      A.
                      <img src="@/assets/test1.png" />
                    </li>
                    <li style="width: 24%;" class="selectoption">
                      B.
                      <img src="@/assets/test1.png" />
                    </li>
                    <li style="width: 24%;" class="selectoption">
                      C.
                      <img src="@/assets/test1.png" />
                    </li>
                    <li style="width: 24%;" class="selectoption">
                      D.
                      <img src="@/assets/test1.png" />
                    </li>
                  </ul>
                </div>
              </section>
              <section class="foot-wrap">
                <p class="pt1">
                  <span>收录：2020/8/7</span>
                  <span>组卷：60</span>
                  <span>真题：1</span>
                  <span>难度：0.9</span>
                </p>
                <p class="pt2">
                  <span @click="similarityVisible = true">
                    <i class="iconfont iconpaibanguanli iconcolor"></i> 相似题
                  </span>
                  <!-- <span @click="errorVisible = true">
                    <i class="iconfont iconjiucuo iconcolor"></i> 纠错
                  </span>-->
                  <span>
                    <i class="iconfont iconshoucang1" style="color:#ffda33;"></i>
                    <i class="iconfont iconshoucang2 iconcolor"></i>
                    收藏
                  </span>
                  <span>
                    <i class="iconfont iconxiangqing1 iconcolor"></i> 详情
                  </span>
                  <el-button type="warning" size="mini">移除试卷</el-button>
                </p>
              </section>
            </el-card>

            <div class="pagination">
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, prev, pager, next, sizes"
                :total="400"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {

  },
  data() {
    return {
      search: {
        grade: "",
        year: "",
        month: ""
      },
      filter: {
        grade: ""
      },
      isMulti: false,
      activeType: "chapter",

    };
  },
  mounted() {
  },
  methods: {

  }
};
</script>
<style lang="less">
.collection {
  .el-radio-button__inner {
    border: 0px;
    background-color: #f6faff;
    border-radius: 3px;
    font-size: 14px;
    color: #666;
  }
  .el-input__inner {
    background: #f0f3fa;
  }

  .el-radio-button:first-child .el-radio-button__inner {
    border-left: 0px;
    border-radius: 3px;
  }
  .el-radio-button:last-child .el-radio-button__inner {
    border-radius: 3px;
  }

  .el-card {
    background-color: #f0f3fa;
    border-color: #e7eaf1;
  }
  .el-card__body {
    padding: 0px;
  }

  .el-tabs__header {
    margin: 0 0 5px;
  }

  .wrap-content {
    .el-button {
      font-size: 13px;
    }
  }
}
</style>
<style scoped lang="less">
.collection {
  &-nav {
    .tree-wrap {
      width: 200px;
      padding: 0px;
      .tab-class {
        padding: 0px;
      }
    }
  }

  .wrap {
    .search {
      td {
        height: 36px;
        line-height: 36px;
        border: 1px solid #e3e4e7;
        border-bottom: 0px;
      }
      tr {
        &:last-child td {
          border-bottom: 1px solid #e3e4e7;
        }
        td:first-child {
          border-bottom: 1px solid #ffffff;
        }
      }
      &-left {
        width: 120px;
        text-align: center;
        background-color: #dce0e5;
      }

      &-right {
        //width: 90%;
        background-color: #f6faff;
        padding-left: 20px;
      }
    }

    &-content {
      margin-top: 10px;
      display: flex;

      &-left {
        width: 270px;
        flex-shrink: 0;
        margin-right: 10px;

        .knowwrap {
          height: 36px;
          line-height: 36px;
          color: #3399ff;
          font-weight: 500;
          display: flex;
          font-size: 14px;
          justify-content: space-between;
          padding-left: 10px;

          .p2 {
            color: #abb4ca;
            font-size: 12px;

            span {
              cursor: pointer;
            }

            .active {
              color: #3399ff;
            }
          }
        }
      }

      &-right {
        width: 90%;
        font-size: 14px;
        //height: 700px;

        &-wrap {
          border: 1px solid #e2e2e2;
          background-color: #f6faff;
          padding: 10px;
          margin-bottom: 30px;

          &-top {
            font-size: 13px;
            border: 1px solid #e2e2e2;

            .top1 {
              line-height: 40px;
              background-color: #ffffff;
              border-bottom: 1px solid #e2e2e2;
              padding: 0 20px;
              display: flex;
              justify-content: space-between;
            }
            .top2 {
              line-height: 32px;
              display: flex;
              padding: 0 20px;
              justify-content: space-between;
            }
          }

          &-bottom {
            //border: 1px solid #e2e2e2;
            background-color: #f6faff;
          }
        }
      }
    }
  }
}
</style>