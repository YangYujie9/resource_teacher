<template>
  <div class="personal">
      <div class="left-nav-wrap">
          <div class="nav-wrap" :class="{fixedclass:isfixTab}">
            <teacher-nav></teacher-nav>
          </div>
      </div>
      <div class="middle-tree-wrap">
        <div class="tree-wrap" :class="{fixedclass:isfixTab}">
          <top-popover>
            <div slot="reference">
              <p class="top-title">
                <span>七年级上</span>
                <span style="margin-left:20px;">数学</span>
              </p>
            </div>
            <div slot="popover">
              <div>
                <p>年级：</p>
                <el-radio-group v-model="filter.grade" size="mini">
                  <el-radio-button :label="item" v-for="item in list"></el-radio-button>
                </el-radio-group>
              </div>
            </div>
          </top-popover>
          <div class="tree-content">
            <el-tabs stretch v-model="activeType" @tab-click="handleClick">
              <el-tab-pane label="按章节" name="chapter">
                <div class="tree-class" :class="{treeclassfixed:isfixTab}">
                  <pointTree chooseType="chapter" :grade="filter.grade.key" :subjectCode="getuserInfo.subjectCode"  @getCheckedNodes="getCheckedChapters" ref="chapterTree"></pointTree>
                </div>
              </el-tab-pane>
              <el-tab-pane label="按考点" name="detial">
                <div class="knowwrap">
                  <p>考点列表</p>
                  <p class="p2">
                    <span :class="{active:!isMulti}" @click="isMulti=false">[单选]</span>
                    <span :class="{active:isMulti}" @click="isMulti=true">[多选]</span>
                  </p>
                </div>
                <div class="tree-class">
                  <pointTree chooseType="knowledge" :grade="filter.grade.key" :subjectCode="getuserInfo.subjectCode"  @getCheckedNodes="getCheckedKnows" ref="knowledgeTree" :showCheckbox="isMulti"></pointTree>
                </div>
              </el-tab-pane>
            </el-tabs>
             <!--<el-tabs stretch v-model="activeType">
              <el-tab-pane label="按章节" name="chapter">
                <div style="margin-top:10px">
                <el-scrollbar
                  :wrap-class="{treeclassfixed:isfixTab}"
                  wrap-style="max-height: calc(100vh - 400px);margin-bottom:0px;"
                  view-class="view-box"
                  view-style="height:100%;"
                  :native="false"
                >
                  <el-tree
                    ref="tree1"
                    :data="treeData.data"
                    show-checkbox
                    node-key="id"
                    @check="getCheckedNodes"
                  ></el-tree>
                </el-scrollbar>
                </div>
              </el-tab-pane>
              <el-tab-pane label="按考点" name="detial">
                <div class="knowwrap">
                  <p>考点列表</p>
                  <p class="p2">
                    <span :class="{active:!isMulti}" @click="isMulti=false">[单选]</span>
                    <span :class="{active:isMulti}" @click="isMulti=true">[多选]</span>
                  </p>
                </div>
                <div style="margin-top:10px">
                <el-scrollbar
                  :wrap-class="{treeclassfixed:isfixTab}"
                  wrap-style="max-height: calc(100vh - 400px);margin-bottom:0px;"
                  view-class="view-box"
                  view-style="height:100%;"
                  :native="false"
                >
                  <el-tree :data="treeData.data" show-checkbox node-key="id"></el-tree>
                </el-scrollbar>
                </div>
              </el-tab-pane>
            </el-tabs> -->
          </div>
        </div>
      </div>
      <div class="right-content-wrap" :class="{fixedright:isfixTab}">
          <router-view></router-view>
      </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import teacherNav from "@/components/Nav/teacherNav";
