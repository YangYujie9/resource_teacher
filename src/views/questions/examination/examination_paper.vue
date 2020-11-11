<template>
  <div class="examination">
    <left-fixed-nav :isfixTab="isfixTab">
        <div slot="left">
          <div class="tab-class">
            <div class="tree-class" :class="{treeclassfixed:isfixTab}">
              <div v-for="(item,index) in questionList">
                <p class="titlep">
                  <span>{{$changeIndex(index+1)}}</span>
                  <span>、</span>
                  <span>{{item.type}}</span>
                </p>
                <div class="btngroup">
                  <p>
                    <el-checkbox-group v-model="checkDelete" size="mini">
                      <el-checkbox-button v-for="(item1,index1) in item.list" :label="item1.questionId" :key="item1.questionId">{{item1.index}}</el-checkbox-button>
                    </el-checkbox-group>

                  </p>
                  <!-- <p style="flex-shrink: 0;">
                    <el-button type="text">删除</el-button>
                  </p> -->
                </div>
              </div>
            </div>
          </div>
      </div>  

      <div slot="right">
        <div class="bread-div">
          <div>
            <i class="iconfont iconshouye iconclass"></i>当前位置：试卷中心
          </div>
          <div>
            <el-button type="text" size="mini" @click="$router.go(-1)"><i class="iconfont iconfanhui"></i> 返回</el-button>
            
          </div>
        </div>
        <div style="margin-left:20px;">
          <el-button type="primary" size="mini" @click="setScoreShow">分值设定</el-button>
          <el-button type="primary" size="mini" @click="analysisdialogVisible=true">试卷分析</el-button>
          <el-button type="primary" size="mini" @click="savePaperVisible = true">完成组卷</el-button>
          <!-- <el-button type="primary" size="mini" @click="continueChoose" v-if="$route.query.paperId">继续挑题</el-button> -->
          <el-button type="primary" size="mini" @click="cleardialogVisible=true">清空试卷</el-button>
        </div>

        <div class="exam-wrap" v-if="questionList && questionList.length">
          <p class="title">
            <el-input v-model="paperName" placeholder="请输入内容" style="width:360px;" @change="setScore"></el-input>
          </p>
          <div class="content">
            <!-- <el-button type="primary" size="mini" class="uploadbtn" @click="downloadVisible = true">试卷下载</el-button> -->
            <div v-for="(list,index) in questionList" class="singlediv">
              <p><span>{{$changeIndex(index+1)}}</span>、{{list.type}}（共{{list.list.length}}小题）</p>
              <div class="singleques" v-for="(list1,index1) in list.list">
                <section class=" cursor" @click="list1.showDetail=!list1.showDetail">

                  <div class="pt1">
                    <span style="flex-shrink: 0;">{{list1.index}}、<!-- {{index1 + 1}} --></span>
                    <div  v-html="list1.name" style="width: 100%;"></div>
                    <!-- <img src="@/assets/test1.png" /> -->
                    
                    
                  </div>
                  <div class="pt2" v-if="list1.options.length && list1.questionTypeTemplate!='BoolenQuestionTemplate'">

                    <ul>
                      <li style="width: 100%;" class="selectoption" v-for="list2 in list1.selectoption">
                        <span style="margin-right: 10px;font-style: italic;">{{list2.key}}.</span>
                        <div v-html="list2.value"></div>
                      </li>

                    </ul>

                    
                  </div>

                  <!-- 小题 -->
                  <div class="" v-if="list1.smallQuestions.length" style="margin: 10px 0 0 20px;" >
                    <div v-for="(list4,index4) in list1.smallQuestions">
                      <div :class="{qtwrap:list1.questionTypeTemplate=='GestaltFillsUpTemplate'||list4.questionType=='NoAloneEnter'}"  v-if="list4.questionType!='NoAloneEnter'">
                        <div class="pt1">
                          <!-- <img src="@/assets/test1.png" /> -->
                          <span class="order">{{index4+1}}</span><span>、</span>
                          <span v-html="list4.name"></span>
                        </div>
                        <div class="pt2" v-if="list4.options.length && list4.questionType!='BoolenQuestion'">
                          <ul>
                            <li style="width: 100%;" class="selectoption" v-for="item in list4.selectoption">

                              <span style="margin-right: 10px;font-style: italic;">{{item.key}}.</span>
                             
                              <span v-html="item.value"></span> 
                              <!-- <img src="@/assets/test1.png" /> -->
                            </li>


                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              <section class="content" style="border-top: 1px dashed #dbdee4;" v-show="list1.showDetail">

                <div class="middle">
                  <div>
                    <p class="anstitle">【知识点】</p>
                    <p>{{list1.knowledgesPoint.join()}}</p>
                  </div>

                  <div  v-if="list1.answers.length">
                    <p class="anstitle">【答案】</p>
                    <p>
                      <span v-for="(list3,index3) in list1.answers"style="margin-right: 10px;">
                       <span  v-if="list1.smallQuestions.length" style="margin-left: 0px;">{{list3.index}}.</span>
                       <span style="margin-left: 3px;" v-html="list3.name"></span>
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
                        <span v-if="list1.smallQuestions && list1.smallQuestions.length">{{list1.score}}</span>
                        <el-input
                          v-model="list1.score"
                          placeholder="请输入内容"
                          style="width:60px;"
                          size="mini"
                          @change="setScore(list1)"
                          v-else
                        ></el-input> 分
                      </p>
                      <p @click="list1.showDetail = true" v-if="!list1.showDetail">查看解析</p>
                      <p @click="list1.showDetail = false" v-else>隐藏解析</p>
                      <!-- <p @click="onUpItem()">上移</p>
                      <p @click="onDownItem()">下移</p> -->
                      <p @click="deleteQuestion(list1.questionId)">删除</p>
                      <p @click="changeAnother(list1.questionId)">换一题</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else style="text-align: center;margin-top: 60px;">
          该试卷暂无数据
        </div>
      </div>
    </left-fixed-nav>


    <el-dialog title="清空试题" :visible.sync="cleardialogVisible" width="600px">
      <p style="margin-top:20px;">确定清空试题篮所有试题？</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="clearBasket" size="mini">确 定</el-button>
        <el-button @click="cleardialogVisible = false" size="mini">取 消</el-button>
      </span>
    </el-dialog>


    <el-dialog :visible.sync="savePaperVisible" width="600px">
      <p style="margin-top:20px;">保存我的试卷？</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="finishExam" size="mini">保 存</el-button>
        <el-button @click="savePaperVisible = false" size="mini">取 消</el-button>
      </span>
    </el-dialog>


    <scoredialog :dialogVisible="scoredialogVisible" :paperId="currentPaperId" @close="closescore" :paperName="paperName" :tableData="tableData" @getData="getPaperDetail"></scoredialog>
    <analysisdialog :dialogVisible="analysisdialogVisible" :paperId="currentPaperId" @close="closeanalysis"></analysisdialog>
    <downloaddialog :dialogVisible="downloadVisible" :paperId="currentPaperId" @close="closedownload"></downloaddialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import leftFixedNav from "@/components/Nav/leftFixedNav";
