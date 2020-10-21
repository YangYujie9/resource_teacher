<template>
    <el-dialog
      title="下载word试卷"
      :visible.sync="dialogVisible"
      width="800px"
      custom-class="down-wrap"
      :before-close="closeDialog"
      >
      <div class="down-body">
        <el-form :model="download" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="Word版本：" prop="name">
            <el-radio-group v-model="download.version">
              <el-radio label="普通试卷">
                Word2010/2013，文件扩展名为docx
                <span class="descclass" style="margin-left:48px;">docx格式文档，可编辑公式</span>
              </el-radio>
              <el-radio label="教师用卷">
                Word2003/2007/WPS，文件扩展名为doc
                <span class="descclass" style="margin-left:20px;">doc格式文档，公式为图片，不可编辑公式</span>
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="纸张大小：" prop="region">
            <el-radio-group v-model="download.size">
              <el-radio label="A4"></el-radio>
              <el-radio label="16K"></el-radio>
              <el-radio label="A4横(双栏)"></el-radio>
              <el-radio label="A3横(双栏)"></el-radio>
              <el-radio label="B4横(双栏)"></el-radio>
              <el-radio label="8K横(双栏)"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="试卷类型：">
            <el-radio-group v-model="download.type">
              <el-radio label="普通试卷">
                普通试卷
                <span class="descclass">（答案集中在卷尾）</span>
              </el-radio>
              <el-radio label="教师用卷">
                教师用卷
                <span class="descclass">（每题后面跟答案）</span>
              </el-radio>
              <el-radio label="学生用卷">
                学生用卷
                <span class="descclass">（无答案）</span>
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="下载解析：" prop="delivery">
            <el-checkbox label="附带解析" name="type" v-model="download.ifparse"></el-checkbox>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer footbtn">
        <el-button type="primary" @click="downloadPaper" size="mini">确 定 下 载</el-button>
      </span>
    </el-dialog>

</template>

<script>
export default {
  props: ['dialogVisible'],
  data() {
    return {
      download: {
        version: "",
        size: "",
        type: "",
        ifparse: false
      }
    };
  },
  mounted() {

  },

  methods: {

    closeDialog() {
      this.$emit('close')
    },


    downloadPaper() {
    	this.$emit('close')
    }


  }
};
</script>
<style lang="less">
.down-wrap {
  .el-radio {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .el-dialog__footer {
    background-color: #e3ebff;
    text-align: center;
  }
}

</style>
<style scoped lang="less">
.down-wrap {
  .descclass {
    font-size: 12px;
    color: #9a9a9a;
  }
}
</style>