<template>
  <div class="paper-preview">


    <div class="paper-title">
      <p class="title">{{paperName}}</p>
      <p class="tag-wrap" v-if="isActual">
        <span>适用年级：{{$route.query.gradeName}}</span>
        <span>试卷类型：{{$route.query.testPaperTypeName}}</span>
        <span>试题总数：{{$route.query.totalQuestion}}</span>
        <span>地区：{{$route.query.region}}</span>
        <!-- <span>试卷类型：{{$route.query.testPaperTypeName}}</span> -->
      </p>
    </div>

    <div class="paper-wrap" v-if="questionList && questionList.length">
      <div class="paper-content-wrap" v-for="(list,index) in questionList">
        <p><span>{{$changeIndex(index+1)}}</span>、{{list.type}}（共{{list.list.length}}小题）</p>
        <div v-for="(list1, index1) in list.list">
          <singleQuestion :list="list1" :index="index1" shadow="none" :showAction='false'>
          
          </singleQuestion>
        </div>
      </div>
    </div>
    <div v-else>
      <p style="margin-top: 50px;text-align: center;">
        该试卷暂无数据
      </p>
    </div>


    <scoredialog :dialogVisible="scoredialogVisible" :paperId="paperId" @close="closescore" :paperName="paperName" :tableData="questionList" @getData="getPaperDetail"></scoredialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import scoredialog from "@/components/Dialog/score_setting";
import singleQuestion from '@/components/Question/singleQuestion'

export default {
  components: {
    scoredialog,
    singleQuestion

  },
  props: {
    paperId: {
      type: String,
      default:''
    },
    isActual: {
      type:Boolean,
      default: false,
    },
    isAnswer: {
      type: Boolean,
      
    }
  },

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
      score: "",
      checkDelete:[],
      download: {
        version: "",
        size: "",
        type: "",
        ifparse: false
      }
    };
  },
  computed: {



  },
  watch: {
    paperId(val) {

      val?this.getPaperDetail():null
    },


    isAnswer(value) {

      if(value) {
        this.questionList.forEach(item=>{

          item.list.forEach(item1=>{
            item1.showDetail = true
          })
          
        })
      }else {
        this.questionList.forEach(item=>{
          item.list.forEach(item1=>{
            item1.showDetail = false
          })
        })
      }
    }
  },
  mounted() {


    this.getPaperDetail()

  },
  methods: {

    closescore() {
      this.scoredialogVisible = false;
    },


    getPaperDetail() {


      this.questionList = []


      this.$http.get(`/api/open/paper/${this.paperId}`)
      .then((data)=>{
        if(data.status == '200') {
          this.paperName = data.data.paperName
          // this.paperType = data.data.paperType


          let list = []

          for(let key in data.data.questionMap) {
            list.push({type:key})
            list[list.length-1].list = []

            data.data.questionMap[key].forEach((item,index)=>{
              item.showDetail = false
              // console.log(item)
              item.index = index + 1
              // item.showDetail = false
              // item.answers = []
              // this.handleQuestion(item,item)
              item.answers = []
              this.handleQuestion(item,item)
              list[list.length-1].list.push(item)
            })
          }



          // console.log(list)


          this.questionList = list

        }
      })
    },

    handleQuestion(item,item0) {
      //选项
      item.selectoption = []
      if(item.options && item.options.length) {
        item.options.forEach(item1=>{
          item.selectoption.push({key:item1.key,id:item1.value.id,value:item1.value.name})
          // for(let key in item1) {
          //   item.selectoption.push({word:key,value:item1[key]})
          // }
        })
      }
      //答案
      //item.answers = []
      if(item.fillAnswers && item.fillAnswers.length) {
        item.fillAnswers.forEach(item1=>{
          // for(let key in item1) {
            item0.answers.push(item1.value.name)
          // }
        })
      }


      //章节
      item.chapterPoint = []
      if(item.chapters && item.chapters.length) {
        item.chapters.forEach(item1=>{
          item.chapterPoint.push(item1.name)
        })
      }


      //知识点
      item.knowledgesPoint = []
      if(item.knowledges && item.knowledges.length) {
        item.knowledges.forEach(item1=>{
          item.knowledgesPoint.push(item1.name)
        })
      }

      if(item.smallQuestions && item.smallQuestions.length) {
        item.smallQuestions.forEach((item1,index1)=>{
          item1.index = "("+ Number(index1 + 1) + ")"
          this.handleQuestion(item1,item)
        })
        
      }
    },


    setScore(list) {


      let arr = []
      // console.log(list)
      if(list && list.questionId) {
        arr.push(`${list.questionId},${list.score}`)
      }

      this.$http.put(`/api/open/paper/${this.paperId}`,{
        paperId: this.paperId,
        name: this.paperName,
        questions: arr
      })
      .then(data=>{
        if(data.status == '200') {
          this.getPaperDetail
          // return this.$message({
          //   message:'分值设定成功',
          //   type: 'success'
          // })
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


  .el-card__body {
    padding: 0px;
  }
}
</style>
<style scoped lang="less">
.paper-preview {
  

  // width: 80%;
  // margin: 0 auto;
  // min-height: calc(100vh - 328px);
  



  .paper-title {
    text-align: center;

    .title {
      font-size: 1.4rem;
    }

    .tag-wrap {
      margin: 20px 0px;
      span {
        margin-right: 20px;
      }
    }
  }

  .paper-wrap {

    .paper-content-wrap {
      margin-bottom: 20px;
    }
  }


}
</style>