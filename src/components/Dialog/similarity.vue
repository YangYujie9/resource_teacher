<template>
  <div> 
    <el-dialog 
      title="相似题"
      :visible.sync="dialogVisible"
      :close-on-click-modal='false'
      width="900px"
      custom-class="smdialog"
      :before-close="closeDialog">
      <div >
        <div class="btnclass">
          <div class="btngroup" >
            <!-- <el-button

              v-for="(item,index) in list"
              size="mini"
              :class="{active:item.check}"
              @click="choose_similarity(item)"
            >{{index+1}}</el-button>-->
              <el-radio-group v-model="questionIndex" size="small" @change="choose_similarity">
                <el-radio-button :label="index" :key="list.questionId"  v-for="(list,index) in similarityList">{{index+1}}</el-radio-button>
               
              </el-radio-group>
          </div> 

          <el-button type="text" class="textbtn" v-if="question">换一批</el-button>
        </div>

        <!-- <el-card class="box-card" shadow="never" v-if="question">
          <section class="content">
            <div class="qt1">
              <div v-html="question.name"></div>
            </div>
            <div class="qt2">
              <ul>
                <li style="width: 100%;" class="selectoption" v-for="list1 in question.selectoption">
                  <span style="margin-right: 10px;font-style: italic;">{{list1.word}}.</span>
                  <div v-html="list1.value"></div>
                </li>

                </li>
              </ul>
            </div>
          </section>
          <section class="content" v-show="isAnswer">
            <div class="middle">
              <div>
                <p class="title smtitle">【知识点】</p>
                <p>{{question.chaptersPoint.join()}}</p>
              </div>

              <div  v-if="question.fillAnswers.length ||question.smallQuestions.length">
                  <p class="title smtitle">【答案】</p>
                  <p>
                    <span v-for="(item,index1) in question.answers">
                     <span  v-if="question.smallQuestions.length" style="margin-left: 0px;">{{index1+1}}、</span>
                     <span style="margin-left: 0px;">{{item}}</span>
                    </span>
                  </p>
              </div>

              <div>
                <p class="title smtitle">【分析】</p>
                <p v-html="question.analysis"></p>
              </div>
              <div>
                <p class="title smtitle">【详解】</p>
                <p v-html="question.detailedAnalysis"></p>
              </div>

            </div>
          </section>
          <section class="foot-wrap">
            <p class="pt1">
              <span>收录：{{question.createTime }}</span>
              <span>组卷：{{question.groupCount}}</span>
              <span>难度：{{question.difficultyTypeName}}</span>
            </p>
            <p class="pt2">
              <span>
                <i class="iconfont iconwenbensousuo iconcolor"></i>
                <span v-if="!isAnswer" @click="isAnswer=true">显示解析</span>
                <span v-else @click="isAnswer=false">隐藏解析</span>
              </span>

              <span>
                <i class="iconfont iconshoucang2 iconcolor"></i>
                收藏
              </span>
              <el-button type="primary" size="mini" @click="addTestBasket(question.questionId)" v-if="!question.isTestBasket">+ 试题篮</el-button>
              <el-button type="warning" size="mini" @click="deleteTestBasket(question.questionId)" v-if="question.isTestBasket">- 试题篮</el-button>
            </p>
          </section>
        </el-card> -->
        <singleQuestion shadow="never" :showSimilarity="false" :list="question" :index="1" :isAnswer="isAnswer" @getData="getSimilarity" v-if="question" @addCollectFolder="addCollectFolder" @getmyTestBasket="getmyTestBasket">
          
        </singleQuestion>
        <div v-else style="text-align: center;">暂无数据</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog" size="mini">关 闭</el-button>
      </span>

    </el-dialog>

  </div> 
</template>

<script>
export default {
  props: ['dialogVisible','questionId'],
  components: {
    singleQuestion: () => import('@/components/Question/singleQuestion')
    
  },
  data() {
    return {
      isAnswer: false,
      question: '',
      similarityList: [],
      questionIndex: '',
      question:'',
    };
  },
  mounted() {
    //this.$emit("getTreeData", this.treeData);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);



  },
  watch: {
    questionId(val) {
      if(val) {
        this.getSimilarity()
      }
    }
  },
  methods: {
    choose_similarity() {
      this.question = this.similarityList[this.questionIndex]
    },

    closeDialog() {
      this.$emit('close')
    },


    getSimilarity() {

      this.$http.get(`/api/open/question/similar/${this.questionId}/1/questions`)
      .then((data)=>{
        if(data.status == '200') {
        
          data.data.content.forEach(item=>{
            item.showDetail = false
            item.check = item.check?item.check:false
            item.answers = []
            this.handleQuestion(item,item)


          })

          // console.log(data.data.content)

          this.similarityList = data.data.content

          this.questionIndex = this.questionIndex?this.questionIndex:0
          this.question = this.similarityList[this.questionIndex]
        }
      })
    },


    handleQuestion(item,item0) {
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
      item.chaptersPoint = []
      if(item.chapters && item.chapters.length) {
        item.chapters.forEach(item1=>{
          item.chaptersPoint.push(item1.name)
        })
      }

      if(item.smallQuestions && item.smallQuestions.length) {
        item.smallQuestions.forEach(item1=>{
          this.handleQuestion(item1,item)
        })
        
      }
    },

    getmyTestBasket() {
      this.$emit('getmyTestBasket')
    },

    addCollectFolder() {
      this.$emit('addCollectFolder')
    }


  }
};
</script>
<style lang="less">
.smdialog {
  .btngroup {
    .el-radio-button__inner {
      background-color: #ffffff ;
      border:1px solid #DCDFE6;
      margin-right: 20px;
    }
    .el-radio-button:last-child .el-radio-button__inner,
    .el-radio-button:first-child .el-radio-button__inner {
      // 
      border-radius:4px;
    }
    .el-radio-button:first-child .el-radio-button__inner {
      border-left:1px solid #DCDFE6;
    }

    .el-radio-button__orig-radio:checked+.el-radio-button__inner {
      border-color: #409EFF; 
      background-color: #409EFF;
    }
  }

    // 相似题

    .el-card__body {
      background-color: #ffffff;
      border-color: #e7eaf1;
    }
  
  .foot-wrap {
    background-color: #f0f3fa !important;
  }

}

</style>
<style scoped lang="less">
.smdialog {


  .btnclass {
    display: flex;
    justify-content: space-between;

    .active {
      background-color: #628ef5;
      color: #ffffff;
    }
  }

  .smtitle {
    color: #333333 !important;
  }


  
}
</style>