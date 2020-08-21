<template>
  <div class="rescoure-center">
    <left-fixed-nav :isfixTab="isfixTab">
      <div slot="left">
          <div class="search-wrap" style="text-align: center;">
            <el-radio-group v-model="activeType" size="mini" @change="getPonitTree">
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
                <el-radio-group v-model="filter.grade" size="mini" @change="getPonitTree">
                  <el-radio-button v-for="list in gradeList" :label="list" :key="list.key">{{list.value}}</el-radio-button>
                </el-radio-group>

                <!-- <p>科目：</p>
                <el-radio-group v-model="filter.subject" size="mini" @change="changeSubject">
                  <el-radio-button :label="item" :key="item.key" v-for="item in subjectsList">{{item.value}}</el-radio-button>
                </el-radio-group> -->
              </div>
            </div>
          </top-popover>


          <div class="tab-class">

	          <div class="tree-class">
	            <pointTree chooseType="chapter" :grade="filter.grade.key" :subjectCode="getuserInfo.subjectCode"  @getCheckedNodes="getCheckedChapters" ref="chapterTree" v-show="activeType=='Chapter'"></pointTree>
	            <pointTree chooseType="knowledge" :grade="filter.grade.key" :subjectCode="getuserInfo.subjectCode"  @getCheckedNodes="getCheckedKnows" ref="knowledgeTree" v-show="activeType=='Knowledge'"></pointTree>
	          </div>
    
                  

          </div>
        <!-- </div> -->
      </div>

      <div slot="right" class="rescoure-wrap">
        <div class="top-div" style="">
          <p class="top-p">共有<span class="active-color">347</span>个资源符合结果</p>
          <p class="top-p cursor"><i class="iconfont iconpaixu active-color"></i>下载量</p>
          <p class="top-p cursor"><i class="iconfont iconpaixu"></i>评分</p>
          <p class="top-p cursor"><i class="iconfont iconpaixu"></i>收藏</p>
          <p class="top-p cursor"><i class="iconfont iconpaixu"></i>最新</p>
        </div>

        <div class="rescoure-content-wrap">
          <div class="one-part">
            <div class="one-part-left">
              <p class="left-title"><i class="iconfont iconppt ppticon"></i><span class="text">2016.4.12《功率》一日公开课</span></p>
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
          </div>

          <div class="one-part">
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
export default {


  props: ['isfixTab'],
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
        page:1,
        size: 10,
      },
      total:0,
    	activeType:'Chapter',
    	list: ['高一','高二'],
      value: 3.7,
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

  },

  methods: {

  	handleClick(tab, event) {

    },

    getCheckedChapters(list) {



    },

    getCheckedKnows(list) {

    },



    getPonitTree() {},
    pointNodeClick() {},

    defaultPointNode() {},
    
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

	.rescoure-wrap {
    // padding: 0px 10px;

		// width: 70%;
		// margin: 0 auto;
    

    .top-div {
      height: 36px;
      line-height: 36px;
      border: 1px solid #e2e2e2;
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
        }

        &-right {
          width: 30%;
          border-left: 1px solid #e2e2e2;
          text-align: center;
        }
      }	
		}

		// .search-wrap {
		// 	margin: 20px 0px;

  //     td {
  //       height: 36px;
  //       line-height: 36px;
  //       border: 1px solid #e3e4e7;
  //       border-bottom: 0px;
  //     }
  //     tr {
  //       &:last-child td {
  //         border-bottom: 1px solid #e3e4e7;
  //       }
  //       td:first-child {
  //         border-bottom: 1px solid #ffffff;
  //       }
  //     }
  //     &-left {
  //       width: 120px;
  //       text-align: center;
  //       background-color: #dce0e5;
  //     }

  //     &-right {
  //       //width: 90%;
  //       background-color: #f6faff;
  //       padding-left: 20px;
  //     }

		// }
	}
}
</style>