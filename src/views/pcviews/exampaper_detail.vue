<template>
  <div class="exampaper-detail">
  	<div class="exampaper-detail-top">

  		<div>
				<span>试卷名称 </span>
				<el-input v-model="paperName" style="width: 94%"></el-input>
			</div>
		</div>
		<div class="exampaper-detail-content">
  		<div class="active-wrap">
  			<el-button type="primary" size="small" round @click="setScoreShow">设置分数</el-button>
  			<el-button type="primary" size="small" round @click="cleardialogVisible=true">清空试卷</el-button>
  			<el-button type="primary" size="small" round @click="savePaperVisible = true">保存试卷</el-button>
  		</div>

  		<div class="content-wrap">
        <div class="exam-wrap" v-if="questionList && questionList.length">
          <!-- <p class="title">
            <el-input v-model="paperName" placeholder="请输入内容" style="width:360px;" @change="setScore"></el-input>
          </p> -->
          <div class="content">
            <!-- <el-button type="primary" size="mini" class="uploadbtn" @click="downloadVisible = true">试卷下载</el-button> -->
            <div v-for="(list,index) in questionList" class="singlediv">
              <p style="margin-bottom: 10px;"><span>{{$changeIndex(index+1)}}</span>、{{list.type}}（共{{list.list.length}}小题）</p>
              <div class="singleques" v-for="(list1,index1) in list.list">
                <section class=" cursor" @click="list1.showDetail=!list1.showDetail">

                  <div class="qt1">
                    <span style="flex-shrink: 0;">{{list1.index}}、</span>
                    <div  v-html="list1.name" style="width: 100%;"></div>
                    <!-- <img src="@/assets/test1.png" /> -->
                    
                    
                  </div>
                  <div class="qt2"  v-if="list1.options && list1.options.length && list1.questionTypeTemplate!='BoolenQuestionTemplate'">

                    <ul>
                      <li style="width: 100%;" class="selectoption" v-for="list2 in list1.selectoption">
                        <span style="margin-right: 10px;font-style: italic;">{{list2.key}}.</span>
                        <div v-html="list2.value"></div>
                      </li>

                    </ul>

                    
                  </div>

                  <!-- 小题 -->
                  <div class="" v-if="list1.smallQuestions.length" style="margin: 10px 0px;">
                    <div v-for="(list4,index4) in list1.smallQuestions">
                      <div :class="{qtwrap:list1.questionTypeTemplate=='GestaltFillsUpTemplate'||list4.questionType=='NoAloneEnter'}" v-if="list4.questionType!='NoAloneEnter'">
                        <div class="qt1">
                          <!-- <img src="@/assets/test1.png" /> -->
                          <span  style="flex-shrink: 0;">({{index4+1}})、</span>
                          <span v-html="list4.name"></span>
                        </div>
                        <div class="qt2" v-if="list4.options.length && list4.questionType!='BoolenQuestion'">
                          <ul>
                            <li style="width: 100%;" class="selectoption" v-for="item in list4.selectoption">

                              <span>{{item.key}}</span>
                              <span>、</span>
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
                      <span v-for="list3 in list1.answers"style="margin-right: 10px;">
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
                <div class="qt3">
                  <div class="wrap">
                    <div class="operate-wrap">
                      <p>
                        <span >本题{{list1.score}}分</span>
                      </p>
                      <p>
	                      <el-button @click="list1.showDetail = true" v-if="!list1.showDetail" round size="mini">查看详情</el-button>
	                      <el-button @click="list1.showDetail = false" v-else round size="mini">收起详情</el-button>
	                      <!-- <p @click="onUpItem()">上移</p>
	                      <p @click="onDownItem()">下移</p> -->
	                      <el-button @click="deleteQuestion(list1.questionId)" round size="mini">删除</el-button>
                      </p>
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
		</div>


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
        <el-button type="primary" @click="setScore" size="mini">保 存</el-button>
        <el-button @click="savePaperVisible = false" size="mini">取 消</el-button>
      </span>
    </el-dialog>


    <scoredialog :dialogVisible="scoredialogVisible" :paperId="paperId" @close="closescore" :paperName="paperName" :tableData="tableData" @getData="getPaperDetail"></scoredialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'
