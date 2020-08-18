<template>

    <el-dialog
      title="分值设置"
      :visible.sync="visible"
      :close-on-click-modal='false'
      width="800px"
      :before-close="closeDialog">
      <div class="score-setting">
        <p class="p1 p2">
          <span>试卷总分：{{totalScore}}</span>
          <!-- <span style="margin-left:40px;">难度系数：0.64</span> -->
        </p>
        
        <div v-for="(list,index) in tableData">
          <p class="p2">{{changeindex(index)}}、{{list.type}}</p>

            <el-table
              :data="list.list"
              border
              :height="table_height"
              style="width: 100%"
              row-key="questionId"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
              <el-table-column
                label="题号"
                align="center"
                width="80">
                 <template slot-scope="scope" >
                     
                    <span  v-if="scope.row.parentId != '0'">({{scope.row.index}})</span>
                    <span  v-else>{{scope.row.index}}</span> 
                </template>
              </el-table-column>
              <el-table-column
                prop="point"
                align="center"
                label="知识点">
                <template slot-scope="scope">
                  {{scope.row.knowledgesPoint.join()}}
                </template>
              </el-table-column>
              <el-table-column
                prop="difficultyTypeName"
                align="center"
                width="100"
                label="难度">
              </el-table-column>
              <el-table-column
                prop="score"
                align="center"
                width="110"
                label="分值">
                <template slot-scope="scope" >
                   
                  <span  v-if="scope.row.smallQuestions && scope.row.smallQuestions.length">{{smallScore(scope.row.smallQuestions)}}</span>
                  <el-input v-model="scope.row.score" placeholder="请输入内容" style="width:60px;" size="mini" v-else></el-input>分 
                </template>
              </el-table-column>
            </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog" size="mini">取 消</el-button>
        <el-button type="primary" @click="setScore" size="mini">确 定</el-button>
      </span>
    </el-dialog>

</template>

<script>

export default {

  props: {
    dialogVisible: {
      type:Boolean,
    }, 
    paperId: {
      type: String,
    },
    tableData: {
      type: Array,
    }
  },
  data() {
    return {
      // tableData: [{
      //   type: '选择题',
      //   list: [{
      //     point: '科学计数法-较大数1',
      //     diff: '易',
      //     score: ''
      //   },{
      //     point: '直角三角形-较大数2',
      //     diff: '易',
      //     score: ''
      //   }]
      // },{
      //   type: '填空题',
      //   list: [{
      //     point: '直角三角形-较大数3',
      //     diff: '易',
      //     score: '2'
      //   },{
      //     point: '科学计数法-较大数4',
      //     diff: '易',
      //     score: ''
      //   }]
      // },{
      //   type: '解答题',
      //   list: [{
      //     point: '直角三角形-较大数6',
      //     diff: '易',
      //     score: ''
      //   },{
      //     point: '科学计数法-较大数7',
      //     diff: '易',
      //     score: ''
      //   }]
      // }]
    };
  },
  computed:{
    visible() {
      return this.dialogVisible
    },
    totalScore() {
      let score = 0
      this.tableData.forEach(item=>{

          item.list.forEach(list=>{
            if(list.smallQuestions && list.smallQuestions.length) {
              list.smallQuestions.forEach(list1=>{
                score += Number(list1.score)
              })
            }else {
              score += Number(list.score)
            }
          })

      })
      console.log(score)
      return score
    }
  },
  mounted() {
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },

    changeindex(index) {
      const list = {'0': '零','1': '一','2': '二','3': '三','4': '四','5': '五','6': '六','7': '七','8': '八','9': '九'};
      return list[index+1]
    },


    smallScore(smallQuestions) {
      let score = 0

      console.log(smallQuestions)
      smallQuestions.forEach(list=>{
        score += Number(list.score)
      })
      console.log(score)
      return score
    },


    setScore() {
      // this.tableData.forEach()
    }

  }
};
</script>
<style lang="less">
.score-setting {

  .el-table td, .el-table th {
    padding:6px 0;
  }

  .el-input__inner {
    background-color: transparent !important;
  }



}
</style>
<style scoped lang="less">
.score-setting {
  height: calc(80vh -20px);
  .p1 {
    text-align: center;
  }

  .p2 {
    height: 38px;
    line-height: 38px;
    font-size: 0.9rem;
  }

}
</style>