<template>
  <div id="content">
    <el-steps :active="active" simple>
      <el-step title="填写离婚协议信息" icon="el-icon-edit"></el-step>
      <el-step title="确认协议信息" icon="el-icon-upload"></el-step>
      <el-step title="填写接收邮箱" icon="el-icon-message"></el-step>
      <el-step title="完成" icon="el-icon-check"></el-step>
    </el-steps>

    <el-card class="box-card">
      <div slot="header" class="clearfix" v-show="active == 1">
        <el-tag type="warning">请依次填写基础信息、子女、财产、债务、补充信息</el-tag>
      </div>
      <el-tabs tab-position="left" v-show="active == 1">
        <el-tab-pane label="一、基础信息">
          <el-row :gutter="20">
            <el-col :span="10" :offset="1">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>男方信息</span>
                </div>
                <div class="text item">
                  <el-form :model="maleForm" status-icon :rules="maleFormRules" ref="maleForm" label-width="100px"
                    class="demo-ruleForm">
                    <el-form-item label="姓名" prop="name">
                      <el-input clearable type="text" placeholder="男方姓名" v-model="maleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="出生日期" prop="birthday">
                      <el-date-picker style="width:100%" class="input-form-class" v-model="maleForm.birthday"
                        type="date" placeholder="男方出生日期" value-format="yyyy年MM月dd日">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item label="身份证号码" prop="idCard">
                      <el-input clearable placeholder="男方身份证号码" v-model.number="maleForm.idCard"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
              </el-card>
            </el-col>
            <el-col :span="10" :offset="2">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>女方信息</span>
                </div>
                <div class="text item">
                  <el-form :model="femaleForm" status-icon :rules="femaleFormRules" ref="femaleForm" label-width="100px"
                    class="demo-ruleForm">
                    <el-form-item label="姓名" prop="name">
                      <el-input clearable type="text" placeholder="女方姓名" v-model="femaleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="出生日期" prop="birthday">
                      <el-date-picker style="width:100%" class="input-form-class" v-model="femaleForm.birthday"
                        type="date" placeholder="女方出生日期" value-format="yyyy年MM月dd日">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item label="身份证号码" prop="idCard">
                      <el-input clearable placeholder="女方身份证号码" v-model.number="femaleForm.idCard"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22" :offset="1">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>其他信息</span>
                </div>
                <el-form :inline="true" :model="otherInfo" class="demo-form-inline" :rules="otherInfoRules">
                  <el-form-item>
                    <span>&nbsp;&nbsp;双方于&nbsp;&nbsp;</span>
                    <el-date-picker v-model="otherInfo.meetDate" type="date" placeholder="相识日期"
                      value-format="yyyy年MM月dd日">
                    </el-date-picker>
                    <span>&nbsp;&nbsp;认识，</span>
                  </el-form-item>
                  <el-form-item>
                    <span>于&nbsp;&nbsp;</span>
                    <el-date-picker v-model="otherInfo.marryDate" type="date" placeholder="结婚日期"
                      value-format="yyyy年MM月dd日">
                    </el-date-picker>
                    <span>&nbsp;&nbsp;在</span>
                  </el-form-item>
                  <el-form-item prop="marryAddress">
                    <el-input placeholder="结婚地点" v-model="otherInfo.marryAddress"></el-input>
                  </el-form-item>
                  <span style="vertical-align:middle; display：inline-block">登记结婚。</span>
                </el-form>
              </el-card>
            </el-col>
          </el-row>


        </el-tab-pane>
        <el-tab-pane label="二、子女信息">
          <div style="margin: 20px 0 0 20px;">
            <el-radio v-model="child" label="0">无孩子</el-radio>
            <el-radio v-model="child" label="1">有孩子</el-radio>
            <div style="margin-top: 20px;" v-show="child == 1">
              <el-form :model="childForm" ref="childForm" label-width="100px" class="demo-dynamic">
                <el-form-item v-for="(domain, index) in childForm.childs" :label="'孩子' + (index + 1)" :key="domain.key">
                  <el-row>
                    <el-col :span="4">
                      <el-input v-model="domain.name" prop="name" clearable></el-input>
                    </el-col>
                    <el-col :span="4" :offset="1">
                      <el-radio v-model="domain.sex" label="男">男</el-radio>
                      <el-radio v-model="domain.sex" label="女">女</el-radio>
                    </el-col>
                    <el-col :span="8" :offset="0">
                      孩子出生日期：
                      <el-date-picker v-model="domain.birthday" type="date" placeholder="孩子出生日期"
                        value-format="yyyy年MM月dd日">
                      </el-date-picker>
                    </el-col>
                    <el-col :span="4" :offset="1">
                      <el-button @click.prevent="removeChild(domain)">删除</el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item>
                  <el-button @click="addChild">新增</el-button>
                </el-form-item>
              </el-form>
            </div>



          </div>


        </el-tab-pane>
        <el-tab-pane label="三、财产信息">
          <div style="margin: 20px 0 0 20px;">
            <el-radio v-model="property" label="0">无财产</el-radio>
            <el-radio v-model="property" label="1">有财产</el-radio>

            <div style="margin-top: 30px;" v-show="property == 1">
              <el-collapse v-model="activeNames">
                <el-collapse-item title="存款" name="1">
                  <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                  <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                </el-collapse-item>
                <el-collapse-item title="房屋" name="2">
                  <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                  <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                </el-collapse-item>
                <el-collapse-item title="汽车" name="3">
                  <div>简化流程：设计简洁直观的操作流程；</div>
                  <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                  <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                </el-collapse-item>
                <el-collapse-item title="其他财产" name="4">
                  <div>
                    <p>1、双方各自名下的其他财产归各自所有。</p>
                    <p>2、双方各自的私人生活用品及首饰归各自所有。</p>
                  </div>
                </el-collapse-item>
              </el-collapse>


            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="四、债务信息">
          <div style="margin: 20px 0 0 20px;">
            <el-radio v-model="debt" label="0">无共同债务</el-radio>
            <el-radio v-model="debt" label="1">有共同债务</el-radio>
          </div>
          <div style="margin: 10px 20px;">
            <p>1、甲乙双方任何一方如对外负有债务，并非用于夫妻共同生活所需的，由负债方自行承担。</p>
          </div>
          <div style="margin: 10px 20px;" v-show="debt == 1">
            <p>2、共同债务：</p>
            <el-form :model="debtForm" ref="debtForm" label-width="100px" class="demo-dynamic">
              <el-form-item v-for="(domain, index) in debtForm.debts" :label="'债务' + (index + 1)" :key="domain.key">
                <el-row>
                  <el-col :span="6" :offset="0">
                    <el-date-picker v-model="domain.date" type="date" value-format="yyyy年MM月dd日" placeholder="债务发生时间">
                    </el-date-picker>
                  </el-col>
                  <el-col :span="5">向&nbsp;
                    <el-input style="width:150px;" v-model="domain.name" prop="name" clearable placeholder="债务借款人">
                    </el-input>
                  </el-col>
                  <el-col :span="6">所借债务&nbsp;
                    <el-input style="width:200px;" v-model="domain.money" placeholder="债务金额" clearable type="number">
                      <template slot="prepend">￥</template>
                    </el-input>
                  </el-col>
                  <el-col :span="3" :offset="1">
                    <el-button @click.prevent="removeDebt(domain)">删除</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button @click="addDebt">新增债务</el-button>
              </el-form-item>
            </el-form>
          </div>

        </el-tab-pane>
        <el-tab-pane label="五、补充信息">
          <div style="margin: 20px 0 0 20px;">
            <el-form :inline="true" :model="supplementForm" class="demo-form-inline" :rules="supplementFormRules"
              ref="supplementForm">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="离婚后一方不得干扰另一方的生活，不得向第三方泄露另一方的个人隐私和商业秘密，不得有故意损坏另一方名誉的行为，否则承担违约金" prop="money">
                    <el-input v-model="supplementForm.money" placeholder="违约金" clearable type="number">
                      <template slot="prepend">￥</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="协商不成受理法院" prop="court">
                    <el-input v-model="supplementForm.court" placeholder="协商不成受理法院" clearable type="text">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>


        </el-tab-pane>
      </el-tabs>

      <div id="money-info" v-show="active == 2">
        <el-row>
          <el-col :span="22" :offset="1">
            <div class="grid-content bg-purple">
              <div class="grid-content bg-purple">
                <el-row style="text-align:center;">
                  <strong style="font-size: 20px;">离婚协议书</strong>
                </el-row>

                <el-divider></el-divider>
                <p>男方：{{maleForm.name}}，{{maleForm.nation}}，{{maleForm.birthday}}生，身份证号码：{{maleForm.idCard}} </p>
                <p>女方：{{femaleForm.name}}，{{femaleForm.nation}}，{{femaleForm.birthday}}生，身份证号码：{{femaleForm.idCard}}
                </p>
                <p>双方于{{otherInfo.meetDate}}认识，于{{otherInfo.marryDate}}在{{otherInfo.marryAddress}}登记结婚，婚后于 年 月
                  日生育一个儿子（女儿），名。</p>
                <p>现夫妻感情已经完全破裂，没有和好可能，经双方协商达成一致意见，订立离婚协议如下：</p>

                <p>一、男女双方自愿离婚。</p>
                <p>二、子女抚养、抚养费及探望权：</p>
                <p>&nbsp;&nbsp;1、儿子（女儿） 由 方抚养，随同 方生活，抚养费由 方全部负责（甲乙双方分摊）， 方每月支付女儿抚养费（含抚养费、教育费、医疗费等） 元（大写： ），甲方应于每月的
                  日前将抚养费转到 指定的 银行账户内，账号： 。
                  本条约定的抚养费，可以根据双方的经济状况以及生活消费水平的变化作适当的调整，具体调整数额，由双方另行协商。
                  如果儿子（女儿）抚养期间因特殊情况产生一次性大额支出的，双方可再协商解决。</p>
                <p>&nbsp;&nbsp;2、抚养费支付期间，如果 方不能按时支付的，每天加收万分之五的赔偿金；</p>
                <p>&nbsp;&nbsp;3、抚养费支付到 满18周岁，超过18周岁以后，确实有必要支付抚养费时，双方协商确定数额和支付时间；</p>
                <p>&nbsp;&nbsp;4、离婚后一年内子女户口迁到 方，另一方应协助配合办理，如果不配合办理，则赔偿经济损失 元人民币；</p>
                <p>&nbsp;&nbsp;5、离婚后 方户口应在自离婚之后起一年内迁出，如果超过该时间仍未迁出的，则按日支付补偿金 元；</p>
                <p>&nbsp;&nbsp;6、离婚后，一方未经另一方书面同意，不得改变 的姓氏，擅自改变的，应及时恢复原来的姓氏，并一次性支付赔偿金 元；</p>
                <p>&nbsp;&nbsp;7、方应悉心抚养，不得虐待、遗弃、家庭暴力等行为；</p>
                <p>&nbsp;&nbsp;8、男方每个月可以在不影响 学习、生活的情况下，探望 次，但应提前通知 ，也可以到学校探望，每周可与女儿共同生活 天，寒暑假可以共同生活 天， 有协助的义务；</p>
                <p>&nbsp;&nbsp;9、甲、乙双方任何一方对 身心健康有损害行为的，将视为放弃抚养、教育的权利和义务，另一方有权要求变更直接抚养权或中止、取消探望权。</p>
                <p>三、 夫妻共同财产的处理：</p>

                <p>&nbsp;&nbsp;1、存款：双方名下现有银行存款共 元，双方各分一半，为 元。分配方式：各自名下的存款保持不变，但甲方应于 年 月 日前一次性支付 元给乙方；
                </p>
                <p>&nbsp;&nbsp;2、房屋（折价还是分配）
                </p>
                <p>&nbsp;&nbsp;（1）夫妻共同所有的位于 市 区 路 住房的所有权归乙方所有；
                </p>
                <p>&nbsp;&nbsp;（2）夫妻婚后购有坐落在 市 区 路 住房一套，合同价值人名币 万元，现值人名币 万元（包括房内装饰内附属设施）。购房时以甲方为主贷人贷款 万元，现尚剩余贷款本金
                  万元。该房购买时首付 万元，首付款来源于 。现协商该套房产归 方所有，由 方一次性支付 方现金 万元，此款在本协议签订后第二天付清；
                </p>
                <p>&nbsp;&nbsp;（3） 有义务自离婚之日起配合 办理贷款主贷人变更手续，以及产权变更手续，因办理产权变更登记手续所应支付的一切税费由
                  承担。相关变更手续在办理完离婚手续后即予以办理。若由于一方不予配合办理房产转移而给另一方带来不必要的损失，违约方必须赔付另一方 万元。
                </p>
                <p>&nbsp;&nbsp;（4）甲乙双方房屋内共有的家电及家具总折价 万元，现协议由 方所有，由 方一次性给付乙方现金 万元，此款在本协议签订后第二条付清。
                </p>
                <p>&nbsp;&nbsp;3、汽车：
                  夫妻婚后购买的 号 牌小型家用轿车总折价 万元，现协议由 方所有，由 方一次性给付乙方现金 万元，此款在本协议签订后第二条付清。
                </p>
                <p>&nbsp;&nbsp;4、其他财产：</p>
                <p>&nbsp;&nbsp;（1）双方各自名下的其他财产归各自所有。</p>
                <p>&nbsp;&nbsp;（2）双方各自的私人生活用品及首饰归各自所有。</p>
                <p>&nbsp;&nbsp;四、 债务处理：</p>
                <p>&nbsp;&nbsp;1、甲乙双方确认在婚姻关系存续期间发生的共同债务由甲乙双方共同偿还： 年 月 日甲乙双方共同向 所借债务 万元，由甲乙双方各承担50%即 万元。
                </p>
                <p>&nbsp;&nbsp;2、甲乙双方任何一方如对外负有债务，并非用于夫妻共同生活所需的，由负债方自行承担。
                </p>

                <p>五、一方隐瞒或转移夫妻共同财产的责任：</p>
                <p>
                  &nbsp;&nbsp;1、双方确认夫妻共同财产在上述第三条已作出明确列明。</p>
                <p>&nbsp;&nbsp;2、除上述房屋、家具、家电及银行存款、汽车外，并无其他财产，任何一方应保证以上所列婚内全部共同财产的真实性。
                </p>
                <p>&nbsp;&nbsp;3、双方承诺在本协议签署之前，均没有隐匿或转移共同财产的情形。</p>
                <p>&nbsp;&nbsp;4、如一方违反该承诺，隐匿或转移共同财产，则另一方不仅有权全额获得被隐匿或转移的财产，同时还有权要求对方支付与所隐匿或转移财产相等数额的赔偿。
                </p>
                <p>六、离婚后一方不得干扰另一方的生活，不得向第三方泄露另一方的个人隐私和商业秘密，不得有故意损坏另一方名誉的行为，否则承担违约金&nbsp;{{supplementForm.money}}&nbsp;元。
                </p>
                <p>七、双方承诺对该协议书的字词义非常清楚，并愿意完全履行本协议书，不存在受到胁迫欺诈，误解情形。
                </p>
                <p>八、本协议书一式三份，甲乙双方各执一份，婚姻登记部门保留一份。双方签字并经婚姻登记机关办理离婚手续后生效。
                </p>
                <p>九、如本协议生效后在执行中发生争议的，双方应协商解决，协商不成任何一方均可向&nbsp;{{supplementForm.court}}&nbsp;提起诉讼。
                </p>





                <el-row>
                  <el-col :span="24">
                    <br />
                    <el-checkbox v-model="checked">我已确认信息填写正确</el-checkbox>
                  </el-col>
                </el-row>
                <el-col :span="24"> </el-col>
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
                <el-form label-width="150px" :model="emailForm" ref="emailForm" :rules="emailRules">
                  <el-form-item label="接收合同邮箱地址：" prop="receiverEmail">
                    <el-input v-model="emailForm.receiverEmail"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>

        </el-row>
      </div>

      <div id="money-info" v-show="active == 4" style="text-align:center">

        <el-button style="margin-top: 12px;" @click="home()">完成</el-button>
      </div>

      <el-divider></el-divider>
      <div v-show="active != 4" style="text-align:center">
        <el-button style="margin-top: 12px;" @click="back()">上一步</el-button>
        <el-button style="margin-top: 12px;" @click="next()">下一步</el-button>
      </div>


    </el-card>
  </div>
