<template>
  <div class="warehouse">
    <leftFixedNav :leftMinWidth="200">
      <div slot="left" class="warehouse-nav">
        <!-- <div class="tree-wrap" :class="{fixedclass:isfixTab}"> -->
          <div class="tree-class" :class="{treeclassfixed:isfixTab}">
            <teacher-nav></teacher-nav>
          </div>
        <!-- </div> -->
      </div>

      <div slot="right">
        <div class="wrap">
          <!-- <div class="search">
            <table cellspacing="0" width="100%">
              <tr>
                <td class="search-left">年级</td>
                <td class="search-right">
                  <el-radio-group v-model="search.grade" size="mini">
                    <el-radio-button :label="item" v-for="item in list"></el-radio-button>
                  </el-radio-group>
                </td>
              </tr>
              <tr>
                <td class="search-left">教材</td>
                <td class="search-right"></td>
              </tr>
              <tr>
                <td class="search-left">收藏时间</td>
                <td class="search-right">
                  <el-date-picker
                    v-model="search.year"
                    type="year"
                    size="mini"
                    style="width:140px;"
                    placeholder="选择年"
                  ></el-date-picker>
                  <el-date-picker
                    v-model="search.month"
                    type="month"
                    size="mini"
                    style="width:140px;margin-left:10px;"
                    placeholder="选择月"
                  ></el-date-picker>
                </td>
              </tr>
            </table>
          </div>-->
          <div class="bread-div">
            <div>
              <i class="iconfont iconshouye iconclass"></i>当前位置：个人中心 > 我的题库
            </div>

            <!-- <span style="padding:0 10px;">></span>同步卷 -->
            <div>
              <el-button
                type="danger"
                size="mini"
                @click="$router.push('/addquestion/submitQuestions')"
              >上传试题</el-button>
              <!-- <el-button type="danger" size="mini" :class="{upbutton: isfixTab}">上传试题</el-button> -->
            </div>
          </div>
          <div class="wrap-content">
            <div class="wrap-content-left">
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
                <div class="tab-class">
                  <el-tabs stretch v-model="activeType">
                    <el-tab-pane label="按章节" name="chapter">
                
                        <div class="tree-class" :class="{treeclassfixed:isfixTab}" style="margin-top:10px">
                          <pointTree :showCheckbox="true" :treeData="treeData.data"></pointTree>
                        </div>
             
                    </el-tab-pane>
                    <el-tab-pane label="按考点" name="detial">
                      <!-- <div class="knowwrap">
                        <p>考点列表</p>
                        <p class="p2">
                          <span :class="{active:!isMulti}" @click="isMulti=false">[单选]</span>
                          <span :class="{active:isMulti}" @click="isMulti=true">[多选]</span>
                        </p>
                      </div>-->
                     
                        <div class="tree-class" :class="{treeclassfixed:isfixTab}" style="margin-top:10px">
                          <pointTree :showCheckbox="true" :treeData="treeData.data"></pointTree>
                        </div>
                  
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </div>
            </div>
            <div class="wrap-content-right">
              <div class="wrap-content-right-top">
                <!-- <el-form :inline="true" :model="search" class="demo-form-inline">
                    <el-form-item label="题型">
                      <el-select v-model="search.type" class="search-class" size="mini">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="公开">
                      <el-select v-model="search.range" class="search-class" size="mini">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="难度">
                      <el-select v-model="search.diff" class="search-class" size="mini">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="上传时间">
                      <el-date-picker
                        v-model="search.uploadtime"
                        type="daterange"
                        size="mini"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        style="width:260px;"
                      ></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                      <span class="cursor" v-show="!isAnswer" @click="isAnswer=true">
                        <i class="iconfont iconxianshi" style="position: relative;top:1px"></i>
                        显示答案
                      </span>
                      <span class="cursor" v-show="isAnswer" @click="isAnswer=false">
                        <i class="iconfont iconyincang"></i>
                        隐藏答案
                      </span>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" size="mini" style="margin-left:20px;">
                        <i class="iconfont iconiconjia" style="font-size:12px;"></i> 全部加入试卷
                      </el-button>
                    </el-form-item>
                </el-form>-->
                <div class="search">
                  <p style="margin-right: 20px;">
                    题型
                    <el-select v-model="search.type" class="search-class" size="mini">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </p>
                  <p style="margin-right: 20px;">
                    难度
                    <el-select v-model="search.diff" class="search-class" size="mini">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </p>
                  <p>
                    上传时间
                    <el-date-picker
                      v-model="search.uploadtime"
                      type="daterange"
                      size="mini"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      style="width:260px;"
                    ></el-date-picker>
                  </p>
                </div>
              </div>

              <div style="text-align:right;margin-top:10px;">
                <span class="cursor" v-show="!isAnswer" @click="isAnswer=true">
                  <i class="iconfont iconxianshi" style="position: relative;top:1px"></i>
                  显示答案
                </span>
                <span class="cursor" v-show="isAnswer" @click="isAnswer=false">
                  <i class="iconfont iconyincang"></i>
                  隐藏答案
                </span>

                <el-button type="primary" size="mini" style="margin-left:20px;">
                  <i class="iconfont iconiconjia" style="font-size:12px;"></i> 全部加入试卷
                </el-button>
              </div>
              <div class="wrap-content-right-wrap">
                <div class="wrap-content-right-wrap-bottom">
                  <div v-show="!isAnswer">
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
                  </div>
                  <div v-show="isAnswer">
                    <el-card class="box-card" shadow="hover" v-for="i in 10">
                      <div class="maskdiv">
                        <div class="mask">
                          <span class="maskspan">同步</span>
                        </div>
                      </div>
                      <section class="content">
                        <div class="qt2 top"></div>

                        <div class="middle">
                          <div>
                            <p class="title">【知识点】</p>
                            <p>B．教室内课桌的高度约为80dmB．教室内课桌的高度约为80dmB．教室内课桌的高度约为80dmB．教室内课桌的高度约为80dmB．教室内课桌的高度约为80dm</p>
                          </div>

                          <div>
                            <p class="title">【答案】</p>
                          </div>
                          <div>
                            <p class="title">【分析】</p>
                          </div>
                          <div>
                            <p class="title">【详解】</p>
                          </div>
                          <div>
                            <p class="title">【点睛】</p>
                          </div>
                          <p class="tag">2019~山东省高中二期中</p>
                        </div>
                      </section>
                      <section class="foot-wrap">
                        <p class="pt1">
                          <span>更新：2020/8/7</span>
                          <span>难度：0.9</span>
                          <span>题型：选择题</span>
                          <span>组卷：60</span>
                        </p>
                        <p class="pt2">
                          <span>
                            <i class="iconfont iconpaibanguanli iconcolor"></i> 相似题
                          </span>
                          <span>
                            <i class="iconfont iconjiucuo iconcolor"></i> 纠错
                          </span>
                          <span>
                            <i class="iconfont iconshoucang1" style="color:#ffda33;"></i>
                            <i class="iconfont iconshoucang2 iconcolor"></i>
                            收藏
                          </span>
                          <span>
                            <i class="iconfont iconxiangqing1 iconcolor"></i> 详情
                          </span>
                          <el-button type="primary" size="mini">加入试卷</el-button>
                        </p>
                      </section>
                    </el-card>
                  </div>

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
    </leftFixedNav>
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
        type: "",
        range: "",
        diff: "",
        uploadtime: ""
      },
      filter: {
        grade: ""
      },
      isAnswer: false,
      isMulti: false,
      activeType: "chapter",
      currentPage: 1,
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
    },

    handleSizeChange() {},

    handleCurrentChange() {}
  }
};
</script>
<style lang="less">
.warehouse {
  .el-radio-button__inner {
    border: 0px;
    background-color: #f6faff;
    border-radius: 3px;
    font-size: 14px;
    color: #666;
  }
  .el-input__inner {
    background: transparent;
  }
  .el-range-editor .el-range-input {
    background: transparent;
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

  .el-date-editor .el-range-separator {
    width: 8%;
  }

  .el-form-item {
    margin-bottom: 10px;
  }
}
</style>
<style scoped lang="less">
.warehouse {
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

          &-top {
            font-size: 13px;
            border: 1px solid #e2e2e2;
            //height: 40px;
            line-height: 40px;
            padding: 6px 20px;
            //border: 1px solid #e2e2e2;

            .search {
              display: flex;
              p {
                
              }

              .search-class {
                width: 120px;
                margin-left: 5px;
              }
            }
          }

        &-wrap {
          border: 1px solid #e2e2e2;
          background-color: #f6faff;
          padding:0 10px 10px 10px;
          margin-bottom: 30px;
          margin-top: 10px;

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