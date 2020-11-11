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
          <singleQuestion :list="list1" :index="index1" shadow="none" :showAction='false' :isAnswer="isAnswer">
          
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
import { handleQuestion } from '@/utils/public.js';
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
      
    },
    scoredialogVisible: {
      type: Boolean
    }
  },

  data() {
    return {

      questionList:[],
      paperName: "",
      paperType:'',
      items: [],
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
      this.$emit('close')
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
              handleQuestion(item,item)
              list[list.length-1].list.push(item)
            })
          }



          this.questionList = list

        }
      })
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