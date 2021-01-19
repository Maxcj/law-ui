<template>
  <div id="app">
    <div class="manage_page fillcontain">
      <el-row style="height: 100%;">
        <el-col :span="4" style="min-height: 100%; background-color: #324057;">
          <el-menu style="min-height: 100%;" theme="dark" router>
            <el-menu-item index="/"><i class="el-icon-menu"></i>首&nbsp;&nbsp;&nbsp;&nbsp;页</el-menu-item>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-document"></i>合同类别</template>
              <el-menu-item index="money"><i class="fa fa-cny"></i>&nbsp;个人借贷</el-menu-item>
              <el-menu-item index="marry"><i class="fa fa-file"></i>&nbsp;离婚协议</el-menu-item>
              <el-menu-item index="car"><i class="fa fa-car"></i>&nbsp;交通案件</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
        <el-col :span="20" style="height: 100%;overflow: auto;">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 20px;
  }
</style>