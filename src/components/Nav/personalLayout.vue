<template>
  <div class="personal">
      <div slot="left" class="left">
          <div class="nav-wrap" :class="{treeclassfixed:isfixTab}">
            <teacher-nav></teacher-nav>
          </div>
      </div>

      <div slot="right">
        <div class="wrap">


          <div class="wrap-content">
            <div class="wrap-content-left">
              <div class="" :class="{fixedclass:isfixTab}">
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
                <div class="tab-class">
                  <el-tabs stretch v-model="activeType">
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
                  </el-tabs>
                </div>
              </div>
            </div>
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
      </div>
  </div>
</template>

<script>
import teacherNav from "@/components/Nav/teacherNav";
import leftFixedNav from "@/components/Nav/leftFixedNav";
import topPopover from "@/components/Popover/topPopover";
export default {
  props: ["isfixTab"],
  components: {
    teacherNav,
    leftFixedNav,
    topPopover
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
  mounted() {
    this.get_resource();
  },
  methods: {
    get_resource() {
      this.$emit("show_resource");
    }
  }
};
</script>
<style lang="less">
.personal {
		.tree-wrap {
			width: 200px !important;
		}

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
.personal {
  

  .nav-wrap {
		width: 200px;
  }


  .wrap {
    // .search {
    //   td {
    //     height: 36px;
    //     line-height: 36px;
    //     border: 1px solid #e3e4e7;
    //     border-bottom: 0px;
    //   }
    //   tr {
    //     &:last-child td {
    //       border-bottom: 1px solid #e3e4e7;
    //     }
    //     td:first-child {
    //       border-bottom: 1px solid #ffffff;
    //     }
    //   }
    //   &-left {
    //     width: 120px;
    //     text-align: center;
    //     background-color: #dce0e5;
    //   }

    //   &-right {
    //     //width: 90%;
    //     background-color: #f6faff;
    //     padding-left: 20px;
    //   }
    // }

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