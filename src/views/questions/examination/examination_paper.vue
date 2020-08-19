<template>
  <div class="examination">
    <!-- <ul><li v-for="i in 89">{{i}}</li></ul> -->
    <left-fixed-nav :isfixTab="isfixTab">
      <div slot="left">
        <!-- <div class="tree-wrap" :class="{fixedclass:isfixTab}"> -->
          <div class="tab-class">
            <div class="tree-class" :class="{treeclassfixed:isfixTab}">
              <div v-for="(item,index) in list">
                <p class="titlep">
                  {{index+1}}{{item.type}}
                  <!-- <span>(共{{item.list.length}}小题)</span> -->
                </p>
                <div class="btngroup">
                  <p>
                    <el-button
                      v-for="(item1,index1) in item.list"
                      size="mini"
                      type="primary"
                      plain
                    >{{index1+1}}</el-button>
                  </p>
                  <p style="flex-shrink: 0;">
                    <el-button type="text">删除</el-button>
                    <!-- <el-button type="text">排序</el-button> -->
                  </p>
                </div>
              </div>
            </div>
          </div>
        <!-- </div> -->
      </div>

      <div slot="right">
        <div class="bread-div">
          <div>
            <i class="iconfont iconshouye iconclass"></i>当前位置：试卷中心
          </div>
        </div>
        <div style="margin-left:20px;">
          <el-button type="primary" size="mini" @click="scoredialogVisible=true">分值设定</el-button>
          <el-button type="primary" size="mini" @click="analysisdialogVisible=true">试卷分析</el-button>
          <el-button type="primary" size="mini" @click="finishExam">保存试卷</el-button>
          <el-button type="primary" size="mini">继续挑题</el-button>
          <el-button type="primary" size="mini" @click="cleardialogVisible=true">清空试卷</el-button>
        </div>

        <div class="exam-wrap">
          <p class="title">
            <el-input v-model="paperName" placeholder="请输入内容" style="width:360px;"></el-input>
          </p>
          <div class="content">
            <el-button type="primary" size="mini" class="uploadbtn">试卷下载</el-button>
            <div v-for="(list,index) in questionList" class="singlediv">
              <p><span>{{changeindex(index)}}</span>、{{list.type}}（共{{list.list.length}}小题）</p>
              <div class="singleques" v-for="(list1,index1) in list.list">

                <div class="pt1">
                  <span>{{index1 + 1}}</span>
                  <span>、</span>
                  <div  v-html="list1.name"></div>
                  <!-- <img src="@/assets/test1.png" /> -->
                  
                  
                </div>
                <div class="pt2" v-if="list1.options.length">

                  <ul>
                    <li style="width: 100%;" class="selectoption" v-for="list2 in list1.selectoption">
                      <span style="margin-right: 10px;font-style: italic;">{{list2.key}}.</span>
                      <div v-html="list2.value"></div>
                    </li>

                  </ul>

                  
                </div>

              <!-- 小题 -->
              <div class="" v-if="list1.smallQuestions.length" style="margin-top: 10px;">
                <div v-for="(list4,index4) in list1.smallQuestions">

                  <div class="pt1">
                    <!-- <img src="@/assets/test1.png" /> -->
                    <span>({{index4+1}})</span><span>、</span>
                    <span v-html="list4.name"></span>
                  </div>
                  <div class="pt2" v-if="list1.options.length">
                    <ul>
                      <li style="width: 100%;" class="selectoption" v-for="item in list1.selectoption">

                        <span>{{item.key}}</span>
                        <span>、</span>
                        <span v-html="item.value"></span> 
                        <!-- <img src="@/assets/test1.png" /> -->
                      </li>


                    </ul>
                  </div>
                </div>
              </div>
              <section class="content" style="border-top: 1px dashed #dbdee4;" v-show="list1.showDetail">

                <div class="middle">
                  <div>
                    <p class="anstitle">【知识点】</p>
                    <p>{{list1.knowledgesPoint.join()}}</p>
                  </div>

                  <div  v-if="list1.fillAnswers.length ||list1.smallQuestions.length">
                    <p class="anstitle">【答案】</p>
                    <p>
                      <span v-for="(list3,index3) in list.answers">
                       <span  v-if="list1.smallQuestions.length" style="margin-left: 0px;">{{index3+1}}、</span>
                       <span style="margin-left: 0px;">{{list3}}</span>
                      </span>
                    </p>
                  </div>
                  <div>
                    <p class="anstitle">【分析】</p>
                    <p v-html="list1.analysis"></p>
                  </div>
                  <div>
                    <p class="anstitle">【详解】</p>
                    <p v-html="list1.detailedAnalysis"></p>
                  </div>
                </div>
              </section>
                <div class="pt3">
                  <div class="wrap">
                    <div class="operate-wrap">
                      <p>
                        <el-input
                          v-model="list1.score"
                          placeholder="请输入内容"
                          style="width:60px;"
                          size="mini"
                        ></el-input> 分
                      </p>
                      <p @click="list1.showDetail = true" v-if="!list1.showDetail">查看解析</p>
                      <p @click="list1.showDetail = false" v-else>隐藏解析</p>
                      <!-- <p @click="onUpItem()">上移</p>
                      <p @click="onDownItem()">下移</p> -->
                      <p @click="deleteQuestion(list1.questionId)">删除</p>
                      <p>换一题</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </left-fixed-nav>
    <el-dialog
      title="下载word试卷"
      :visible.sync="downloadVisible"
      width="800px"
      custom-class="down-wrap"
    >
      <div class="down-body">
        <el-form :model="download" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="Word版本：" prop="name">
            <el-radio-group v-model="download.version">
              <el-radio label="普通试卷">
                Word2010/2013，文件扩展名为docx
                <span class="descclass" style="margin-left:48px;">docx格式文档，可编辑公式</span>
              </el-radio>
              <el-radio label="教师用卷">
                Word2003/2007/WPS，文件扩展名为doc
                <span class="descclass" style="margin-left:20px;">doc格式文档，公式为图片，不可编辑公式</span>
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="纸张大小：" prop="region">
            <el-radio-group v-model="download.size">
              <el-radio label="A4"></el-radio>
              <el-radio label="16K"></el-radio>
              <el-radio label="A4横(双栏)"></el-radio>
              <el-radio label="A3横(双栏)"></el-radio>
              <el-radio label="B4横(双栏)"></el-radio>
              <el-radio label="8K横(双栏)"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="试卷类型：">
            <el-radio-group v-model="download.type">
              <el-radio label="普通试卷">
                普通试卷
                <span class="descclass">（答案集中在卷尾）</span>
              </el-radio>
              <el-radio label="教师用卷">
                教师用卷
                <span class="descclass">（每题后面跟答案）</span>
              </el-radio>
              <el-radio label="学生用卷">
                学生用卷
                <span class="descclass">（无答案）</span>
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="下载解析：" prop="delivery">
            <el-checkbox label="美食/餐厅线上活动" name="type" v-model="download.ifparse"></el-checkbox>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer footbtn">
        <el-button type="primary" @click="downloadVisible = false" size="mini">确 定 下 载</el-button>
      </span>
    </el-dialog>

    <el-dialog title="清空试题" :visible.sync="cleardialogVisible" width="600px">
      <p style="margin-top:20px;">确定清空试题篮所有试题？</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="clearBasket" size="mini">确 定</el-button>
        <el-button @click="cleardialogVisible = false" size="mini">取 消</el-button>
      </span>
    </el-dialog>

    <scoredialog :dialogVisible="scoredialogVisible" :paperId="paperId" @close="closescore" :paperName="paperName" :tableData="questionList"></scoredialog>
    <analysisdialog :dialogVisible="analysisdialogVisible" :paperId="paperId" @close="closeanalysis"></analysisdialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import leftFixedNav from "@/components/Nav/leftFixedNav";
