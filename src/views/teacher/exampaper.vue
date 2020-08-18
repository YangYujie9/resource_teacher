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
              <i class="iconfont iconshouye iconclass"></i>当前位置：个人中心 > 我的组卷
            </div>

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
                <!-- <top-popover>
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
                </top-popover> -->
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

            <div class="tree-class" :class="{treeclassfixed:isfixTab}"  style="margin-top:10px">
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

              <div style="margin-top:10px;">
                <span>关键字</span>
                <el-input v-model="search.keyword" placeholder="请输入内容" style="width:200px;" size="mini"></el-input>
              </div>
              <div class="wrap-content-right-wrap">
                <div class="singal-paper" v-for="i in 10">
                  <div>
                    <p class="p1">2020年03月22日初中数学组卷</p>
                    <p class="p2"><span>组卷日期：2020/4/22</span><span style="margin-left:20px;">下载日期：未下载</span></p>
                  </div>
                  <div>
                    <el-button type="text">浏览</el-button>
                    <el-button type="text">下载</el-button>
                    <el-button type="text">编辑</el-button>
                    <el-button type="text">删除</el-button>
                  </div>
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
        uploadtime: "",
        keyword:'',
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

  .el-button+.el-button {
    margin-left: 20px;
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
            line-height: 40px;
            padding: 6px 20px;

            .search {
              display: flex;

              .search-class {
                width: 120px;
                margin-left: 5px;
              }
            }
          }
        &-wrap {     
          margin-bottom: 30px;
          margin-top: 10px;


          .singal-paper {
            border: 1px solid #e2e2e2;
            margin-top: 10px;
            //background-color: #f6faff;
            padding:20px;
            border-radius: 4px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            line-height: 2.5;
            transition:0.3s;
            &:hover {
              box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
            }
            
            

            .p1 {
              font-size: 1rem;
              color: #409EFF;
            }

            .p2 {
              font-size: 0.8rem;
              color: #828282;
            }
          }
        }
      }
    }
  }
}
</style>