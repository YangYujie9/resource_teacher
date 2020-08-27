<template>
  <div class="test-ques">
    <!-- <ul><li v-for="i in 89">{{i}}</li></ul> -->
    <div class="search-div radio-group">
      <ul>
        <li>
          <p>题型</p>
          <div class="div2">
            <el-radio-group v-model="search.type" size="mini" @change="resetPage">
              <el-radio-button :label="item.key" :key="item.key" v-for="item in typeList">{{item.value}}</el-radio-button>
            </el-radio-group>
          </div>
        </li>
         <li>
          <p>难度</p>
          <div class="div2">
            <el-radio-group v-model="search.difficulty" size="mini" @change="resetPage">
              <el-radio-button :label="item.key" :key="item.key" v-for="item in difficultyList">{{item.value}}</el-radio-button>
            </el-radio-group>
          </div>
        </li>
        <!--<li>
          <p>题类</p>
          <div class="div2">
            <el-radio-group v-model="search.category" size="mini">
              <el-radio-button :label="item" v-for="item in list"></el-radio-button>
            </el-radio-group>
          </div>
        </li>
        <li>
          <p>来源</p>
          <div class="div2">
            <el-radio-group v-model="search.resource" size="mini">
              <el-radio-button :label="item" v-for="item in list"></el-radio-button>
            </el-radio-group>
          </div>
        </li>
        <li>
          <p>年份</p>
          <div class="div2">
            <el-radio-group v-model="search.year" size="mini">
              <el-radio-button :label="item" v-for="item in list"></el-radio-button>
            </el-radio-group>
          </div>
        </li> -->
        <li style="position: relative;">
          <!-- <p>排序</p>
          <div class="div2">
            <el-radio-group v-model="search.sortstr" size="mini">
              <el-radio-button :label="item" v-for="item in list"></el-radio-button>
            </el-radio-group>
          </div>  -->
          
          <p class="p2">
            共计
            <span style="color:#fc4546;">{{total}}</span>道相关试题
          </p>
        </li>
      </ul>
    </div>

    <div class="input-search">
      <p>
        <el-input
          v-model="search.keyword"
          placeholder="在结果中搜索答案"
          suffix-icon="el-icon-search"
          size="small"
          @keyup.enter.native="resetPage"
          style="width:240px"
        ></el-input>
      </p>
      <p>
        <!-- <el-checkbox v-model="isAnswer">显示答案</el-checkbox> -->
        <span class="ansbtn" v-show="!isAnswer" @click="isAnswer=true">
          <i class="iconfont iconxianshi" style="position: relative;top:1px"></i> 
          显示答案
        </span>
        <span class="ansbtn" v-show="isAnswer" @click="isAnswer=false">
          <i class="iconfont iconyincang"></i> 
          隐藏答案
        </span>
        <el-button type="primary" plain size="small" style="margin-left:20px;" @click="addAllQuestion">
           <i class="iconfont iconiconjia" style="font-size:12px;"></i> 全部加入试卷
        </el-button>
      </p>
    </div>

    <div class="card-wrap">

       <div v-for="(list,index) in tableData">
          <singleQuestion :list="list" :index="index" :isAnswer="isAnswer" @getData="getTableData" @getmyTestBasket="getmyTestBasket" @getSimilarity="getSimilarity" @addCollectFolder="addCollectFolder">
            
          </singleQuestion>
        </div>     

       <!--<div >
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
                <p>{{list.knowledgesPoint}}</p>
              </div>

              <div>
                <p class="title">【答案】</p>
                <p>{{list.answers}}
                  <span v-for="(item,index1) in list.answers">{{item}}
                   <span   style="margin-left: 0px;">{{index1+1}}、</span>
                   <span style="margin-left: 0px;">{{item}}</span>
                  </span>
                </p>
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
      </div> -->

      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="search.page"
          :page-sizes="[20, 40, 60, 100]"
          :page-size="search.size"
          layout="total, prev, pager, next, sizes"
          :total="total"
        ></el-pagination>
      </div>


      <basketTag ref="basketTag"></basketTag>
    </div>




    <similarityDialog :dialogVisible="similarityVisible" :questionId="similarityId" @close="close_similarity" @getmyTestBasket="getmyTestBasket" @addCollectFolder="addCollectFolder"></similarityDialog>
    <errorDialog :dialogVisible="errorVisible"  @close="close_error"></errorDialog>
    <favoriteDialog :dialogVisible="favoriteVisible" :questionId="collectId" @close="close_favorite"></favoriteDialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import basketTag from "@/components/Popover/basketTag";
import similarityDialog from '@/components/Dialog/similarity'
import errorDialog from '@/components/Dialog/error'
import favoriteDialog from '@/components/Dialog/favorite'
import singleQuestion from '@/components/Question/singleQuestion'
import { getquestionType } from '@/utils/basic.service.js'
// import { getmyTestBasket } from '@/utils/basic.service.js'


