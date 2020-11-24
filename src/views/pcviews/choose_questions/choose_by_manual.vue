<template>
  <div class="choose-by-manual">

		<div class="choose-by-manual-top">
			<span style="position: absolute;right: 20px;">
				<span style="margin-right: 20px;">已选 <span style="color: #409EFF;">{{testBasket}}</span> 题</span>
				<el-button type="primary" round size="small" @click="addAllQuestion">全部加入</el-button>
			</span>

		</div>

		<div class="choose-by-manual-bottom">
			<div class="content-top">
				<p style="line-height: 40px;">范围筛选</p>
				<el-form :inline="true" :model="search" class="demo-form-inline" size="small">
				  <el-form-item label="题型：">
				    <el-select v-model="search.questionType" placeholder="题型" @change="resetPage">
				      <el-option :label="item.name" :value="item.code" :key="item.code" v-for="item in typeList"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="难度：">
				    <el-select v-model="search.difficulty" placeholder="难度" @change="resetPage">
				      <el-option :label="item.value" :value="item.key" :key="item.key" v-for="item in difficultyList"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="题库类型：">
				    <el-select v-model="search.type" placeholder="题库类型" @change="resetPage">
				      <el-option label="个人题库" value="0"></el-option>
				      <el-option label="公开题库" value="1"></el-option>
				    </el-select>				  
				  </el-form-item>
				  
				</el-form>
			</div>

			<p style="line-height: 40px;padding-left: 20px;">全部（<span>{{total}}</span>）</p>
			<div class="content-wrap">
				
				<questionList :isAnswer="isAnswer" :tableData="tableData" shadow="none" :showAction="false" :subjectCode="getuserInfo.subjectCode" knowledgeType="chapter" @getData="getTableData" @getmyTestBasket="getmyTestBasket"></questionList> 

        <p v-if="!tableData.length" style="text-align: center;padding-top: 200px;">暂无数据</p>  
			</div>
      <div class="content-foot">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="search.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="search.size"
          layout=" prev, pager, next, sizes"
          :total="total"
        ></el-pagination>
      </div>
		</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'
