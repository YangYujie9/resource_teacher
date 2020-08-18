<template>
  <div>
    <script :id="id"  :defaultMsg="writeMsg" type="text/plain" ></script>    
<!-- id，defaultMsg接收父组件传来的内容 -->
  </div>
</template>
<script>

//引入编辑器。我都是在子组件里面加的，我看有的说是在main.js里面添加，这样的话所有页面都引入了这个插件就很必要了。
import '../../../public/ueditor/ueditor.config.js'
import '../../../public/ueditor/ueditor.all.js'
import '../../../public/ueditor/lang/zh-cn/zh-cn.js'
import '../../../public/ueditor/themes/default/css/ueditor.css'

import '../../../public/ueditor/kityformula-plugin/addKityFormulaDialog.js'
import '../../../public/ueditor/kityformula-plugin/getKfContent.js'
import '../../../public/ueditor/kityformula-plugin/defaultFilterFix.js'

export default {
    name: "UEditor",
    props: {
        id: {
            type: String
        },
        config: {
            type: Object
        },
        writeMsg:{
            type: String
        }
    },
//  components:{util},
    data() {
        return {
            editor: null
        }
    },    
    mounted() {
        //初始化UE
      // this.config.serverUrl = this.$http.get(`/api/open/ueditor/config`)
      // console.log(this.config)
  		this.$nextTick(()=>{//避免在切换到填空题再切回来找不到dom而报offsetWidth undefined
               const _this = this;
             this.editor = UE.delEditor(this.id);
             this.editor = UE.getEditor(this.id,this.config);
            // this.editor = UE.getEditor(this.id,{
            //   serverUrl: this.$http.get(`/api/open/ueditor/config?active`),
            //   zIndex: 3000
            // });
            
            this.editor.addListener("ready",function(){
               _this.isinit=true;

             })
           
        })


//     setTimeout(() => {
//                const _this = this;
//              this.editor = UE.delEditor(this.id);
//                this.editor = UE.getEditor(this.id,this.config);
//       UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl
//       UE.Editor.prototype.getActionUrl = function (action) {
//         console.log(action)
//         if (action === 'uploadimage') {
//           return 'http://xxx.com/test/uploadImage'
//         } else if (action === 'uploadvideo') {
//           return 'http://xxx.com/test/uploadVideo'
//         } else {
//           return this._bkGetActionUrl.call(this, action)
//         }
//       }
//       this.editor.addListener('ready', () => {
//         this.$emit('getUe', this.msg)
//       })
//     }, 200)








        
        
        
    },
    destoryed() {
        this.editor.destory();
    },
    methods:{
        getUEContent: function(){
            return this.editor.getContent();
        },
        getContentTxt: function(){
            return this.editor.getContentTxt();
        },

  		setUEContent: function(val){
             if(this.editor && this.editor.isReady){
                const _this = this;
                setTimeout(function(){//过段时间在加载
                    _this.editor.setContent(val);
                },500);
                return;
             }else{
                  const _this = this;
                 setTimeout(function(){//过段时间在加载
                  _this.setUEContent(val);
                },500)
             }
        },
    }
}
</script>
