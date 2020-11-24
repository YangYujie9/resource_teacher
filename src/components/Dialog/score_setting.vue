<template>

    <el-dialog
      title="分值设置"
      :visible.sync="visible"
      :close-on-click-modal='false'
      width="800px"
      @open="initTableData"
      :before-close="closeDialog">
      <div class="score-setting">
        <div class="p1">
          <!-- <el-input v-model="paperName" placeholder="请输入内容" style="width:360px;" size="mini"></el-input> -->
          <div class="p2" style="font-size: 1.2rem;font-weight: 500;">{{paperName}}</div>
          <span style="line-height: 26px;">试卷总分：{{totalScore}}</span>
          <!-- <span style="margin-left:40px;">难度系数：0.64</span> -->
        </div>
        <div class="score-table-wrap">
          <!-- <div v-for="(list,index) in tableData">
            <p class="p2">{{$changeIndex(index+1)}}、{{list.type}}</p>

              <el-table
                :data="list.list"
                border
                style="width: 100%"
                row-key="questionId"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column
                  label="题号"
                  align="center"
                  width="80">
                   <template slot-scope="scope">  
                    <span>{{scope.row.index}}</span> 
                  </template>
                </el-table-column>
                <el-table-column
                  label="难度"
                  prop="difficultyTypeName"
                  align="center"
                  width="80">
                  
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
                  prop="score"
                  align="center"
                  width="110"
                  label="分值">
                  <template slot-scope="scope" >
                     
                    <span  v-if="scope.row.smallQuestions && scope.row.smallQuestions.length">{{smallScore(scope.row.smallQuestions)}}</span>
                    <el-input v-model="scope.row.score" placeholder="请输入内容" style="width:60px;" size="mini" v-else></el-input> 
                    <span style="margin-left: 10px;">分</span> 
                  </template>
                </el-table-column>
              </el-table>
          </div> -->
