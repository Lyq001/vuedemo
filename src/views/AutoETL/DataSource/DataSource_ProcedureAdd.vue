<template>
    <div style="display: flex;justify-content: center;background: #eeeeee ">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
                 style="width: 1000px;height: 1000px"
                 label-width="100px" class="demo-ruleForm">
            <h3>数据源表新增界面</h3>
            <el-form-item :hidden="true" label="主键">
                <el-input v-model="ruleForm.procedureid" readonly></el-input>
            </el-form-item>
            <el-row>
                <el-col span="12">
                    <el-form-item label="存储过程名称" prop="procedurename">
                        <el-input v-model="ruleForm.procedurename"></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="12">
                    <el-form-item label="存储过程类型" prop="proceduretype">
                        <el-input v-model="ruleForm.autodto"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col span="12">
                    <el-form-item label="数据库" prop="datasourceid">
                        <el-input v-model="ruleForm.datasourceid" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="12">
                    <el-form-item label="存储过程类型" prop="proceduretype">
                        <el-input v-model="ruleForm.proceduretype"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col span="12">
                    <el-form-item label="描述" prop="discription">
                        <el-input v-model="ruleForm.discription"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
                        <el-button type="primary" @click="back('ruleForm')">返回</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                ruleForm: {
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
                        axios.post('http://localhost:8181/Procedure/save',this.ruleForm).then(function (resq) {
                            if(resq.data == 'success'){
                                _this.$alert('存储《'+_this.ruleForm.procedurename+'》添加成功！', '消息', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        _this.$router.push({
                                            path: "/DataSource_ProcedureManager", //跳转到图书修改界面
                                            query:{
                                                id:_this.ruleForm.datasourceid
                                            }
                                        });//添加成功后跳转到图书管理界面
                                    }
                                });

                            }else{

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
                    path: "/DataSource_ProcedureManager", //跳转到图书修改界面
                    query:{
                        id:this.$route.query.id
                    }
                });
            },
        }
    }
</script>