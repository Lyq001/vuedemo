<template>
    <div>
        <el-row>
            <el-col span="8">
                <el-button type="primary" @click="add()">新增</el-button>
                <el-button type="warning" @click="edit()">修改</el-button>
                <el-button type="danger" @click="remove()">删除</el-button>
                <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
                <el-button type="primary" @click="back()">返回</el-button>
            </el-col>
            <el-col span="4">
                <el-form ref="searchForm" :model="searchForm" clearable>
                    <el-input
                            placeholder="请输入表名称"
                            prefix-icon="el-icon-search"
                            v-model="searchForm.input">
                    </el-input>
                </el-form>
            </el-col>
            <el-col span="4">
                <el-button type="primary" @click="search()">搜索</el-button>
            </el-col>
        </el-row>
        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%;margin-top: 60px"
                border
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="100%">
            </el-table-column>
            <el-table-column
                    prop="tableid"
                    label="主键"
                    width="50%">
            </el-table-column>
            <el-table-column
                    prop="addfields"
                    label="固定字段"
                    width="80%">
            </el-table-column>
            <el-table-column
                    prop="autodto"
                    label="自动生成"
                    width="100%">
            </el-table-column>
            <el-table-column
                    prop="checkinstance"
                    label="校验实例"
                    width="100%">
            </el-table-column>
            <el-table-column
                    prop="chinaname"
                    label="表中文名"
                    width="100%">
            </el-table-column>
            <el-table-column
                    prop="discription"
                    label="描述"
                    width="200%">
            </el-table-column>
            <el-table-column
                    prop="tablename"
                    label="表名"
                    width="100%">
            </el-table-column>
            <el-table-column
                    prop="datasourceid"
                    label="数据库"
                    width="150%">
            </el-table-column>
            <el-table-column
                    prop="suit"
                    label="主题"
                    width="200%">
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="100%">
                <template slot-scope="scope">
                    <el-button @click="addChild(scope.row)" type="text" size="small">设置节点</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next"
                page-size="5"
                :total= "total"
                @current-change="page">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        methods: {
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = [];
                for (let i = 0; i < val.length; i++) {
                    if (this.multipleSelection.indexOf(val[i].tableid) === -1) {
                        this.multipleSelection.push(val[i].tableid)
                    }
                }
            },
            remove() {
                const _this = this
                alert('http://localhost:8181/Table/deleteById/'+this.multipleSelection)
                axios.delete('http://localhost:8181/Table/deleteById/'+this.multipleSelection).then(function (resq) {
                    _this.$alert('删除成功！', '消息', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.window.location.reload()//刷新当前页面
                        }
                    });
                })
            },
            edit() {
                if(this.multipleSelection.length!=1){
                    alert("请选择一条要修改的数据！")
                }else{
                    this.$router.push({//页面跳转，带参数
                        path: "/ReportModel_TableEdit", //跳转到图书修改界面
                        query:{
                            id:this.multipleSelection[0]
                        }
                    });
                }
            },
            add() {
                this.$router.push({//页面跳转，带参数
                    path: "/ReportModel_TableAdd", //跳转到图书修改界面
                    query:{
                        id:this.$route.query.id
                    }
                });
            },
            back() {
                this.$router.push({//页面跳转，带参数
                    path: "/DataSourceManager", //跳转到图书修改界面
                });
            },
            addChild(row){
                this.$router.push({//页面跳转，带参数
                    path: "/ReportModel_TableManager", //跳转到图书修改界面
                    query:{
                        id:row.autoworkflowid
                    }
                });
            },
            search(){//搜索框查询
                if(this.searchForm.input==null||this.searchForm.input==""){
                    const _this = this
                    axios.get('http://localhost:8181/Table/findByPId/'+this.$route.query.id+'/1/5').then(function (resp) {
                        _this.tableData = resp.data.content
                        _this.total = resp.data.totalElements
                    })
                }else{
                    const _this = this
                    axios.get('http://localhost:8181/Table/findByNameLike/'+this.searchForm.input+'').then(function (resp) {
                        _this.tableData = resp.data
                        this.searchForm.input.clear()//清空搜索变量内容，前台清空点击查询时执行上面的逻辑
                    })
                }

            },
            page(currentPage){
                const _this = this
                axios.get('http://localhost:8181/Table/findAll/'+currentPage+'/5').then(function (resp) {
                    _this.tableData = resp.data.content
                    _this.total = resp.data.totalElements
                })
            }
        },
        created() {//页面加载触发
            const _this = this
            alert(this.$route.query.id)
            axios.get('http://localhost:8181/Table/findByPId/'+this.$route.query.id+'/1/5').then(function (resp) {
                _this.tableData = resp.data.content
                _this.total = resp.data.totalElements
            })
        },
        data() {
            return {
                searchForm:{
                    input:null
                },
                total: null,
                tableData: null,
            }
        }
    }
</script>