<template>
    <div style="display: flex;justify-content: center;background: #eeeeee ">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
                 style="width: 1000px;height: 1000px"
                 label-width="100px" class="demo-ruleForm">
            <h3>工作流节点新增界面</h3>
            <el-form-item :hidden="true" label="主键">
                <el-input v-model="ruleForm.autoworkflowid" readonly></el-input>
            </el-form-item>
            <el-row>
                <el-col span="12">
                    <el-form-item label="排序" prop="intorder">
                        <el-input v-model="ruleForm.intorder"></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="12">
                    <el-form-item label="节点名称" prop="activitynodename">
                        <el-input v-model="ruleForm.activitynodename"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col span="12">
                    <el-form-item label="节点类型" prop="activitynodetype">
                        <el-input v-model="ruleForm.activitynodetype" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="12">
                    <el-form-item label="分组" prop="intordergroup">
                        <el-input v-model="ruleForm.intordergroup"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col span="12">
                    <el-form-item label="描述" prop="strdiscription">
                        <el-input v-model="ruleForm.strdiscription"></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="12">
                    <el-form-item label="执行类型" prop="repeattype">
                        <el-input v-model="ruleForm.repeattype" ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col span="12">
                    <el-form-item label="sql条件" prop="sqlcondition">
                        <el-input v-model="ruleForm.sqlcondition"></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="12">
                    <el-form-item label="开始条件" prop="startconditiontype">
                        <el-input v-model="ruleForm.startconditiontype"></el-input>
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
                    <el-form-item label="存储过程" prop="procedureid">
                        <el-input v-model="ruleForm.procedureid"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col span="12">
                    <el-form-item label="工作流" prop="workflowid">
                        <el-input v-model="ruleForm.workflowid"></el-input>
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
                        axios.post('http://localhost:8181/AcNode/save',this.ruleForm).then(function (resq) {
                            if(resq.data == 'success'){
                                _this.$alert('工作流《'+_this.ruleForm.activitynodename+'》添加成功！', '消息', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        _this.$router.push({
                                            path: "/ActivityNodeManager", //跳转到图书修改界面
                                            query:{
                                                id:_this.ruleForm.workflowid
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
                    path: "/ActivityNodeManager", //跳转到图书修改界面
                    query:{
                        id:this.$route.query.id
                    }
                });
            },
        }
    }
</script>