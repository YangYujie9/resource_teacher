<template>
  <div class="rescoure-center">
    <div class="rescoure-center-top">

    </div>
    <left-fixed-nav :isfixTab="isfixTab">
      <div slot="left">
          <div class="search-wrap" style="text-align: center;">
            <el-radio-group v-model="activeType" size="mini" @click="handleClick">
              <el-radio-button label="chapter">章节目录</el-radio-button>
              <el-radio-button label="knowledge">知识点</el-radio-button>
            </el-radio-group>
          </div>
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

            <div class="tree-class">
              <pointTree chooseType="chapter" :volumeId="volumeId"  @getCheckedNodes="getCheckedChapters" ref="chapterTree" v-show="activeType=='chapter'"></pointTree>
              <pointTree chooseType="knowledge" :subjectCode="subjectCode"  @getCheckedNodes="getCheckedKnows" ref="knowledgeTree" v-show="activeType=='knowledge'"></pointTree>
            </div>
    
                  

          </div>
        <!-- </div> -->
      </div>

      <div slot="right" class="rescoure-wrap">
        <div class="bread-div">
          <span style=""><i class="iconfont iconshouye iconclass"></i>当前位置：首页 > {{resourceType}}</span>
        </div>
        <div class="search-div el-radio-costom">

          <el-form :inline="true" :model="search" class="demo-form-inline" size="mini">
            <el-form-item label="文件类型">
              <el-select v-model="search.fileType" class="search-class" size="mini" placeholder="文件类型" clearable @change="resetPage">
                <el-option :label="list.value" :value="list.key" :key="list.key" v-for="list in fileTypeList"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="文件名称">
              <el-input v-model="search.fileName" placeholder="文件名称"></el-input>
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" @click="resetPage">查询</el-button>
            </el-form-item>
          </el-form>
          <!-- <ul>
            <li>
              <p>年级</p>
              <div class="div2">
                <el-radio-group v-model="search.grade" size="mini" @change="resetPage">
                  <el-radio-button :label="list" :key="list" v-for="list in list"></el-radio-button>
                </el-radio-group>
              </div>
            </li>
            <li>
              <p>年份</p>
              <div class="div2">
                <el-radio-group v-model="search.year" size="mini" @change="resetPage">
                  <el-radio-button :label="list" :key="list" v-for="list in list"></el-radio-button>
                </el-radio-group>
              </div>
            </li>

          </ul> -->
        </div>
        <div class="top-div" style="">
          <p class="top-p">共有<span class="activecolor">{{total}}</span>个资源符合结果</p>
          <!-- <p class="top-p cursor" @click="sortResource('download')"><i class="iconfont iconpaixu" :class="{activecolor:downloadSort}"></i>下载量</p>
          <p class="top-p cursor" @click="sortResource('score')"><i class="iconfont iconpaixu" :class="{activecolor:scoreSort}"></i>评分</p>
          <p class="top-p cursor" @click="sortResource('collect')"><i class="iconfont iconpaixu" :class="{activecolor:collectSort}"></i>收藏</p>
          <p class="top-p cursor" @click="sortResource('recent')"><i class="iconfont iconpaixu" :class="{activecolor:recentSort}"></i>最新</p> -->
        </div>

        <div class="rescoure-content-wrap">
          <div class="one-part" v-for="list in tableData">
            <div class="one-part-left">
              <p class="left-title" @click="resourcePreview(list.resourceId)"><i class="iconfont" :class="setClass(list.fileType)"></i><span class="text">{{list.name}}</span></p>
              <p>
                <span>贡献者：{{list.userName}}</span>
                <span class="left-tag">{{list.createTime}}</span>
                <span class="left-tag">下载量：{{list.download}}</span>
              </p>
            </div>
            <div class="one-part-right">
              <p>{{list.preview}}人已读</p>
              <p>
                <el-rate
                  v-model="list.score"
                  disabled
                  show-score
                  text-color="#ff9900"
                  disabled-void-color="#C0C4CC"
                  score-template="{value}">
                </el-rate>
              </p>
            </div>
          </div>
					

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
      </div>
    </left-fixed-nav>  
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import topPopover from "@/components/Popover/topPopover";
import leftFixedNav from "@/components/Nav/leftFixedNav";
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
    leftFixedNav,
    topPopover,
  },
  data() {
    return {
      filter: {
        grade:''
      },
      search: {
        fileName:'',
        fileType: '',
        grade:'',
        year:'',
        page:1,
        size: 20,
      },
      total:0,
      activeType:'chapter',
      chapterLists:[],
      knowledgeLists:[],
      tagList:[],
      downloadSort:false,
      scoreSort: false,
      collectSort: false,
      recentSort: true,
      value: 0,
      tableData:[],
      fileTypeList:[],
      volumeId:'',
      subjectCode:'',
    };
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
  computed: {

    ...mapGetters([
      'gradeList',
      'getuserInfo',
      'isReady'

    ]),

    resourceType() {
      // console.log(this.$route.params)
      // console.log(this.resourceTypeList)
      return this.resourceTypeList.filter(item=>{
        // console.log(item.id,this.$route.params.resourceType)
        return item.key == this.$route.params.resourceType
      })[0].name
      
    },




 
  },
  mounted() {
    this.init()
    this.getfileType()
  },

  methods: {

    init() {
      this.gradeList.length? this.filter.grade = this.gradeList[0]: null
      this.getresourceList()
    },
    handleClick() {
      // if(this.activeType == 'Chapter') {
      //   this.tagList = this.chapterIds
      // }else {
      //   this.tagList = this.knowledgeIds
      // }
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
      this.chapterLists = list
      this.resetPage()

    },

    getCheckedKnows(list) {
      this.knowledgeLists = list
      this.resetPage()
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
      // this.getTableData()
    // },
    },
    setparams(volumeId,subjectCode) {

      this.volumeId = volumeId

      this.subjectCode = subjectCode

      
    },
    resourcePreview(resourceId) {

      this.$router.push({path: '/teacher/resourceRreview', query: {id:resourceId}})
    },

    sortResource(flag) {
      switch (flag) {
        case 'download':
          this.downloadSort = !this.downloadSort
          break;
        case 'score':
          this.scoreSort = !this.scoreSort
          break;
        case 'collect':
          this.collectSort = !this.collectSort
          break;
        case 'recent':
          this.recentSort = !this.recentSort
          break;
      }

      this.resetPage()

    },
    resetPage() {
    	this.search.page = 1
    	this.getresourceList()
    },
    getresourceList() {

      let chapterIds = []

      this.chapterLists.forEach(item=>{
        chapterIds.push(item.id)
      })


      let knowledgeIds = []
      this.knowledgeLists.forEach(item=>{
        knowledgeIds.push(item.id)
      })

      let params = {
        fileType: this.search.fileType,
        fileName: this.search.fileName,
        resourceType: this.$route.params.resourceType,
        // oeseType:'',
        grade: this.filter.grade.key,
        // startTime:'',
        // endTime:'',
        // filterPaper: this.$route.params.resourceType=='ExaminationPaper'?1:'',

        page: this.search.page - 1,
        size: this.search.size
      }

      // if(this.activeType == 'Chapter') {
      //   params.knowledgeIds = []
      // }else {
      //   params.chapterIds = []
      // }



    	this.$http.post(`/api/open/resources/1/resourceList`, {
        chapterIds: chapterIds,
        knowledgeIds:knowledgeIds},params)

    	.then((data)=>{
    		if(data.status == '200') {
    			this.tableData = data.data.content
    			this.total = data.data.totalElements
    		}
    	})
    },

    setClass(fileType) {
    	let obj = {};
     //  obj[fileType[item]] = true;
      switch(fileType) {
		    case 'PDF':
		      obj = {
		      	iconPDF:true,
		      	pdficon: true
		      }
		      break;
		    case 'PPT':
	        obj = {
		      	iconppt:true,
		      	ppticon: true
		      }
	        break;
	      case 'WORD':
	        obj = {
		      	iconword:true,
		      	wordicon: true
		      }
	        break;
		    default:
	        obj = {
		      	iconword:true,
		      	wordicon: true
		      }
			} 
      return obj;
    }
    
  }
};
</script>
<style lang="less">
.rescoure-center {
  .content-wrap {
    width: 68% !important;
    margin:0 auto !important;
  }
}

