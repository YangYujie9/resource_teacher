<template>
  <div class="actual-preview">


    <paperPreview :paperId="paperId" :isActual="true"></paperPreview>


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
    	paperId:'',

    };
  },
  computed: {



	},
  mounted() {

    this.paperId = this.$route.query.paperId

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


  .pt1,.pt2,.middle {
    p,div,span {
      background-color:transparent !important;
      font-size: 1rem;
      font-family: "JyeMath", "JyeMathLetters", "Times New Roman", "微软雅黑",
          Arial, "宋体" !important;
    }

    img {
      vertical-align: middle;
      height: 30px;
    }
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