import scoredialog from "@/components/Dialog/score_setting";
import analysisdialog from "@/components/Dialog/analysis";
import downloaddialog from "@/components/Dialog/download_paper";
import { handleQuestion } from '@/utils/public.js';
export default {
  components: {
    leftFixedNav,
    scoredialog,
    analysisdialog,
    downloaddialog
  },
  props: ["isfixTab"],

  data() {
    return {
      questionList:[],
      paperName: "",
      paperType:'',
      items: [],
      scoredialogVisible: false,
      analysisdialogVisible: false,
      downloadVisible: false,
      cleardialogVisible: false,
      savePaperVisible: false,
      score: "",
      checkDelete:[],
      download: {
        version: "",
        size: "",
        type: "",
        ifparse: false
      },
      currentPaperId:'',
      tableData:[],
    };
  },
  computed: {
      ...mapGetters([
        'paperId',

      ]),
  },
  mounted() {

    // this.paperId = this.$route.params.paperId

    this.currentPaperId = this.$route.query.paperId?this.$route.query.paperId:this.paperId

    this.getPaperDetail()


    this.$nextTick(() => {

      let that = this

      // 禁用右键
      document.oncontextmenu = new Function("event.returnValue=false");
      // 禁用选择
      // document.onselectstart = new Function("event.returnValue=false");

      document.oncopy = function() {
        that.$alert('本页内容禁止复制，谢谢', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            
          }
        });
        return false;      
      }
    });

  },

  destroyed(){
    document.oncontextmenu = null;
    document.oncopy = null
  },

  
  methods: {
    setScoreShow() {
      this.tableData = JSON.parse(JSON.stringify(this.questionList))
      console.log(this.tableData)
      this.scoredialogVisible=true
    },
    closescore() {

      this.scoredialogVisible = false;
    },

    closeanalysis() {
      this.analysisdialogVisible = false;
    },

    closedownload() {
      
      this.downloadVisible = false;
    },

    finishExam() {

      this.$http.put(`/api/open/paper/addPaper/${this.currentPaperId}/false`)
      .then((data)=>{
        if(data.status == '200') {

          this.$router.push('/teacher/personal/myExampaper')
          // this.$confirm("组卷完成，是否下载", {
          //   confirmButtonText: "下载试卷",
          //   cancelButtonText: "重新挑题",
          //   center: true,
          //   //type: "warning"
          // })
          //   .then(() => {
          //     this.downloadVisible = true;

          //   })
          //   .catch(() => {
          //     this.$router.push('/questions/chooseBychapter')
          //   });
        }
      })

      
    },
    clearBasket() {

      this.$http.delete(`/api/open/paper/deleteAll/${this.currentPaperId}`)
      .then(data=>{
        if(data.status == '200') {

          this.cleardialogVisible = false
          this.$confirm("试卷清空成功，是否重新挑题", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            // center: true,
            //type: "warning"
          })
            .then(() => {

              this.$router.push('/questions/chooseBychapter')

            })
            .catch(() => {
              this.getPaperDetail()
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

      this.$confirm("确定从试卷中删除该题？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        // center: true,
        //type: "warning"
      })
      .then(() => {

        this.$http.delete(`/api/open/paper/${this.currentPaperId}/${questionId}`)
        .then(data=>{
          if(data.status == '200') {
            this.getPaperDetail()
            this.$message({
              message: '试题删除成功',
              type:'success'
            })
          }
        })

      })
      .catch(() => {

      });



    },



    continueChoose() {



      this.$http.post(`/api/open/paper/continueQuestions/${this.$route.query.paperId}`)
      .then(data=>{
        if(data.status == '200') {
          this.$router.push('/questions/chooseBychapter')
        }
      })

      
    },

    getPaperDetail() {

      

      this.$http.get(`/api/open/paper/${this.currentPaperId}`)
      .then((data)=>{
        if(data.status == '200') {
          this.paperName = data.data.paperName
          // this.paperType = data.data.paperType


          let list = []
          let index = 0
          if(data.data.questionMap) {
            for(let key in data.data.questionMap) {
              list.push({type:key})
              list[list.length-1].list = []
              
              data.data.questionMap[key].forEach((item)=>{
                // console.log(item)
                index += 1
                item.index = index 
                item.showDetail = false
                item.answers = []
                handleQuestion(item,item,null,index)
                list[list.length-1].list.push(item)
              })
            }

          }else {
            this.$message({
              message:'试题篮为空',
              type: 'warning'
            })
          }



          this.questionList = list
        }
      })
    },

    // handleQuestion(item,item0,index,index1) {

    //   item.selectoption = []
    //   if(item.options && item.options.length) {
    //     item.options.forEach(item1=>{
    //       item.selectoption.push({key:item1.key,id:item1.value.id,value:item1.value.name})
    //       // for(let key in item1) {
    //       //   item.selectoption.push({key:key,value:item1[key]})
    //       // }
    //     })
    //   }
    //   //答案
    //   //item.answers = []
    //   if(item.fillAnswers && item.fillAnswers.length) {
    //     item0.answers.push({index:index1+1,name:''})
    //     item.fillAnswers.forEach(item1=>{
    //       // item0.answers.push({index: index1+1,name:item1.value.name})
    //       item0.answers[item0.answers.length-1].name += item1.value.name + ' '
    //       // for(let key in item1) {
    //       //   item0.answers.push(item1[key])
    //       // }
    //     })
    //   }



    //   //章节
    //   item.chapterPoint = []
    //   if(item.chapters && item.chapters.length) {
    //     item.chapters.forEach(item1=>{
    //       item.chapterPoint.push(item1.name)
    //     })
    //   }

    //   //知识点
    //   item.knowledgesPoint = []
    //   if(item.knowledges && item.knowledges.length) {
    //     item.knowledges.forEach(item1=>{
    //       item.knowledgesPoint.push(item1.name)
    //     })
    //   }

    //   if(item.smallQuestions && item.smallQuestions.length) {
    //     item.children = []
    //     item.smallQuestions.forEach((item1,index1)=>{
    //       index += 1
    //       item1.index = index
    //       item.children.push(item1)
    //       this.handleQuestion(item1,item,null,index1)
    //     })
        
    //   }

    //   //console.log(item) 
    // },


    setScore(list) {


      let arr = []
      // console.log(list)
      if(list && list.questionId) {
        arr.push(`${list.questionId},${list.score}`)
      }

      this.$http.put(`/api/open/paper/${this.currentPaperId}`,{
        paperId: this.currentPaperId,
        name: this.paperName,
        questions: arr
      })
      .then(data=>{
        if(data.status == '200') {
          this.getPaperDetail()
          // return this.$message({
          //   message:'分值设定成功',
          //   type: 'success'
          // })
        }
      })
    },


    changeAnother(questionId) {
      this.$http.put(`/api/open/paper/changeOneQuestion/${this.currentPaperId}/${questionId}`)
      .then(data=>{
        if(data.status == '200') {
          this.getPaperDetail()
        }
      })
    }
  }
};
</script>
<style lang="less">

.examination {

  // .left-wrap {
  //   display: none;
  // }

  // .content-wrap {
  //   margin-left: auto !important;
  //   margin: 0 auto;
  // }
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
  // .el-checkbox-button.is-focus .el-checkbox-button__inner {
  //   background-color:#409EFF;
  //   color: #ffffff;
  // }
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
      float: right;
      max-height: 200px;
      width: auto;
    }
  }

  .table {
    table {
      // border: 1px solid #333;
      border-collapse:collapse;

      td {
        padding: 3px 5px;
        border: 1px solid #333;
      }
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
    margin: 20px 0px;
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
          // margin: 20px 0px;
          //padding:10px 20px;
          line-height: 28px;
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


          .order {
            flex-shrink: 0;
          }

          .pt1 {
            overflow: hidden;
            zoom: 1;
            clear: both;
            line-height: 25px;
            padding: 10px 30px;
            position: relative;
            word-break: break-word;
            cursor: pointer;
            display: flex;

          }
          .pt2 {
            width: 100%;
            padding: 0 30px 20px 50px;


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


          .qtwrap {
            display: flex;
            align-items: center;

            .pt1 {
              padding: 0px 20px 0 30px;
              // padding-bottom: 0px;
            }

            .pt2 {
              padding: 0px;

              ul {
                flex-wrap: nowrap;
              }
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


}
</style>