</template>

<script>
  //  import headTop from '@/components/headTop'
  // import {getUserList, getUserCount} from '@/api/getData'
  export default {
    data() {
      return {
        active: 1,
        checked: false,
        maleForm: {
          name: '张三',
          nation: '汉族',
          birthday: '2000年1月1日',
          idCard: '1234567890'
        },
        femaleForm: {
          name: '李四',
          nation: '汉族',
          birthday: '2000年2月1日',
          idCard: '0987654321'
        },
        otherInfo: {
          meetDate: '2019年1月1日',
          marryDate: '2019年10月1日',
          marryAddress: 'xxx民政局'
        },
        child: '1',
        childForm: {
          childs: [{
            name: '小明',
            sex: '男',
            birthday: '2020年10月10日'
          }],
        },
        property: '1',
        activeNames: '1',

        debt: '1',
        debtForm: {
          debts: [{
            name: '小明',
            money: 0,
            date: '2020年10月10日'
          }],
        },

        supplementForm: {
          money: 0,
          court: 'xxx法院'
        },


        emailForm: {
          receiverEmail: 'maxcj.zhong@outlook.com'
        },
        maleFormRules: {},
        femaleFormRules: {},
        otherInfoRules: {},
        supplementFormRules: {
          money: [{
            required: true,
            message: '请输入违约金',
            trigger: 'blur'
          }],
          court: [{
            required: true,
            message: '请输入受理法院',
            trigger: 'blur'
          }]
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
        //验证        

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

            let param = {};

          }
          this.active = temp;
        } else {

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
      home() {
        this.active = 1;
        this.checked = false;
        this.$router.push({
          path: '/'
        })
      },
      removeChild(item) {
        console.log(this.childForm);
        var index = this.childForm.childs.indexOf(item);
        if (index !== -1) {
          this.childForm.childs.splice(index, 1)
        }
      },
      addChild() {
        console.log(this.childForm);
        this.childForm.childs.push({
          name: '',
          sex: '',
          birthday: '',
          key: Date.now()
        });
      },
      removeDebt(item) {
        console.log(this.debtForm);
        var index = this.debtForm.debts.indexOf(item);
        if (index !== -1) {
          this.debtForm.debts.splice(index, 1)
        }
      },
      addDebt() {
        console.log(this.debtForm);
        this.debtForm.debts.push({
          name: '',
          money: 0,
          date: '',
          key: Date.now()
        });
      }

    },
  }
</script>

<style>
  #content {
    margin: 20px;
    padding: 10px;
    text-align: left;
  }

  .box-card {
    margin-top: 20px;
  }

  #money-info {
    margin-top: 30px;
  }
</style>