import { getquestionType } from '@/utils/basic.service.js'
import questionList from '@/components/Question/questionList'
import { debounce } from '@/utils/public.js'
export default {
	props: {
		activeType: {
			type: String,
		},
    volumeId: {
      type:String
    },
		chapterList: {
			type: Array
		},
		knowledgeList: {
			type: Array,
		}
	},

  components: {
    questionList
  },
  data() {
    return {
    	search: {
    		questionType:'',
    		type:'1',
    		difficulty:'',
    		page: 1,
    		size: 10
    	},
    	total: 0,
    	isAnswer: false,
    	typeList: [],
    	tableData: [],
    	testBasket: 0,
    };
  },
  computed: {

    ...mapGetters([
      'gradeList',
      'isReady',
      'difficultyList',
      'getuserInfo'

    ]),





  },
  watch: {
  	activeType(val) {
  		this.resetPage()
  	},

    chapterList(val) {
      this.resetPage()
    },

    knowledgeList(val) {
      this.resetPage()
    },
    volumeId(val) {
      if(val) {
        this.resetPage()
      }else {
        this.tableData = []
        this.total = 0
      }
    }
  },
  mounted() {
  	this.getquestionType()

  	this.getmyTestBasket()	

  },
  methods: {

    getquestionType() {

      this.typeList = []
      getquestionType(this.getuserInfo.subjectCode)
      .then((data)=>{
        if (data.status == "200") {
            
            let arr = []
            arr.push({code:'',name:'全部'})
            data.data.forEach(item=>{
              arr.push(item)
            })

            this.typeList = arr
            this.search.questionType = this.typeList[0].code;
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
    },
    resetPage() {
      this.search.page = 1
      this.getTableData()
    },
    getTableData: debounce(function() {

      let chapterIds = []
      let knowledgeIds = []
      let questions = []
      // if(!this.chapterList.length && !this.knowledgeList.length) {
      //   this.tableData = []
      //   this.total = 0
      //   return
      // }



      this.chapterList.forEach(item=>{
        chapterIds.push(item.id)
      })
      this.knowledgeList.forEach(item=>{
        knowledgeIds.push(item.id)
      })

      if(this.activeType == 'chapter') {
      	knowledgeIds = []
      }else {
      	chapterIds = []
      }


      let params = {
        method: this.search.type,
        questionType: this.search.questionType,
        difficultyType: this.search.difficulty,
        name: this.search.keyword,
        oeseId: this.volumeId,
        // gradeName: this.gradeName.substr(0,this.gradeName.length-1),
        // grade: this.grade,
        
        page: this.search.page - 1,
        size: this.search.size,
        subjectCode:this.getuserInfo.subjectCode
        // knowledgeId: this.search.difficulty,
      }
      this.$http.post(`/api/open/question/${this.search.type}/questions`,{
        chapterIds: chapterIds,
        knowledgeIds: knowledgeIds
      },params)
      .then((data)=>{
        data.data.content.forEach(item=>{

          item.showDetail = false
          item.answers = []
          this.handleQuestion(item,item)


        })

        this.tableData = data.data.content
        // console.log(this.tableData)
        this.total = data.data.totalElements


        
      })
    }),
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
    getmyTestBasket(callback) {
    	this.$http.get(`/api/open/paper/myTestBasket`)

    	.then((data)=>{

        this.$store.commit('setpaperId',data.data.paperId)
        
        if(data.data.paperId != JSON.parse(localStorage.getItem("paperId"))) {

          localStorage.setItem('paperId',JSON.stringify(data.data.paperId))
        }


        let count = 0
        if(data.data.questionMap) {
          for(let key in data.data.questionMap) {
            data.data.questionMap[key].forEach(item=>{
              count++
            })
          }

        }
        this.testBasket = count

        callback && callback()
        // this.$emit('gettestBasket',this.testBasket)

      })
    },

    addAllQuestion() {
      let ids = []

      this.tableData.forEach(item=>{
        ids.push(item.questionId)
      })

      this.$http.post(`/api/open/paper/addTestBasket/batchAdd`,{
        questionIds:ids.join(),
        subjectCode: this.getuserInfo.subjectCode
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
.pc-home {

	// .el-input--small .el-input__inner {
 //  	border-radius: 30px;
	// }
	// .el-radio-button:first-child .el-radio-button__inner {
 //    border-radius: 30px 0 0 30px;
	// }
	// .el-radio-button:last-child .el-radio-button__inner {
	// 	border-radius: 0 30px 30px 0;
	// }
	// .el-radio-button {
	// 	width: 50%;
	// }
	// .el-radio-group,.el-radio-button--small .el-radio-button__inner {
	// 	width: 100%;
	// }
	.el-form--inline .el-form-item {
		margin-right: 30px;
	}

	.single-question .box-card {

		.content {
			background-color: #ffffff;
		}

		.foot-wrap {
	    background-color: #f0f3f9;
		}

	}


}

</style>
<style lang="less" scoped>
.choose-by-manual {

	height: 100%;
	background-color: rgb(238 240 244);



	&-top {
		height: 50px;
		line-height: 50px;
		border-bottom: 1px solid rgb(226 228 230);
	}

	&-bottom {
		height: calc(100vh - 50px);
		background-color: #ffffff;
		

		.content-top {
			padding: 0 20px;
			border-bottom: 1px solid rgb(226 228 230);
		}

		.content-wrap {
			padding: 0 20px;
			height: calc(100vh - 230px);
			border-bottom: 1px solid rgb(226 228 230);
			overflow-y: auto;
			// background-color: red;
		}

		.content-foot {
			margin-top: 10px;
			text-align: right;
		}



	}





}
</style>