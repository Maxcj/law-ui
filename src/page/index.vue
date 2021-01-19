<template>
  <div id="content">
    <el-row>
      <el-col :span="22" :offset="1">
        <el-card class="box-card">
          <h3 style="text-align:left;">提供以下合同（协议）自动生成服务:</h3>
          <div style="margin-top:30px;">
            <el-row>
              <el-col :span="7" :offset="0">
                <el-card shadow="hover">
                  <div style="padding:15px;"> <img :src="imgUrl" alt /></div>
                  <el-link @click="go('money')">个人借贷</el-link>
                </el-card>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-card shadow="hover">
                  <div style="padding:15px;"> <img :src="imgUrl" alt /></div>
                  <el-link @click="go('marry')">离婚协议</el-link>
                </el-card>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-card shadow="hover">
                  <div style="padding:15px;"> <img :src="imgUrl" alt /></div>
                  <el-link @click="go('car')">交通案件</el-link>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        imgUrl: require("../../static/images/contract.png"),
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      go(param) {
        this.$router.push(param);
      },
    }
  }
</script>

<style scoped>
  #content {
    margin-top: 30px;
  }

  .el-link {
    text-align: center;
  }
</style>