<template>
    <div style="display: flex;justify-content: center;background: #eeeeee ">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
                 style="width: 1000px;height: 1000px"
                 label-width="100px" class="demo-ruleForm">
            <h3>工作流修改界面</h3>
            <el-form-item :hidden="true" label="主键">
                <el-input v-model="ruleForm.autoworkflowid" readonly></el-input>
            </el-form-item>
            <el-row>
                <el-col span="12">
                    <el-form-item label="结束时间" prop="endtime">
                        <el-input v-model="ruleForm.endtime"></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="12">
                    <el-form-item label="错误等待时间" prop="errorwaittime">
                        <el-input v-model="ruleForm.errorwaittime"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col span="12">
                    <el-form-item label="执行等待时间" prop="procesewaittime">
                        <el-input v-model="ruleForm.procesewaittime" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="12">
                    <el-form-item label="开始时间" prop="starttime">
                        <el-input v-model="ruleForm.starttime"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col span="12">
                    <el-form-item label="是否有效" prop="streffectivetype">
                        <el-input v-model="ruleForm.streffectivetype"></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="12">
                    <el-form-item label="参数类型" prop="strparamvaluetype">
                        <el-input v-model="ruleForm.strparamvaluetype" ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col span="12">
                    <el-form-item label="工作流名称" prop="strworkflowname">
                        <el-input v-model="ruleForm.strworkflowname"></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="12">
                    <el-form-item label="描述" prop="strdiscription">
                        <el-input v-model="ruleForm.strdiscription"></el-input>
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
                        axios.put('http://localhost:8181/AutoETL/update',this.ruleForm).then(function (resq) {
                            if(resq.data == 'success'){
                                _this.$alert('《'+_this.ruleForm.strworkflowname+'》修改成功！', '消息', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        _this.$router.push("/WorkflowManager");//添加成功后跳转到图书管理界面
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
                    path: "/WorkflowManager", //跳转到图书修改界面
                    query:{
                        id:this.ruleForm.autoworkflowid
                    }
                });
            },
        },
        created(){
            const _this = this
            axios.get('http://localhost:8181/AutoETL/findById/'+this.$route.query.id).then(function (req) {
                _this.ruleForm = req.data
            })
        }
    }
</script>