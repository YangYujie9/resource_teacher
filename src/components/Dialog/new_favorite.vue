<template>
<div>
    <el-dialog
      title="新建收藏夹"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="600px"
      custom-class="favorite"
      :before-close="closeDialog">
      <div class="favorite">
        <span>名称：</span><el-input v-model="newfolderName" style="width:380px;" size="small"></el-input>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addFolder" size="small">添 加</el-button>
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["dialogVisible"],
  data() {
    return {
      newfolderName

    };
  },
  mounted() {

  },

  methods: {
    closeDialog() {
      this.$emit("close");
    },

    addFolder() {
      this.$http.post(`/api/open/collectFolder/addFolder/${this.newfolderName}`)

      .then((data)=>{
        if(data.status == '200') {
          
          this.$emit("close");
          this.$emit("getData");
        }
      })
    }
  }
};
</script>
<style lang="less">
.favorite {

  .el-dialog__footer {
    text-align: center;
  }
}
</style>
<style scoped lang="less">
.favorite {
  margin-top: 20px;
  text-align: center;
  &-top {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    &-left {
      width: 80px;

      .icon {
        font-size: 56px;
        color: #faca10;
      }
    }

    .p1 {
      font-size: 18px;
    }
  }
}
</style>