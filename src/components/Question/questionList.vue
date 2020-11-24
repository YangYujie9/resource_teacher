<template>
  <div class="single-question">
    <el-card class="box-card" :shadow="shadow" v-for="(list,index) in questionList">
      <div>
        <section class="content cursor" @click="list.showDetail=!list.showDetail">
          <div class="qt1">
            <div class="ques-body">
              <span v-if="showSimilarity" class="order"><span>{{index+1}}、</span></span>
              <div v-html="list.name" style="width: 100%;"></div>
            </div>
          </div>
          <div class="qt2" v-if="list.options && list.options.length && list.questionTypeTemplate!='BoolenQuestionTemplate'">
            <ul>
              <li style="width: 100%;" class="selectoption" v-for="list1 in list.selectoption">
                <span style="margin-right: 10px;font-style: italic;">{{list1.key}}.</span>
                <div v-html="list1.value"></div>
              </li>

            </ul>
          </div>

          <!-- 小题 -->
          <div class="" v-if="list.smallQuestions && list.smallQuestions.length" style="margin: 10px 0 0 10px;" >
            <div v-for="(list1,index1) in list.smallQuestions">
              <!-- 无问题单独录入不显示小题题干 -->
              <div :class="{qtwrap:list.questionTypeTemplate=='GestaltFillsUpTemplate'||list1.questionType=='NoAloneEnter'}" v-if="list1.questionType!='NoAloneEnter'">
                <div class="qt1">
                  <div class="small-one">
                    <span class="order"><span>{{index1+1}}、</span></span>
                    <span v-html="list1.name"></span>
                  </div>

                </div>
                <div class="qt2" v-if="list1.options.length && list1.questionType!='BoolenQuestion'">
                  <ul>
                    <li style="width: 100%;" class="selectoption" v-for="item in list1.selectoption">

                      <span>{{item.key}}</span>
                      <span>、</span>
                      <span v-html="item.value"></span> 
                    </li>


                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section class="content" style="border-top: 1px dashed #dbdee4;"  v-show="list.showDetail">

          <div class="middle">
            <div>
              <p class="title">【知识点】</p>
              <p v-if="list.knowledgesPoint">{{list.knowledgesPoint.join()}}</p>
            </div>

            <div  v-if="list.answers.length">
              <p class="title">【答案】</p>
              <p>
                <span v-for="(item,index1) in list.answers" style="margin-right: 10px;">
                 <span  v-if="list.smallQuestions.length" style="margin-left: 0px;">{{item.index}}.</span>
                 <span style="margin-left: 0px;" v-html="item.name"></span>
                </span>
              </p>
            </div>
            <div>
              <p class="title">【分析】</p>
              <p v-html="list.analysis" style="width: 100%;"></p>
            </div>
            <div>
              <p class="title">【详解】</p>
              <p v-html="list.detailedAnalysis" style="width: 100%;"></p>
            </div>
          </div>
        </section>



        <section class="foot-wrap" >
          <p class="pt1">
            <span>收录：{{list.createTime}}</span>
            <span>组卷：{{list.groupCount}}</span>
            <span>难度：{{list.difficultyTypeName}}</span>
            <span>题型：{{list.questionTypeName}}</span>
          </p>
          <p class="pt2" >

            <span v-if="showAction">
              <span @click.stop="getSimilarity(list.questionId)" class="foot-icon" v-if="showSimilarity">
                <i class="iconfont iconpaibanguanli iconcolor"></i> 相似题
              </span>
              <span @click.stop="errorCorrection(list)" class="foot-icon">
                <i class="iconfont iconjiucuo iconcolor"></i> 纠错
              </span>
              <span class="foot-icon" @click.stop="addCollectFolder(list.questionId)" v-if="!isCollected">
                <!-- <i class="iconfont iconshoucang1" style="color:#ffda33;"></i> -->
                <i class="iconfont iconshoucang2 iconcolor"></i>
                收藏
              </span>
              <span class="foot-icon" @click.stop="deleteCollectFolder(list.questionId)" v-if="isCollected">
                <!-- <i class="iconfont iconshoucang1" style="color:#ffda33;"></i> -->
                <i class="iconfont iconshoucang1 iconcolor"></i>
                取消收藏
              </span>

              <span class="foot-icon" @click.stop="list.showDetail=!list.showDetail" v-if="showSimilarity">
                <i class="iconfont iconxiangqing1 iconcolor"></i> {{list.showDetail?'收起':'详情'}}
              </span>
  <!--             <span class="foot-icon" @click="list.showDetail=false" v-if="list.showDetail && showSimilarity">
                <i class="iconfont iconxiangqing1 iconcolor"></i> 题干
              </span> -->


              <span class="foot-icon" @click.stop="list.showDetail=true" v-if="!list.showDetail && !showSimilarity">
                <i class="iconfont iconwenbensousuo iconcolor"></i>显示解析
              </span>
              <span class="foot-icon" @click.stop="list.showDetail=false" v-if="list.showDetail && !showSimilarity">
                <i class="iconfont iconwenbensousuo iconcolor"></i>隐藏解析
              </span>
            </span>
            <!--<span class="foot-icon">
              <i class="iconfont iconwenbensousuo iconcolor"></i>
              <span v-if="!isAnswer" @click="isAnswer=true"></span>
              <span v-else @click="isAnswer=false"></span>
            </span> -->
            <el-button type="warning" size="mini" v-if="list.isTestBasket" :disabled="list.disabled" @click.stop="deleteTestBasket(list)">移除试卷</el-button>
            <el-button type="primary" size="mini" v-if="!list.isTestBasket" :disabled="list.disabled" @click.stop="addTestBasket($event,list)">加入试卷</el-button>
          </p>
        </section>
      </div>
    </el-card>

    <similarityDialog :dialogVisible="similarityVisible" :subjectCode="subjectCode" :questionId="similarityId" @close="close_similarity" @getmyTestBasket="getmyTestBasket"></similarityDialog>
    <errorDialog :dialogVisible="errorVisible" :questionId="error.errorId" @close="close_error" :typeTemplate="error.typeTemplate"></errorDialog>
    <favoriteDialog :dialogVisible="favoriteVisible" :questionId="collectId" @close="close_favorite"></favoriteDialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import similarityDialog from '@/components//Dialog/similarity'
