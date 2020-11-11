<template>
  <div class="single-question">
    <el-card class="box-card" :shadow="shadow" >

      <div class="cursor" @click="question.showDetail=!question.showDetail" >

        <div :class="{questionwrap: !showSimilarity}">
          <section class="content">
            <div class="qt1">
              <div class="ques-body">
                <span v-if="showSimilarity" class="order">{{index+1}}、</span>
                <div v-html="question.name" style="width: 100%;"></div>
              </div>
            </div>
            <div class="qt2" v-if="question.options && question.options.length && question.questionTypeTemplate!='BoolenQuestionTemplate'">
              <ul>
                <li style="width: 100%;" class="selectoption" v-for="list1 in question.selectoption">
                  <span style="margin-right: 10px;font-style: italic;">{{list1.key}}.</span>
                  <div v-html="list1.value"></div>
                </li>

              </ul>
            </div>
    
            <!-- 小题 -->
            <div class="" v-if="question.smallQuestions && question.smallQuestions.length" style="margin: 10px 0 0 10px;">
              <div v-for="(list1,index1) in question.smallQuestions">
                <div :class="{qtwrap:question.questionTypeTemplate=='GestaltFillsUpTemplate'||list1.questionType=='NoAloneEnter'}"  v-if="list1.questionType!='NoAloneEnter'">
                  <div class="qt1">
                    <div class="small-one">
                      <span class="order">{{index1+1}}</span><span>、</span>
                      <span v-html="list1.name"></span>
                    </div>
                  </div>
                  <div class="qt2" v-if="list1.options.length && list1.questionType!='BoolenQuestion'">
                    <ul v-if="list.questionTypeTemplate!='GestaltFillsUpTemplate'">
                      <li style="width: 100%;" class="selectoption" v-for="item in list1.selectoption">

                        <span>{{item.key}}</span>
                        <span>、</span>
                        <span v-html="item.value"></span> 
                      </li>


                    </ul>
                    <ul v-if="list.questionTypeTemplate=='GestaltFillsUpTemplate'">
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


          <section class="content" style="border-top: 1px dashed #dbdee4;" v-show="question.showDetail">

            <div class="middle">
              <div>
                <p class="title">【知识点】</p>
                <p v-if="question.knowledgesPoint && question.knowledgesPoint.length">{{question.knowledgesPoint.join()}}</p>
              </div>

              <div  v-if="question.answers&&question.answers.length">
                <p class="title">【答案】</p>
                <p>
                  <span v-for="(item,index1) in question.answers" style="margin-right: 10px;">
                   <span  v-if="question.smallQuestions.length" style="margin-left: 0px;">{{item.index}}.</span>
                   <span style="margin-left: 0px;" v-html="item.name"></span>
                  </span>
                </p>
              </div>
              <div>
                <p class="title">【分析】</p>
                <p v-html="question.analysis"></p>
              </div>
              <div>
                <p class="title">【详解】</p>
                <p v-html="question.detailedAnalysis"></p>
              </div>
            </div>
          </section>
        </div>



        <section class="foot-wrap">
          <p class="pt1">
            <span>收录：{{question.createTime}}</span>
            <span>组卷：{{question.groupCount}}</span>
            <span>难度：{{question.difficultyTypeName}}</span>
            <span>题型：{{question.questionTypeName}}</span>
          </p>
          <p class="pt2" v-if="showAction">
            <span @click.stop="getSimilarity(question.questionId)" class="foot-icon" v-if="showSimilarity">
              <i class="iconfont iconpaibanguanli iconcolor"></i> 相似题
            </span>
            <span @click.stop="showError(question.questionId)" class="foot-icon">
              <i class="iconfont iconjiucuo iconcolor"></i> 纠错
            </span>
            <span class="foot-icon" @click.stop="addCollectFolder(question.questionId)">
              <!-- <i class="iconfont iconshoucang1" style="color:#ffda33;"></i> -->
              <i class="iconfont iconshoucang2 iconcolor"></i>
              收藏
            </span>


            <span class="foot-icon" @click.stop="question.showDetail=!question.showDetail" v-if="showSimilarity">
              <i class="iconfont iconxiangqing1 iconcolor"></i> {{question.showDetail?'收起':'详情'}}
            </span>
            <!-- <span class="foot-icon" @click="list.showDetail=false" v-if="list.showDetail && showSimilarity">
              <i class="iconfont iconxiangqing1 iconcolor"></i> 题干
            </span> -->


            <span class="foot-icon" @click.stop="question.showDetail=!question.showDetail" v-if="!showSimilarity">
              <i class="iconfont iconwenbensousuo iconcolor"></i>{{question.showDetail?'隐藏解析':'显示解析'}}
            </span>
            <!-- <span class="foot-icon" @click="list.showDetail=false" v-if="list.showDetail && !showSimilarity">
              <i class="iconfont iconwenbensousuo iconcolor"></i>隐藏解析
            </span>
          	<span class="foot-icon">
             	<i class="iconfont iconwenbensousuo iconcolor"></i>
              <span v-if="!isAnswer" @click="isAnswer=true"></span>
              <span v-else @click="isAnswer=false"></span>
            </span> -->
            <el-button type="warning" size="mini" v-if="question.isTestBasket" @click.stop="deleteTestBasket(question.questionId)">移除试卷</el-button>
            <el-button type="primary" size="mini" v-if="!question.isTestBasket"  @click.stop="addTestBasket(question.questionId)">加入试卷</el-button>
          </p>
        </section>
        </div>
    </el-card>

  <!--   <similarityDialog :dialogVisible="similarityVisible" :questionId="similarityId" @close="close_similarity" @getmyTestBasket="getmyTestBasket"></similarityDialog>
    <errorDialog :dialogVisible="errorVisible" :questionId="errorId" @close="close_error"></errorDialog>
    <favoriteDialog :dialogVisible="favoriteVisible" :questionId="collectId" @close="close_favorite"></favoriteDialog>  -->
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
  	// isAnswer:{
  	// 	type:Boolean,
  	// 	default: false
  	// },

  	list:{
  		type:Object,
  	},
  	index: {
  		type:Number,
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
    subjectCode: {
      type: String,
    },
    isAnswer: {
      type: Boolean,
      default: false
    }

  },
  components: {
    similarityDialog,
    errorDialog,
    favoriteDialog,
  },
  data() {
    return {
    	similarityVisible: false,
    	errorVisible: false,
    	favoriteVisible: false,
    	similarityId:'',
    	collectId:'', 
      errorId:'', 
      question:{},  
    };
  },
  computed: {
      ...mapGetters([
        'paperId',

      ]),
  },
  watch: {
    list(val) {      
      if(val.questionId) {

        this.question = val
        // this.initTableData(JSON.parse(JSON.stringify(val)));
      }
    },
    // isAnswer(value) {
    //   if(value) {
    //     this.question.showDetail = true
    //   }else {
    //     this.question.showDetail = false
    //   }
    // }
    // list(val) {
    //   val.answers = []
    //   this.handleQuestion(val,val)
    // }
  },
  mounted() {

    if(this.list.questionId) {

      this.question = this.list
      // this.initTableData(JSON.parse(JSON.stringify(this.list)));
    }
    this.$nextTick(() => {

      MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

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
    initTableData(data) {

      data.check = data.check?data.check:false
      data.showDetail = false
      data.answers = []
      handleQuestion(data);

      this.question = data

    },

    getSimilarity(id) {
      // console.log(id)
      this.$emit('getSimilarity',id)
      // this.similarityId = id
      // this.similarityVisible = true
    },


    addCollectFolder(id) {
      this.$emit('addCollectFolder',id)
      // this.collectId = id
      // // console.log(this.collectId)
      // this.favoriteVisible = true
    },

    showError(id) {
      this.$emit('errorCorrection',id)
    },
    close_similarity() {
      this.similarityVisible = false
      // this.getTableData()
    },
    close_error() {
      this.errorVisible = false
      // this.getTableData()
    },
    close_favorite() {
      this.favoriteVisible = false
      // this.getTableData()
    },

    addTestBasket(id) {
      this.$http.post(`/api/open/paper/addTestBasket/hand/${id}`,{},{
        subjectCode: this.subjectCode,
      })
      .then((data)=>{
        if(data.status == '200') {
          this.isReset = false
          this.$emit('getData')
          // this.getTableData()
          this.getmyTestBasket()

          this.$message({
            message:'加入试卷成功',
            type:'success'
          }) 
        }
 
      })
    },

    deleteTestBasket(id) {
      this.$http.delete(`/api/open/paper/${this.paperId}/${id}`)
      .then((data)=>{
        if(data.status == '200') {
          this.isReset = false
          this.$emit('getData')
          // this.getTableData()
          this.getmyTestBasket()

          this.$message({
            message:'移除试卷成功',
            type:'success'
          }) 
        }
 
      })
    },

    getmyTestBasket() {
      this.$emit('getmyTestBasket')
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
      background: #f0f3fa;
    }

    .el-radio-button:first-child .el-radio-button__inner,.el-radio-button:last-child .el-radio-button__inner {
      // border-left: 0px;
      border-radius: 3px;
    }

    .content {
      p,div,span {
        // line-height: 1 !important;
        background-color:transparent !important;
        font-size: 1rem;
        font-family: "JyeMath", "JyeMathLetters", "Times New Roman", "微软雅黑",
            Arial, "宋体" !important;
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
	  margin-top: 15px;
	  border-radius: 8px;
	  position: relative;


    .questionwrap {
      max-height: 45vh;
      overflow: auto;
    }

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
      border-top: 1px solid #eaeaea;
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