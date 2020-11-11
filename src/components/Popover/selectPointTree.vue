<template>
  <div class="select-point-tree">
<!-- 	  <el-tabs stretch v-model="activeType" @tab-click="handleClick">
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
	    <el-tab-pane label="按章节" name="chapter">
	      <div class="tree-class" :class="{treeclassfixed:isfixTab}">
	        <pointTree chooseType="chapter" :volumeId="volumeId"  :subjectCode="subjectCode" @getCheckedNodes="getCheckedChapters" ref="chapterTree"></pointTree>
	      </div>
	    </el-tab-pane>
	    <el-tab-pane label="按考点" name="knowledge">
	      <div class="tree-class">
	        <pointTree chooseType="knowledge" :subjectCode="subjectCode"  @getCheckedNodes="getCheckedKnows" ref="knowledgeTree"></pointTree>
	      </div>
	    </el-tab-pane>
	  </el-tabs> -->



    <div class="search-wrap" style="">
      <el-radio-group v-model="activeType" size="mini" v-if="!treeType">
        <el-radio-button label="chapter">章节目录</el-radio-button>
        <el-radio-button label="knowledge">知识点</el-radio-button>
      </el-radio-group>
    </div>
    <top-popover v-if="isReady" :chooseType="activeType" ref="filter" @setparams="setparams">
      <div slot="reference">
        <p class="top-title">
          <span v-if="$refs.filter">{{$refs.filter.subject.subjectName}}</span>
          <span v-if="$refs.filter && $refs.filter.grade && activeType=='chapter'">/{{$refs.filter.grade.value}}</span>
          <span v-if="$refs.filter && $refs.filter.oese && activeType=='chapter'">/{{$refs.filter.oese.name}}</span>
          <span v-if="$refs.filter && $refs.filter.volume && activeType=='chapter'">/{{$refs.filter.volume.name}}</span>
          
          <i class="iconfont iconshezhi settingicon"></i>
        </p>
      </div>
      <div slot="popover">
      </div>
    </top-popover>


    <div class="tree-content">

      <div class="tree-class":class="{treeclassfixed:isfixTab}">
      	<div v-if="treeType!='knowledge'" >
        	<pointTree chooseType="chapter" :volumeId="volumeId" @selectnode="defaultChapterCheck" @getCheckedNodes="getCheckedChapters" ref="chapterTree" v-show="activeType=='chapter'"></pointTree>
        </div>
        <div v-if="treeType!='chapter'">
	        <pointTree chooseType="knowledge" :subjectCode="subjectCode" @selectnode="defaultKnowsCheck" @getCheckedNodes="getCheckedKnows" ref="knowledgeTree" v-show="activeType=='knowledge'"></pointTree>
	      </div>
      </div>
            

    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import topPopover from "@/components/Popover/topPopover";
export default {
  props: {
  	isfixTab: {
  		type:Boolean,
  		default: false
  	},
  	treeType: {
  		type: String,
  	}
  },
  components: {
  	topPopover
  },
  data() {
    return {
    	activeType:'',
    	volumeId:'',
    	subjectCode:'',
    	chapterLists:[],
    	knowledgeLists:[],
      rootChapterId: '',
      rootKnowledgeId:'',
      // rootChapterList: [],
      // rootKnowledgeList: [],
    };
  },
  watch: {

  	chapterIds(value) {


  		this.$emit('getPointIds',value,this.knowledgeIds,this.subjectCode,this.volumeId)

      // if(this.activeType == 'chapter') {
      //   this.$emit('getPointList',this.chapterLists,[],this.subjectCode,this.volumeId)
      // }else {
      //   this.$emit('getPointList',[],this.knowledgeLists,this.subjectCode,this.volumeId)
      // }
  		// this.$emit('getPointList',this.chapterLists,this.knowledgeLists,this.subjectCode,this.volumeId)

  	},


  	knowledgeIds(value) {

  		this.$emit('getPointIds',this.chapterIds,value,this.subjectCode,this.volumeId)


      // if(this.activeType == 'chapter') {
      //   this.$emit('getPointList',this.chapterLists,[],this.subjectCode,this.volumeId)
      // }else {
      //   this.$emit('getPointList',[],this.knowledgeLists,this.subjectCode,this.volumeId)
      // }
  		// this.$emit('getPointList',this.chapterLists,this.knowledgeLists,this.subjectCode,this.volumeId)

  	},

    subjectCode(value) {
      this.$emit('getPointIds',this.chapterIds,this.knowledgeIds,value,this.volumeId)
    }



  },
  computed: {

    ...mapGetters([
      'gradeList',
      'subjectList',
      'getuserInfo',
      'isReady'

    ]),

    chapterIds() {
    	let arr = []
    	// console.log(this.activeType == 'chapter')

    	if(this.activeType == 'chapter') {
	      this.chapterLists.forEach(item=>{
	        arr.push(item.id)
	      })

        arr.length?null:(this.rootChapterId?arr.push(this.rootChapterId):null)
    	}

    	return arr

    },

    knowledgeIds() {
    	let arr = []
    	if(this.activeType == 'knowledge') {
	      this.knowledgeLists.forEach(item=>{
	        arr.push(item.id)
	      })

        arr.length?null:(this.rootKnowledgeId?arr.push(this.rootKnowledgeId):null)
    	}

    	return arr
    }
  },
  mounted() {
  	this.activeType = this.treeType?this.treeType:'chapter'
  },
  methods: {
    setparams(volumeId,subjectCode) {

      this.volumeId = volumeId

      this.subjectCode = subjectCode

      // if(this.activeType == 'chapter' && !this.volumeId) {
      //   this.chapterLists = []

      // }
      
    },
    handleClick() {
      // this.resetPage()
      // if(this.activeType == 'Chapter') {
      //   this.tagList = this.chapterIds
      // }else {
      //   this.tagList = this.knowledgeIds
      // }
    },
    defaultChapterCheck(list) {
      this.chapterLists = []
      this.rootChapterId = ''

      if(list && list.id) {
        
        this.chapterLists.push(list)

        this.rootChapterId = list.id
      }

      // this.rootChapterNode.push(list)
      // this.getresourceList()
    },
    getCheckedChapters(list) {
      this.chapterLists = list
      // this.resetPage()

    },
    defaultKnowsCheck(list) {
      this.knowledgeLists = []
      this.rootKnowledgeId = ''
      if(list && list.id) {
        
        this.knowledgeLists.push(list)

        this.rootKnowledgeId = list.id      
      }

      // this.rootKnowledgeNode.push(list)
    },
    getCheckedKnows(list) {
      this.knowledgeLists = list
      // this.resetPage()
    },

    closeTag(index) {

      if(this.activeType == "chapter") {

        this.chapterLists.splice(index,1)
        this.$refs.chapterTree.setCheckedNodes(this.chapterLists)

      }else {
        this.knowledgeLists.splice(index,1)
        this.$refs.knowledgeTree.setCheckedNodes(this.knowledgeLists)
      }
    },

  }
};
</script>
<style lang="less">
.select-point-tree {
  
	.el-radio-group {
		width: 100%;
	}


	.el-tabs__content {
		overflow: visible;
	}

}
</style>
<style scoped lang="less">
.select-point-tree {
	.search-wrap {
		text-align: center;
		padding: 0 30px;
	}
}
</style>