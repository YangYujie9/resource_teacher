<template>
  <div class="resource">
  	<div class="resource-wrap">
			<div class="resource-wrap-left">
        <top-popover>
          <div slot="reference">
            <p class="top-title">
              <span>人教版：</span>
              <span>{{grade.value}}</span>
              <i class="iconfont iconshezhi settingicon"></i>
            </p>
          </div>
          <div slot="popover">
            <div>
              <p>年级：</p>
               <el-radio-group v-model="grade" size="mini">
                  <el-radio-button :label="item" :key="item.key" v-for="item in gradeList">{{item.value}}</el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </top-popover>
        <div class="tab-class">
          <el-tabs stretch v-model="activeType">
            <el-tab-pane label="按章节" name="chapter">
              <div class="tree-class" >
                <pointTree chooseType="chapter" :grade="grade.key" :subjectName="getuserInfo.subject.name"  @getCheckedNodes="getCheckedChapters" ref="chapterTree"></pointTree>
              </div>
            </el-tab-pane>
            <el-tab-pane label="按考点" name="detial">
              <div class="tree-class">
                <pointTree chooseType="knowledge" :grade="grade.key" :subjectName="subjectName"  @getCheckedNodes="getCheckedKnows" ref="knowledgeTree"></pointTree>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
			</div>

			<div class="resource-wrap-right">
        <div class="bread-div">
          <div>
            <i class="iconfont iconshouye iconclass"></i> 当前位置：首页 > 我的资源 > 上传资源
          </div>
        </div>

        <p class="title">上传资源</p>

        <div class="content-warp">
        	<p class="top-p">1、选择资源</p>
        	<div>资源类型</div>
        </div>
			</div>
		</div>
  </div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import topPopover from "@/components/Popover/topPopover";
export default {

  data() {
    return {
    	grade:'',
  		activeType:"chapter",
  		subjectName:''
    };
  },
  components: {
    topPopover,
  },


  watch: {

    gradeList(val) {

      if(val.length) {
        this.grade = val[0]
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


  },
  methods: {
  	getCheckedChapters() {},

  	getCheckedKnows() {}
  }
};
</script>

<style lang="less">
.resource {
  //width: 100%;

 //  .tree-wrap {
	//   width: 300px;
	//   min-height: 300px;
	//   padding: 20px 0px;
	//   border: 1px solid #e2e2e2;

	//   .tab-class {
	//     padding: 0 30px;
	//   }

	//   .tree-content {
	//     padding: 0 30px;
	//   }

	//   .tree-class {
	//     overflow-y: auto;
	//     overflow-x: hidden;
	//     max-height: calc(100vh - 450px);
	//   }

	//   .treeclassfixed {
	//     max-height: calc(100vh - 230px) !important;
	//   }
	// }
  height: 100%;
  background-color: #f0f3fa;
  overflow: auto;
  width: 90%;
  margin:0 auto;

  &-wrap {
  	height: 100%;
  	display: flex;

  	&-left {
			width: 300px;
			margin-right:20px;
			border:1px solid #e2e2e2;
			padding:20px;
		}

		&-right {
			width: 90%;
			

			.title {
				font-size: 18px;
				color: #3399ff;
				height: 40px;
				line-height: 40px;
			}


			.content-warp {
				border:1px solid #e2e2e2;
				padding: 0 10px;

				.top-p {
					height: 36px;
					line-height: 36px;
					border-bottom: 1px solid #e2e2e2;
				}
			}
		}
  }


  .footer {
    height: 60px;
    line-height: 60px;
    //background-color: red;
  }
}
</style>