<!--           <table style="width: 100%;">
            <tr>
              <th style="width: 80px;">序号</th>
              <th style="width: 100px;">难度</th>
              <th>知识点</th>
              <th style="width: 140px;">分数</th>
            </tr>

            <tbody v-for="(list,index) in tableData">
              <tr>
                <td colspan="3"><div style="text-align: left;">{{$changeIndex(index+1)}}、{{list.type}}</div></td>
                <td class="left-class"><el-input v-model="list.score" style="width:60px;" size="mini"></el-input> 分/题</td>
              </tr>
              <tr v-for="list1 in list.list">
                <td>{{list1.index}}</td>
                <td>{{list1.difficultyTypeName}}</td>
                <td>{{list1.knowledgesPoint.join()}}</td>
                <td class="left-class"><el-input v-model="list1.score" style="width:60px;" size="mini"></el-input> 分</td>
              </tr>

              <tr v-if="list1.smallQuestions && list1.smallQuestions.length">
                <td colspan="4">
                  {{list1.index}}
                </td>
              </tr>
            </tbody>
          </table> -->

          <ul>
            <li style="background-color: #f4f4f4;">
              <div class="col1 pub">序号</div>
              <div class="col1 pub">难度</div>
              <div class="col3 pub">知识点</div>
              <div class="col4 pub">设置分值</div>
            </li>
            <div class="table-wrap">
              <div  v-for="(list,index) in tableData">
                <li>
                  <div class="col5 pub">{{$changeIndex(index+1)}}、{{list.type}}</div>
                  <div class="col4 pub">
                    <el-input v-model="list.score" style="width:60px;" size="mini" @change="setEveryScore(list)"></el-input> 分/题
      
                  </div>
                </li>
                <div v-for="list1 in list.list">
                  <li v-if="list1.smallQuestions && list1.smallQuestions.length">
                    <div class="col1 pub">{{list1.index}}<!-- -{{list1.index + list1.smallQuestions.length - 1}} --></div>
                    <div class="col1 pub">{{list1.difficultyTypeName}}</div>
                    <div class="col3 pub">{{list1.knowledgesPoint.join()}}</div>
                    <div class="col4 pub"><el-input v-model="list1.score" style="width:60px;" size="mini" disabled></el-input> 分</div>
                  </li>
                  <li v-else>
                    <div class="col1 pub">{{list1.index}}</div>
                    <div class="col1 pub">{{list1.difficultyTypeName}}</div>
                    <div class="col3 pub">{{list1.knowledgesPoint.join()}}</div>
                    <div class="col4 pub"><el-input v-model="list1.score" style="width:60px;" size="mini"></el-input> 分</div>
                  </li>
                  <li v-if="list1.smallQuestions && list1.smallQuestions.length" class="pub">
                    <div v-for="(list2,index2) in list1.smallQuestions" class="col6">
                      <p style="width:180px;">
                        <span>{{index2+1}}、</span>
                        <el-input v-model="list2.score" style="width:60px;" size="mini" @change="setsmallScore(list1)"></el-input> 分
                        
                      </p>
                      
                    </div>
                  </li>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog" size="mini">关 闭</el-button>
        <el-button type="primary" @click="clearScore" size="mini">清 空</el-button>
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
    },
    paperName: {
      type:String,
    }
  },
  data() {
    return {

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
      // console.log(score)
      return score
    }
  },
  mounted() {

    
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },

    initTableData() {
      this.tableData.forEach(item=>{
        this.$set(item,'score','')
      })

      

    },
    smallScore(smallQuestions) {
      let score = 0

      // console.log(smallQuestions)
      smallQuestions.forEach(list=>{
        score += Number(list.score)
      })
      // console.log(score)
      return score
    },


    setScore() {
      let arr = []
      this.tableData.forEach(item=>{
        item.list.forEach(item1=>{


          if(item1.smallQuestions && item1.smallQuestions.length) {
            let smallscore = 0

            
            item1.smallQuestions.forEach(item2=>{
              smallscore += Number(item2.score)
              arr.push(`${item2.questionId},${item2.score?item2.score:0}`)
            })

            arr.push(`${item1.questionId},${smallscore}`)
            
          }else {
            arr.push(`${item1.questionId},${item1.score?item1.score:0}`)
          }
        })

      })


      if(arr && arr.length) {

      }else {
        return this.$message.warning('未设定分值')
      }

      // console.log(arr)

      this.$http.put(`/api/open/paper/${this.paperId}`,{
        paperId: this.paperId,
        name: this.paperName,
        questions: arr
      })
      .then(data=>{
        if(data.status == '200') {
          this.$emit('getData')
          this.$emit('close')
          return this.$message({
            message:'分值设定成功',
            type: 'success'
          })
        }
      })
    },

    setEveryScore(list) {

      list.list.forEach(item=>{

        if(item.smallQuestions && item.smallQuestions.length) {
          let score = 0
          item.smallQuestions.forEach(item1=>{
            item1.score = list.score
            score += Number(item1.score)
          })

          item.score = score
        }else {
          item.score = list.score
        }
        
      })
  
    },


    setsmallScore(list) {
      let score = 0

      // console.log(smallQuestions)
      list.smallQuestions.forEach(item=>{
        score += Number(item.score)
      })
      // console.log(score)
      
      list.score = score
    },


    clearScore() {

      this.tableData.forEach(item=>{
          item.score = ''
          console.log(item)
          item.list.forEach(list=>{
          if(list.smallQuestions && list.smallQuestions.length) {
            
            list.smallQuestions.forEach(list1=>{
              list1.score = ''
            })

          }
            list.score = ''
          
        })

      })

      console.log(this.tableData)
    }

  }
};
</script>
<style lang="less">
.score-setting {

  .el-table td, .el-table th {
    padding:6px 0;
  }
  .score-table-wrap {


    .el-input__inner {
      background-color: transparent;
      text-align: center;
    }

    .el-input.is-disabled .el-input__inner {
      background-color: #F5F7FA;
    }
  }




}
</style>
<style scoped lang="less">
.score-setting {

  .score-table-wrap {
    height: calc(80vh - 240px);
    overflow-y: auto; 


    table {
      width: 100%;
      border: 1px solid #e2e2e2;
      border-collapse:collapse;


      th {
        height: 38px;
        border: 1px solid #e2e2e2;
        background-color: #f4f4f4;
      }

      td {
        text-align: center;
        border: 1px solid #e2e2e2;
        padding: 0 20px;
        height: 36px;
      }
    }

    .left-class {
      text-align: left;
      padding-left: 20px;
    }



    ul {
      width: 100%;
      border-left: 1px solid #e2e2e2;
      border-top: 1px solid #e2e2e2;


      .table-wrap {
        // height: calc(80vh - 260px);
        // overflow-y: auto; 
      }

      .pub {
        border-right: 1px solid #e2e2e2;
        border-bottom: 1px solid #e2e2e2;
        flex-wrap: wrap;
      }
      li {
        display: flex;
        // flex-wrap: wrap;
        line-height: 36px;
        text-align: center;

        .head-col {
          background-color: #f4f4f4;
        }

        .col1 {
          width: 80px;
          flex-shrink: 0;
        }

        .col3 {
          flex-grow: 1;
          padding: 0 10px;
        }

        .col4 {
          width: 140px;
          text-align: left;
          padding-left: 20px;
          flex-shrink: 0;
        }

        .col5 {
          flex-grow: 1;
          text-align: left;
          padding: 0 20px;
        }

        .col6 {
          // width: 100%;
          display: flex;
          

        }
      }
    }
  }

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