import scoredialog from "@/components/Dialog/score_setting";
import { getquestionType } from '@/utils/basic.service.js'
import { handleQuestion } from '@/utils/public.js';
export default {

  components: {
    scoredialog,

  },

  data() {
    return {
    	questionList:[],
    	paperName:'',
    	paperId:'',
    	cleardialogVisible: false,
    	savePaperVisible:false,
    	scoredialogVisible:false,
    	tableData:[]
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

  	this.paperId = this.$route.query.paperId
  	console.log(this.$route)
		this.getPaperDetail()

  },
  methods: {

    setScoreShow() {
      this.tableData = JSON.parse(JSON.stringify(this.questionList))
      this.scoredialogVisible=true
    },
    closescore() {

      this.scoredialogVisible = false;
    },
    getPaperDetail() {

      

      this.$http.get(`/api/open/paper/${this.paperId}`)
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
                handleQuestion(item,item,index)
                list[list.length-1].list.push(item)
              })
            }
          }else {
            this.$message({
              message:'试题篮为空',
              type: 'warning'
            })
          }

          console.log(list)


          this.questionList = list
        }
      })
    },

    // handleQuestion(item,item0,index) {

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
    //     item.fillAnswers.forEach(item1=>{
    //       item0.answers.push(item1.value.name)
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
    //     item.smallQuestions.forEach((item1)=>{
    //       index += 1
    //       item1.index = index          
    //       item.children.push(item1)
    //       this.handleQuestion(item1,item)
    //     })
        
    //   }

    //   //console.log(item) 
    // },

    finishExam() {

      this.$http.put(`/api/open/paper/addPaper/${this.paperId}/false`)
      .then((data)=>{
        if(data.status == '200') {
        	this.savePaperVisible = false
        	this.$message.success('试卷保存成功')
          this.getPaperDetail()
          // this.$router.push('/teacher/personal/myExampaper')


        }
      })

      
    },
    clearBasket() {

      this.$http.delete(`/api/open/paper/deleteAll/${this.paperId}`)
      .then(data=>{
        if(data.status == '200') {
          this.getPaperDetail()
          this.cleardialogVisible = false
          // this.$confirm("试卷清空成功，是否重新挑题", {
          //   confirmButtonText: "确定",
          //   cancelButtonText: "取消",

          // })
          //   .then(() => {

          //     // this.$router.push('/questions/chooseBychapter')

          //   })
          //   .catch(() => {
          //     this.getPaperDetail()
          //   });
        }
      })
      

      
    },
    setScore() {


      let arr = []
      // // console.log(list)
      // if(list && list.questionId) {
      //   arr.push(`${list.questionId},${list.score}`)
      // }

      this.$http.put(`/api/open/paper/${this.paperId}`,{
        paperId: this.paperId,
        name: this.paperName,
        questions: arr
      })
      .then(data=>{
        if(data.status == '200') {
          this.finishExam()
          // return this.$message({
          //   message:'分值设定成功',
          //   type: 'success'
          // })
        }
      })
    },

    deleteQuestion(questionId) {

      this.$confirm("确定从试卷中删除该题？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        // center: true,
        //type: "warning"
      })
      .then(() => {

        this.$http.delete(`/api/open/paper/${this.paperId}/${questionId}`)
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
  }
};
</script>
<style lang="less">
.exampaper-detail {

	.el-input__inner {
		border-radius: 30px;
	}
	.operate-wrap {

		.el-button:active,.el-button:focus,  {
	    background: #FFF;
	    border: 1px solid #DCDFE6;
	    color: #606266;
		}
	}
  .content {
      .MathJye {
          direction: ltr;
          display: inline-block;
          float: none;
          font-family: "Times New Roman","宋体";
          font-size: 15px;
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

  }

}

</style>
<style lang="less" scoped>
.exampaper-detail {

	height: 100%;
	

	&-top {
		height: 60px;
		line-height: 60px;
		padding: 0 20px; 
		background-color: rgb(238 240 244);

	}

	&-content {
		padding: 20px;

		.active-wrap {
			padding-left:20px;
		}

		.content-wrap {
			height: calc(100vh - 140px);
			margin-top: 20px;
			overflow-y: auto;

		  .exam-wrap {
		    // margin: 20px 0px;
		    // border: 1px solid #e2e2e2;
		    padding: 0 20px;
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
		        margin-bottom: 20px;

		        .singleques {
		          // margin: 20px 0px;
		          //padding:10px 20px;
		          // border: 1px solid transparent;
		          transition: 0.5s;
		          border: 1px solid #d6d6d6;
	            border-radius: 7px;
	            margin-bottom: 20px;
	            // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);


		          .qt1 {
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
		          .qt2 {
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

                .qt1 {
                  padding: 0px 20px 0 30px;
                }

                .qt2 {
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


		        .qt3 {
		          height: 38px;
		          line-height: 38px;

		          .wrap {
		            // display: none;

		            .operate-wrap {
		              border-radius: 0 0 7px 7px;
		              padding: 0 20px;
		              height: 100%;
		              background-color: #f4f4f4;
		              display: flex;
		              justify-content: space-between;
		              color: #333333;
		              font-size: 0.9rem;
		              border-top: 1px solid #d6d6d6;
		              border-bottom: 1px solid #d6d6d6;
		              //display: none;

		              // p {
		              //   margin-left: 20px;
		              //   cursor: pointer;

		              //   &:hover {
		              //     font-weight: bold;
		              //   }
		              // }
		            }
		          }

		          //text-align: right;
		        }
		      }
		    }
		  }
		}
	}





}
</style>