<template>
  <div class="login">
		<div class="bg-class">
			<p class="bg-class-title">{{ msg }}</p>
			<p class="bg-class-title bg-class-tag">Education Cloud Platform</p>
		</div>
		<div class="frames">
		  
		  <div class="center">
		  	  <el-tabs v-model="loginType">
				    <el-tab-pane label="账号登陆" name="account" >
	    				<el-form :model="loginForm" :rules="rules" ref="formName" hide-required-asterisk>
								<el-form-item prop="usertype" label="类型">
									<div style="position: relative;">
										<el-select v-model="usertype" style="width: 100px;">
											<el-option label="老师" value="teacher"></el-option>
											<el-option label="录题员" value="recorder"></el-option>
										</el-select>
										<!-- <div class="bottom_line"></div> -->
									</div>
							  </el-form-item>	
							  <el-form-item prop="username" label="账号">
									<el-input placeholder="账号" v-model="loginForm.username" prefix-icon="el-icon-user" class="input_p"></el-input>
									<div class="bottom_line"></div>
							  </el-form-item>
							  <el-form-item prop="password" label="密码">
									<el-input
									  placeholder="密码"
								    class="input_p"
								     prefix-icon="el-icon-unlock"
									  v-model="loginForm.password"
									  @keyup.enter.native="loginFn"
									  show-password>
									</el-input>
									<div class="bottom_line"></div>
							  </el-form-item>
							  <el-form-item>
									<p class="gos" @click="loginFn" :loading="loading">登录</p>
							  </el-form-item>
							</el-form>
				    </el-tab-pane>
				    <!-- <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane> -->

				  </el-tabs>

		  </div>
		</div>
  </div>
</template>

<script> 
import Cookies from "js-cookie";
export default {
  data() {
		return {
		  msg: "教育资源云平台",
		  loading: false,
		  loginForm: {
				username: "",
				password: ""
		  },
		  loginType:'account',
		  usertype:'teacher',
		  rules: {
				username: [
				  { required: true, message: "请输入用户名", trigger: "blur" },
				  // { min: 1, max: 4, message: "长度在1至4个字符", trigger: "blur" }
				],
				password: [
				  { required: true, message: "请输入密码", trigger: "blur" },
				  { type: "string", min: 4, message: "密码至少四位", trigger: "blur" }
				]
		  }
		};
  },
  mounted() {
  	let that = this
	  // document.addEventListener("keyup", function(event){
   //    //that.searchresult = false
   //    if (event.keyCode == 13 && that.$route.name == "login") {
   //      that.loginFn()
   //    }


   //  }, false);
  },
  methods: {
		loginFn() {
		  this.$refs['formName'].validate(valid => {

				if (valid) {

					this.loading = true

					if(this.usertype == 'teacher') {

						this.$http.post(`/api/open/user/teacherLogin`,this.loginForm)

						.then(data => {

						  if(data.status == '200') {
								let Authorization = data.data.tokenType + ' ' +data.data.token

								Cookies.set("resource-teacher", Authorization);
								// this.$store.commit('setUserInfo',data.data.userInfo);
								this.$store.dispatch('getUserBaseInfo', this.$router)
								
								
								this.$router.push("/teacher/home")
								

								
						  }else {

								Cookies.remove("resource-teacher")
								this.$message({
									message:data.msg,
									type:"error"
								})
								this.$router.replace("/login")
								
						  }
				
						})

					}else {
						this.$http.post(`/api/open/user/recorderLogin`,this.loginForm)

						.then(data => {

						  if(data.status == '200') {
								let Authorization = data.data.tokenType + ' ' + data.data.token

								Cookies.set("resource-teacher", Authorization);
								// this.$store.commit('setUserInfo',data.data.userInfo);
								this.$store.dispatch('getUserBaseInfo', this.$router)
								
								
								this.$router.push("/questions/submitQuestions")
								

								
						  }else {

								Cookies.remove("resource-teacher")
								this.$message({
									message:data.msg,
									type:"error"
								})
								this.$router.replace("/login")
								
						  }
				
						})
					}



				}
		  });
		}
  }
};
</script>
<style lang="less">
.login {
	.el-tabs__header {
    margin: 0 0 25px;
	}

	input {
		border:0px;
	}
}

</style>
<style lang="less" scoped>
.login {
  position: fixed;
  height: 100%;
  width: 100%;



  .bg-class {
  	height: 100%;
  	width: 80%;
	  background: url(../assets/images/ban.png) no-repeat center center;
		background-size:100% 100%;

		&-title {
			padding-top: 60px;
			padding-left: 50px;
			font-size: 20px;
			color: #ffffff;
		}

		&-tag {
			// line-height: 1.5;
			font-size: 16px;
			padding-top: 10px;
		}
  }
}
.login img {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.frames {
  position: absolute;
  top: 48%;
  left: 50%;
  right: 0;
  width: 434px;
  height: 370px;
  text-align: center;
  padding: 40px 32px;
  margin: 0 auto;
  -webkit-transform: translateY(-65%);
  transform: translateY(-65%);
  border-radius: 8px;
  // -webkit-box-shadow: 0 6px 10px 0 rgba(47, 110, 56, 0.74);
  // box-shadow: 0 6px 10px 0 rgba(47, 110, 56, 0.74);
  // background: #fff;

  .bottom_line {
  	height: 2px;
  	background-color: #52a3fc;

  }

  .input_p {
  	width: 320px;
  }
}
.frames p {
  color: #2d2d2d;
  font-size: 20px;
}
.frames .gos {
	margin-top: 8px;
  width: 100%;
  height: 42px;
  line-height: 42px;
  font-size: 16px;
  color: #fff;
  -webkit-box-shadow: 0 2px 4px 0 rgba(32, 82, 30, 0.19);
  box-shadow: 0 2px 4px 0 rgba(32, 82, 30, 0.19);
  border-radius: 4px;
  background-color: #52a3fc;
  cursor: pointer;
}
.center .el-input {
  // line-height: 50px;
}
</style>
