<template>
  <div class="rescoure-center">
    <div class="rescoure-center-top">
      <div class="bread-div" style="margin-top: -20px">
        <span style=""><i class="iconfont iconshouye iconclass"></i>当前位置：首页 > {{breadName}}</span>
      </div>
    </div>
    

    <router-view :isfixTab="isfixTab"></router-view>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import topPopover from "@/components/Popover/topPopover";
import leftFixedNav from "@/components/Nav/leftFixedNav";
export default {


  props: {
  	isfixTab:{
  		type: Boolean,
  		default:false
  	},
  },
  components: {
    leftFixedNav,
    topPopover,
  },
  data() {
    return {
      breadName:'课件'
    };
  },

  watch: {


  },
  computed: {

    ...mapGetters([
      'gradeList',
      'getuserInfo',

    ]),

 
  },
  mounted() {

  },

  methods: {


    
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
      margin-top: 20px;
      display: flex;
      background-color: #e8ecf0;
      color: #9ea1a5;

      .top-p {
        border-right: 1px solid #e2e2e2;
        padding: 0 10px;

        .active-color {
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
</style><template>
  <div class="rescoure-center">
    <div class="rescoure-center-top">
      <div class="bread-div" style="margin-top: -20px">
        <span style=""><i class="iconfont iconshouye iconclass"></i>当前位置：首页 > {{breadName}}</span>
      </div>
    </div>
    <left-fixed-nav :isfixTab="isfixTab">
      <div slot="left">
          <div class="search-wrap" style="text-align: center;">
            <el-radio-group v-model="activeType" size="mini">
              <el-radio-button label="Chapter">章节目录</el-radio-button>
              <el-radio-button label="Knowledge">知识点</el-radio-button>
            </el-radio-group>
          </div>
          <top-popover>
            <div slot="reference" class="search-class">
              <p class="top-title">
                  <span>人教版：</span>
                  <span v-if="filter.grade.value">{{filter.grade.value}}</span>
                  <i class="iconfont iconshezhi settingicon"></i>
                </p>
            </div>
            <div slot="popover">
              <div>
        
                <p>年级：</p>
                <el-radio-group v-model="filter.grade" size="mini">
                  <el-radio-button v-for="list in gradeList" :label="list" :key="list.key">{{list.value}}</el-radio-button>
                </el-radio-group>

                <!-- <p>科目：</p>
                <el-radio-group v-model="filter.subject" size="mini" @change="changeSubject">
                  <el-radio-button :label="item" :key="item.key" v-for="item in subjectsList">{{item.value}}</el-radio-button>
                </el-radio-group> -->
              </div>
            </div>
          </top-popover>


          <div class="tree-content">

            <div class="tree-class">
              <pointTree chooseType="chapter" :grade="filter.grade.key" :subjectCode="getuserInfo.subjectCode"  @getCheckedNodes="getCheckedChapters" ref="chapterTree" v-show="activeType=='Chapter'"></pointTree>
              <pointTree chooseType="knowledge" :grade="filter.grade.key" :subjectCode="getuserInfo.subjectCode"  @getCheckedNodes="getCheckedKnows" ref="knowledgeTree" v-show="activeType=='Knowledge'"></pointTree>
            </div>
    
                  

          </div>
        <!-- </div> -->
      </div>

      <div slot="right" class="rescoure-wrap">
        <div class="search-div el-radio-costom">
          <ul>
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

          </ul>
        </div>
        <div class="top-div" style="">
          <p class="top-p">共有<span class="active-color">{{total}}</span>个资源符合结果</p>
          <p class="top-p cursor"><i class="iconfont iconpaixu active-color"></i>下载量</p>
          <p class="top-p cursor"><i class="iconfont iconpaixu"></i>评分</p>
          <p class="top-p cursor"><i class="iconfont iconpaixu"></i>收藏</p>
          <p class="top-p cursor"><i class="iconfont iconpaixu"></i>最新</p>
        </div>

        <div class="rescoure-content-wrap">
          <div class="one-part" v-for="list in tableData">
            <div class="one-part-left">
              <p class="left-title"><i class="iconfont" :class="setClass(list.fileType)"></i><span class="text">{{list.name}}</span></p>
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
					

         <!--  <div class="one-part">
            <div class="one-part-left">
              <p class="left-title"><i class="iconfont iconppt wordicon"></i><span class="text">2016.4.12《功率》一日公开课</span></p>
              <p>
                <span>贡献者：宋海峰</span>
                <span class="left-tag">2020-07-19</span>
                <span class="left-tag">下载量：4</span>
              </p>
            </div>
            <div class="one-part-right">
              <p>12人已读</p>
              <p>
                <el-rate
                  v-model="value"
                  disabled
                  show-score
                  text-color="#ff9900"
                  disabled-void-color="#C0C4CC"
                  score-template="{value}">
                </el-rate>
              </p>
            </div>
          </div> -->
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
export default {


  props: {
  	isfixTab:{
  		type: Boolean,
  		default:false
  	},
  	breadName: {
  		type: String,
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
        grade:'',
        year:'',
        page:1,
        size: 20,
      },
      total:0,
      activeType:'Chapter',
      list: ['高一','高二'],
      value: 3.7,
      tableData:[],
    };
  },

  watch: {
    gradeList(val) {

      if(val.length) {
        this.filter.grade = val[0]
      }
      

    },


  },
  computed: {

    ...mapGetters([
      'gradeList',
      'getuserInfo',

    ]),

 
  },
  mounted() {
    this.gradeList.length? this.filter.grade = this.gradeList[0]: null
    this.getresourceList()
  },

  methods: {

    handleClick(tab, event) {

    },

    getCheckedChapters(list) {


    },

    getCheckedKnows(list) {

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
    resetPage() {
    	this.search.page = 1
    	this.getresourceList()
    },
    getresourceList() {
    	this.$http.post(`/api/open/resources/1/resourceList`,{
    // 		fileType:'',
				// fileName:'',
				// resourceType:'',
				// oeseType:'',
				// sort:'',
				// startTime:'',
				// endTime:'',
				// filterPaper:'',
				// chapterIds:'',
				// knowledgeIds:'',
				page: this.search.page - 1,
				size: this.search.size
    	})
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
		      	iconpdf:true,
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
      margin-top: 20px;
      display: flex;
      background-color: #e8ecf0;
      color: #9ea1a5;

      .top-p {
        border-right: 1px solid #e2e2e2;
        padding: 0 10px;

        .active-color {
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