import topPopover from "@/components/Popover/topPopover";
export default {
  props: ["isfixTab"],
  components: {
    teacherNav,
    topPopover
  },
  data() {
    return {
      search: {
        grade: "",
        year: "",
        month: "",
        page:1,
        size: 10,
      },

      filter: {
        grade: ""
      },
      isMulti: false,
      activeType: "chapter",
      list: ["全部", "选择题", "填空题", "解答题", "判断题", "全部"],
      treeData: {
        showCheckBox: true,
        data: [
          {
            id: 1,
            label: "第1章 有理数",
            children: [
              {
                id: 9,
                label: "1.1正数和负数"
              },
              {
                id: 10,
                label: "1.1正数和负数"
              },
              {
                id: 11,
                label: "1.1正数和负数"
              }
            ]
          },
          {
            id: 1,
            label: "第1章 有理数",
            children: [
              {
                id: 9,
                label: "1.1正数和负数"
              },
              {
                id: 10,
                label: "1.1正数和负数"
              },
              {
                id: 11,
                label: "1.1正数和负数"
              }
            ]
          },
          {
            id: 1,
            label: "第1章 有理数",
            children: [
              {
                id: 9,
                label: "1.1正数和负数"
              },
              {
                id: 10,
                label: "1.1正数和负数"
              },
              {
                id: 11,
                label: "1.1正数和负数"
              }
            ]
          },
          {
            id: 1,
            label: "第1章 有理数",
            children: [
              {
                id: 9,
                label: "1.1正数和负数"
              },
              {
                id: 10,
                label: "1.1正数和负数"
              },
              {
                id: 11,
                label: "1.1正数和负数"
              }
            ]
          },
          {
            id: 1,
            label: "第1章 有理数",
            children: [
              {
                id: 9,
                label: "1.1正数和负数"
              },
              {
                id: 10,
                label: "1.1正数和负数"
              },
              {
                id: 11,
                label: "1.1正数和负数"
              }
            ]
          },
          {
            id: 2,
            label: "第2章 整式的加减",
            children: [
              {
                id: 5,
                label: "2.2 函数和元素"
              },
              {
                id: 6,
                label: "2.2 函数和元素"
              }
            ]
          },
          {
            id: 7,
            label: "第2章 整式的加减",
            children: [
              {
                id: 8,
                label: "2.2 函数和元素"
              },
              {
                id: 3,
                label: "2.2 函数和元素"
              }
            ]
          },
          {
            id: 4,
            label: "第2章 整式的加减",
            children: [
              {
                id: 13,
                label: "2.2 函数和元素"
              },
              {
                id: 14,
                label: "2.2 函数和元素"
              }
            ]
          },
          {
            id: 15,
            label: "第2章 整式的加减",
            children: [
              {
                id: 16,
                label: "2.2 函数和元素"
              },
              {
                id: 17,
                label: "2.2 函数和元素"
              }
            ]
          },
          {
            id: 15,
            label: "第2章 整式的加减",
            children: [
              {
                id: 16,
                label: "2.2 函数和元素"
              },
              {
                id: 17,
                label: "2.2 函数和元素"
              }
            ]
          },
          {
            id: 15,
            label: "第2章 整式的加减",
            children: [
              {
                id: 16,
                label: "2.2 函数和元素"
              },
              {
                id: 17,
                label: "2.2 函数和元素"
              }
            ]
          },
          {
            id: 15,
            label: "第2章 整式的加减",
            children: [
              {
                id: 16,
                label: "2.2 函数和元素"
              },
              {
                id: 17,
                label: "2.2 函数和元素"
              }
            ]
          },
          {
            id: 15,
            label: "第2章 整式的加减",
            children: [
              {
                id: 16,
                label: "2.2 函数和元素"
              },
              {
                id: 17,
                label: "2.2 函数和元素"
              }
            ]
          }
        ]
      }
    };
  },

  computed: {

    ...mapGetters([
      'gradeList',
      'getuserInfo',

    ]),
  },


  watch: {

    gradeList(val) {
      if(val.length) {
        this.filter.grade = val[0]
      }

    },
  },


  mounted() {
    this.gradeList.length? this.filter.grade = this.gradeList[0]: null
    // this.subjectCode = this.getuserInfo.subjectCode

  },



  methods: {


    getCheckedChapters() {},

    getCheckedKnows() {}
  }
};
</script>
<style lang="less">
.personal {


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
  .pagination {
    margin-top: 30px;
    text-align: right;
  }
  
}
</style>
<style scoped lang="less">
.personal {
  width: 90%;
  margin:0 auto;
  display: flex;


  .fixedclass {
    position: fixed;
    top: 60px;
  }
  .left-nav-wrap {
    min-width: 200px;
    margin-right: 20px;
    .nav-wrap {
      
    }
  }

    .left-wrap {

    }

    .right-wrap {
      width: 90%;
      min-height: calc(100vh - 328px);
    }

    .fixedright {
      min-height: calc(100vh - 50px);
    }
  .middle-tree-wrap {
    min-width: 300px;
    flex-shrink: 0;
    margin-right: 20px;



    .tree-wrap {
      width: 300px;
      // max-width: 350px;
      min-height: 300px;
      padding: 20px 0px;
      border: 1px solid #e2e2e2;
      z-index:1;

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
      }

      .treeclassfixed {
        max-height: calc(100vh - 280px) !important;
      }


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
  }

  .right-content-wrap {
    width: 60%;
    // background:red;
    // min-height: calc(100vh - 328px); 
  }

  .fixedright {
    min-height: calc(100vh - 50px);
  }

}
</style>