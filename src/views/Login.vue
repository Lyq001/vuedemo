<template>
    <div>
        <div style="display: flex;justify-content: center;margin-top: 150px">
            <el-card style="width: 400px; background: #eeeeee">
                <div slot="header" class="clearfix">
                    <span>系统登录</span>
                </div>
                <el-form :model="LoginForm" :rules="rules" ref="LoginForm" label-width="100px" class="demo-LoginForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="LoginForm.username" width="20px"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="LoginForm.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('LoginForm')">提交</el-button>
                        <el-button @click="resetForm('LoginForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                LoginForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'change' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('http://localhost:8181/login/loginIn',this.LoginForm).then(function (resq) {
                            if(resq.data == 'success'){
                                _this.$router.push("/BookManager");//添加成功后跳转到图书管理界面
                            }else{
                                alert(1)
                                _this.$message.error('用户名或密码错误！')
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>