<template>
  <div class="profile">
  	<div class="profile-top">
  		<ul>
  			<li><p>账户：{{getuserInfo.username}}</p></li>
  			<li class="flex-class">
  				<p class="p1">学段：{{getuserInfo.sectionName}}</p>
  				<p class="p1">学科：{{getuserInfo.subjectName}}</p>
  				<p class="p1">身份：{{getuserInfo.userType=="Teacher"?"老师":'录题员'}}</p>
  			</li>
  			<li class="flex-class">
  				<p class="p1">年级：{{gradeList.join()}}</p>
  				<p class="p1">学校：{{getuserInfo.school.name}}</p>
  				<!-- <p class="p1">地区：{{getuserInfo.username}}</p> -->
  			</li>
  		</ul>
  	</div>

  	<div class="profile-wrap">
		  <el-tabs v-model="activeName">
		    <el-tab-pane label="修改资料" name="information">
		    	<div class="active-wrap">
						<el-form  :model="userInfo" label-width="100px" size="mini">
						  <el-form-item label="姓名：">
						    <el-input v-model="userInfo.person.fullName"></el-input>
						  </el-form-item>
						  <el-form-item label="电话号码：">
						    <el-input v-model="userInfo.person.phoneNumber"></el-input>
						  </el-form-item>
						  <el-form-item label="邮箱：">
						    <el-input v-model="userInfo.person.email"></el-input>
						  </el-form-item>
						  
						</el-form>
						<div style="text-align: center;margin-top: 10px;">
							<el-button type="primary" @click="onSubmit" size="mini">保存资料</el-button>
						</div>
		    	</div>
		    </el-tab-pane>
		    <el-tab-pane label="修改密码" name="password">
		    	<div class="active-wrap">
						<el-form ref="password" :model="password" status-icon :rules="rules" size="mini" label-width="100px" class="demo-ruleForm">
						  <el-form-item label="旧密码：" prop="old">
						    <el-input v-model="password.old" type="password" class="input-class"></el-input>
						  </el-form-item>
						  <el-form-item label="新密码：" prop="new">
						    <el-input v-model="password.new" type="password" class="input-class"></el-input>
						  </el-form-item>
						  <el-form-item label="确认密码：" prop="checkPass">
						    <el-input v-model="password.checkPass" type="password" class="input-class"></el-input>
						  </el-form-item>
						  
						</el-form>
						<div style="text-align: center;margin-top: 10px;width: 400px;">
							<el-button type="primary" @click="changePass" size="mini">确定</el-button>
						</div>
		    	</div>
		    </el-tab-pane>
		    <!-- <el-tab-pane label="登陆历史" name="history">登陆历史</el-tab-pane> -->
		  </el-tabs>
  	</div>


  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Cookies from "js-cookie";
export default {


  data() {
	  var validatePass = (rule, value, callback) => {
	    if (value === '') {
	      callback(new Error('请输入密码'));
	    } else {
	      if (this.password.checkPass !== '') {
	        this.$refs.password.validateField('checkPass');
	      }
	      callback();
	    }
	  };
	  var validatePass2 = (rule, value, callback) => {
	    if (value === '') {
	      callback(new Error('请再次输入密码'));
	    } else if (value !== this.password.new) {
	      callback(new Error('两次输入密码不一致!'));
	    } else {
	      callback();
	    }
	  };  
    return {
      activeName:'information',
      gradeList:[],
      password:{
      	old:'',
      	new:'',
      	checkPass:''
      },
      // userInfo: {
      // 	fullName:'',
      // 	phoneNumber:'',
      // 	email:'',
      // }
      rules: {
      	old:[
      		{ required: true, trigger: 'blur' }
      	],
        new: [
          { required: true,validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true,validator: validatePass2, trigger: 'blur' }
        ]
      }

    };

  },
  watch: {
    getuserInfo(val) {
      if(val.school) {
        this.getgradeList()
      }
    },
  },
  computed: {

    ...mapGetters([
      'getuserInfo',


    ]),

    userInfo() {
    	return Object.assign({}, this.getuserInfo)
    }
  },
  mounted() {
  	this.getuserInfo.school?this.getgradeList():null
  },
  methods: {

    onSubmit() {
    	this.$http.put(`/api/open/user/personalInfo`,{
    		fullName: this.userInfo.person.fullName,
    		phoneNumber: this.userInfo.person.phoneNumber,
    		email: this.userInfo.person.email,
    	})
    	.then((data=>{
    		if(data.status == '200') {

    			this.$store.dispatch('getUserBaseInfo', this.$router)

    			this.$message({
    				message:'修改成功',
    				type:'success'
    			})
    		}
    	}))
    },
    changePass() {

    	 this.$refs.password.validate((valid) => {
          if (valid) {
			    	this.$http.put(`/api/open/user/password`,{
			    		password: this.password.old,
			    		newPassword: this.password.new,
			    	})
			    	.then((data=>{
			    		if(data.status == '200') {
			    			this.$alert('密码修改成功，请重新登录', '提示', {
				          confirmButtonText: '确定',
				          callback: action => {

										Cookies.remove("resource-teacher")

										this.$router.replace("/login")
				          }
				        });

			    		}
			    	}))
          }
        });

    },

    getgradeList() {
      this.$http.get(`/api/open/common/gradeList/${this.getuserInfo.school.id}`)
      .then(data=>{
        if(data.status == '200') {
        	let list = []
          data.data.forEach(item=>{
          	this.getuserInfo.grades.forEach(item0=>{
          		if(item.key == item0) {
          			list.push(item.value)
          		}
          	})
          	
          })
          this.gradeList = list
        }
      })
    },
  }
};
</script>
<style lang="less">
.exampaper {
  .el-radio-button__inner {
    border: 0px;
    background-color: #f6faff;
    border-radius: 3px;
    font-size: 14px;
    color: #666;
  }
  .el-input__inner {
    background: transparent;
  }
  .el-range-editor .el-range-input {
    background: transparent;
  }
  .el-radio-button:first-child .el-radio-button__inner {
    border-left: 0px;
    border-radius: 3px;
  }
  .el-radio-button:last-child .el-radio-button__inner {
    border-radius: 3px;
  }

  .el-card {
    background-color: #f0f3fa;
    border-color: #e7eaf1;
  }
  .el-card__body {
    padding: 0px;
  }

  .el-tabs__header {
    margin: 0 0 5px;
  }

  .wrap-content {
    .el-button {
      font-size: 13px;
    }
  }

  .el-date-editor .el-range-separator {
    width: 8%;
  }

  .el-button+.el-button {
    margin-left: 20px;
  }
}
</style>
<style scoped lang="less">
.profile {

	&-top {
		ul {
			li {
				height: 40px;
				line-height: 40px;
			}

			.flex-class {
				display: flex;

				.p1 {
					width: 33%;
				}
			}
		}
	}

    &-wrap {

    	.active-wrap {
    		width: 500px;
    		margin: 20px auto;

    		.input-class {
    			width: 230px;
    		}
    		// background-color: red;
    	}
      // margin-top: 10px;
      // display: flex;

        
      
    
  }
}
</style>