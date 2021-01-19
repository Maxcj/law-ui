<template>
  <div id="content-main">
    <div id="content" v-loading="loading">
      <el-steps :active="active" simple>
        <el-step title="填写借款合同信息" icon="el-icon-edit"></el-step>
        <el-step title="确认合同信息" icon="el-icon-upload"></el-step>
        <el-step title="填写接收邮箱" icon="el-icon-message"></el-step>
        <el-step title="完成" icon="el-icon-check"></el-step>
      </el-steps>

      <div id="money-info" v-show="active == 1">
        <el-row :gutter="20">
          <el-col :span="10" :offset="1">
            <div class="grid-content bg-purple">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>出借人信息</span>
                </div>
                <el-form label-width="120px" :model="outMonryPerson" :rules="outMoneyRules" ref="outMonryPerson">
                  <el-form-item label="出借人姓名" prop="name">
                    <el-input v-model="outMonryPerson.name"></el-input>
                  </el-form-item>
                  <el-form-item label="身份证号码" prop="idCard">
                    <el-input v-model="outMonryPerson.idCard"></el-input>
                  </el-form-item>
                  <el-form-item label="银行账户" prop="bankAccount">
                    <el-input v-model="outMonryPerson.bankAccount"></el-input>
                  </el-form-item>
                </el-form>
              </el-card>
            </div>
          </el-col>
          <el-col :span="10" :offset="2">
            <div class="grid-content bg-purple">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>借款人信息</span>
                </div>
                <el-form label-width="120px" :model="inMonryPerson" :rules="inMoneyRules" ref="inMonryPerson">
                  <el-form-item label="借款人姓名" prop="name">
                    <el-input v-model="inMonryPerson.name"></el-input>
                  </el-form-item>
                  <el-form-item label="身份证号码" prop="idCard">
                    <el-input v-model="inMonryPerson.idCard"></el-input>
                  </el-form-item>
                  <el-form-item label="银行账户" prop="bankAccount">
                    <el-input v-model="inMonryPerson.bankAccount"></el-input>
                  </el-form-item>
                </el-form>
              </el-card>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22" :offset="1">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>借款信息</span>
              </div>
              <el-form :inline="true" :model="moneyInfo" class="demo-form-inline" :rules="moneyRules" ref="monryInfo">
                <el-row>
                  <el-col :span="10" :offset="0">
                    <el-form-item label="借款金额" label-width="140px" prop="money">
                      <el-input v-model="moneyInfo.money" placeholder="借款金额" clearable type="number">
                        <template slot="prepend">￥</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <!-- <el-col :span="10" :offset="1">
                    <el-form-item label="借款时间" label-width="140px">
                      <el-date-picker v-model="moneyInfo.date" type="daterange" range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy 年 MM 月 dd 日">
                      </el-date-picker>
                    </el-form-item>
                  </el-col> -->
                </el-row>
                <el-row>
                  <el-col :span="10" :offset="0">
                    <el-form-item label="借款期限" label-width="140px" prop="term">
                      <el-input v-model="moneyInfo.term" placeholder="借款期限" clearable type="number">
                        <template slot="append">月</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="1">
                    <el-form-item label="借款起始时间" label-width="140px" prop="beginDate">
                      <el-date-picker v-model="moneyInfo.beginDate" type="date" placeholder="选择借款起始时间"
                        value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10" :offset="0">
                    <el-form-item label="月利率" label-width="140px" prop="interestRateMonth">
                      <el-input v-model="moneyInfo.interestRateMonth" placeholder="月利率" clearable type="number">
                        <template slot="append">%</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="1">
                    <el-form-item label="利息支付日" label-width="140px" prop="paymentDay">
                      <el-input-number v-model="moneyInfo.paymentDay" controls-position="right" :min="1" :max="31">
                      </el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="10" :offset="0">
                    <el-form-item label="逾期利息月利率" label-width="140px" clearable prop="outTimeInterestRateMonth">
                      <el-input v-model="moneyInfo.outTimeInterestRateMonth" placeholder="逾期利息月利率" type="number">
                        <template slot="append">%</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="1">
                    <el-form-item label="争议解决受理法院" label-width="140px" prop="court">
                      <el-input v-model="moneyInfo.court" placeholder="争议解决受理法院名称" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div id="money-info" v-show="active == 2">
        <el-row>
          <el-col :span="22" :offset="1">
            <div class="grid-content bg-purple">
              <div class="grid-content bg-purple">
                <el-card class="box-card" style="text-align:left">
                  <el-row style="text-align:center;">
                    <strong style="font-size: 20px;">借款合同</strong>
                  </el-row>

                  <el-divider></el-divider>
                  <el-row>
                    <el-col :span="12">
                      <p>甲方（出借人）：<span class="undei-line">&nbsp;{{outMonryPerson.name}}&nbsp;</span></p>
                      <p>身份证号码：<span class="undei-line">&nbsp;{{outMonryPerson.idCard}}&nbsp;</span></p>
                      <p>银行账户：<span class="undei-line">&nbsp;{{outMonryPerson.bankAccount}}&nbsp;</span></p>
                    </el-col>
                    <el-col :span="12">
                      <p>乙方（借款人）：<span class="undei-line">&nbsp;{{inMonryPerson.name}}&nbsp;</span></p>
                      <p>身份证号码： <span class="undei-line">&nbsp;{{inMonryPerson.idCard}}&nbsp;</span></p>
                      <p>收款账户：<span class="undei-line">&nbsp;{{inMonryPerson.bankAccount}}&nbsp;</span></p>
                    </el-col>
                  </el-row>

                  <el-divider></el-divider>
                  <p>为明确责任，恪守信用，在双方自愿、协商情况下签订本合同。</p>
                  <p>第一条 借款用途：本合同项下之借款必须合法使用。</p>
                  <p>第二条 借款金额：借款金额为<span class="undei-line">&nbsp;{{moneyInfo.money}}&nbsp;</span>人民币。</p>
                  <p>第三条 借款期限：借款期限为<span class="undei-line">{{moneyInfo.term}}</span>个月，自<span
                      class="undei-line">&nbsp;{{moneyInfo.beginDate}}&nbsp;</span>起。</p>
                  <p>第四条 借款利率：借款期限内的月利率为<span class="undei-line">&nbsp;{{moneyInfo.interestRateMonth}}&nbsp;%</span>。
                  </p>
                  <p>第五条 还款方式：按月结息，利息支付日为每月末<span
                      class="undei-line">&nbsp;{{moneyInfo.paymentDay}}&nbsp;日</span>，借款本金到期归还。</p>
                  <p>第六条 提前还款：借款人不得提前还款。如提前还款乙方应当按照约定的借款期限支付甲方预期可以收取到的本息。</p>
                  <p>第七条 违约责任：</p>
                  <p>&nbsp;&nbsp;1.借款人应按合同规定的时间还款。如借款方不按期偿还借款，出借方有权限期追回借款，并就未清偿部分借款金额加收逾期利息，月利率为<span
                      class="undei-line">&nbsp;{{moneyInfo.outTimeInterestRateMonth}}&nbsp;%</span>。
                  </p>
                  <p>&nbsp;&nbsp;2.因乙方违约导致甲方为实现债权所发生的律师费、诉讼费、财产保全费、交通费、评估费、执行费等均由乙方承担。</p>
                  <p>第八条 争议解决方式：协商解决，协商不成任意一方可向<span class="undei-line">&nbsp;{{moneyInfo.court}}&nbsp;</span>起诉，由<span
                      class="undei-line">&nbsp;{{moneyInfo.court}}&nbsp;</span>受理。</p>
                  <p>第九条 本合同正本一式两份，由借款方、出借方各执一份。合同文本具有同等法律效力。本合同自双方签字后生效，借款本息全部清偿后自动失效。

                  </p>
                  <el-row></el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-checkbox v-model="checked">我已确认信息填写正确</el-checkbox>
                    </el-col>
                  </el-row>
                  <el-col :span="24"> </el-col>
                </el-card>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div id="money-info" v-show="active == 3">
        <el-row>
          <el-col :span="12" :offset="6">
            <div class="grid-content bg-purple">
              <div class="grid-content bg-purple">
                <el-card class="box-card" style="text-align:left">
                  <el-form label-width="150px" :model="emailForm" ref="emailForm" :rules="emailRules">
                    <el-form-item label="接收合同邮箱地址：" prop="receiverEmail">
                      <el-input v-model="emailForm.receiverEmail"></el-input>
                    </el-form-item>
                  </el-form>
                </el-card>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>

        </el-row>
      </div>
      <div id="money-info" v-show="active == 4">

        <el-button style="margin-top: 12px;" @click="home()">完成</el-button>
      </div>

      <el-divider></el-divider>
      <div v-show="active != 4" style="text-align:center">
        <el-button style="margin-top: 12px;" @click="back()">上一步</el-button>
        <el-button style="margin-top: 12px;" @click="next()">下一步</el-button>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        active: 1,
        outMonryPerson: {
          name: '张三',
          idCard: '1234567890',
          bankAccount: '0987654321'
        },
        inMonryPerson: {
          name: '李四',
          idCard: '0987654321',
          bankAccount: '1234567890'
        },
        moneyInfo: {
          money: 100000,
          beginDate: '2021-01-01',
          term: 2,
          paymentDay: 1,
          interestRateMonth: 2,
          outTimeInterestRateMonth: 3,
          court: 'xxxx法院'
        },
        checked: false,
        emailForm: {
          receiverEmail: 'maxcj.zhong@outlook.com'
        },
        loading: false,
        outMoneyRules: {
          name: [{
            required: true,
            message: '请输入出借人姓名',
            trigger: 'blur'
          }],
          idCard: [{
            required: true,
            message: '请输入出借人身份证号码',
            trigger: 'blur'
          }],
          bankAccount: [{
            required: true,
            message: '请输入出借人银行账户',
            trigger: 'blur'
          }]

        },
        inMoneyRules: {
          name: [{
            required: true,
            message: '请输入借款人姓名',
            trigger: 'blur'
          }],
          idCard: [{
            required: true,
            message: '请输入借款人身份证号',
            trigger: 'blur'
          }],
          bankAccount: [{
            required: true,
            message: '请输入借款人银行账户',
            trigger: 'blur'
          }]
        },
        moneyRules: {
          money: [{
            required: true,
            message: '请输入借款金额',
            trigger: 'blur'
          }],
          term: [{
            required: true,
            message: '请输入借款期限',
            trigger: 'blur'
          }],
          beginDate: [{
            required: true,
            message: '请输入借款起始时间',
            trigger: 'blur'
          }],
          interestRateMonth: [{
            required: true,
            message: '请输入月利率',
            trigger: 'blur'
          }],
          paymentDay: [{
            required: true,
            message: '请输入利息支付日',
            trigger: 'blur'
          }],
          outTimeInterestRateMonth: [{
            required: true,
            message: '请输入逾期利息月利率',
            trigger: 'blur'
          }],
          court: [{
            required: true,
            message: '请输入争议解决受理法院',
            trigger: 'blur'
          }],
        },
        emailRules: {
          receiverEmail: [{
            required: true,
            message: '请输入接收合同邮箱',
            trigger: 'blur'
          }]
        }


      }
    },
    created() {
      // this.initData();
    },
    methods: {
      next() {
        let flag = true;
        this.$refs['outMonryPerson'].validate((valid) => {
          flag = flag && valid;
        });

        this.$refs['inMonryPerson'].validate((valid) => {
          flag = flag && valid;
        });

        this.$refs['monryInfo'].validate((valid) => {
          flag = flag && valid;
        });

        if (flag) {
          let temp = this.active + 1;
          if (temp == 3 && this.checked == false) {
            this.$message({
              type: 'error',
              message: '请勾选确认框'
            });
            return false;
          }
          if (temp > 4) {
            return false;
          }

          if (temp == 4) {

            this.$refs['emailForm'].validate((valid) => {
              flag = flag && valid;
            });
            if (!flag) {
              this.$message({
                type: 'error',
                message: '请填写接收合同邮箱'
              });
              return false;
            }
            let param = {};
            param.outMoneyPersonName = this.outMonryPerson.name;
            param.outMoneyPersonIdCard = this.outMonryPerson.idCard;
            param.outMoneyPersonBankAccount = this.outMonryPerson.bankAccount;
            param.inMoneyPersonName = this.inMonryPerson.name;
            param.inMoneyPersonIdCard = this.inMonryPerson.idCard;
            param.inMoneyPersonBankAccount = this.inMonryPerson.bankAccount;
            param.court = this.moneyInfo.court;
            param.paymentDay = this.moneyInfo.paymentDay;
            param.money = this.moneyInfo.money;
            param.term = this.moneyInfo.term;
            param.termBeginDate = this.moneyInfo.beginDate;
            param.interestRateMonth = this.moneyInfo.interestRateMonth + "%";
            param.outTimeInterestRateMonth = this.moneyInfo.outTimeInterestRateMonth + "%";
            param.receiverEmail = this.emailForm.receiverEmail;
            this.sendJsonp(param);
          }
          this.active = temp;
        } else {
          this.$message({
            type: 'error',
            message: '请填写完整信息'
          });
        }


      },
      back() {
        if (this.active == 2) {
          this.checked = false;
        }
        this.active -= 1;
        if (this.active < 1) {
          this.active = 1;
        }
      },
      sendJsonp(param) {
        this.loading = true;
        this.$http.post('url', param).then(function (res) {
          if (res.status == 200) {
            this.$message({
              type: 'success',
              message: '提交成功，合同将发送至邮箱:' + param.receiverEmail
            });
            this.active = 4;
            this.loading = false;
          } else {
            this.$message({
              type: 'error',
              message: '提交失败，请稍后再试！'
            });
          }

        });
      },
      home() {
        this.$refs['monryInfo'].resetFields();
        this.$refs['inMonryPerson'].resetFields();
        this.$refs['outMonryPerson'].resetFields();
        this.$refs['monryInfo'].resetFields();
        this.active = 1;
        this.checked = false;
        this.$router.push({
          path: '/'
        })
      }
    },
  }
</script>


<style>
  #money-main {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 20px;
  }

  #content {
    margin: 20px;
    padding: 10px;
    text-align: left;
  }

  #money-info {
    margin-top: 30px;
  }

  .el-row {
    margin-bottom: 20px;
  }

  .el-col {
    border-radius: 4px;
  }

  .undei-line {
    text-decoration: underline;
  }
</style>