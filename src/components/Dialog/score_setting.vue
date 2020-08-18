<template>

    <el-dialog
      title="分值设置"
      :visible.sync="visible"
      :close-on-click-modal='false'
      width="700px"
      :before-close="closeDialog">
      <div class="score-setting">
        <p class="p1 p2"><span>试卷总分：100</span><span style="margin-left:40px;">难度系数：0.64</span></p>
        
        <div v-for="(list,index) in tableData">
          <p class="p2">{{changeindex(index)}}、{{list.type}}</p>

            <el-table
              :data="list.list"
              border
              style="width: 100%">
              <el-table-column
                type="index"
                label="题号"
                align="center"
                width="80">
              </el-table-column>
              <el-table-column
                prop="point"
                align="center"
                label="知识点">
              </el-table-column>
              <el-table-column
                prop="diff"
                align="center"
                width="100"
                label="难度">
              </el-table-column>
              <el-table-column
                prop="score"
                align="center"
                width="110"
                label="分值">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.score" placeholder="请输入内容" style="width:60px;" size="mini"></el-input> 分
                </template>
              </el-table-column>
            </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog" size="mini">取 消</el-button>
        <el-button type="primary" @click="closeDialog" size="mini">确 定</el-button>
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
    }
  },
  data() {
    return {
      tableData: [{
        type: '选择题',
        list: [{
          point: '科学计数法-较大数1',
          diff: '易',
          score: ''
        },{
          point: '直角三角形-较大数2',
          diff: '易',
          score: ''
        }]
      },{
        type: '填空题',
        list: [{
          point: '直角三角形-较大数3',
          diff: '易',
          score: '2'
        },{
          point: '科学计数法-较大数4',
          diff: '易',
          score: ''
        }]
      },{
        type: '解答题',
        list: [{
          point: '直角三角形-较大数6',
          diff: '易',
          score: ''
        },{
          point: '科学计数法-较大数7',
          diff: '易',
          score: ''
        }]
      }]
    };
  },
  computed:{
    visible() {
      return this.dialogVisible
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
    }
  }
};
</script>
<style lang="less">
.score-setting {

  .el-table td, .el-table th {
    padding:8px 0;
  }

  .el-input__inner {
    background-color: transparent !important;
  }



}
</style>
<style scoped lang="less">
.score-setting {
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