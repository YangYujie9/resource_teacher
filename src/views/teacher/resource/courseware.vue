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

      <div slot="right">

      </div>
    </left-fixed-nav>  </div>
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
    	activeType:'Chapter',
    	list: ['高一','高二']

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

    subjectName() {
      return this.getuserInfo.subject.name
    }

  },
  mounted() {


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
		width: 70%;
		margin: 0 auto;
		// height: 300px;
		// background-color: red;
		.rescoure-content-wrap {
			height: 100%;
			.rescoure-content {
				display: flex;

				&-left {
					width: 300px;
					flex-shrink: 0;
					// height: 300px;
					// background-color:red;

	        .search-wrap {
	          text-align: center;
	        }
				}

				&-right {
					width: 90%;
					background-color:blue;
					// height: 100px;
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