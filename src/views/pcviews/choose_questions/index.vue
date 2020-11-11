<template>
  <div class="pc-home" v-if="isReady">
  	<div class="pc-home-wrap" @click="hideOption">
	  	<div class="pc-home-wrap-left">
 	  		<!--<div>

			    <div class="popver-select" @click.stop="showOption=true">{{gradeName}}
			    	<i class="el-icon-arrow-down popver-select-suffix"></i>
			    	<div class="popver-select-option" v-show="showOption" ref="popver_option">
			    		<div style="text-align: center;margin-bottom: 5px;">选择年级</div>
			    		<div>
				        <el-radio-group v-model="search.gradeId" size="mini" @change="getVolumeList">
						      <el-radio-button :label="list.key" :key="list.key" v-for="list in gradeList">{{list.value}}</el-radio-button>

						    </el-radio-group>
			    		</div>
			    	</div>
			    </div>


	  		</div>
	  		<div class="search-p">
	  		  <el-select v-model="search.oeseId" placeholder="请选择" size="small" style="width: 49%;">
				    <el-option
				    	v-for="list in oeseList"
				      :key="list.id"
				      :label="list.name"
				      :value="list.id">
				    </el-option>

					</el-select>
					<el-select v-model="search.volumeId" placeholder="请选择" size="small" style="width: 49%;margin-left: 2%;">
				    <el-option
				    	v-for="list in volumeList"
				      :key="list.id"
				      :label="list.name"
				      :value="list.id">
				    </el-option>

					</el-select>
	  		</div> -->

	  		<div class="search-p">
	        <el-radio-group v-model="activeType" size="small">
			      <el-radio-button label="chapter">按章节</el-radio-button>
			      <el-radio-button label="knowledge">按知识点</el-radio-button>

			    </el-radio-group>
		    </div>

		    <div class="popver-wrap" v-show="activeType=='chapter'">
		    	<div class="popver-slot" @click.stop="popverShow=true">
		    		<span>{{getuserInfo.subjectName}}/</span>
		    		<span v-if="search.grade">{{search.grade.value}}/</span>
		    		<span v-if="search.oese">{{search.oese.name}}/</span>
		    		<span v-if="search.volume">{{search.volume.name}}</span>
		    		<i class="popver-slot-icon el-icon-arrow-right"></i>
		    	</div>
		    	<div class="popver-collapse" v-show="popverShow" ref="popver_option">
	          <!-- <div style="padding-bottom: 8px;"
	            <p>学科：</p>
	             <el-radio-group v-model="subject" size="mini" :disabled="subjectEditable" @change="getOeseList">
	                <el-radio-button :label="item" :key="item.code" v-for="item in subjectList">{{item.subjectName}}</el-radio-button>
	            </el-radio-group>
	          </div> -->
	          <div style="padding-bottom: 8px;">
	            <p>年级：</p>
	             <el-radio-group v-model="search.grade" size="mini" @change="getVolumeList">
	              <el-radio-button :label="list" :key="list.key" v-for="list in gradeList">{{list.value}}</el-radio-button>
	            </el-radio-group>
	          </div>
	          <div class="one-part">
	            <p>教材版本：</p>
	             <el-radio-group v-model="search.oese" size="mini" >
	                <el-radio-button :label="item" :key="item.id" v-for="item in oeseList">{{item.name}}</el-radio-button>
	            </el-radio-group>
	          </div>
	          <div class="one-part">
	            <p>册别：</p>
	             <el-radio-group v-model="search.volume" size="mini">
	                <el-radio-button :label="item" :key="item.id" v-for="item in volumeList">{{item.name}}</el-radio-button>
	            </el-radio-group>
	          </div>
		    	</div>
		    </div>

		    <div class="tree-wrap">
		    	<div>
		    		<pointTree chooseType="chapter" :volumeId="search.volume.id"  @getCheckedNodes="getCheckedChapters" ref="chapterTree"  v-show="activeType == 'chapter'"></pointTree>
		    	</div>
		    	<div>
		    		<pointTree chooseType="knowledge" :subjectCode="search.subjectCode"  @getCheckedNodes="getCheckedKnows" ref="chapterTree"  v-show="activeType == 'knowledge'"></pointTree>
		    		<!-- <pointTree chooseType="knowledge" :subjectCode="getuserInfo.subjectCode"  @getCheckedNodes="getCheckedKnows" ref="knowledgeTree" v-show="activeType == 'knowledge'"></pointTree> -->
		    	</div>
		    </div>
	  	</div>
	  	<div class="pc-home-wrap-right">
	  		<router-view :chapterList="chapterList" :knowledgeList="knowledgeList" :activeType="activeType" :volumeId="search.volume.id"></router-view>

	  	</div>
  	</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {

  data() {
    return {
    	search: {
    		gradeId:'',
    		oeseId: '',
    		volumeId:'',
    		subjectCode:'',
    		grade:'',
    		oese:'',
    		volume:''
    	},
    	oeseList:[],
    	volumeList:[],
    	activeType:'chapter',
    	showOption: false,
    	chapterList:[],
    	knowledgeList:[],
    	popverShow: false,
    };
  },
  computed: {

    ...mapGetters([
      'gradeList',
      'isReady',
      'getuserInfo'

    ]),

    gradeName() {
    	let name = this.gradeList.filter(item=>{
    		return item.key == this.search.gradeId
    	})

    	if(name && name.length) {
    		return name[0].value
    	}else {
    		return ''
    	}
    },




  },
  watch: {
  	gradeList(val) {


	  	if(val.length) {

	  		this.search.grade = val[0]

	  		this.search.subjectCode = this.getuserInfo.subjectCode

	  		this.getVolumeList()
	  	}
  	}

  },

  mounted() {


  	if(this.gradeList.length) {

  		this.search.grade = this.gradeList[0]

  		this.search.subjectCode = this.getuserInfo.subjectCode
  		this.getVolumeList()
  	}
  	

  },
  methods: {
  	hideOption(event) {

  		let sp = this.$refs.popver_option

			if(sp && !sp.contains(event.target)){            //这句是说如果我们点击到了id为myPanel以外的区域
				this.popverShow = false;

			}
  	},

  	getVolumeList() {

  		this.oeseList = []
  		this.volumeList = []

  		this.$http.get(`/api/open/common/books/${this.getuserInfo.school.id}?grade=${this.search.grade.key}&subjectCode=${this.search.subjectCode}`)

  		.then(data=>{
  			if(data.status == '200') {

  				this.showOption = false

  				if(data.data.oese && data.data.oese.id) {
	  				this.oeseList.push(data.data.oese)
	  				this.search.oese = this.oeseList[0]
  				}else {
  					this.search.oese = ''
  				}

  				if(data.data.volumes && data.data.volumes.length) {
  					this.volumeList = data.data.volumes
  					this.search.volume = this.volumeList[0]
  				}else {
  					this.search.volume = ''
  				}
  				
  			}
  		})
  	},
  	getCheckedChapters(list) {
  		this.chapterList = list
  	},
  	getCheckedKnows(list) {
  		this.knowledgeList = list
  	},


  }
};
</script>
<style lang="less">
.pc-home {

	// .el-input--small .el-input__inner {
 //  	border-radius: 30px;
	// }
	// .el-radio-button:first-child .el-radio-button__inner {
 //    border-radius: 30px 0 0 30px;
	// }
	// .el-radio-button:last-child .el-radio-button__inner {
	// 	border-radius: 0 30px 30px 0;
	// }

	.search-p {

		.el-radio-button {
			width: 50%;
		}
		.el-radio-group,.el-radio-button--small .el-radio-button__inner {
			width: 100%;
		}
	}


	.popver-select-option {
		.el-radio-group {
	    display: flex;
	    flex-wrap: wrap;
	    justify-content: space-around;
		}
		.el-radio-button {
			width: 33%;
		}
		.el-radio-button--mini .el-radio-button__inner {
			border: 1px solid #DCDFE6;
    	border-radius: 30px;
    	margin-bottom: 7px;
		}

		.el-radio-button__orig-radio:checked+.el-radio-button__inner {
	    border-color: #409EFF;
		}
	}
	.popver-collapse {
    .el-radio-button__inner {
      border: 0px;
      background-color: transparent;
      border-radius: 3px;
      font-size: 14px;
      color: #666;
    }
    .el-input__inner {
      background: #f0f3fa;
    }

    .el-radio-button:first-child .el-radio-button__inner,.el-radio-button:last-child .el-radio-button__inner {
      border-left: 0px;
      border-radius: 3px;
    }

    .el-radio-button__orig-radio:disabled+.el-radio-button__inner {
      background-color: transparent;
    }

    .el-radio-button__orig-radio:disabled:checked+.el-radio-button__inner {
      background-color: #409eff;
      color: #ffffff;
    }


    .el-radio-button__orig-radio:checked+.el-radio-button__inner {
			color: #FFF;
	    background-color: #409EFF;
	    border-color: #409EFF;
	    box-shadow: -1px 0 0 0 #409EFF;
    }
	}

}

