<template>
  <div class="actual-paper">
    <left-fixed-nav :isfixTab="isfixTab">
      <div slot="left" class="el-radio-costom left">
        <el-radio-group v-model="activePage" size="small">
          <el-radio-button label="真题查询"></el-radio-button>
          <el-radio-button label="真题维护" ></el-radio-button>
          <el-radio-button label="未完成"></el-radio-button>
        </el-radio-group>
      </div>

      <div slot="right">
        <div class="bread-div">
          <div>
            <i class="iconfont iconshouye iconclass"></i>当前位置：真题试卷 > {{activePage}}
          </div>
        </div>

        <div  v-show="activePage=='未完成'||activePage=='真题查询'">

          <div class="search-div el-radio-costom">
            <ul>
              <li>
                <p>题型</p>
                <div class="div2">
                  <el-radio-group v-model="search.type" size="mini">
                    <el-radio-button :label="item.label" v-for="item in list"></el-radio-button>
                  </el-radio-group>
                </div>
              </li>
               <li>
                <p>难度</p>
                <div class="div2">
                  <el-radio-group v-model="search.difficulty" size="mini">
                    <el-radio-button :label="item.label" v-for="item in list"></el-radio-button>
                  </el-radio-group>
                </div>
              </li>

    
            </ul>
          </div>
          
          <div class="paper-content-wrap">
            <el-table
              :data="tableData">
              <el-table-column
                prop="title"
                label="试卷标题">
                <template slot-scope="scope">
                  <div>
                    <p>{{scope.row.title}}</p>
                    <p style="color: #bcbec2;">
                      <span>{{scope.row.grade}}</span>
                      <el-divider direction="vertical"></el-divider>
                      <span>{{scope.row.type}}</span>
                      <el-divider direction="vertical"></el-divider>
                      <span>{{scope.row.address}}</span>
                      <el-divider direction="vertical"></el-divider>
                      <span>{{scope.row.year}}</span>
                    </p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="number"
                label="题数"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="finish"
                label="已传题数"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="update"
                label="更新日期"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="address"
                label="操作"
                align="center"
                width="100">
                <template slot-scope="scope">
                  <el-button type="text" size="small" v-if="activePage=='未完成'">继续上传</el-button>
                  <el-button type="text" size="small" v-if="activePage=='真题查询'">收藏</el-button>
                  <el-button type="text" size="small" v-if="activePage=='真题查询'">下载</el-button>
                </template>
              </el-table-column>
            </el-table>

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


        <div v-show="activePage=='真题维护'">
          <div>
            <el-form :model="form" size="small">
              <el-form-item label="设置试卷名称：">
                <el-input v-model="form.name" class="input-class"></el-input>
              </el-form-item>
              <el-form-item label="设置试卷年份：">
                 <el-select v-model="form.year" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="设置试卷学科：">
                <el-select v-model="form.subject" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="设置试卷学段：">
                <el-select v-model="form.learningSection" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="设置试卷年级：">
                <el-select v-model="form.grade" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="设置试卷地区：">
                <el-select v-model="form.address" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="设置试卷题型、数量：">

                <div class="inputgroup title2">

                    <el-checkbox-group 
                      v-model="form.questionType">
                      <div v-for="type in questionTypeList" style="margin-right: 20px;">

                        <p><el-checkbox  :label="type" :key="type"  style="margin-right: 10px;"> {{type}}</el-checkbox></p>
                        <el-input v-model="type.number" class="input-class" style="width:122px;" placeholder="请输入数量"></el-input>
                      </div>
                    </el-checkbox-group>
                </div>
                
              </el-form-item>
              <el-form-item label="设置试卷类型：">
                <el-radio-group v-model="form.type">
                  <el-radio :label="3">中考模拟</el-radio>
                  <el-radio :label="6">高考模拟</el-radio>
                  <el-radio :label="9">期末考试</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item style="text-align: center;">
                <el-button type="primary">生成真题模版</el-button>
              </el-form-item>
            </el-form>

            
          </div>
        </div>
      </div>
    </left-fixed-nav>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import leftFixedNav from "@/components/Nav/leftFixedNav";

export default {
  components: {
    leftFixedNav,

  },
  props: ["isfixTab"],
  data() {
    return {
      activePage: '真题查询',
      
      tableData:[{
          title: "2020届合肥省衡水中学高三高考前密卷（一）数学（理）试卷",
          number:10,
          finish: 3,
          update: '2020-9-8',
          grade:'高三',
          type:'月考',
          address: '河北省',
          year:"2020"
        },{
          title: "2020届合肥省衡水中学高三高考前密卷（一）数学（理）试卷",
          number:10,
          finish: 3,
          update: '2020-9-8',
          grade:'高三',
          type:'月考',
          address: '河北省',
          year:"2020"
        }
      ],
      questionTypeList:['单选题','多选题'],

      isMulti: false,
      grade: "",
      
      tagsList: [],
      chapterTags:[],
      knowledgeTags:[],
      subjectName:'',
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      // pointList: [],
      list: [
        { label: "选择题", number: "" },
        { label: "填空题", number: "" },
        { label: "解答题", number: "" },
        { label: "判断题", number: "" }
      ],
      title: "",
      search: {
        type: '',
        difficulty: "",
        cateage: "",
        page: 1,
        size: 20,
      },
      form: {
        name:'',
        year:'',
        subject:'',
        learningSection:'',
        grade:'',
        address:'',
        questionType:[],
        type:'',
      },
      total:0,
      cateageList: ["常考题", "易错题", "好题", "压轴题"],
      isAnswer: false,

    };
  },
  computed: {

    ...mapGetters([
      'gradeList',
      'getuserInfo',
      'difficultyList'

    ]),
  },


  watch: {

    gradeList(val) {
      if(val.length) {
        this.grade = val[0]
      }

    },
  },


  mounted() {

  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.search.size = val
      // console.log(`每页 ${val} 条`);
      // this.resetPage()
    },
    // 分页
    handleCurrentChange(val) {
      this.search.page = val
      // console.log(`当前页: ${val}`);
      // this.getTableData()
    // },
    },
  
  }
};
</script>
<style lang="less">
.actual-paper {
  .tree-wrap {
    border:0px;
    // width: 300px;
  }
  .left {
    .el-radio-button,
    .el-radio-button__inner {
      width: 100%;
      
      
    }
    .el-radio-button__inner {
      border:1px solid #e2e2e2 ;
      margin-bottom: 10px;
    }

    .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      border-color:#409EFF;
    }
  }

  .el-table th, {
    background-color: #9cb9ff; 
    color: #ffffff;
    // text-align: center;
  }
  .el-table tr {
    background-color: #f0f3fa;
    
  }

  .el-table td, .el-table th.is-leaf {
    border-bottom: 1px solid #e2e2e2;
  }

  .el-input__inner {
    background-color: transparent;
  }


  .el-checkbox-group {
    display: flex;
    flex-wrap: wrap;
  }

}

</style>
<style scoped lang="less">
.actual-paper {
  .paper-content-wrap {
    margin-top: 10px;
    border:1px solid #e2e2e2;


  }

  .input-class {
    width: 300px;
  }
  .pagination {
    text-align: right;
    margin: 20px 0px;
  }

  .inputgroup {
    display: flex;
    flex-wrap: wrap;

    .label1 {
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
      box-shadow: -1px 0 0 0 #8cc5ff;
      padding: 6px 13px;
      border-radius: 4px;
      font-size: 12px;
      margin-right: 10px;
    }
  }
}

</style>