<template>
  <div class="resource">
    <div class="resource-wrap">
      <div class="top-search">
        <el-form :inline="true" :model="search" class="demo-form-inline " >

          <el-form-item label="上传时间">
            <el-date-picker
              v-model="search.time"
              @change="resetPage"
              type="daterange"
              size="mini"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:260px;"
            ></el-date-picker>
          </el-form-item>
					<el-form-item label="文件类型">
            <el-select v-model="search.fileType" class="search-class" size="mini" clearable @change="resetPage">
              <el-option :label="list.value" :value="list.key" :key="list.key" v-for="list in fileTypeList"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文件名">
            <el-input v-model="search.fileName" class="search-class" placeholder="请输入文件名" size="mini" clearable @change="resetPage" prefix-icon="el-icon-search"></el-input>
          </el-form-item>
        </el-form>

      </div>

      <div class="top-total" style="">
        <p class="top-p">共有<span class="activecolor">{{total}}</span>个资源符合结果</p>
      </div>
      <div class="wrap-content-right-wrap">

        <div class="singal-paper" v-for="list in tableData">
          <div class="singal-paper-left">
            <div class="left-title">
            	<p @click="resourcePreview(list.resourceId)" class="hiddentext">
                <i class="iconfont" :class="setClass(list.fileType)"></i>
                <span class="text">{{list.name}}</span>
              </p>
            	<p class="type-class" :style="statusStyle(list.applyState)">{{list.applyName}}</p>
            </div>
            <p>
              <span>贡献者：{{list.userName}}</span>
              <span class="left-tag">{{list.createTime}}</span>
              <span class="left-tag">下载量：{{list.download}}</span>
              <span class="left-tag">点赞数：{{list.thumbUp}}</span>
            </p>
          </div>
          <div  class="singal-paper-middle">
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
        	<div class="singal-paper-right">
            <span>
              <el-button type="primary" size="mini" @click="reSubmitFile(list.resourceId)" v-if="list.applyState=='Reject'">重新提交</el-button>
            </span>
            <span>
              <el-button type="primary" size="mini" @click="editFile(list.resourceId)" v-if="list.applyState=='Reject'">编辑</el-button>
            </span>
          	<el-button type="primary" size="mini" @click="deleteFile(list.resourceId)">删除</el-button>

          </div>
        </div>

        <div class="pagination">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="search.page"
            :page-sizes="[10, 20, 40, 60]"
            :page-size="search.size"
            layout="total, prev, pager, next, sizes"
            :total="total"
          ></el-pagination>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { getfileType } from '@/utils/basic.service.js'
  import { debounce } from '@/utils/public.js'
