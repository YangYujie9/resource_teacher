<template>
  <div class="test-paper">
    <!-- <ul><li v-for="i in 89">{{i}}</li></ul> -->
    <div class="search-div">
      <ul>
        <li>
          <p>年份</p>
          <div class="div2">
            <el-radio-group v-model="search.year" size="mini">
              <el-radio-button :label="item" v-for="item in list"></el-radio-button>
            </el-radio-group>
          </div>
        </li>
        <li>
          <p>排序</p>
          <div class="div2">
            <el-radio-group v-model="search.sortstr" size="mini">
              <el-radio-button :label="item" v-for="item in list"></el-radio-button>
            </el-radio-group>
          </div>
          <p class="p2">
            共计
            <span style="color:#fc4546;">10000</span>道相关试题
          </p>
        </li>
      </ul>
    </div>

    <div class="content-wrap">
      <el-card class="box-card" shadow="hover" v-for="i in 10">
        <section class="content">
          <div class="qt1">
            人教新版七年级上学期《第一章有理数》
          </div>

        </section>
        <section class="foot-wrap">
          <p class="pt1">
            <span>收录：2020/8/7</span>
            <span>浏览：42次</span>
            <span>下载：1次</span>
            <span>题量：22</span>
            <span>地区：山东省</span>
          </p>
          <p class="pt2">
            <span>
              <i class="iconfont iconzhuzhuangtucopy" style="color:#ffa360;"></i>
              
            </span>

            <el-button type="primary" size="mini">移除试卷</el-button>
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
</template>

<script>
export default {
  props: [],
  data() {
    return {
      search: {
        year: "全部",
        sortstr: "全部",
      },
      list: ["全部", "2020", "2019", "2018", "2017"],
      currentPage: 1,
    };
  },
  mounted() {

  },

  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
  }
};
</script>
<style lang="less">
.test-paper {
  .el-radio-button__inner {
    border: 0px;
    background-color: #f2f5fc;
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
  .el-button--primary.is-plain {
    background: #f2f5fc;
    border-color: #e2e2e2;
    color: #7b9ff6;

    &:hover,
    &:active,
    &:focus {
      color: #5182f4;
    }
  }

  .el-checkbox__inner {
    background-color: #f2f5fc;
  }
  .el-checkbox {
    color: #9d9ea1;
  }

  .el-card {
    background-color: #f0f3fa;
    border-color: #e7eaf1;
  }

  .el-card__body {
    padding: 0px;
  }
  // .el-button--primary.is-plain:focus, .el-button--primary.is-plain:hover{}
}
</style>
<style scoped lang="less">
.test-paper {
  .search-div {
    color:#333333;
    background-color: #f2f5fc;
    ul {
      li {
        padding: 0 20px;
        border: 1px solid #e2e2e2;
        line-height: 30px;
        border-bottom: 0;
        display: flex;
        align-items: center;
        position: relative;
        background-color: #f2f5fc;
        font-size: 14px;
        font-weight: 600;

        p {
          flex-shrink: 0;
        }

        .div2 {
          margin-left: 20px;
          overflow: hidden;
          padding: 2px 0px 4px 0px;
          flex: 1;
        }

        .p2 {
          position: absolute;
          right: 20px;
          color: #9d9ea1;
          font-weight: normal;
        }
      }
      &:last-child {
        border-bottom: 1px solid #e2e2e2;
      }
    }
  }



  .content-wrap {
    margin-top: 20px;
    border: 1px solid #e2e2e2;
    padding: 20px;
    background-color: #f2f5fc;

    .pagination {
      margin-top: 30px;
      text-align: right;
    }

    .box-card {
      margin-bottom: 15px;
      border-radius: 8px;

      .content {
        font-size: 1rem;
        display: block;
        padding: 20px;
        line-height: 28px;
        letter-spacing: 1px;
        word-break: break-all;
        font-family: "JyeMath", "JyeMathLetters", "Times New Roman", "微软雅黑",
          Arial, "宋体";
        -webkit-font-smoothing: antialiased;
        // border-radius: 50% 0;

        .qt1 {
          overflow: hidden;
          zoom: 1;
          clear: both;
          line-height: 28px;
          font-size: 1rem;
          //padding: 20px;
          position: relative;
          word-break: break-word;
          //padding-bottom: 20px;
          cursor: pointer;
          color: #5182f4;

          img {
            float: right;
            position: relative;
          }
        }

        .qt2 {
          //padding: 0px 20px 20px 20px;

          ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;

            .selectoption {
              vertical-align: middle;
              font-size: 14px;
              padding: 2px;

              label {
                line-height: 24px;
              }
            }
          }
        }

        .top {
          border-bottom: 1px dashed #dbdee4;
          padding-bottom: 20px;
        }

        .middle {
          div {
            display: flex;

            .title {
              flex-shrink: 0;
              color: #22a9e8;
              font-weight: 600;
            }
          }

          .tag {
            padding-left: 10px;
            color: #828282;
            font-size: 0.9rem;
          }
        }
      }
    }

    .foot-wrap {
      padding: 10px 20px;
      background-color: #ffffff;
      display: flex;
      justify-content: space-between;
      line-height: 24px;
      color: #828282;
      font-size: 0.8rem;

      .pt1 span {
        margin-right: 10px;
      }

      .pt2 span {
        margin-right: 15px;
        cursor: pointer;

        i {
          font-size: 1rem;
        }
      }

    }
  }


}
</style>