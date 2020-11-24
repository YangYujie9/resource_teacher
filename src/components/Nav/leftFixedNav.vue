<template>
  <div class="left-nav">
    <!-- <router-view :isfixLeft="isfixLeft"></router-view> -->
    <div class="content-wrap">
      <div class="left-wrap" :style="{minWidth:leftMinWidth+'px'}">
        <div class="tree-wrap" :class="{fixedclass:isfixTab}">
        <!-- <div class="tab-class"> -->
        <!-- <div class="tree-class" :class="{treeclassfixed:isfixTab}"> -->
        <!-- <el-tree
                  :data="treeData.data"
                  :show-checkbox="treeData.showCheckBox"
                  node-key="id" 
        ></el-tree>-->
        <slot name="left"></slot>
        <!-- </div> -->
        <!-- </div> -->
        </div>
      </div>
      <div class="right-wrap" :class="{fixedright:isfixTab}">
        <!-- <router-view @getTreeData="getTreeData"></router-view> -->
        <slot name="right"></slot>
      </div>
    </div>

    <!-- <div class="footer"></div> -->
  </div>
</template>

<script>
import pageHead from "@/components/Nav/pageHead";
export default {
  props: {
    isfixTab: {
      type: Boolean
    },
    leftMinWidth: {
      type: Number,
      default: 300
    }
  },
  components: {
    pageHead
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less">
.left-nav {

  .el-radio-costom {
    .el-input__inner {
      background: transparent;
    }
    .el-textarea__inner {
      background: transparent;
    }
    .el-radio-button__inner {
      border: 0px;
      background-color: #f2f5fc;
      border-radius: 3px;
      font-size: 0.9rem;
      color: #666;
    }
    .el-input__inner {
      background: transparent;
    }

    .el-radio-button:first-child .el-radio-button__inner {
      // border-left: 0px;
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

    .el-radio-button__orig-radio:checked+.el-radio-button__inner {
      color: #FFF;
      background-color: #409EFF;
      border-color: #409EFF;
      box-shadow: -1px 0 0 0 #409EFF;
    }
  }
}
</style>
<style lang="less">
.tree-wrap {
  width: 300px;
  // max-width: 350px;
  min-height: 300px;
  padding: 20px 0px;
  border: 1px solid #e2e2e2;
  z-index:1000;

  .tab-class {
    padding: 0 30px;
  }

  .tree-content {
    padding: 0 20px;
  }

  .tree-class {
    overflow: auto;
    // overflow-x: hidden;
    max-height: calc(100vh - 450px);
    padding-bottom: 20px;
  }

  .treeclassfixed {
    max-height: calc(100vh - 270px) !important;
  }
}
  //  标签页
  .bread-div {
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    color: #808182;
    position: relative;

    .upbutton {
      position: fixed;
      top: 60px;
    }
  }

  //搜索区
  .search-div {
    background-color: #f2f5fc;
    ul {
      li {
        padding: 0 20px;
        border: 1px solid #e2e2e2;
        min-height: 36px;
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

  .input-search {
    margin-top: 10px;
    border: 1px solid #e2e2e2;
    padding: 0 20px;
    background-color: #f2f5fc;
    display: flex;
    justify-content: space-between;

    .ansbtn {
      font-size: 14px;
      color: #9d9ea1;
      cursor: pointer;
    }
  }


  .card-wrap {
    margin: 20px 0;
    border: 1px solid #e2e2e2;
    padding: 10px 20px 20px 20px;
    background-color: #f2f5fc;


  }
    .pagination {
      margin-top: 30px;
      text-align: right;
    }
</style>
<style scoped lang="less">
.left-nav {
  .content-wrap {
    width: 80%;
    //margin:0 auto;
    margin-left: 7%;
    min-width: 1250px;
    height: 100%;
    display: flex;
    //justify-content: space-between;

    .left-wrap {
      //min-width: 200px;
      flex-shrink: 0;
      margin-right: 20px;

      .fixedclass {
        position: fixed;
        top: 60px;
        // left: 7%;
      }
    }

    .right-wrap {
      width: 90%;
      min-width: 0px;
      min-height: calc(100vh - 328px);
      position: relative;
    }

    .fixedright {
      min-height: calc(100vh - 50px);
    }
  }
  // .fixedNavbar{
  //  position: fixed;
  //  top: 0;
  //  left: 0;
  //   width: 100%;
  //   margin-bottom: 20px;

  // }
}
</style>