export default {
	props:{
		grade:String,
		chapterIds: Array,
		knowledgeIds: Array,
		resourceType:String,
    fileTypeList:Array,
	},
  data() {
    return {
      search: {
        type: "",
        diff: "",
        time: "",
        fileType:'',
        fileName:'',
        page:1,
        size:10,
      },
      total:0,
      typeList:[],
      tableData:[],


    };
  },
  computed: {
    ...mapGetters([
      'gradeList',
      'getuserInfo',

    ]),


  },
  watch: {
  	resourceType(val) {
      this.tableData = []
  		this.resetPage()
  	},


  	// grade(val) {
  	// 	this.resetPage()
  	// },

  	chapterIds(val) {
  		this.resetPage()
  	},
  	knowledgeIds(val) {
  		this.resetPage()
  	},
  },
  activated() {
    
    this.getTableData()

  },

  deactivated(){
    console.log('deactivated')
  },
  destroyed(){
    console.log('destroyed')
  },
  mounted() {

  	this.getTableData()
  },
  methods: {

    resourcePreview(resourceId) {
      this.$router.push({path: '/teacher/resourceRreview', query: {id:resourceId}})
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
      this.getTableData()
      // this.$emit('backToTop')
    },
    resetPage() {
    	this.search.page = 1
    	this.getTableData()
    },
    getTableData: debounce(function() {

      if(!this.chapterIds.length && !this.knowledgeIds.length) {
          this.tableData = []
          this.total = 0
          return 
      }
        let params = {
          searchType : 'person',
           fileType:this.search.fileType,
          resourceName:this.search.fileName,
          resourceType: this.resourceType=='0'?'':this.resourceType,
          // oeseType:'',
          //grade: this.grade,
          startTime:this.search.time? this.search.time[0]:'',
          endTime: this.search.time?this.search.time[1]:'',

          page: this.search.page - 1,
          size: this.search.size
        }

       this.$http.post(`/api/open/resources/list`, {
            chapterIds: this.chapterIds,
            knowledgeIds: this.knowledgeIds
          },
            params
        )

       .then((data)=>{
         if(data.status == '200') {
           this.tableData = data.data.content
           this.total = data.data.totalElements
         }
       })
      }),

    setClass(fileType) {
      let obj = {};
      switch(fileType) {
        case 'PDF':
          obj = {
            iconPDF:true,
            pdficon: true
          }
          break;
        case 'PPT':
          obj = {
            iconppt1:true,
            ppticon: true
          }
          break;
        case 'WORD':
          obj = {
            iconword2:true,
            wordicon: true
          }
          break;
        default:
          obj = {
            iconword2:true,
            wordicon: true
          }
      } 
      return obj;
    },

    statusStyle(status) {
      let style = {}
      switch(status) {
        case 'Audit':
          style = { 'background-color' : '#999999'}
          break;
        case 'Reject':
          style = { 'background-color' : '#ff2727'}
          break;
        case 'WORD':
          style = { 'background-color' : '#ff2727'}
          break;
        default:
          style = { 'background-color' : '#00cc00'}
      } 

      return style
    },

    deleteFile(resourceId) {

      this.$confirm('确定删除该资源吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.$http.delete(`/api/open/resources/${resourceId}`)
        .then((data)=>{
          if(data.status == '200') {

            this.getTableData()

            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        })

      }).catch(() => {
       
      });
    },

    reSubmitFile(resourceId) {
      this.$http.put(`/api/open/resources/status/${resourceId}?applyState=Audit`)
      .then((data)=>{
        if(data.status == '200') {
          this.$message({
            type: 'success',
            message: '提交成功!'
          });
          this.getTableData()


        }
      })
    },

    editFile(resourceId) {
      this.$router.push({path:'/teacher/personal/myResourceUpdate', query: {id:resourceId}})
    },




  }
};
</script>
<style lang="less">
.resource {


  .el-button+.el-button {
    margin-left: 20px;
  }
}
</style>
<style scoped lang="less">
.resource {



    &-wrap {
      // margin-top: 10px;
      // display: flex;
   
          margin-bottom: 30px;
          // padding:20px;


          .singal-paper {
            border: 1px solid #e2e2e2;
            margin-top: 10px;
            //background-color: #f6faff;
            padding:20px;
            border-radius: 4px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            line-height: 2.5;
            transition:0.3s;
            &:hover {
              box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
            }
            
            &-left {

            	width: 70%;
              min-width: 0px;
		          .left-title {
		            padding-right: 20px;
		            font-size: 1.2rem;
		            font-weight: 600;
		            color: #333333;
		            cursor: pointer;
		            display: flex;
		            align-items: center;
		            justify-content: space-between;
                // white-space: nowrap;
		            .text {
		              margin-left: 3px;
		            }

		            .type-class {
		            	//width: 60px;
		            	height: 32px;
		            	line-height: 32px;
		            	padding: 0px 20px;
		            	// background-color: #00cc00;
		            	text-align: center;
		            	color: #ffffff;
		            	font-size: 0.9rem;
		            	border-radius: 4px;
		            	flex-shrink: 0;
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

	          &-middle {
	          	width: 30%;
	          	border-left: 1px solid #e2e2e2;
	          	text-align: center;
              // flex-shrink: 0;
	          }


	          &-right {
	          	width: 80px;
	          	flex-shrink: 0;
	          	text-align: center;
	          }

          }
        
      
    
  }
}
</style>