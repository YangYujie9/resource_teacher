<template>
  <div>
    <div v-if="!isTemplate">
      <el-form :model="form" size="small" :rules="rules" ref="ruleForm">
        <el-form-item label="设置试卷名称：" prop="name">
          <el-input v-model="form.name" class="input-class" placeholder="请输入试卷名称"></el-input>
        </el-form-item>
        <el-form-item label="设置试卷年份：" prop="year">
           <el-select v-model="form.year" placeholder="请选择">
            <el-option
              v-for="item in yearList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设置试卷学科：" prop="subject">
          <el-select v-model="form.subject" placeholder="请选择" @change="getquestionType" disabled>
            <el-option
              v-for="item in subjectList"
              :key="item.code"
              :label="item.subjectName"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="设置试卷学段：" prop="learningSection">
          <el-select v-model="form.learningSection" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="设置试卷年级：" prop="grade">
          <el-select v-model="form.grade" placeholder="请选择">
            <el-option
              v-for="item in gradeList"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设置试卷地区：" prop="address">
          <el-select v-model="form.address" placeholder="请选择">
            <el-option
              v-for="item in regionList"
              :key="item.key"
              :label="item.value"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设置试卷题型、数量：" prop="questionType">

          <div class="inputgroup title2">

              <el-checkbox-group 
                v-model="form.questionType">
                <div v-for="type in questionTypeList" style="margin-right: 20px;">

                  <p><el-checkbox  :label="type" :key="type.id"  style="margin-right: 10px;"> {{type.name}}</el-checkbox></p>
                  <el-input v-model="type.number" class="input-class" style="width:122px;" placeholder="请输入数量"></el-input>
                </div>
              </el-checkbox-group>
          </div>
          
        </el-form-item>
        <el-form-item label="设置试卷类型：" prop="type">
          <div class="inputgroup title2">
          <el-radio-group v-model="form.type">
            <p><el-radio :label="list.key" :key="list.key" v-for="list in testPaperTypeList">{{list.value}}</el-radio></p>

          </el-radio-group>
          </div>

        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button type="primary" @click="addTemplate">生成真题模版</el-button>
        </el-form-item>
      </el-form>
      
    </div>

    <div v-else>
      <div v-for="(list,index) in tableData">
        <p style="line-height: 36px;">
          <span>{{$changeIndex(index+1)}}</span>、
          <span>{{list.questionTypeName}}</span>
          <span>（共{{list.total}}小题）</span> 
        </p>
        <div class="btngroup">
          <el-radio-group v-model="submitdIndex" size="small" @change="submitQuestion">
            <el-radio-button :label="`${list.questionTypeName}-${list1.sort}-${list.subjectCode}-${list.grade}`" v-for="list1 in list.list" :class="{active: list1.isComplete}" :disabled="list1.isComplete">{{list1.sort}}</el-radio-button>
            
          </el-radio-group>
        </div>

      </div>
      <p style="text-align: center;margin-top: 20px;" v-if="isCompleted">
        <el-button type="primary" size="mini" @click="finishSubmit">完成组卷</el-button>
      </p>
    </div>
  </div>

</template>


<script>
import { mapGetters } from 'vuex'
import { getquestionType } from '@/utils/basic.service.js';


