<template>
    <div style="display: flex;justify-content: center;background: #eeeeee ">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
                 style="width: 1000px;height: 1000px"
                 label-width="100px" class="demo-ruleForm">
            <h3>数据源修改界面</h3>
            <el-form-item :hidden="true" label="主键">
                <el-input v-model="ruleForm.datasourceid" readonly></el-input>
            </el-form-item>
            <el-row>
                <el-col span="12">
                    <el-form-item label="数据库名称" prop="sessionfactory">
                        <el-input v-model="ruleForm.sessionfactory"></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="12">
                    <el-form-item label="数据库类型" prop="databasetype">
                        <el-input v-model="ruleForm.databasetype"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col span="12">
                    <el-form-item label="描述" prop="discription">
                        <el-input v-model="ruleForm.discription" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="12">
                    <el-form-item label="数据库驱动" prop="driver">
                        <el-input v-model="ruleForm.driver"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col span="12">
                    <el-form-item label="数据库链接" prop="dburl">
                        <el-input v-model="ruleForm.dburl"></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="12">
                    <el-form-item label="数据库用户名" prop="dbuser">
                        <el-input v-model="ruleForm.dbuser" show-password></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col span="12">
                    <el-form-item label="数据库密码" prop="dbpassword">
                        <el-input v-model="ruleForm.dbpassword" show-password></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
                <el-button type="primary" @click="back()">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                ruleForm: {
                    id: '',
                    name: '',
                    author: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入书名', trigger: 'blur' }
                    ],
                    author: [
                        { required: true, message: '请输入作者', trigger: 'change' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.put('http://localhost:8181/DataSource/update',this.ruleForm).then(function (resq) {
                            if(resq.data == 'success'){
                                _this.$alert('《'+_this.ruleForm.strworkflowname+'》修改成功！', '消息', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        _this.$router.push("/DataSourceManager");//添加成功后跳转到图书管理界面
                                    }
                                });
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
            },
            back() {
                this.$router.push({//页面跳转，带参数
                    path: "/DataSourceManager", //跳转到图书修改界面
                    query:{
                        id:this.ruleForm.autoworkflowid
                    }
                });
            },
        },
        created(){
            const _this = this
            axios.get('http://localhost:8181/DataSource/findById/'+this.$route.query.id).then(function (req) {
                _this.ruleForm = req.data
            })
        }
    }
</script>