import scoredialog from "@/components/Dialog/score_setting";
import analysisdialog from "@/components/Dialog/analysis";

export default {
  components: {
    leftFixedNav,
    scoredialog,
    analysisdialog
  },
  props: ["isfixTab"],

  data() {
    return {
      questionList:[],
      paperName: "",
      items: [],
      scoredialogVisible: false,
      analysisdialogVisible: false,
      downloadVisible: false,
      cleardialogVisible: false,
      score: "",
      list: [
        {
          type: "选择题",
          list: [
            { ques: "", check: false },
            { ques: "", check: false },
          ]
        },
        { type: "填空题", list: [{ ques: "", check: false }] },
        { type: "解答题", list: [{ ques: "", check: false }] },
        { type: "判断题", list: [{ ques: "", check: false }] }
      ],
      download: {
        version: "",
        size: "",
        type: "",
        ifparse: false
      }
    };
  },
  computed: {
      ...mapGetters([
        'paperId',

      ]),
  },
  mounted() {

    // this.paperId = this.$route.params.paperId
    this.getPaperDetail()

  },
  methods: {

    closescore() {
      this.scoredialogVisible = false;
    },

    closeanalysis() {
      this.analysisdialogVisible = false;
    },
    changeindex(index) {
      const list = {'0': '零','1': '一','2': '二','3': '三','4': '四','5': '五','6': '六','7': '七','8': '八','9': '九'};
      return list[index+1]
    },
    finishExam() {
      this.$confirm("组卷完成，是否下载", {
        confirmButtonText: "下载试卷",
        cancelButtonText: "保存试卷",
        center: true,
        //type: "warning"
      })
        .then(() => {
          this.downloadVisible = true;

        })
        .catch(() => {

        });
      
    },
    clearBasket() {

      this.$http.delete(`/api/open/paper/${this.paperId}`)
      .then(data=>{
        if(data.status == '200') {

          this.cleardialogVisible = false
          this.$confirm("试卷删除成功，是否重新挑题", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            // center: true,
            //type: "warning"
          })
            .then(() => {
              this.$router.push('/questions/chooseBychapter')

            })
            .catch(() => {

            });
        }
      })
      

      
    },
    // 上移
    onUpItem(item, index) {
      this.items.splice(index - 1, 0, item);
      this.items.splice(index + 1, 1);
      if (index == 0) {
        alert("到顶啦！");
      }
    },
    // 下移
    onDownItem(item, index) {
      this.items.splice(index + 2, 0, item);
      this.items.splice(index, 1);
      if (index == this.items.length - 1) {
        alert("已经是最后一项啦！");
      }
    },

    deleteQuestion(questionId) {
      this.$http.delete(`/api/open/paper/${this.paperId}/${questionId}`)
      .then(data=>{
        if(data.status == '200') {
          this.getPaperDetail()
          this.$message({
            message: '试题删除成功',
            type:'success'
          })
        }
      })
    },

    getPaperDetail() {
      this.$http.get(`/api/open/paper/${this.paperId}`)
      .then((data)=>{
        if(data.status == '200') {
          this.paperName = data.data.paperName

          let list = []
          if(data.data.questionMap) {
            for(let key in data.data.questionMap) {
              list.push({type:key})
              list[list.length-1].list = []

              data.data.questionMap[key].forEach((item,index)=>{
                // console.log(item)
                item.index = index + 1
                item.showDetail = false
                item.answers = []
                this.handleQuestion(item,item)
                list[list.length-1].list.push(item)
              })
            }
          }

          console.log(list)


          this.questionList = list
        }
      })
    },

    handleQuestion(item,item0) {

      item.selectoption = []
      if(item.options && item.options.length) {
        item.options.forEach(item1=>{
          item.selectoption.push(item1)
          // for(let key in item1) {
          //   item.selectoption.push({key:key,value:item1[key]})
          // }
        })
      }
      //答案
      //item.answers = []
      if(item.fillAnswers && item.fillAnswers.length) {
        item.fillAnswers.forEach(item1=>{
          item0.answers.push(item1.value)
          // for(let key in item1) {
          //   item0.answers.push(item1[key])
          // }
        })
      }

      //知识点
      item.knowledgesPoint = []
      if(item.chapters && item.chapters.length) {
        item.chapters.forEach(item1=>{
          item.knowledgesPoint.push(item1.name)
        })
      }else if(item.knowledges && item.knowledges.length) {
        item.knowledges.forEach(item1=>{
          item.knowledgesPoint.push(item1.name)
        })
      }

      if(item.smallQuestions && item.smallQuestions.length) {
        item.children = []
        item.smallQuestions.forEach((item1,index1)=>{
          item1.index = index1 + 1
          item.children.push(item1)
          this.handleQuestion(item1,item)
        })
        
      }

      //console.log(item) 
    },
  }
};
</script>
<style lang="less">

