<template>
  <div id="app">
    <!--<el-container style="height: 500px; border: 1px solid #eee">-->
    <!--  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">-->
    <!--    <el-menu>-->
    <!--      <el-submenu v-for="(item,index) in $router.options.routes" :index="index+''">-->
    <!--        <template slot="title"><i class="el-icon-message"></i>{{item.name}}</template>-->
    <!--        <el-menu-item v-for="(item2,index2) in item.children" :index="index+'-'+index2">{{item2.name}}</el-menu-item>-->
    <!--      </el-submenu>-->
    <!--    </el-menu>-->
    <!--  </el-aside>-->
    <!--  <el-container>-->
    <!--    <el-main>-->
    <!--      <router-view></router-view>-->
    <!--    </el-main>-->
    <!--  </el-container>-->
    <!--</el-container>-->
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  };
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
