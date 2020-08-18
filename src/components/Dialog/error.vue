<template>
    <el-dialog 
      title="试题纠错" 
      :visible.sync="dialogVisible" 
      :close-on-click-modal='false'
      width="860px"
      :before-close="closeDialog">
      <div>
        <el-form ref="form" :model="error" label-width="100px">
          <el-form-item label="错误类型：">
            <el-checkbox-group v-model="error.type">
              <el-checkbox label="题干错误"></el-checkbox>
              <el-checkbox label="属性错误"></el-checkbox>
              <el-checkbox label="解析知识性错误"></el-checkbox>
              <el-checkbox label="解析细节错误"></el-checkbox>
              <el-checkbox label="其他错误"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="错误描述：">
            <el-input type="textarea" v-model="error.desc" :rows="4" placeholder="请输入相关纠错内容"></el-input>
            <p style="color:a7a9ae;">您的纠错审核通过后将会获得一定的奖励</p>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeDialog" size="mini">确 定</el-button>
        <el-button @click="closeDialog" size="mini">取 消</el-button>
      </span>
    </el-dialog>

</template>

<script>
export default {
  props: ['dialogVisible'],
  data() {
    return {
      error: {
        type: [],
        desc: ""
      }
    };
  },
  mounted() {
    //this.$emit("getTreeData", this.treeData);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  },

  methods: {

    closeDialog() {
      this.$emit('close')
    },


  }
};
</script>
<style lang="less">
// .test-ques {
//   .el-radio-button__inner {
//     border: 0px;
//     background-color: #f2f5fc;
//     border-radius: 3px;
//     font-size: 14px;
//     color: #666;
//   }
//   .el-input__inner {
//     background: #f0f3fa;
//   }

//   .el-radio-button:first-child .el-radio-button__inner {
//     border-left: 0px;
//     border-radius: 3px;
//   }
//   .el-radio-button:last-child .el-radio-button__inner {
//     border-radius: 3px;
//   }
//   .el-button--primary.is-plain {
//     background: #f2f5fc;
//     border-color: #e2e2e2;
//     color: #7b9ff6;

//     &:hover,
//     &:active,
//     &:focus {
//       color: #5182f4;
//     }
//   }

//   .el-checkbox__inner {
//     background-color: #f2f5fc;
//   }
//   .el-checkbox {
//     color: #9d9ea1;
//   }

//   .el-card {
//     background-color: #f0f3fa;
//     border-color: #e7eaf1;
//   }

//   .el-card__body {
//     padding: 0px;
//   }

//   // 相似题
//   .smdialog {
//     .el-card {
//       background-color: #ffffff;
//       border-color: #e7eaf1;
//     }
//   }
//   // .el-button--primary.is-plain:focus, .el-button--primary.is-plain:hover{}
// }
</style>
<style scoped lang="less">
.test-ques {
  .box-card {
    margin-top: 15px;
    border-radius: 8px;
    position: relative;
    .maskdiv {
      position: absolute;
      right: 3px;
      .mask {
        width: 60px;
        height: 0px;
        border-top: 20px solid red;
        border-right: 20px solid transparent;
        border-left: 20px solid transparent;

        cursor: pointer;
        text-align: center;
        .maskspan {
          position: absolute;
          top: 0;
          color: #ffffff;
          font-size: 0.5rem;
          right: 18px;
          line-height: 1.5;
        }
      }
    }

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
        padding-bottom: 20px;
        cursor: pointer;

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

      .iconcolor {
        color: #789ef6;
      }
    }
  }
  .search-div {
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
        }
      }
      &:last-child {
        border-bottom: 1px solid #e2e2e2;
      }
    }
  }

  .input-search {
    margin-top: 10px;
    border: 1px solid #e2e2e2;
    padding: 0 20px;
    background-color: #f2f5fc;
    display: flex;
    justify-content: space-between;
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
  }

  .smdialog {
    .btnclass {
      display: flex;
      justify-content: space-between;

      .active {
        background-color: #628ef5;
        color: #ffffff;
      }
    }

    .smtitle {
      color: #333333 !important;
    }

    .foot-wrap {
      background-color: #f0f3fa;
    }
  }
}
</style>