import errorDialog from '@/components/Dialog/error'
import favoriteDialog from '@/components/Dialog/favorite'
import { handleQuestion } from '@/utils/public.js';
export default {
  name:'singleQuestion',
  props: {
    isAnswer:{
      type:Boolean,
      default: false
    },


    showSimilarity: {
      type:Boolean,
      default: true
    },
    shadow: {
      type:String,
      default:'hover'
    },
    showAction: {
      type: Boolean,
      default: true
    },

    testBasket: {
      type: Number,
    },
    tableData: {
      type: Array,
    },
    knowledgeType: {
      type:String,
      default:'All'
    },
    subjectCode: {
      type: String,
    },
    isCollected: {
      type: Boolean,
      default: false
    },
    folderId: {
      type:String
    }

  },
  components: {
    similarityDialog,
    errorDialog,
    favoriteDialog,
  },
  data() {
    return {
      questionList:[],
      similarityVisible: false,
      errorVisible: false,
      favoriteVisible: false,
      similarityId:'',
      collectId:'', 
      error: {
        errorId: '', 
        typeTemplate:'', 
      }
       
    };
  },
  computed: {
      ...mapGetters([
        'paperId',

      ]),
  },
  watch: {

    isAnswer(value) {
      if(value) {
        this.questionList.forEach(item=>{
          item.showDetail = true
        })
      }else {
        this.questionList.forEach(item=>{
          item.showDetail = false
        })
      }
    },
    tableData(value) {
      if(value.length) {
        this.initTableData(JSON.parse(JSON.stringify(value)));
      }else {
        this.questionList = []
      }
    }
  },
  mounted() {
    // console.log(this.gradeName)
    // if(this.tableData && this.tableData.length) {
    //   this.initTableData(JSON.parse(JSON.stringify(this.tableData)));
    // }else {
    //   this.questionList = []
    // }


    

    this.$nextTick(() => {

      let that = this

      // 禁用右键
      document.oncontextmenu = new Function("event.returnValue=false");
      // 禁用选择
      // document.onselectstart = new Function("alert('select')");

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

  activated() {

    this.$nextTick(() => {

      let that = this
      // 禁用右键
      document.oncontextmenu = new Function("event.returnValue=false");
      // 禁用选择
      // document.onselectstart = new Function("alert('select')");

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
  deactivated() {
    document.oncontextmenu = null;
    document.oncopy = null
  },
  methods: {
    initTableData(data) {

      let arr = []

      data.forEach((item,index)=>{
        // 
        item.showDetail = this.isAnswer

        item.answers = []

        handleQuestion(item,item)

        arr.push(item)
      })

      this.questionList = arr

      this.$nextTick(()=>{
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

      })
    },


    // handleQuestion(item,item0,index) {
    //   //选项
    //   item.selectoption = []
    //   if(item.options && item.options.length) {
    //     item.options.forEach(item1=>{
    //       item.selectoption.push({key:item1.key,id:item1.value.id,value:item1.value.name})
    //       // for(let key in item1) {
    //       //   item.selectoption.push({word:key,value:item1[key]})
    //       // }
    //     })
    //   }
    //   //答案
    //   //item.answers = []
    //   if(item.fillAnswers && item.fillAnswers.length) {
    //     item0.answers.push({index:index+1,name:''})
    //     item.fillAnswers.forEach(item1=>{
          
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
    //     item.smallQuestions.forEach((item1,index1)=>{
    //       this.handleQuestion(item1,item,index1)
    //     })
        
    //   }
    // },
    getSimilarity(id) {
      // console.log(id)
      // this.$emit('getSimilarity',id)
      this.similarityId = id
      this.similarityVisible = true
    },

    errorCorrection(list) {

      this.error.errorId = list.questionId

      this.error.typeTemplate = list.questionTypeTemplate

      this.errorVisible = true
    },

    addCollectFolder(id) {
      // this.$emit('addCollectFolder',id)
      this.collectId = id
      // console.log(this.collectId)
      this.favoriteVisible = true
    },

    deleteCollectFolder(questionId) {
      this.$confirm('确定删除收藏的该试题吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(`/api/open/collectFolder/${this.folderId}/${questionId}`)
        .then(data=>{
          if(data.status == '200') {
            this.$message.success('删除成功')
            this.$emit('getData')
          }
        })
      }).catch(() => {
         
      });

    },
    close_similarity() {
      this.similarityVisible = false
      this.$emit('getData')
    },
    close_error() {
      this.errorVisible = false
      // this.getTableData()
    },
    close_favorite() {
      this.favoriteVisible = false
      // this.getTableData()
    },

    addTestBasket(event,list) {
      // console.log(this.testBasket)
      this.$set( list, 'disabled', true )

      if(this.testBasket>=40) {
        return this.$message({
          message:'试题蓝中题数不能超过40题',
          type:'warning'
        })
      }
      this.$http.post(`/api/open/paper/addTestBasket/hand/${list.questionId}`,{},{
        subjectCode: this.subjectCode,
      })
      .then((data)=>{
        if(data.status == '200') {
          this.isReset = false
          // this.$emit('getData')
          list.isTestBasket = true

          this.$emit('getmyTestBasket',()=>{
            list.disabled = false
          },event)



          this.$message({
            message:'加入试卷成功',
            type:'success'
          }) 
        }
 
      })
    },

    deleteTestBasket(list) {

      this.$set( list, 'disabled', true )
      // list.disabled = true
      this.$http.delete(`/api/open/paper/${this.paperId}/${list.questionId}`)
      .then((data)=>{
        if(data.status == '200') {
          this.isReset = false
          // this.$emit('getData')
          list.isTestBasket = false
          
          this.$emit('getmyTestBasket',()=>{
            list.disabled = false
          })

          this.$message({
            message:'移除试卷成功',
            type:'success'
          }) 
        }
 
      })
    },

    getmyTestBasket(callback) {
      this.$emit('getmyTestBasket',callback)
    }
  }
};
</script>
<style lang="less">

.single-question {
    .el-card__body {
      padding: 0px;
    }

  // .el-radio-button:first-child .el-radio-button__inner, .el-radio-button:last-child .el-radio-button__inner   
    .el-radio-button__inner {
      border: 0px;
      background-color: transparent;
      border-radius: 3px;
      font-size: 14px;
      color: #666;
    }
    .el-input__inner {
      background: transparent;
    }

    .el-radio-button:first-child .el-radio-button__inner,.el-radio-button:last-child .el-radio-button__inner {
      // border-left: 0px;
      border-radius: 3px;
    }

    .content {

      .MathJye {
          direction: ltr;
          display: inline-block;
          float: none;
          font-family: "Times New Roman","宋体";
          font-size: 1rem;
          font-style: normal;
          font-weight: normal;
          letter-spacing: 1px;
          line-height: normal;
          text-align: left;
          text-indent: 0px;
          text-transform: none;
          white-space: nowrap;
          word-spacing: normal;
          overflow-wrap: normal;
          text-size-adjust: none;
          border-width: 0px;
          border-style: none;
          border-color: initial;
          border-image: initial;
          margin: 0px;
          padding: 0px;



          table {
            display: inline-block;
            vertical-align: middle;

            td {
              text-align: center;
              border: 0px;
              font-size: 1rem;
            }
          }

          span {
            display: inline;
            position: static;
            border: 0;
            padding: 0;
            margin: 0;
            vertical-align: 0;
            line-height: normal;
            text-decoration: none;
          }
      }

      table {
        border-collapse:collapse;
      }
      
      .table, .edittable {

          td {
            padding: 3px 5px;
            border: 1px solid #333;
          }
 
      }

      p,div,span {
        // line-height: 1 !important;
        background-color:transparent !important;
        font-size: 1rem;
        font-family: "JyeMath", "JyeMathLetters", "Times New Roman", "微软雅黑",
            Arial, "宋体" !important;
      }



    }

  .el-card {
    // border: 1px solid #e2e2e2;
    .qt1 img {
      vertical-align: middle;
      float: right;
      max-height: 200px;
      width: auto;
    }
  }
}
</style>
<style scoped lang="less">
.single-question {
  .box-card {
    margin-bottom: 15px;
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
      background-color: #f0f3f9;

      // border-radius: 50% 0;
      .order {
        flex-shrink: 0;
      }


      .qt1 {
        overflow: hidden;
        zoom: 1;
        clear: both;
        line-height: 28px;
        font-size: 1.1rem;
        // display: flex;
        //padding: 20px;
        position: relative;
        word-break: break-word;
        padding-bottom: 10px;
        cursor: pointer;

        .small-one {
          display: flex;
          // flex-wrap: wrap;
          padding-left: 10px;
        }

        .ques-body {
          display: flex;
          // flex-wrap: wrap;
          // align-items: flex-end;


        }


   
      }

      .qt2 {
        //padding: 0px 20px 20px 20px;
        width: 100%;
        padding-left: 20px;

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
      }


      //
      .qtwrap {
        display: flex;
        align-items: center;

        .qt1 {
          padding-bottom: 0px;
        }

        .qt2 ul {
          flex-wrap: nowrap;
        }
      }
      // .top {
      //   border-bottom: 1px dashed #dbdee4;
      //   padding-bottom: 20px;
      // }

      .middle {

        div {
          display: flex;
          // line-height: 32px;

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

      .pt2 {
        span {
          margin-right: 10px;
        }
        .foot-icon {
          margin-right: 15px;
          cursor: pointer;
        }

        // i {
        //   font-size: 1rem;
        // }
      }

      .iconcolor {
        color: #789ef6;
      }
    }
  }
}
</style>