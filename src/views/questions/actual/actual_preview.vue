<template>
  <div class="actual-preview">
    <div class="active-wrap">
      <div>
        <div>
          <el-button type="primary" size="mini" @click="$router.go(-1)"><i class="iconfont iconfanhui" style="font-size: 12px;"></i> 返回</el-button>
          <el-button type="primary" size="mini" @click="scoredialogVisible=true">分值设定</el-button>
        </div>
      </div>
      <span class="ansbtn cursor" v-show="!isAnswer" @click="isAnswer=true">
        <i class="iconfont iconxianshi" style="position: relative;top:1px"></i> 
        显示答案
      </span>
      <span class="ansbtn cursor" v-show="isAnswer" @click="isAnswer=false">
        <i class="iconfont iconyincang"></i> 
        隐藏答案
      </span>
    </div>

    <paperPreview :paperId="paperId" :isActual="true" :isAnswer="isAnswer"></paperPreview>


  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import paperPreview from '@/components/Question/paperPreview'

export default {
  components: {
    paperPreview,

  },
  props: [],

  data() {
    return {
    	
      isAnswer: false,

    };
  },
  computed: {

    paperId() {
      return this.$route.query.paperId
    }

	},
  mounted() {

    

  },
  methods: {







  }
};
</script>
<style lang="less">

.examination {

  // .left-wrap {
  //   display: none;
  // }

  // .content-wrap {
  //   margin-left: auto !important;
  //   margin: 0 auto;
  // }
  .el-checkbox-button__inner {
    margin-top: 10px;
    margin-right: 10px;
    border-left: 1px solid #dcdfe6;
    border-radius: 3px;
  }
  .el-checkbox-button:first-child .el-checkbox-button__inner,
  .el-checkbox-button:last-child .el-checkbox-button__inner {
    border-radius: 3px;
  }

  .el-checkbox-button__inner {
    background-color: #f2f5fc;
  }
  // .el-checkbox-button.is-focus .el-checkbox-button__inner {
  //   background-color:#409EFF;
  //   color: #ffffff;
  // }
  .el-radio-button__inner {
    background-color: #dbe5fd;
    color: #84a6f7;
    border-radius: 3px;
    margin-right: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    border-left: 1px solid #dcdfe6;
  }

  .el-radio-button:first-child .el-radio-button__inner,
  .el-radio-button:last-child .el-radio-button__inner {
    border-radius: 3px;
  }




  .el-card__body {
    padding: 0px;
  }
}
</style>
<style scoped lang="less">
.actual-preview {
  

  width: 80%;
  margin: 0 auto;
  min-height: calc(100vh - 328px);
	

	.active-wrap {
		display: flex;
		justify-content: space-between;
    align-items: center;
	}

	.paper-title {
		text-align: center;

		.title {
			font-size: 1.4rem;
		}

		.tag-wrap {
			margin: 20px 0px;
			span {
				margin-right: 20px;
			}
		}
	}

	.paper-wrap {
		.paper-content-wrap {
			margin-bottom: 20px;
		}
	}


}
</style>