.examination {
  .el-checkbox-button__inner {
    margin-top: 10px;
    margin-right: 10px;
    border-left: 1px solid #dcdfe6;
    border-radius: 3px;
  }
  .el-checkbox-button:first-child .el-checkbox-button__inner,
  .el-checkbox-button:last-child .el-checkbox-button__inner {
    border-radius: 3px;
  }

  .el-checkbox-button__inner {
    background-color: #f2f5fc;
  }

  .el-radio-button__inner {
    background-color: #dbe5fd;
    color: #84a6f7;
    border-radius: 3px;
    margin-right: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    border-left: 1px solid #dcdfe6;
  }

  .el-radio-button:first-child .el-radio-button__inner,
  .el-radio-button:last-child .el-radio-button__inner {
    border-radius: 3px;
  }
  .el-input__inner {
    background: #f0f3fa;
    text-align: center;
  }

  .title {
    .el-input__inner {
      font-size: 18px;
    }
  }

  .pt1,.pt2,.middle {
    p,div,span {
      background-color:transparent !important;
      font-size: 1rem;
      font-family: "JyeMath", "JyeMathLetters", "Times New Roman", "微软雅黑",
          Arial, "宋体" !important;
    }

    img {
      vertical-align: middle;
      height: 30px;
    }
  }

  .down-wrap {
    .el-radio {
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .el-dialog__footer {
      background-color: #e3ebff;
      text-align: center;
    }
  }

  .el-card__body {
    padding: 0px;
  }
}
</style>
<style scoped lang="less">
.examination {
  // color: #727374;
  // font-size: 14px;

  .titlep {
    line-height: 36px;
    color: #727374;
    font-size: 1rem;
  }

  .btngroup {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .exam-wrap {
    margin-top: 20px;
    border: 1px solid #e2e2e2;
    padding: 20px;
    line-height: 1.5;
    min-height: 300px;

    .title {
      text-align: center;
      line-height: 40px;
      font-size: 20px;
    }

    .content {
      font-size: 1rem;
      margin-top: 10px;
      letter-spacing: 1px;
      position: relative;

      .uploadbtn {
        position: absolute;
        right: 20px;
        top: -5px;
      }

      .singlediv {
        margin-top: 20px;

        .singleques {
          margin: 20px 0px;
          //padding:10px 20px;
          border: 1px solid transparent;
          transition: 0.5s;
          &:hover {
            border: 1px solid #d6d6d6;
            border-radius: 7px;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

            .wrap {
              display: block;
            }
          }

          .pt1 {
            overflow: hidden;
            zoom: 1;
            clear: both;
            line-height: 25px;
            padding: 20px 30px;
            position: relative;
            word-break: break-word;
            cursor: pointer;
            display: flex;

            img {
              float: right;
              position: relative;
            }
          }
          .pt2 {
            padding: 0 30px 20px 30px;


            ul {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-around;


              li {
                display: flex;
              }

              .selectoption {
                vertical-align: middle;
                font-size: 14px;
                padding: 2px;

                // span {
                //   margin-right: 
                // }

                label {
                  line-height: 24px;
                }
              }
            }

            .oneline {
              width: 24%;
            }
            .twoline {
              width: 48%;
            }

            .fourline {
              width: 100%;
            }
          }
        }


        .content {

          padding: 0 30px 20px 30px;
          .middle {
            margin-top: 20px;
            div {
              display: flex;

              .anstitle {
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


        .pt3 {
          height: 36px;
          line-height: 36px;

          .wrap {
            display: none;

            .operate-wrap {
              border-radius: 0 0 7px 7px;
              padding: 0 20px;
              height: 100%;
              background-color: #409eff;
              display: flex;
              justify-content: flex-end;
              color: #ffffff;
              font-size: 0.9rem;
              //display: none;

              p {
                margin-left: 20px;
                cursor: pointer;

                &:hover {
                  font-weight: bold;
                }
              }
            }
          }

          //text-align: right;
        }
      }
    }
  }

  .down-wrap {
    .descclass {
      font-size: 12px;
      color: #9a9a9a;
    }
  }
}
</style>