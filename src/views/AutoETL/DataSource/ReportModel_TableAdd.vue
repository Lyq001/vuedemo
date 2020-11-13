<template>
    <div style="display: flex;justify-content: center;background: #eeeeee ">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
                 style="width: 1000px;height: 1000px"
                 label-width="100px" class="demo-ruleForm">
            <h3>数据源表新增界面</h3>
            <el-form-item :hidden="true" label="主键">
                <el-input v-model="ruleForm.tableid" readonly></el-input>
            </el-form-item>
            <el-row>
                <el-col span="12">
                    <el-form-item label="固定字段" prop="addfields">
                        <el-input v-model="ruleForm.addfields"></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="12">
                    <el-form-item label="自动生成" prop="autodto">
                        <el-input v-model="ruleForm.autodto"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col span="12">
                    <el-form-item label="校验实例" prop="checkinstance">
                        <el-input v-model="ruleForm.checkinstance" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="12">
                    <el-form-item label="表中文名" prop="chinaname">
                        <el-input v-model="ruleForm.chinaname"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col span="12">
                    <el-form-item label="描述" prop="discription">
                        <el-input v-model="ruleForm.discription"></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="12">
                    <el-form-item label="表名" prop="tablename">
                        <el-input v-model="ruleForm.tablename" ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col span="12">
                    <el-form-item label="数据库" prop="datasourceid">
                        <el-input v-model="ruleForm.datasourceid"></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="12">
                    <el-form-item label="主题" prop="suit">
                        <el-input v-model="ruleForm.suit"></el-input>
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
                        axios.post('http://localhost:8181/Table/save',this.ruleForm).then(function (resq) {
                            if(resq.data == 'success'){
                                _this.$alert('工作流《'+_this.ruleForm.tablename+'》添加成功！', '消息', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        _this.$router.push({
                                            path: "/ReportModel_TableManager", //跳转到图书修改界面
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
                    path: "/ReportModel_TableManager", //跳转到图书修改界面
                    query:{
                        id:this.$route.query.id
                    }
                });
            },
        }
    }
</script>