<template>
    <el-dialog 
      title="试题纠错" 
      :visible.sync="dialogVisible" 
      :close-on-click-modal='false'
      width="860px"
      custom-class="error-class"
      @open="geterrorType"
      :before-close="closeDialog">
      <div class="">
        <el-form ref="form" :model="error" label-width="100px">
          <el-form-item label="错误类型：" required>
            <el-radio-group v-model="error.type">
              <el-radio :label="list.key" v-for="list in errorTypeList">{{list.value}}</el-radio>

            </el-radio-group>
            <!-- <el-checkbox-group v-model="error.type">
              <el-checkbox label="题干错误"></el-checkbox>
              <el-checkbox label="属性错误"></el-checkbox>
              <el-checkbox label="解析知识性错误"></el-checkbox>
              <el-checkbox label="解析细节错误"></el-checkbox>
              <el-checkbox label="其他错误"></el-checkbox>
            </el-checkbox-group>-->          
          </el-form-item>
          <el-form-item label="错误描述：" required>
            <el-input type="textarea" v-model="error.desc" :rows="4" placeholder="请输入错误描述内容"></el-input>
            <!-- <p style="color:#a7a9ae;">您的纠错审核通过后将会获得一定的奖励</p> -->
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editQuestion" size="mini">纠 错</el-button>
        <el-button @click="closeDialog" size="mini">取 消</el-button>
      </span>
    </el-dialog>

</template>

<script>

export default {
  props: ['dialogVisible','questionId','typeTemplate'],
  data() {
    return {
      error: {
        type: "",
        desc: ""
      },
      errorTypeList:[],
    };
  },
  mounted() {
    // this.geterrorType()
   
  },

  activated() {
    
    // this.geterrorType()

  },
  computed: {

  },
  watch: {

  },
  methods: {

    closeDialog() {
      this.$emit('close')
    },

    geterrorType() {

      this.error.desc = ''

      this.$http.get(`/api/open/common/errorType/${this.typeTemplate}`)
      .then(data=>{
        if(data.status == '200') {
          this.errorTypeList = data.data
          this.error.type = this.errorTypeList[0].key
        }
      })
    },

    editQuestion() {

      if(!this.error.desc) {
        return this.$message.warning('错误描述内容不能为空')
      }

      localStorage.setItem('errorContent',JSON.stringify(this.error.desc))
      this.$router.push({ path: '/questions/submitQuestions', query: { questionId: this.questionId, errorType: this.error.type}})
      this.$emit('close')
      this.$emit('close_similarity')
    },


  }
};
</script>
<style lang="less">
.error-class {
  .el-radio {
    height: 30px;
    line-height: 30px;
  }

  .el-dialog__footer {
    text-align: center;
  }
}


</style>
<style scoped lang="less">
.error-class {

}
</style>