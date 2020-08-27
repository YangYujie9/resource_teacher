<template>
  <div class="addques-home">
    <left-fixed-nav :isfixTab="isfixTab">
      <div slot="left">
        <!-- <div class="tree-wrap" :class="{fixedclass:isfixTab}" style="z-index: 1000;"> -->
          <top-popover>
            <div slot="reference">
              <p class="top-title">
                <span>人教版：</span>
                <span>{{form.grade.value}}</span>
                <i class="iconfont iconshezhi settingicon"></i>
              </p>
            </div>
            <div slot="popover">
              <div>
                <p>年级：</p>
                 <el-radio-group v-model="form.grade" size="mini">
                    <el-radio-button :label="item" :key="item.key" v-for="item in gradeDetailList">{{item.value}}</el-radio-button>
                </el-radio-group>
              </div>
              <!-- <div>
                <p>学科：</p>
                 <el-radio-group v-model="form.subject" size="mini">
                    <el-radio-button :label="item.key" v-for="item in subjectList">{{item.value}}</el-radio-button>
                </el-radio-group>
              </div> -->
            </div>
          </top-popover>
          <div class="tree-content">
            <el-tabs stretch v-model="activeType" @tab-click="handleClick">
              <el-tab-pane label="按章节" name="chapter">
                <div class="tree-class" :class="{treeclassfixed:isfixTab}">
                  <pointTree chooseType="chapter" :grade="form.grade.key" :subjectCode="form.subjectCode"  @getCheckedNodes="getCheckedChapters" ref="chapterTree"></pointTree>
                </div>
              </el-tab-pane>
              <el-tab-pane label="按考点" name="detial">
                <div class="tree-class">
                  <pointTree chooseType="knowledge" :grade="form.grade.key" :subjectCode="form.subjectCode"  @getCheckedNodes="getCheckedKnows" ref="knowledgeTree"></pointTree>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        <!-- </div> -->
      </div>

      <div slot="right">
        <div class="content-class">
          <div class="div1">
            <div
              style="display:flex;justify-content: space-between;height:30px;align-items: center;"
            >
              <p>选择考核范围</p>
              <p>
                <el-button type="text" size="small">撤销操作</el-button>
                <el-button type="text" size="small">清空</el-button>
              </p>
            </div>
            <div class="tag-class">

              <el-tag v-for="(tag,index) in tagsList" :key="tag.id" closable type="warning" @close="closeTag(index)">{{tag.name}}</el-tag>
            </div>
          </div>

          <div>
            <p>题干内容</p>
            <Ueditor :writeMsg="defaultMsg0" :id="ueditor0" :config="config0" ref="ue0"></Ueditor>
          </div>

          <div class="form-class">
            <el-form :model="form" label-width="80px;">
              <el-form-item label="题数：">
                <el-select
                  v-model="form.questionNum"
                  placeholder="请选择"
                  style="width:60px;"
                  size="mini"
                  @change="changequestionNum"
                >
                  <el-option
                    v-for="item in questionOtions"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="序号："  class="custom-form">
                <el-button
                  v-for="(list,index) in questionOtions"
                  v-if="index<form.questionNum"
                  size="mini"
                  type="primary"
                  plain
                  :class="{active: list.check}"
                  @click="choose_quesnum(list)"
                >第{{list.label}}题</el-button>
              </el-form-item>
              <el-form-item label="题型：">
                <el-radio-group v-model="questionType" size="mini" :disabled="typeDisable" @change="changeType()">
                  <el-radio-button
                    v-for="list in typeList"
                    :label="list.key"
                    :key="list.key"
                  >{{list.value}}</el-radio-button>
                </el-radio-group>
              </el-form-item>

              <!-- <el-form-item label="题型：">
                <el-button
                  v-for="list in typeList"
                  size="mini"
                  type="primary"
                  plain
                  :class="{active: list.check}"
                  @click="choose_type(list)"
                >{{list.label}}</el-button>
              </el-form-item>-->
              <el-form-item label="难度：">
                <el-radio-group v-model="form.difficulty" size="mini">
                  <el-radio-button v-for="list in difficultyList" :label="list.key" :key="list.key">{{list.value}}</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
          <div class="set-form">
            <el-form>
              <el-form-item>
                <el-tabs v-model="activeName" type="card">
                  <el-tab-pane label="问题" name="stems" v-if="form.questionNum!=1">
                    <div v-show="activeName=='stems'">
                      <Ueditor :writeMsg="defaultMsg1" :id="ueditor1" :config="config1" ref="ue1"></Ueditor>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="分析" name="analysis">
                    <div v-show="activeName=='analysis'">
                      <Ueditor :writeMsg="defaultMsg2" :id="ueditor2" :config="config2" ref="ue2"></Ueditor>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="详解" name="answer">
                    <div v-show="activeName=='answer'">
                      <Ueditor :writeMsg="defaultMsg3" :id="ueditor3" :config="config3" ref="ue3"></Ueditor>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </el-form-item>
            </el-form>
          </div>

          <!-- <div class="form-class" v-show="showjudgmentOptions">
            <el-form :model="form" style="margin-bottom:10px;">

              <el-form-item label="选项内容">
                <el-button
                  v-for="(item,index) in optionList"
                  size="mini"
                  type="primary"
                  plain
                  :class="{active: item.check}"
                  @click="choose_judgment(item)"
                >{{item.label}}</el-button>
              </el-form-item>
            </el-form>
            <Ueditor :writeMsg="defaultMsgA" :id="ueditorA" :config="configA" ref="ueA"></Ueditor>
          </div>-->
          <div class="form-class" v-show="questionType=='SingleChoose' ||questionType=='MultipleChoose'||questionType=='BoolenQuestion'">
            <el-form :model="form" style="margin-bottom:10px;">
              <el-form-item label="选项个数" v-show="questionType=='SingleChoose' ||questionType=='MultipleChoose'">
                <el-select
                  v-model="form.optionNum"
                  placeholder="请选择"
                  style="width:60px;"
                  size="mini"
                >
                  <el-option v-for="item in ansOptions" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选项内容">
                <el-radio-group v-model="currentOption" size="mini"  @change="choose_qusoption">
                  <el-radio-button
                    v-for="(list,index) in optionList"
                    v-if="index<form.optionNum"
                    :label="list"
                    :key="list.label"
                  >{{list.label}}</el-radio-button>
                </el-radio-group>


                 <!--<el-button
                  v-for="(item,index) in optionList"
                  v-if="index<form.optionNum"
                  size="mini"
                  type="primary"
                  plain
                  :class="{active: item.check}"
                  @click="choose_qusoption(item)"
                >{{item.label}}</el-button> -->
              </el-form-item>
            </el-form>
            <Ueditor :writeMsg="defaultMsgA" :id="ueditorA" :config="configA" ref="ueA" v-show="currentOption.label == 'A'"></Ueditor>
            <Ueditor :writeMsg="defaultMsgA" :id="ueditorB" :config="configA" ref="ueB" v-show="currentOption.label == 'B'"></Ueditor>
            <Ueditor :writeMsg="defaultMsgA" :id="ueditorC" :config="configA" ref="ueC" v-show="currentOption.label == 'C'"></Ueditor>
            <Ueditor :writeMsg="defaultMsgA" :id="ueditorD" :config="configA" ref="ueD" v-show="currentOption.label == 'D'"></Ueditor>
            <Ueditor :writeMsg="defaultMsgA" :id="ueditorE" :config="configA" ref="ueE" v-show="currentOption.label == 'E'"></Ueditor>
            <Ueditor :writeMsg="defaultMsgA" :id="ueditorF" :config="configA" ref="ueF" v-show="currentOption.label == 'F'"></Ueditor>
            <Ueditor :writeMsg="defaultMsgA" :id="ueditorG" :config="configA" ref="ueG" v-show="currentOption.label == 'G'"></Ueditor>
            <Ueditor :writeMsg="defaultMsgA" :id="ueditorH" :config="configA" ref="ueH" v-show="currentOption.label == 'H'"></Ueditor>
          </div>
          <div
            style="display:flex;margin-top:20px;"
            v-show="(questionType=='SingleChoose' ||questionType=='MultipleChoose'||questionType=='BoolenQuestion'||questionType=='FillingQuestion')"
          >
            <p>
              <span>答案个数：</span>
              <el-select
                v-model="form.relOptionNum"
                placeholder="请选择"
                style="width:60px;"
                size="mini"
                :disabled="questionType=='SingleChoose'||questionType=='BoolenQuestion'"
              >
                <el-option v-for="item in relOptions" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </p>
            <p v-show="questionType=='SingleChoose' ||questionType=='MultipleChoose'||questionType=='BoolenQuestion'">
              <span style="margin-left:20px;">正确选项:</span>
              <el-select
                v-model="answers[index]"
                placeholder="请选择"
                style="width:60px;margin-right:10px;"
                size="mini"
                v-for="(i,index) in answers"
                v-if="index<form.relOptionNum"
              >
                <el-option
                  v-for="(item,index) in optionList"
                  v-if="index<form.optionNum"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </p>
            <p style="margin-right:10px;" v-show="questionType=='FillingQuestion'">
              <span style="margin-left:20px;">正确答案:</span>
              <el-button
                v-for="(item,index) in answers"
                v-if="index<form.relOptionNum"
                @click="getfillAnswer(index)"
                size="mini"
                v-html="item"
              ></el-button>
            </p>
          </div>

          <div style="text-align:center;margin-top:20px">
            <el-button type="primary" size="mini" @click="submitquestion">上 传</el-button>
          </div>
        </div>
      </div>
    </left-fixed-nav>

    <el-dialog title="填空题答案" :visible.sync="fillanswerVisible" width="800px;" 
      :modal-append-to-body="false"
      :close-on-click-modal="false">
      <div>
        <Ueditor :writeMsg="defaultMsgB" :id="ueditorFill" :config="configB" ref="ueFill"></Ueditor>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="fillanswerVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="setfillAnswer" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import leftFixedNav from "@/components/Nav/leftFixedNav";