</style>
<style scoped lang="less">
.rescoure-center {
  width: 100%;


  &-top {
    width: 68%;
    margin: 0 auto;
    min-width: 1250px;
    height: 100%;
    // display: flex;
  }
  .rescoure-wrap {
  	padding-bottom: 20px;
    // padding: 0px 10px;

    // width: 70%;
    // margin: 0 auto;
    

    .top-div {
      height: 36px;
      line-height: 36px;
      border: 1px solid #e2e2e2;
      // margin-top: 20px;
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
    .rescoure-content-wrap {
      

      .one-part {
        margin-top: 20px;
        border: 1px solid #e2e2e2;
        padding: 20px 10px;
        display: flex;
        color: #9ea1a5;
        line-height: 34px;

        &-left {
          width: 70%;

          .left-title {
            
            font-size: 1.2rem;
            font-weight: 600;
            color: #333333;
            cursor: pointer;

            .text {
              margin-left: 3px;
            }
          }

          .left-tag {
            margin-left: 30px;
          }



          .ppticon {
            color: #d24625;
            font-size: 1.3rem;
          }

          .wordicon {
            color: #2a5698;
            font-size: 1.3rem;
          }

          .excelicon {
            color: #0f7b10;
            font-size: 1.3rem;
          }

          .pdficon {
						color: #dc2e1b;
						font-size: 1.3rem;
          }
        }

        &-right {
          width: 30%;
          border-left: 1px solid #e2e2e2;
          text-align: center;
        }
      } 
    }


  }
}
</style>