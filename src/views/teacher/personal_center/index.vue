<template>
  <div class="personal">
      <div class="left-nav-wrap">
          <div class="nav-wrap" :class="{fixedclass:isfixTab}">
            <teacher-nav></teacher-nav>
          </div>
      </div>
      <div class="personal-wrap">
        <div class="tab-wrap" v-show="showTree && $route.fullPath.indexOf('myExampaper')==-1">
          <div>
            <el-tabs v-model="resourceType" @tab-click="handleClick"  v-if="$route.fullPath.indexOf('myWarehouse')==-1 ">
              <el-tab-pane :label="list.name" :name="list.id" v-for="list in resourceList"></el-tab-pane>
              
            </el-tabs>
          </div>
          <div>
            <el-button
              type="danger"
              size="mini"
              v-if="resourceType=='question' || $route.fullPath.indexOf('myWarehouse')>-1"
              class="upload-class"
              @click="$router.push('/questions/submitQuestions')"><i class="iconfont iconshangchuan" style="font-size: 10px;"></i>上传试题
            </el-button>
            <el-button
              type="danger"
              size="mini"
              v-else
              class="upload-class"
              @click="$router.push('/teacher/uploadResource')"><i class="iconfont iconshangchuan" style="font-size: 12px;" ></i>上传我的资源
            </el-button>
          </div>
        </div>
        <div class="personal-content-wrap">
          <div class="middle-tree-wrap" v-if="showTree && resourceType != 'actualpaper'">
            <div class="tree-wrap" :class="{fixedclass:isfixTab}">
              <top-popover v-if="isReady" :chooseType="activeType" ref="filter" @setparams="setparams">
                <div slot="reference">
                  <p class="top-title">
                    <span v-if="$refs.filter">{{$refs.filter.subject.subjectName}}</span>
                    <span v-if="$refs.filter && activeType=='chapter'">{{$refs.filter.oese.name}}</span>
                    <span v-if="$refs.filter && activeType=='chapter'" >{{$refs.filter.volume.name}}</span>
                    
                    <i class="iconfont iconshezhi settingicon"></i>
                  </p>
                </div>
                <div slot="popover">
                </div>
              </top-popover>

              <div class="tree-content">
                <el-tabs stretch v-model="activeType">
                  <el-tab-pane label="按章节" name="chapter">
                    <div class="tree-class" :class="{treeclassfixed:isfixTab}">
                      <pointTree chooseType="chapter" :volumeId="volumeId"  @getCheckedNodes="getCheckedChapters" ref="chapterTree" ></pointTree>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="按考点" name="knowledge">
                    <div class="knowwrap">
                      <p>考点列表</p>
                      <p class="p2">
                        <span :class="{active:!isMulti}" @click="isMulti=false">[单选]</span>
                        <span :class="{active:isMulti}" @click="isMulti=true">[多选]</span>
                      </p>
                    </div>
                    <div class="tree-class">
                      <pointTree chooseType="knowledge" :subjectCode="subjectCode"  @getCheckedNodes="getCheckedKnows" ref="knowledgeTree" :showCheckbox="isMulti" ></pointTree>
                    </div>
                  </el-tab-pane>
                </el-tabs>

              </div>
            </div>
          </div>
          <div class="right-content-wrap" :class="{fixedright:isfixTab}">
              <router-view :chapterIds="chapterIds" :knowledgeIds="knowledgeIds" :grade="filter.grade.key" :resourceType="resourceType" :fileTypeList="fileTypeList"></router-view>
          </div>
        </div>
      </div>  

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import teacherNav from "@/components/Nav/teacherNav";
import topPopover from "@/components/Popover/topPopover";
import { getfileType } from '@/utils/basic.service.js'
export default {
  props: {
    isfixTab:{
      type: Boolean,
      default:false
    },
    resourceTypeList: {
      type: Array,
    }
  },
  components: {
    teacherNav,
    topPopover
  },
  data() {
    return {
      activeName:'',


      filter: {
        grade: ""
      },
      isMulti: false,
      activeType: "chapter",
      chapterIds:[],
      knowledgeIds:[],
      resourceType:'',
      fileTypeList:[],
      volumeId:'',
      subjectCode:'',
    };
  },

  computed: {

    ...mapGetters([
      'gradeList',
      'getuserInfo',
      'isReady'


    ]),

    showTree() {
      return this.$route.fullPath.indexOf('profile')==-1 && this.$route.fullPath.indexOf('myResourceUpdate')==-1
    },




    resourceList() {

      let list =[]
      list.push({id:'',name:'全部'})
      this.resourceTypeList.forEach(item=>{
        list.push(item)
      })
      if(this.$route.fullPath.indexOf('myCollections')>-1) {
        list.push({
            id:'question',name:'题库'
          },{
            id:'actualpaper',name:'真题试卷'
          },
        )

      }
      return list
    }
  },


  watch: {

    gradeList(val) {
      if(val.length) {
        this.filter.grade = val[0]
      }

    },

    $route() {
      this.init()
    }
  },


  mounted() {

    this.getfileType()
    this.init()
 
    // this.subjectCode = this.getuserInfo.subjectCode

  },



  methods: {
    init() {
      
      this.gradeList.length? this.filter.grade = this.gradeList[0]: null

      if(this.showTree) {
        
        this.$nextTick(()=>{
          this.resourceType = '0'
          this.$refs.chapterTree.clearNodeCheck();
          this.$refs.knowledgeTree.clearNodeCheck();  
        })
    
      }
      
      // this.chapterIds = []
      // this.knowledgeIds = []
    },
    setparams(volumeId,subjectCode) {

      this.volumeId = volumeId

      this.subjectCode = subjectCode

      
    },
    getfileType() {
      getfileType()
      .then((data)=>{
        if(data.status == '200') {
          this.fileTypeList = data.data
        }
      })
    },
    getCheckedChapters(list) {

      let arr = [] 
      list.forEach(item=>{
        arr.push(item.id)
      })
      this.chapterIds = arr
    },

    getCheckedKnows(list) {

      let arr = [] 
      list.forEach(item=>{
        arr.push(item.id)
      })
      this.knowledgeIds = arr
    },

    handleClick(tab) {
      // this.resourceType = tab.name
      // console.log(this.resourceType)
    }
  }
};
</script>
<style lang="less">
.personal {


  .el-radio-button__inner {
    border: 0px;
    background-color: transparent;
    border-radius: 3px;
    font-size: 14px;
    color: #666;
  }
  .el-input__inner {
    background: transparent;
  }
  .el-range-editor .el-range-input {
    background: transparent;
  }


  .el-date-editor .el-range-separator {
    width: 8%;
  }
  .el-radio-button:first-child .el-radio-button__inner {
    border-left: 0px;
    border-radius: 3px;
  }
  .el-radio-button:last-child .el-radio-button__inner {
    border-radius: 3px;
  }

  .el-card {
    background-color: #f0f3fa;
    border-color: #e7eaf1;
  }
  .el-card__body {
    padding: 0px;
  }

  .el-tabs__header {
    margin: 0 0 5px;
  }
  .el-button+.el-button {
    margin-left: 20px;
  }
  .wrap-content {
    .el-button {
      font-size: 13px;
    }
  }
  .pagination {
    margin-top: 30px;
    text-align: right;
  }

  .top-search {
    font-size: 13px;
    border: 1px solid #e2e2e2;
    line-height: 40px;
    padding: 6px 20px;
    // background-color: #f3f3f3;
    .el-form--inline .el-form-item {
      margin-right: 20px;
    }
    .el-form-item {
      margin-bottom: 0px;
    }


    .search-class {
      width: 140px;
      margin-left: 5px;
    }
    
  }
    .top-total {
      height: 36px;
      line-height: 36px;
      border: 1px solid #e2e2e2;
      margin-top: 10px;
      display: flex;
      background-color: #e8ecf0;
      color: #9ea1a5;

      .top-p {
        border-right: 1px solid #e2e2e2;
        padding: 0 10px;

        .activecolor {
          color: #409EFF;
        }
      }
    }

  
}
</style>
<style scoped lang="less">
.personal {
  width: 80%;
  margin:0 auto;
  display: flex;


  .fixedclass {
    position: fixed;
    top: 60px;
  }
  .left-nav-wrap {
    min-width: 200px;
    margin-right: 20px;
    .nav-wrap {
      
    }
  }


  .personal-wrap {
    width: 90%;

    .tab-wrap {
      height: 44px;
      position:relative;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;


      .upload-class {
        // position: absolute;
        // right: 0px;
        // top:4px;
      }
    }

    

    .personal-content-wrap {
      display: flex;

      .middle-tree-wrap {
        min-width: 300px;
        flex-shrink: 0;
        margin-right: 20px;



        .tree-wrap {
          width: 300px;
          // max-width: 350px;
          min-height: 300px;
          padding: 20px 0px;
          border: 1px solid #e2e2e2;
          z-index:1;

          .tab-class {
            padding: 0 30px;
          }

          .tree-content {
            padding: 0 20px;
          }

          .tree-class {
            overflow: auto;
            // overflow-x: hidden;
            max-height: calc(100vh - 520px);
          }

          .treeclassfixed {
            max-height: calc(100vh - 280px) !important;
          }


          .knowwrap {
            height: 36px;
            line-height: 36px;
            color: #3399ff;
            font-weight: 500;
            display: flex;
            font-size: 14px;
            justify-content: space-between;
            padding-left: 10px;

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
        }
      }

      .right-content-wrap {
        width: 100%;
        // background:red;
        // min-height: calc(100vh - 328px); 
      }

      .fixedright {
        min-height: calc(100vh - 50px);
      }
    }
    



  }

}
</style>