import topPopover from "@/components/Popover/topPopover";
import Ueditor from "@/components/Ueditor/Ueditor";
import { getquestionType } from '@/utils/basic.service.js'


export default {
  props: ["isfixTab"],
  components: {
    leftFixedNav,
    topPopover,
    Ueditor
  },
  inject: ['reload'],
  data() {
    return {
      editable: false,
      activeType: "chapter",
      activeName: "analysis",

      // gradeList: getgradeList,
      fillanswerVisible: false,
      fillindex: 0,
      questionOtions: [
        { label: 1, check: true, ques: "", analyze: "", answ: "" },
        { label: 2, check: false, ques: "", analyze: "", answ: "" },
        { label: 3, check: false, ques: "", analyze: "", answ: "" },
        { label: 4, check: false, ques: "", analyze: "", answ: "" },
        { label: 5, check: false, ques: "", analyze: "", answ: "" },
        { label: 6, check: false, ques: "", analyze: "", answ: "" },
        { label: 7, check: false, ques: "", analyze: "", answ: "" },
        { label: 8, check: false, ques: "", analyze: "", answ: "" },
        { label: 9, check: false, ques: "", analyze: "", answ: "" },
        { label: 10, check: false, ques: "", analyze: "", answ: "" },
        { label: 11, check: false, ques: "", analyze: "", answ: "" },
        { label: 12, check: false, ques: "", analyze: "", answ: "" },
        { label: 13, check: false, ques: "", analyze: "", answ: "" },
        { label: 14, check: false, ques: "", analyze: "", answ: "" },
        { label: 15, check: false, ques: "", analyze: "", answ: "" },
        { label: 16, check: false, ques: "", analyze: "", answ: "" },
        { label: 17, check: false, ques: "", analyze: "", answ: "" },
        { label: 18, check: false, ques: "", analyze: "", answ: "" },
        { label: 19, check: false, ques: "", analyze: "", answ: "" },
        { label: 20, check: false, ques: "", analyze: "", answ: "" },
        { label: 21, check: false, ques: "", analyze: "", answ: "" },
        { label: 22, check: false, ques: "", analyze: "", answ: "" },
        { label: 23, check: false, ques: "", analyze: "", answ: "" },
        { label: 24, check: false, ques: "", analyze: "", answ: "" },
        { label: 25, check: false, ques: "", analyze: "", answ: "" },
      ],
      //chooseAns: "A",
      ansOptions: [ 2, 3, 4, 5, 6, 7, 8],
      optionList: [
        { label: "A", check: true, content: "" },
        { label: "B", check: false, content: ""  },
        { label: "C", check: false, content: "" },
        { label: "D", check: false, content: "" },
        { label: "E", check: false, content: "" },
        { label: "F", check: false, content: "" },
        { label: "G", check: false, content: "" },
        { label: "H", check: false, content: "" }
      ],
      currentOption:'',
      // judgmentoptionList: [
      //   { label: "对", check: true, content: "" },
      //   { label: "错", check: false, content: "" }
      // ],
      //ansCotent:[],
      relOptions: [1, 2, 3, 4, 5, 6, 7, 8],
      answers: ["A", "A", "A", "A", "A", "A", "A", "A"],
      questionType: "",
      form: {
        optionNum: 4,
        relOptionNum: 1,
        questionNum: 1,

        difficulty: "",
        grade: "",
        subjectId: "",
        subjectCode:"",
        subjectName:'',
        version: "",
        knowledge: ""
      },
      difficultyList: [],
      typeList: [],
      defaultMsg0: "",
      ueditor0: "ueditor0",
      config0: {
        initialContent: "", //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
        BaseUrl: ""
        //UEDITOR_HOME_URL: 'static/ueditor/'
      },
      defaultMsg1: "",
      defaultMsg2: "",
      defaultMsg3: "",
      ueditor1: "ueditor1",
      ueditor2: "ueditor2",
      ueditor3: "ueditor3",

      config1: {
        initialContent: "", //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
        BaseUrl: ""
        //UEDITOR_HOME_URL: 'static/Ueditor/'
      },
      config2: {
        initialContent: "", //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
        BaseUrl: ""
        //UEDITOR_HOME_URL: 'static/ueditor/'
      },
      config3: {
        initialContent: "", //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
        BaseUrl: ""
        //UEDITOR_HOME_URL: 'static/ueditor/'
      },
      defaultMsgA: "",
      ueditorA: "ueditorA",
      ueditorB: "ueditorB",
      ueditorC: "ueditorC",
      ueditorD: "ueditorD",
      ueditorE: "ueditorE",
      ueditorF: "ueditorF",
      ueditorG: "ueditorG",
      ueditorH: "ueditorH",
      ueditorFill:'ueditorFill',
      configA: {
        initialContent: "", //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
        BaseUrl: ""
        //UEDITOR_HOME_URL: 'static/ueditor/'
      },
      defaultMsgB: "",
      ueditorB: "ueditorB",
      configB: {
        initialContent: "", //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
        BaseUrl: ""
        //UEDITOR_HOME_URL: 'static/ueditor/'
      },
      tagsList:[],
      chapterTags:[],
      knowledgeTags:[],
      isActual: false,
      gradeDetailList: [],
      typeDisable: false,
      actualPaper:{},
      query:{}
    };
  },

  watch: {
    gradeList(val) {
      if(val.length) {
        this.init()
      }

    },

    questionType(val) {
      if(!this.editable) {

        this.changeOption()

        // if (val == "SingleChoose" || val == "MultipleChoose") {
        //   this.optionList = [
        //     { label: "A", check: true, content: "" },
        //     { label: "B", check: false, content: "" },
        //     { label: "C", check: false, content: "" },
        //     { label: "D", check: false, content: "" },
        //     { label: "E", check: false, content: "" },
        //     { label: "F", check: false, content: "" },
        //     { label: "G", check: false, content: "" },
        //     { label: "H", check: false, content: "" }
        //   ];
        //   this.form.optionNum = 4;
        //   this.answers = ["A", "A", "A", "A", "A", "A", "A", "A"];

        //   if (val == "SingleChoose") {
        //     this.form.relOptionNum = 1;
        //   }else {
        //     this.form.relOptionNum = 2;
        //   }
        // } else if (val == "BoolenQuestion") {
        //   this.optionList = [
        //     { label: "对", check: true, content: "" },
        //     { label: "错", check: false, content: "" }
        //   ];

        //   this.form.optionNum = 2;
        //   this.form.relOptionNum = 1;
        //   this.answers = ["对"];
        // } else if (val == "FillingQuestion") {
        //   this.answers = ["答案","答案","答案","答案","答案","答案","答案","答案","答案"];
        // }
      }

    }
  },
  computed: {

    ...mapGetters([
      'gradeList',
      'getuserInfo',

    ]),


    

    showQuestonOptions() {
      if (
        this.questionType == "SingleChoose" ||
        this.questionType == "MultipleChoose" ||
        this.questionType == "BoolenQuestion"
      ) {
        if (this.activeName == "stems" || this.form.questionNum == 1) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }

    // showjudgmentOptions() {
    //   if(this.questionType=='BoolenQuestion') {
    //     if(this.form.questionNum == 1 || this.activeName=='stems') {
    //       return true
    //     }else {
    //       return false
    //     }

    //   }else {
    //     return false
    //   }
    // }
  },

  mounted() {



    
    // console.log(this.form.subjectId,this.form.subjectCode)
    this.init()


    
    
  },
  methods: {

    init() {

      this.currentOption = this.optionList[0]
      this.query = this.$route.query
      if(this.query && this.query.paperId) {
        this.actualPaper = this.query
        this.isActual = true
        this.typeDisable = true
        this.form.subjectCode = this.actualPaper.subjectCode
        
        if(this.gradeList.length) {

          let grade = this.gradeList.filter(item=>{
            return item.key.substr(0,item.key.length-2) == this.actualPaper.grade
          })

          this.gradeDetailList = grade
          this.form.grade = grade[0]
        }
      }else {
        this.activeType = this.query.activeType?this.query.activeType:'chapter'
        this.isActual = false
        // this.form.subjectId = this.getuserInfo.subject.id
        this.form.subjectCode = this.getuserInfo.subjectCode
        if(this.gradeList.length) {
          this.gradeDetailList = this.gradeList
          this.form.grade = this.gradeList[0]
        }
      } 

      this.getquestionType();
      this.getdifficultyType();   
    },
    handleClick(tab, event) {
      if(tab.name == "chapter") {
        this.tagsList = this.chapterTags
      }else {
        this.tagsList = this.knowledgeTags
      }
    },
    changequestionNum(val) {
      val == 1 ? (this.activeName = "analysis") : (this.activeName = "stems");
    },

    // choose_difficulty(list) {
    //   this.difficultyList.forEach(item => {
    //     item.check = false;
    //   });
    //   list.check = true;
    //   this.form.difficulty = list.label;
    // },


    changeOption() {
        if (this.questionType == "SingleChoose" || this.questionType == "MultipleChoose") {
          this.optionList = [
            { label: "A", check: true, content: "" },
            { label: "B", check: false, content: "" },
            { label: "C", check: false, content: "" },
            { label: "D", check: false, content: "" },
            { label: "E", check: false, content: "" },
            { label: "F", check: false, content: "" },
            { label: "G", check: false, content: "" },
            { label: "H", check: false, content: "" }
          ];
          this.form.optionNum = 4;
          this.answers = ["A", "A", "A", "A", "A", "A", "A", "A"];

          if (this.questionType == "SingleChoose") {
            this.form.relOptionNum = 1;
          }else {
            this.form.relOptionNum = 2;
            this.relOptions = [ 2, 3, 4, 5, 6, 7, 8]
          }
        } else if (this.questionType == "BoolenQuestion") {

          this.optionList = [
            { label: "对", check: true, content: "" },
            { label: "错", check: false, content: "" }
          ];

          this.form.optionNum = 2;
          this.form.relOptionNum = 1;
          this.answers = ["对"];
        } else if (this.questionType == "FillingQuestion") {
          this.answers = ["答案","答案","答案","答案","答案","答案","答案","答案","答案"];
          this.relOptions = [1, 2, 3, 4, 5, 6, 7, 8]
        } else {
          this.form.optionNum = 0
          this.form.relOptionNum = 0
        }
    },

     changeType() {

      if(this.editable) {
        this.changeOption()
        // if (this.questionType == "SingleChoose" || this.questionType == "MultipleChoose") {
        //   this.optionList = [
        //     { label: "A", check: true, content: "" },
        //     { label: "B", check: false, content: "" },
        //     { label: "C", check: false, content: "" },
        //     { label: "D", check: false, content: "" },
        //     { label: "E", check: false, content: "" },
        //     { label: "F", check: false, content: "" },
        //     { label: "G", check: false, content: "" },
        //     { label: "H", check: false, content: "" }
        //   ];
        //   this.form.optionNum = 4;
        //   this.answers = ["A", "A", "A", "A", "A", "A", "A", "A"];

        //   if (this.questionType == "SingleChoose") {
        //     this.form.relOptionNum = 1;
        //   }else {
        //     this.form.relOptionNum = 2;
        //   }
        // } else if (this.questionType == "BoolenQuestion") {

        //   this.optionList = [
        //     { label: "对", check: true, content: "" },
        //     { label: "错", check: false, content: "" }
        //   ];

        //   this.form.optionNum = 2;
        //   this.form.relOptionNum = 1;
        //   this.answers = ["对"];
        // } else if (this.questionType == "FillingQuestion") {
        //   this.answers = ["答案","答案","答案","答案","答案","答案","答案","答案","答案"];
        // }
      }

      
    },

    choose_qusoption(list) {
    //   let str = this.$refs.ueA.getUEContent();

    //   console.log(this.currentOption)
    //   this.optionList.forEach(item => {
    //     item.check ? (item.content = str) : "";
    //     item.check = false;
    //   });
    //   list.check = true;
    //   this.$refs.ueA.setUEContent(list.content);
    //   //console.log(this.optionList);

    //   //this.chooseAns = list.label;
    },

    save_prev(flag) {
      // let option = this.$refs.ueA.getUEContent();
      // this.optionList.forEach(item => {
      //   item.check ? (item.content = option) : "";
      //   item.check = false;
      // });

      this.optionList.forEach(item=>{
        let str = this.$refs[`ue${item.label}`].getUEContent()
        item.content = str?str:''
      })


      
      let ques = ''
      if(this.form.questionNum!=1){
        ques = this.$refs.ue1.getUEContent()
        
      }

      let analyze = this.$refs.ue2.getUEContent();
      let answ = this.$refs.ue3.getUEContent();
      this.questionOtions.forEach(item => {
        if (item.check) {
          item.edit = true;
          item.ques = ques;
          item.analyze = analyze;
          item.answ = answ;
          item.questionType = this.questionType;
          item.difficulty = this.form.difficulty;
          item.selectOptions = this.optionList;
          item.answers = this.answers;
          item.optionNum = this.form.optionNum;
          item.relOptionNum = this.form.relOptionNum;
        }
        
        flag?item.check = false:null;
      });


      // this.$refs.ueA.setUEContent("");
    },
    choose_quesnum(list) {
      this.save_prev(true);

      
      
      this.editable = list.edit ? true : false;
      this.questionType = list.questionType
        ? list.questionType
        : this.typeList[0].key;
      this.form.difficulty = list.difficulty
        ? list.difficulty
        : this.difficultyList[0].key;
        list.ques = list.ques?list.ques:''
        list.analyze = list.analyze?list.analyze:''
        list.answ = list.answ?list.answ:''

        this.$refs.ue1.setUEContent(list.ques);
        this.$refs.ue2.setUEContent(list.analyze);
        this.$refs.ue3.setUEContent(list.answ);

      if(list.edit) {
        this.optionList = list.selectOptions
        // this.optionList[0].check = true
        this.optionList.forEach(item=>{
          this.$refs[`ue${item.label}`].setUEContent(item.content)
        })
        // this.$refs.ueA.setUEContent(this.optionList[0].content);
        this.form.optionNum = list.optionNum;
        this.form.relOptionNum = list.relOptionNum
        this.answers = list.answers

      }else {
        this.optionList.forEach(item=>{
          this.$refs[`ue${item.label}`].setUEContent('')
        })
        this.changeOption()
      }
      //console.log(this.questionOtions,this.optionList)

      this.currentOption = this.optionList[0]
      list.check = true;
    },

    getfillAnswer(index) {
      let ans = this.answers[index] == "答案" ? "" : this.answers[index];
      console.log(this.answers,ans)

      this.fillanswerVisible = true;
      this.$refs.ueFill.setUEContent(ans)
      this.fillindex = index;
    },

    setfillAnswer() {
      let answ = this.$refs.ueFill.getUEContent();
      this.answers[this.fillindex] = answ;
      this.fillanswerVisible = false;
    },


    getCheckedChapters(list) {

      this.chapterTags = list
      this.tagsList = this.chapterTags

    },

    getCheckedKnows(list) {
      this.knowledgeTags = list
      this.tagsList = this.knowledgeTags
    },


    closeTag(index) {

      if(this.activeType == "chapter") {

        // this.tagsList = this.chapterTags
        this.chapterTags.splice(index,1)
        this.$refs.chapterTree.setCheckedNodes(this.chapterTags)
        // console.log(this.chapterTags,this.tagsList)
      }else {
        this.knowledgeTags.splice(index,1)
        this.$refs.knowledgeTree.setCheckedNodes(this.knowledgeTags)
        // this.tagsList = this.knowledgeTags
      }
      // console.log(this.chapterTags)
    },
    getquestionType() {
      if(!this.form.subjectCode) {return false}

      getquestionType(this.form.subjectCode)
      .then((data)=>{
        if (data.status == "200") {
          let arr = []
          data.data.forEach(item=>{
            item.value != '综合题'?arr.push(item):null
          })
          this.typeList = arr;
          if(this.isActual) {

            if(this.actualPaper.questionType == '综合题') {
              this.form.questionNum = 2
              this.typeDisable = false
              this.questionType = this.typeList[0].key;

            }else {
              this.questionType = this.typeList.filter(item=>{
                return item.value == this.actualPaper.questionType
              })[0].key            
            }
            
          }else {
             this.questionType = this.typeList[0].key;
          }
         
        } 
      })
    },

    getdifficultyType() {
      this.$http
        .get(`/api/open/common/difficultyType`)
        .then(data => {
          if (data.status == "200") {
            this.difficultyList = data.data;

            this.form.difficulty = this.difficultyList[0].key;
          }
        })
 
    },

    submitquestion() {
      this.save_prev();

      let questions = [];
      let name = this.$refs.ue0.getUEContent();
      let knowledgeIds = []
      let chapterIds = []


      this.knowledgeTags.forEach(item=>{
        knowledgeIds.push(item.id)
      })


      this.chapterTags.forEach(item=>{
        chapterIds.push(item.id)
      })

      if(!knowledgeIds.length && !chapterIds.length) {
        return this.$message({
                  message:'必须选择章节或者知识点',
                  type:'warning'
                })
      }


      for (let i = 0; i < this.form.questionNum; i++) {
        questions[i] = {}
        let selectOption = []
        let answerOption =[]
        let type = this.questionOtions[i].questionType
        if ( type == "SingleChoose" ||type == "MultipleChoose" ||type == "BoolenQuestion" ||type == "FillingQuestion") {
          // console.log(type,this.questionOtions)
          if(type == "SingleChoose" ||type == "MultipleChoose" ||type == "BoolenQuestion") {
            for (let j = 0; j < this.questionOtions[i].optionNum; j++) {
              if(this.questionOtions[i].selectOptions[j].content) {
                selectOption.push({word:this.questionOtions[i].selectOptions[j].label,content:this.questionOtions[i].selectOptions[j].content});
              }else {
                return this.$message({
                  message:'选项不可以为空',
                  type:'warning'
                })
              }
              
            }          
          }

          

          for (let j = 0; j < this.questionOtions[i].relOptionNum; j++) {
            if(this.questionOtions[i].answers) {
              answerOption.push({sort:j+1,content:this.questionOtions[i].answers[j]});
            }else {
              return this.$message({
                message:'答案不可以为空',
                type:'warning'
              })
            }
            
          }
        }


        //this.questionOtions[i].questionOptions = selectOption
        //this.questionOtions[i].fillAnswers = answerOption


        questions[i] = {
          questionType: this.questionOtions[i].questionType,
          name: this.questionOtions[i].ques,
          //answer: this.optionList[i].,
          analysis: this.questionOtions[i].analyze,
          detailedAnalysis:this.questionOtions[i].answ,
          difficulty: this.questionOtions[i].difficulty,
          knowledgeId: knowledgeIds,
          chapterId: chapterIds,
          subject: this.form.subjectCode,
          // subjectName: this.form.subjectName,
          //schoolId:'',
          grade: this.form.grade.key.substr(0,this.form.grade.key.length-2),
          //learningSection:'',
          //userId:'',
          //edition:'',
          parentId: 0,
          //openState:'',
          //applyState:'',
          questionOptions: selectOption,
          fillAnswers: answerOption,
          //questions
        }

        if(this.activeType == "chapter") {
          questions[i].knowledgeId = []
        }else {
          questions[i].chapterId = []
        }
        
      }

      // console.log(questions)


      let requestBody = {}
      if(questions.length == 1) {
        questions[0].name = name
        requestBody = questions[0]
      }else {
        requestBody = {
          name: name,
          grade: this.form.grade.key.substr(0,this.form.grade.key.length-2),
          knowledgeId: knowledgeIds,
          chapterId: chapterIds,
          subject: this.form.subjectCode,
          // subjectName: this.form.subjectName,
          parentId: 0,
          questions: questions
        }
      }
      // console.log(requestBody);


      //区分是录题还是真题上传


      if(this.isActual) {

        this.$http.post(`/api/open/paper/addTruePaperQuestion/${this.actualPaper.paperId}/${this.actualPaper.sort}`,requestBody)
        .then((data)=>{
          if(data.status == '200') {
            this.$confirm('单题上传成功，继续上传试题？', '', {
              confirmButtonText: '继续上传',
              cancelButtonText: '取消',
              type: '',
              center: true
            }).then(() => {

              
              this.$router.push(`/questions/actualPaper/maintain/${this.actualPaper.paperId}`)


            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消继续上传'
              });
            });
          }

        })

      } 
      else{

        this.$http.post(`/api/open/question/questions`,requestBody)
        .then((data)=>{
          if(data.status == '200') {



            this.$confirm('单题上传成功，继续上传试题？', '', {
              confirmButtonText: '继续上传',
              cancelButtonText: '取消',
              type: '',
              center: true
            }).then(() => {
              this.$router.replace({
                path:`/addquestion/submitQuestions`,
                query:{
                  activeType:this.activeType
                }
              },()=>{
                this.reload()
              })
              
              // this.$router.push('/addquestion/submitQuestions')


            }).catch(() => {
              this.reload()
            });
          }

        })      
      }




      
    },

  }
};
</script>
<style lang="less">
.addques-home {
  .custom-form {
    .el-form-item__label {
      flex-shrink: 0;
    }
    .el-button--mini, .el-button--mini.is-round {
      margin-left: 10px;
    }

    .el-form-item__content {
      margin-left: -10px
    }
  }

  .right-wrap {
    width: 80% !important;
  }
  .el-form-item {
    margin-bottom: 0px;
    display: flex;
    align-items: center;
  }

  .el-dialog__wrapper {
    z-index: 1002 !important;
  }

  .v-modal {
    z-index:1000 !important;
  }

  .mutirow {
    .el-form-item__label {
      flex-shrink: 0;
      top: 5px;
      position: relative;
    }

    .el-radio-button {
      
      margin-top: 10px;
    }
  }
  .el-radio-button {
    margin-right: 10px;
    
  }


  // .el-radio-button:last-child .el-radio-button__inner {
  //   border-radius: 3px;
  // }

  .set-form {
    .el-tabs__header {
      margin: 0px;
    }

    .el-tabs--card > .el-tabs__header {
      border-bottom: 0px;
    }

    .el-form-item__content {
      line-height: 20px;
    }

    .el-tabs__item {
      height: 30px;
      line-height: 30px;
      color: #606266;
    }
    .el-tabs__item:hover {
      color: #409eff;
    }
    .el-tabs__item.is-active {
      color: #409eff;
    }
  }
}
</style>
<style lang="less" scoped>
.addques-home {
  .content-class {
    font-size: 14px;
    margin-bottom: 20px;
    p {
      line-height: 30px;
    }

    .tag-class {
      margin-left: -10px;
    }

    .form-class {
      margin: 20px 0;
    }

    .active {
      background: #409eff;
      border-color: #409eff;
      color: #fff;
      outline: 0;
    }
  }
}
</style>