export default {

  props: ['regionList','yearList','testPaperTypeList'],
  inject: ['reload'],
  data() {
    return {
      paperId:'',
      activePage: '真题查询',
      isTemplate: false,
      questionTypeList:[],

      tableData:[],
      isCompleted: false,
      submitdIndex:'',
      form: {
        name:'',
        year:'',
        subject:'',
        learningSection:'',
        grade:'',
        address:'',
        questionType:[],
        type:'',
      },

      rules: {
        name: [
          { required: true, message: '请输入试卷名称', trigger: 'blur' },
        ],
        year: [
          { required: true, message: '请选择试卷年份', trigger: 'change' }
        ],
        subject: [
          { required: true, message: '请选择试卷学科', trigger: 'change' }
        ],
        // learningSection: [
        //   { required: true, message: '请选择试卷学段', trigger: 'change' }
        // ],
        grade: [
          { required: true, message: '请选择试卷年级', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请选择试卷地区', trigger: 'change' }
        ],
        questionType: [
          { type: 'array', required: true, message: '请选择试卷题型', trigger: 'change' }
        ],
        type:  [
          { required: true, message: '请选择试卷类型', trigger: 'change' }
        ],
      }
    };
  },
  computed: {

    ...mapGetters([
      'getuserInfo',
      'gradeList',
      'difficultyList',
      'subjectList'

    ]),
  },


  watch: {
    



    subjectList(val) {
     

      this.form.subject = val.length? (this.getuserInfo.userType=='Teacher'? this.getuserInfo.subjectCode: val[0].code):''

      if(this.form.subject) {
        this.getquestionType()
      }
     
    } 
  },


  mounted() {
    this.init()
  },
  methods: {

    init() {

      this.paperId = this.$route.params.paperId
      if(this.paperId) {
        this.isTemplate = true
        this.getTruePaperTemplate()
      }else {

        this.form.subject = this.subjectList.length?(this.getuserInfo.userType=='Teacher'? this.getuserInfo.subjectCode:this.subjectList[0].code):''
        this.form.subject?this.getquestionType():null
      }

    },

    getquestionType() {
      this.questionTypeList = []
      getquestionType(this.form.subject)
      .then((data)=>{
        if (data.status == "200") {
            
            data.data.forEach(item=>{
              item.number = ''
            })
            this.questionTypeList = data.data
        } 
      })
    },




    addTemplate() {

      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let questionList = []
          for(let i=0;i<this.form.questionType.length;i++) {
            if(!this.form.questionType[i].number) {
              return this.$message({
                message:`请完善${this.form.questionType[i].name}的数量`,
                type:'warning'
              })
            }else {
              console.log(this.form.questionType)
              // questionList.push({key:this.form.questionType[i].key,value:this.form.questionType[i].number})
              questionList.push(`${this.form.questionType[i].code},${this.form.questionType[i].number}`)
            }
          }


          this.$http.post(`/api/open/paper/addTrueTitlePaper`,{
            name: this.form.name,
            year: this.form.year,
            subjectCode: this.form.subject,
            region: this.form.address.value,
            regionId: this.form.address.key,
            grade: this.form.grade,
            learningSection: this.getuserInfo.learningSection,
            testPaperType: this.form.type,
            questionList: questionList,
          })
          .then((data)=>{
            if(data.status == '200') {
              // 
              this.$router.push(`/questions/actualPaper/maintain/${data.data.id}`)
              this.init()
            }
          })
          // console.log(this.form.questionType)
          
        } else {
          
          return false;
        }
      });
    },


    getTruePaperTemplate() {
      this.$http.get(`/api/open/paper/getTruePaperTemplate/${this.paperId}`)
      .then((data)=>{
        if(data.status == '200') {
          data.data.dtoList.forEach(item=>{
            item.list = []
            for(let i=1;i<=item.total;i++) {
              let flag = false
              for(let j=0;j<item.completList.length;j++) {
                if(i == item.completList[j]) {
                  flag = true
                  break
                }
              }

              // if(flag) {
                item.list.push({sort:i, isComplete: flag})
              // }
            }
          })


          this.tableData = data.data.dtoList
          this.isCompleted = data.data.isOk
        }
      })
    },


    submitQuestion() {
      
      let submitInfo = this.submitdIndex.split('-')

      
      this.$router.push({ path: '/questions/submitQuestions', query: { paperId: this.paperId, questionType:submitInfo[0], sort: submitInfo[1], subjectCode:submitInfo[2], grade:submitInfo[3]}});
      
    },


    finishSubmit() {
      this.$http.put(`/api/open/paper/addPaper/${this.paperId}`)
      .then((data)=>{
        if(data.status == '200') {
          this.$confirm('组卷完成，是否进入真题试卷？', '', {
              confirmButtonText: '进入',
              cancelButtonText: '取消',
              type: '',
              center: true
            }).then(() => {

              
              this.$router.push(`/questions/actualPaper/search/true`)


            }).catch(() => {
              this.reload()
            });
          
        }
      })
    }


  
  }
};
</script>
<style lang="less">
.actual-paper {
  .tree-wrap {
    border:0px;
    // width: 300px;
  }
  .left {

    .el-radio-button,
    .el-radio-button__inner {
      width: 100%;
      
      
    }
    .el-radio-button__inner {
      border:1px solid #e2e2e2 ;
      margin-bottom: 10px;
    }

    .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      border-color:#409EFF;
    }
  }

  .btngroup {
    .el-radio-button__inner {
      background-color: #ffffff ;
      border:1px solid #DCDFE6;
      margin-right: 20px;
      border-radius:4px;
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

  .active {
    .el-radio-button__inner {
      background-color: #32c55c;
      color: #ffffff;
    }
  }
  .inputgroup {
    .el-radio {
      vertical-align: middle;
      line-height: 32px;
    }
    .el-table th, {
      background-color: #9cb9ff; 
      color: #ffffff;
      // text-align: center;
    }

     .el-checkbox-group {
      display: flex;
      flex-wrap: wrap;
    }
  }

  .el-table tr {
    background-color: #f0f3fa;
    
  }

  .el-table td, .el-table th.is-leaf {
    border-bottom: 1px solid #e2e2e2;
  }

  .el-input__inner {
    background-color: transparent;
  }




}

</style>
<style scoped lang="less">
.actual-paper {
  .paper-content-wrap {
    margin-top: 10px;
    border:1px solid #e2e2e2;


  }

  .input-class {
    width: 300px;
  }
  .pagination {
    text-align: right;
    margin: 20px 0px;
  }

  .inputgroup {
    display: flex;
    flex-wrap: wrap;

    .label1 {
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
      box-shadow: -1px 0 0 0 #8cc5ff;
      padding: 6px 13px;
      border-radius: 4px;
      font-size: 12px;
      margin-right: 10px;
    }
  }
}

</style>