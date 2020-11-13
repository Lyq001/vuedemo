<template>
    <div style="display: flex;justify-content: center;background: #eeeeee ">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
                 style="width: 1000px;height: 1000px"
                 label-width="100px" class="demo-ruleForm">
            <h3>数据源字段新增界面</h3>
            <el-form-item :hidden="true" label="主键">
                <el-input v-model="ruleForm.fieldid" readonly></el-input>
            </el-form-item>
            <el-row>
                <el-col span="12">
                    <el-form-item label="是否主键" prop="iskey">
                        <el-input v-model="ruleForm.iskey"></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="12">
                    <el-form-item label="是否有效" prop="isenable">
                        <el-input v-model="ruleForm.isenable"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col span="12">
                    <el-form-item label="长度" prop="nlength">
                        <el-input v-model="ruleForm.nlength" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="12">
                    <el-form-item label="精度" prop="nprecise">
                        <el-input v-model="ruleForm.nprecise"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col span="12">
                    <el-form-item label="排序" prop="nseq">
                        <el-input v-model="ruleForm.nseq"></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="12">
                    <el-form-item label="字段中文名" prop="chinaname">
                        <el-input v-model="ruleForm.chinaname" ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col span="12">
                    <el-form-item label="字段名" prop="fieldname">
                        <el-input v-model="ruleForm.fieldname"></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="12">
                    <el-form-item label="constlist" prop="constlist">
                        <el-input v-model="ruleForm.constlist"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col span="12">
                    <el-form-item label="dbconstlist" prop="dbconstlist">
                        <el-input v-model="ruleForm.dbconstlist"></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="12">
                    <el-form-item label="描述" prop="discription">
                        <el-input v-model="ruleForm.discription"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col span="12">
                    <el-form-item label="是否为空" prop="emptytype">
                        <el-input v-model="ruleForm.emptytype"></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="12">
                    <el-form-item label="字段类型" prop="fieldtype">
                        <el-input v-model="ruleForm.fieldtype"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col span="12">
                    <el-form-item label="逻辑为空" prop="logicemptytype">
                        <el-input v-model="ruleForm.logicemptytype"></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="12">
                    <el-form-item label="所属表" prop="tableid">
                        <el-input v-model="ruleForm.tableid"></el-input>
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
                        axios.post('http://localhost:8181/Field/save',this.ruleForm).then(function (resq) {
                            if(resq.data == 'success'){
                                _this.$alert('字段《'+_this.ruleForm.fieldname +'》添加成功！', '消息', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        _this.$router.push({
                                            path: "/ReportModel_FieldManager", //跳转到图书修改界面
                                            query:{
                                                id:_this.ruleForm.tableid
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
                    path: "/ReportModel_FieldManager", //跳转到图书修改界面
                    query:{
                        id:this.$route.query.id
                    }
                });
            },
        }
    }
</script>