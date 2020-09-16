<template>
  <div class="knowledge">
    <!-- <ul><li v-for="i in 89">{{i}}</li></ul> -->
    <left-fixed-nav :isfixTab="isfixTab">
      <div slot="left">
        <!-- <div class="tree-wrap" :class="{fixedclass:isfixTab}"> -->
          <div class="tab-class">
            <top-popover v-if="isReady" chooseType="knowledge" ref="filter" @setparams="setparams">
              <div slot="reference">
                <p class="top-title">
                  <span v-if="$refs.filter">{{$refs.filter.subject.subjectName}}</span>
                  <!-- <span v-if="$refs.filter" >{{$refs.filter.volume.name}}</span> -->
                  
                  <i class="iconfont iconshezhi settingicon"></i>
                </p>
              </div>
              <div slot="popover">

              </div>
            </top-popover>
            <div class="top-p">
              <p>考点列表</p>
              <p class="p2">
                <span :class="{active:!isMulti}" @click="isMulti=false">[单选]</span>
                <span :class="{active:isMulti}" @click="isMulti=true">[多选]</span>
              </p>
            </div>
            <div class="tree-class" :class="{treeclassfixed:isfixTab}">
              <pointTree chooseType="knowledge"  :subjectCode="subjectCode"  @getCheckedNodes="getCheckedNodes" ref="knowledgeTree" :showCheckbox="isMulti"></pointTree>
            </div>
            <!-- <el-scrollbar
              :wrap-class="{treeclassfixed:isfixTab}"
              wrap-style="max-height: calc(100vh - 400px);margin-bottom:0px;"
              view-class="view-box"
              view-style="height:100%;"
              :native="false"
            > 

                <el-tree
                :data="treeData.data"
                :show-checkbox="isMulti"
                node-key="id"
                check-on-click-node
              ></el-tree> 

             </el-scrollbar>  -->
          </div>
        <!-- </div> -->
      </div>

      <div slot="right" class="right">
        <div class="bread-div">
          <div>
            <i class="iconfont iconshouye iconclass"></i>当前位置：知识点挑题
          </div>

          <!-- <span style="padding:0 10px;">></span>同步卷 -->
          <div>
            <el-button
              type="danger"
              size="mini"
              @click="$router.push('/questions/submitQuestions')"
            >上传试题</el-button>
            <!-- <el-button type="danger" size="mini" :class="{upbutton: isfixTab}">上传试题</el-button> -->
          </div>
        </div>

        <div class="wrap">
          <div class="search-div radio-group">
            <ul>
              <li>
                <p>题型</p>
                <div class="div2">
                  <el-radio-group v-model="search.type" size="mini" @change="resetPage">
                    <el-radio-button :label="item.id" :key="item.id" v-for="item in typeList">{{item.name}}</el-radio-button>
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
              <li>
                <!-- <p>排序</p>
                <div class="div2">
                  <el-radio-group v-model="search.sortstr" size="mini">
                    <el-radio-button :label="item" v-for="item in list"></el-radio-button>
                  </el-radio-group>
                </div> -->
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
          <!-- <singleQuestion :list="list" :index="index" :isAnswer="isAnswer" @getData="getTableData" @getmyTestBasket="getmyTestBasket" @getSimilarity="getSimilarity" @addCollectFolder="addCollectFolder" :tableData="tableData">
            
          </singleQuestion> -->
          <questionList :isAnswer="isAnswer" :tableData="tableData" knowledgeType="knowledge" @getData="getTableData" @getmyTestBasket="getmyTestBasket" @getSimilarity="getSimilarity" @addCollectFolder="addCollectFolder" ></questionList>


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
        </div>
        </div>


        <basketTag ref="basketTag"></basketTag>
      </div>
    </left-fixed-nav>

    <similarityDialog :dialogVisible="similarityVisible" :questionId="similarityId" @close="close_similarity" @getmyTestBasket="getmyTestBasket"></similarityDialog>
    <errorDialog :dialogVisible="errorVisible"  @close="close_error"></errorDialog>
    <favoriteDialog :dialogVisible="favoriteVisible" :questionId="collectId" @close="close_favorite"></favoriteDialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import leftFixedNav from "@/components/Nav/leftFixedNav";
