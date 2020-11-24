<template>
  <div class="test-ques">

    <div class="search-div radio-group">
      <ul>
        <li>
          <p>题型</p>
          <div class="div2">
            <el-radio-group v-model="search.type" size="mini" @change="resetPage">
              <el-radio-button :label="item.code" :key="item.code" v-for="item in typeList">{{item.name}}</el-radio-button>
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

       <!-- <div v-for="(list,index) in tableData">
          <singleQuestion :list="list" :index="index" :isAnswer="isAnswer" @getData="getTableData" @getmyTestBasket="getmyTestBasket" @getSimilarity="getSimilarity" @addCollectFolder="addCollectFolder">
            
          </singleQuestion>

        </div>   -->
      <div v-loading="loading"     
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="#f2f5fc" 
       style="min-height: 100px;">
        <questionList :isAnswer="isAnswer" :tableData="tableData" :subjectCode="subjectCode" knowledgeType="chapter" @getData="getTableData" @getmyTestBasket="getmyTestBasket" @getSimilarity="getSimilarity" @addCollectFolder="addCollectFolder"></questionList> 

        <p v-if="isEmpty" style="text-align: center;padding-top: 40px;">暂无数据</p>  
      </div>

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




<!--     <similarityDialog :dialogVisible="similarityVisible" :questionId="similarityId" @close="close_similarity" @getmyTestBasket="getmyTestBasket" @addCollectFolder="addCollectFolder"></similarityDialog>
    <errorDialog :dialogVisible="errorVisible"  @close="close_error"></errorDialog>
    <favoriteDialog :dialogVisible="favoriteVisible" :questionId="collectId" @close="close_favorite"></favoriteDialog> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import basketTag from "@/components/Popover/basketTag";
// import similarityDialog from '@/components/Dialog/similarity'
// import errorDialog from '@/components/Dialog/error'
// import favoriteDialog from '@/components/Dialog/favorite'
import singleQuestion from '@/components/Question/singleQuestion'
import questionList from '@/components/Question/questionList'
import { getquestionType } from '@/utils/basic.service.js'
import { debounce } from '@/utils/public.js'
// import { getmyTestBasket } from '@/utils/basic.service.js'


export default {
  components: {
    basketTag,
    // similarityDialog,
    // errorDialog,
    // favoriteDialog,
    singleQuestion,
    questionList
  },
  props: ['chapterIds','subjectCode','volumeId'],
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
      loading: false,
      isEmpty: false,


    };
  },
  computed: {
      ...mapGetters([
        'getuserInfo',
        'difficultyList',
        'paperId',

      ]),
  },

  watch: {
    subjectCode(val) {
      if(val) {
        this.getquestionType()
        this.resetPage()
      }
      

    },

    chapterIds(val) {
      
      if(val.length) {
        this.resetPage()
        
      }else {
        this.isEmpty = true
        this.tableData = []
        this.total = 0
        this.loading = false
      }
    },


  },

  activated() {

    this.getmyTestBasket()
    this.getTableData()


    // this.$nextTick(() => {

    //   let that = this
    //   // 禁用右键
    //   document.oncontextmenu = new Function("event.returnValue=false");
    //   // 禁用选择
    //   // document.onselectstart = new Function("alert('select')");

    //   document.oncopy = function() {
    //     that.$alert('本页内容禁止复制，谢谢', '提示', {
    //       confirmButtonText: '确定',
    //       callback: action => {
            
    //       }
    //     });
    //     return false;      
    //   }
    // });
    
  },
  // deactivated() {
  //   document.oncontextmenu = null;
  //   document.oncopy = null
  // },
  mounted() {
    // this.$nextTick(()=>{
    //   MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

    // })
    
    this.search.difficulty = this.difficultyList[0].key


    this.subjectCode?this.getquestionType():null
    
    // this.getmyTestBasket()

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
            arr.push({code:'',name:'全部'})
            data.data.forEach(item=>{
              arr.push(item)
            })

            this.typeList = arr
            this.search.type = this.typeList[0].code;
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
    getTableData: debounce(function() {
      // let chapterIds = []
      // this.chapterList.forEach(item=>{
      //   chapterIds.push(item.id)
      // })
      this.isEmpty = false
      this.loading = true
      this.tableData = []

      if(!this.chapterIds.length) {
        
        this.total = 0
        this.loading = false
        this.isEmpty = true
        return
        
      }

      let params = {
        method:1,
        questionType: this.search.type,
        difficultyType: this.search.difficulty,
        name: this.search.keyword,
        oeseId: this.volumeId,
        // gradeName: this.gradeName.substr(0,this.gradeName.length-1),
        // grade: this.grade,
        
        page: this.search.page - 1,
        size: this.search.size,
        subjectCode:this.subjectCode
        // knowledgeId: this.search.difficulty,
      }
      this.$http.post(`/api/open/question/1/questions`,{
        chapterIds: this.chapterIds,
      },params)
      .then((data)=>{
        // data.data.content.forEach(item=>{

        //   item.showDetail = false
        //   item.answers = []
        //   this.handleQuestion(item,item)


        // })
        if(data.data.content && data.data.content.length) {

          this.tableData = data.data.content
          // console.log(this.tableData)
          this.total = data.data.totalElements

        }else {

          this.tableData = []
          this.total = 0
        }

        

        this.loading = false

        this.isEmpty = data.data.empty



        
      })
    }),





    getmyTestBasket(callback,event) {

      this.$refs.basketTag.getmyTestBasket(callback,event)


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
        questionIds:ids.join(),
        subjectCode: this.subjectCode
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