</style>
<style lang="less" scoped>
.pc-home {

	height: 100%;
	background-color: rgb(238 240 244);

	&-wrap {

		display: flex;
		height: 100%;

		&-left {
			// width: 20%;
			width: 340px;
			flex-shrink: 0;
			border-right: 1px solid rgb(226 228 230);
			padding: 20px;

			.search-p {
				margin-top: 10px;
			}

			.tree-wrap {
				margin-top: 10px;
				height: calc(100vh - 140px);
				overflow: auto;
			}


			.popver-wrap {
				margin-top: 10px;
				position: relative;

				.popver-slot {
					height: 40px;
					line-height: 40px;
					color: #409EFF;
					font-size: 16px;
					font-weight: 400;
					padding-right: 30px;
					position: relative;
			    border-bottom: 2px solid #0a6ace;
			    cursor: pointer;
			    white-space: nowrap;
			    overflow: hidden;
			    text-overflow: ellipsis;

					.popver-slot-icon {
						position: absolute;
						right: 10px;
						top: 11px;
						font-weight: 600;
					}
				}

				.popver-collapse {
					position: absolute;
					left: 325px;
					top: 0px;
					z-index: 1;
					width: 600px;
					height: 300px;
					background-color: #ffffff;
					border: 1px solid #cac4c4;
					padding: 20px;
					line-height: 36px;

		      .one-part {
		        border-top: 1px dashed #0e7ff5;
		        padding-bottom: 8px;
		      }
				}

			}


			.popver-select {
				height: 32px;
				line-height: 32px;
		    background-color: #FFF;
		    background-image: none;
		    border-radius: 4px;
		    border: 1px solid #DCDFE6;
		    box-sizing: border-box;
		    color: #606266;
		    display: inline-block;
		    font-size: inherit;
		    outline: 0;
		    padding-left: 15px;
		    padding-right: 30px;
		    // transition: border-color .2s cubic-bezier(.645,.045,.355,1);
		    width: 100%;
		    position: relative;
		    cursor: pointer;


		    &:hover {
		    	.popver-select-option {
		    		// display: block;
		    	}
		    }


		    &-suffix {

		    	position: absolute;
		    	right: 10px;
		    	top: 7px;
		    	color: #C0C4CC;
		    }

		    &-option {
		    	// display: none;
		    	position: absolute;
		    	z-index: 1;
		    	background-color: #ffffff;
		    	width: 100%;
		    	left: 0px;
		    	top: 36px;
		    	padding: 10px;
		    	box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
		    	border-radius: 3px;
		    }
			}
		}

		&-right {
			width: 100%;

			&-top {
				height: 50px;
				border-bottom: 1px solid rgb(226 228 230);
			}

			&-bottom {
				height: calc(100vh - 50px);
				background-color: #ffffff;
			}



		}
	}


}
</style>