import topPopover from "@/components/Popover/topPopover";
import basketTag from "@/components/Popover/basketTag";
import similarityDialog from '@/components/Dialog/similarity'
import errorDialog from '@/components/Dialog/error'
import favoriteDialog from '@/components/Dialog/favorite'
import singleQuestion from '@/components/Question/singleQuestion'
import questionList from '@/components/Question/questionList'
import { getquestionType } from '@/utils/basic.service.js'
// import { getmyTestBasket } from '@/utils/basic.service.js'

export default {
  components: {
    leftFixedNav,
    topPopover,
    basketTag,
    similarityDialog,
    errorDialog,
    favoriteDialog,
    singleQuestion,
    questionList
  },
  props: ["isfixTab"],
  data() {
    return {
      filter: {
        grade: "",
        subjectId:"",
        subjectCode:'',
      },
      testBasket:0,
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
      isMulti:false,
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
      subjectCode:'',
      knowledgeList:[],
      volumeId:'',
    };
  },
  computed: {
      ...mapGetters([
        'difficultyList',
        'gradeList',
        'getuserInfo',
        'paperId',
        'isReady'

      ]),
  },

  watch: {

    gradeList(val) {
      if(val.length) {
        this.filter.grade = val[0]
        
      }
      

    },



  },
  mounted() {

    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    if(this.gradeList.length) {
      this.filter.grade = this.gradeList[0]
      
      // this.resetPage()
    }
    this.search.difficulty = this.difficultyList[0].key
    // this.subjectCode = this.getuserInfo.subjectCode

    
    this.getmyTestBasket()


  },

  methods: {
    setparams(volumeId,subjectCode) {

      this.volumeId = volumeId

      this.subjectCode = subjectCode

      this.getquestionType()
      
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

    chapterList(val) {

      this.resetPage()
    },
    getCheckedNodes(list) {

      this.knowledgeList = list
      

    },

    getquestionType() {

      // if(!this.subjectCode) {return false}

      this.typeList = []
      getquestionType(this.subjectCode)
        .then(data => {
          if (data.status == "200") {
            
            let arr = []
            arr.push({id:'',name:'全部'})
            data.data.forEach(item=>{
              arr.push(item)
            })

            this.typeList = arr
            this.search.type = this.typeList[0].id;
            this.resetPage()
          } 
        })


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
      // console.log(this.filter.grade.value)
      if(!this.filter.grade.key) {return false}
      let knowledgeIds = []
      this.knowledgeList.forEach(item=>{
        knowledgeIds.push(item.id)
      })


      let params = {
        method:1,
        questionType: this.search.type,
        difficultyType: this.search.difficulty,
        name: this.search.keyword,
        grade: this.filter.grade.key,
        
        page: this.search.page - 1,
        size: this.search.size,
        // subject:this.subjectCode
        // knowledgeId: this.search.difficulty,
      }
      this.$http.post(`/api/open/question/1/questions`,{
        knowledgeId: knowledgeIds,
      },params)
      .then((data)=>{
        
        // data.data.content.forEach(item=>{

        //   item.showDetail = false
        //   item.answers = []
        //   this.handleQuestion(item,item)


        // })

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
      if(item.knowledges && item.knowledges.length) {
        item.knowledges.forEach(item1=>{
          item.knowledgesPoint.push(item1.name)
        })
      }

      if(item.smallQuestions && item.smallQuestions.length) {
        item.smallQuestions.forEach(item1=>{
          this.handleQuestion(item1,item)
        })
        
      }
    },

    // addTestBasket(id) {
    //   this.$http.post(`/api/open/paper/addTestBasket/hand/${id}`)
    //   .then((data)=>{
    //     if(data.status == '200') {
    //       this.isReset = false

    //       this.getTableData()
    //       this.getmyTestBasket()

    //       this.$message({
    //         message:'加入试卷成功',
    //         type:'success'
    //       }) 
    //     }
 
    //   })
    // },

    // deleteTestBasket(id) {
    //   this.$http.delete(`/api/open/paper/${this.paperId}/${id}`)
    //   .then((data)=>{
    //     if(data.status == '200') {
    //       this.isReset = false
    //       this.getTableData()
    //       this.getmyTestBasket()

    //       this.$message({
    //         message:'移除试卷成功',
    //         type:'success'
    //       }) 
    //     }
 
    //   })
    // },

    getmyTestBasket() {

      this.$refs.basketTag.getmyTestBasket(this.filter.grade.value)

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
.knowledge {
  .treeclassfixed {
    max-height: calc(100vh - 260px) !important;
  }

  .el-badge__content {
    background-color: #ff7f21;
  }
  .el-badge__content.is-fixed {
    right: 18px;
    top: -4px;
  }

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
}
</style>
<style scoped lang="less">
.knowledge {
  .top-p {
    height: 36px;
    line-height: 36px;
    color: #3399ff;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    padding-left: 30px;

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

  .wrap {
    // .box-card {
    //   margin-top: 15px;
    //   border-radius: 8px;
    //   position: relative;
    //   .maskdiv {
    //     position: absolute;
    //     right: 3px;
    //     .mask {
    //       width: 60px;
    //       height: 0px;
    //       border-top: 20px solid red;
    //       border-right: 20px solid transparent;
    //       border-left: 20px solid transparent;

    //       cursor: pointer;
    //       text-align: center;
    //       .maskspan {
    //         position: absolute;
    //         top: 0;
    //         color: #ffffff;
    //         font-size: 0.5rem;
    //         right: 18px;
    //       }
    //     }
    //   }

    //   .content {
    //     font-size: 1rem;
    //     display: block;
    //     padding: 20px;
    //     line-height: 28px;
    //     letter-spacing: 1px;
    //     word-break: break-all;
    //     font-family: "JyeMath", "JyeMathLetters", "Times New Roman", "微软雅黑",
    //       Arial, "宋体";
    //     -webkit-font-smoothing: antialiased;
    //     // border-radius: 50% 0;

    //     .qt1 {
    //       overflow: hidden;
    //       zoom: 1;
    //       clear: both;
    //       line-height: 28px;
    //       font-size: 1rem;
    //       //padding: 20px;
    //       position: relative;
    //       word-break: break-word;
    //       padding-bottom: 20px;
    //       cursor: pointer;

    //       img {
    //         float: right;
    //         position: relative;
    //       }
    //     }

    //     .qt2 {
    //       //padding: 0px 20px 20px 20px;

    //       ul {
    //         display: flex;
    //         flex-wrap: wrap;
    //         justify-content: space-around;

    //         .selectoption {
    //           vertical-align: middle;
    //           font-size: 14px;
    //           padding: 2px;

    //           label {
    //             line-height: 24px;
    //           }
    //         }
    //       }
    //     }

    //     .top {
    //       border-bottom: 1px dashed #dbdee4;
    //       padding-bottom: 20px;
    //     }

    //     .middle {
    //       div {
    //         display: flex;

    //         .title {
    //           flex-shrink: 0;
    //           color: #22a9e8;
    //           font-weight: 600;
    //         }
    //       }

    //       .tag {
    //         padding-left: 10px;
    //         color: #828282;
    //         font-size: 0.9rem;
    //       }
    //     }
    //   }
    //   .foot-wrap {
    //     padding: 10px 20px;
    //     background-color: #ffffff;
    //     display: flex;
    //     justify-content: space-between;
    //     line-height: 24px;
    //     color: #828282;
    //     font-size: 0.8rem;

    //     .pt1 span {
    //       margin-right: 10px;
    //     }

    //     .pt2 span {
    //       margin-right: 15px;
    //       cursor: pointer;

    //       i {
    //         font-size: 1rem;
    //       }
    //     }

    //     .iconcolor {
    //       color: #789ef6;
    //     }
    //   }
    // }


    .input-search {
      margin-top: 10px;
      border: 1px solid #e2e2e2;
      padding: 3px 20px 0px 20px;
      background-color: #f2f5fc;
      display: flex;
      justify-content: space-between;
      height: 40px;
    }

    .content-div {
      margin-top: 20px;
      border: 1px solid #e2e2e2;
      padding: 20px;
      background-color: #f2f5fc;

      .pagination {
        margin-top: 30px;
        text-align: right;
      }
    }
  }

  .right-tag {
    position: fixed;
    top: 55%;
    right: 2%;

    .circle {
      width: 52px;
      height: 52px;
      background: #3399ff;
      border-radius: 26px;
      text-align: center;

      .iconposition {
        position: relative;
        font-size: 30px;
        color: #ffffff;
        top: 10px;
      }
    }

    .spandiv {
      font-size: 0.8rem;
      position: relative;
      top: 10px;
    }
  }
}
</style>