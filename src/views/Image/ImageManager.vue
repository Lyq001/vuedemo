<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 1200px">
            <el-table-column
                    fixed
                    prop="id"
                    label="编号"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="file_name"
                    label="文件名"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="content"
                    label="图片"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="group_01"
                    label="1级分组"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="group_02"
                    label="2级分组"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="group_03"
                    label="3级分组"
                    width="200">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
                    <el-button @click="remove(scope.row)" type="text" size="small">删除</el-button>
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
            remove(row) {
                const _this = this
                axios.delete('http://localhost:8181/image/deleteById/'+row.id).then(function (resq) {
                    _this.$alert('《'+row.name+'》删除成功！', '消息', {
                        confirmButtonText: '确定',
                        callback: action => {
                            window.location.reload()//刷新当前页面
                        }
                    });
                })
            },
            edit(row) {
                this.$router.push({//页面跳转，带参数
                    path: "/Edit", //跳转到图书修改界面
                    query:{
                        id:row.id
                    }
                });
            },
            page(currentPage){
                const _this = this
                axios.get('http://localhost:8181/image/findAll/'+currentPage+'/5').then(function (resp) {
                    _this.tableData = resp.data.content
                    _this.total = resp.data.totalElements
                })
            }
        },
        created() {//页面加载触发
            const _this = this
            axios.get('http://localhost:8181/image/findAll/1/5').then(function (resp) {
                _this.tableData = resp.data.content
                _this.total = resp.data.totalElements
            })
        },
        data() {
            return {
                total: null,
                tableData: null
            }
        }
    }
</script>