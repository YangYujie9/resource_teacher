<template>
  <div class="choose-by-auto">
  	<div class="content-wrap">
  		
<!--   		<div>
  			<span>难度：</span>
			  <el-radio-group v-model="difficulty">
			    <el-radio :label="list.key" :key="list.key" v-for="list in difficultyList">{{list.value}}</el-radio>
			  </el-radio-group>
  		</div>
  		<div>
  			<span>题型：</span>
			  <div v-for="list in typeList" class="input-class">{{list.name}}</div>
  		</div>
  	</div> -->
			<el-form ref="form"  label-width="80px" size="small">
			  <el-form-item label="难度：">
				  <el-radio-group v-model="difficulty">
				    <el-radio :label="list.key" :key="list.key" v-for="list in difficultyList">{{list.value}}</el-radio>
				  </el-radio-group>
			  </el-form-item>
			  <el-form-item label="题型：">
			  	<div>
              <el-checkbox-group v-model="questionType" class="input-class">
                <div v-for="type in typeList" style="margin-right: 30px;">

                  <el-checkbox  :label="type" :key="type.id"  style="margin-right: 10px;"> {{type.name}}</el-checkbox>
                  <el-input v-model="type.number" class="" style="width:122px;" placeholder="请输入数量"></el-input>
                </div>
              </el-checkbox-group>
			  	</div>
			  </el-form-item>
			  <el-form-item >
			  	<el-button type="primary" round @click="finishExam">生成组卷</el-button>
				  
			  </el-form-item>
			</el-form>
		</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'
import { getquestionType } from '@/utils/basic.service.js'
export default {
	props: {
		activeType: {
			type: String,
		},
		chapterList: {
			type: Array
		},
		knowledgeList: {
			type: Array,
		}
	},


  data() {
    return {
    	difficulty:'',
    	questionType:[],
    	typeList:[],

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

  },
  mounted() {

  	this.getquestionType()
  },
  methods: {

    getquestionType() {

      this.typeList = []
      getquestionType(this.getuserInfo.subjectCode)
      .then((data)=>{
        if (data.status == "200") {
            
            // let arr = []
            // arr.push({code:'',name:'全部'})
            // data.data.forEach(item=>{
            //   arr.push(item)
            // })

            this.typeList = data.data

        } 
      })
    },

    finishExam() {
      if(!this.chapterList.length && !this.knowledgeList.length) {
        return this.$message({
          message: '必须选择章节或者知识点！',
          type:'warning'
        })
      }

    	let questionList = []
      for(let i=0;i<this.questionType.length;i++) {
        if(!this.questionType[i].number) {
          return this.$message({
            message:`请完善${this.questionType[i].name}的数量`,
            type:'warning'
          })
        }else {
          questionList.push({questionType:this.questionType[i].code, number:this.questionType[i].number})
        }
      }

      let chapterIds = []
      let knowledgeIds = []
      let questions = []

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


      this.$http.post(`/api/open/paper/addTestBasket/auto`,{
        questions: questionList,
        difficultyType: this.difficulty,
        chapterIds: chapterIds,
        knowledgeIds:knowledgeIds,
      })
      .then((data)=>{
      	if(data.status == '200') {
      		this.$message.success('智能组卷成功')
      	}
      })
    },

  }
};
</script>
<style lang="less">
.choose-by-auto {

	.el-input__inner {
		background-color: #f3f5f9;
	}



}

</style>
<style lang="less" scoped>
.choose-by-auto {

	height: 100%;
	background-color: rgb(238 240 244);



	.content-wrap {
		width: 80%;
		margin: 0 auto;
		margin-top: 10%;
		height: 300px;

		.input-class {
			display: flex;
			flex-wrap: wrap;
			// .input-p {
			// 	width: 25%
			// }
			
		}
	}





}
</style>