export default {
  components: {
    basketTag,
    similarityDialog,
    errorDialog,
    favoriteDialog,
    singleQuestion,
  },
  props: ['chapterList','gradeName','subjectCode','grade'],
  data() {
    return {
      search: {
        type: "",
        difficulty: "",
        category: "",
        resource: "",
        year: "",
        sortstr: "",
        keyword: "",
        page:1,
        size:20
      },
      isReset: true,
      tableData: [],
      typeList: [],
      total: 0,
      isAnswer: false,
      similarityVisible: false,
      similarityId:'',
      collectId:'',
      errorVisible: false,
      favoriteVisible:false,
      testBasket:0,

    };
  },
  computed: {
      ...mapGetters([
        'difficultyList',
        'paperId',

      ]),
  },

  watch: {
    subjectCode(val) {
      if(val) {
        this.getquestionType()
      }
      

    },
    grade(val) {
      if(val) {
        this.resetPage()
      }
    },
    gradeName(val) {
      if(val) {

        this.getmyTestBasket()
        
      }
    },

    chapterList(val) {

      this.resetPage()
    }
  },
  mounted() {

    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

    this.search.difficulty = this.difficultyList[0].key


    this.subjectCode?this.getquestionType():null
    


  },

  methods: {

    
    backToTop() {
      this.$emit('backToTop')
    },
    getquestionType() {
      this.typeList = []
      getquestionType(this.subjectCode)
      .then((data)=>{
        if (data.status == "200") {
            
            let arr = []
            arr.push({key:'',value:'全部'})
            data.data.forEach(item=>{
              arr.push(item)
            })

            this.typeList = arr
            this.search.type = this.typeList[0].key;
            this.resetPage()
        } 
      })
    },


    close_similarity() {
      this.similarityVisible = false
      this.getTableData()
    },
    close_error() {
      this.errorVisible = false
      this.getTableData()
    },
    close_favorite() {
      this.favoriteVisible = false
      this.getTableData()
    },
    // 分页
    handleSizeChange(val) {
      this.search.size = val
      // console.log(`每页 ${val} 条`);
      this.resetPage()
      
    },
    // 分页
    handleCurrentChange(val) {
      this.search.page = val
      // console.log(`当前页: ${val}`);
      this.getTableData()
      this.$emit('backToTop')
    },

    resetPage() {
      this.search.page = 1
      this.getTableData()
    },
    getTableData() {
      if(!this.gradeName) {return false}
      let chapterIds = []
      this.chapterList.forEach(item=>{
        chapterIds.push(item.id)
      })


      let params = {
        method:1,
        questionType: this.search.type,
        difficultyType: this.search.difficulty,
        name: this.search.keyword,
        // gradeName: this.gradeName.substr(0,this.gradeName.length-1),
        grade: this.grade.substr(0,this.grade.length-2),
        
        page: this.search.page - 1,
        size: this.search.size,
        // subject:this.subjectCode
        // knowledgeId: this.search.difficulty,
      }
      this.$http.post(`/api/open/question/1/questions`,{
        chapterId: chapterIds,
      },params)
      .then((data)=>{
        window.scrollTo(0,0)
        data.data.content.forEach(item=>{

          item.showDetail = false
          item.answers = []
          this.handleQuestion(item,item)


        })

        this.tableData = data.data.content
        // console.log(this.tableData)
        this.total = data.data.totalElements


        
      })
    },


    handleQuestion(item,item0) {
      //选项
      item.selectoption = []
      if(item.options && item.options.length) {
        item.options.forEach(item1=>{
          item.selectoption.push(item1)
          // for(let key in item1) {
          //   item.selectoption.push({word:key,value:item1[key]})
          // }
        })
      }
      //答案
      //item.answers = []
      if(item.fillAnswers && item.fillAnswers.length) {
        item.fillAnswers.forEach(item1=>{
          for(let key in item1) {
            item0.answers.push(item1[key])
          }
        })
      }

      //知识点
      item.knowledgesPoint = []
      if(item.chapters && item.chapters.length) {
        item.chapters.forEach(item1=>{
          item.knowledgesPoint.push(item1.name)
        })
      }

      if(item.smallQuestions && item.smallQuestions.length) {
        item.smallQuestions.forEach(item1=>{
          this.handleQuestion(item1,item)
        })
        
      }
    },


    getmyTestBasket() {


      this.$refs.basketTag.getmyTestBasket(this.gradeName)


    },

    getSimilarity(id) {
      this.similarityId = id
      this.similarityVisible = true
    },


    addCollectFolder(id) {
      this.collectId = id
      this.favoriteVisible = true
    },

    addAllQuestion() {
      let ids = []

      this.tableData.forEach(item=>{
        ids.push(item.questionId)
      })

      this.$http.post(`/api/open/paper/addTestBasket/batchAdd`,{
        questionIds:ids.join()
      })
      .then((data)=>{
        if(data.status == '200') {
          this.isReset = false

          this.getTableData()
          this.getmyTestBasket()

          this.$message({
            message:'加入试卷成功',
            type:'success'
          }) 
        }
 
      })
    },
  }
};
</script>
<style lang="less">
.test-ques {

  //.radio-group {
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
      border-left: 0px;
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
 //}


  .el-checkbox__inner {
    background-color: #f2f5fc;
  }
  .el-checkbox {
    color: #9d9ea1;
  }

  .el-card {
    background-color: #f0f3fa;
    border-color: #e7eaf1;
  }

  .el-card__body {
    padding: 0px;
  }

  // .el-button--primary.is-plain:focus, .el-button--primary.is-plain:hover{}
}
</style>
<style scoped lang="less">
.test-ques {
  





}
</style>