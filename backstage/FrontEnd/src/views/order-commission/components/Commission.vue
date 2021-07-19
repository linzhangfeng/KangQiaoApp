<template>
  <el-dialog :close-on-click-modal="false" title="佣金发放结果" :visible.sync="isVisible">
    <div>
      <span  class="tip_text_border">订单详情</span>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="orderData"
      border
      fit
      highlight-current-row
      style="width: 820px;"
    >
      <el-table-column label="用户名称" width="150px" align="center">
        <template slot-scope="{row}">
          <el-col>
            <span>{{row.userName}}</span>
          </el-col>
        </template>
      </el-table-column>
      <el-table-column label="订单号" width="150px" align="center">
        <template slot-scope="{row}">
          <el-col>
            <span>{{row.orderId}}</span>
          </el-col>
        </template>
      </el-table-column>
      <el-table-column label="订单名称" width="150px" align="center">
        <template slot-scope="{row}">
          <el-col>
            <span>{{row.aliasName}}</span>
          </el-col>
        </template>
      </el-table-column>
      <el-table-column label="支付方式" width="150px" align="center">
        <template slot-scope="{row}">
          <el-col>
            <span>{{row.payType==1?'微信支付':'其他支付'}}</span>
          </el-col>
        </template>
      </el-table-column>
      <el-table-column label="消费总额" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{row.sumCost/100}}元</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="mt_5">
      <span class="tip_text_border">佣金列表</span>
    </div>
    <el-table
      :key="1"
      v-loading="listLoading"
      :data="commissionData"
      border
      fit
      highlight-current-row
      style="width: 820px;"
    >
      <el-table-column label="用户名称" width="150px" align="center">
        <template slot-scope="{row}">
          <el-col>
            <span>{{row.userName}}</span>
          </el-col>
        </template>
      </el-table-column>
      <el-table-column label="佣金类型" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{row.commissionType ==1 ?'1级佣金':'2级佣金'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="佣金总额" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{row.money/100}}元</span>
        </template>
      </el-table-column>
      <el-table-column label="商品列表" width="420px" align="center">
        <template slot-scope="{row}">
          <el-table
            :key="2"
            v-loading="listLoading"
            :data="row.product"
            border
            fit
            highlight-current-row
            style="width: 400px;"
          >
            <el-table-column label="产品名称" width="150px" align="center">
              <template slot-scope="{row}">
                <span>{{row.productName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="数量" width="50px" align="center">
              <template slot-scope="{row}">
                <span>{{row.number}}</span>
              </template>
            </el-table-column>
            <el-table-column label="价格" width="60px" align="center">
              <template slot-scope="{row}">
                <span>{{row.price/100}}元</span>
              </template>
            </el-table-column>
            <el-table-column label="提成" width="60px" align="center">
              <template slot-scope="{row}">
                <span>{{row.radio}}%</span>
              </template>
            </el-table-column>
            <el-table-column label="佣金" width="60px" align="center">
              <template slot-scope="{row}">
                <span>{{row.money/100}}元</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confrim()">{{ $t('table.confirm') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    // 数字有默认值
    visible: {
      type: Boolean,
      default: false
    },
    confrim: {
      type: Function,
      default: function() {
        console.log("confrim");
      }
    }
  },
  data() {
    return {
      isVisible: false,
      listLoading: false,
      tableKey: 0,
      orderData: [
        {
          orderId: 123456,
          shopName: "肯德基",
          userName: "13666666666",
          sumCost: 40000,
          aliasName: "小乔洗衣粉1*50;小乔牙刷1*50",
          payType: 1,
          isCheck: false,
          product: [
            {
              productName: "小乔洗衣粉",
              price: 100,
              number: 20,
              cost: 2000
            },
            {
              productName: "小乔牙刷",
              price: 100,
              number: 20,
              cost: 2000
            }
          ]
        }
      ],
      commissionData: [
        {
          userName: "13888888888",
          money: 400,
          commissionType: 1,
          product: [
            {
              productName: "小乔洗衣粉",
              price: 100,
              radio: 3,
              number: 20,
              money: 200000
            },
            {
              productName: "小乔牙刷",
              price: 100,
              radio: 4,
              number: 20,
              money: 200
            }
          ]
        },
        {
          userName: "13888888888",
          money: 400,
          commissionType: 1,
          product: [
            {
              productName: "小乔洗衣粉",
              price: 100,
              radio: 3,
              number: 20,
              money: 200000
            },
            {
              productName: "小乔牙刷",
              price: 100,
              radio: 4,
              number: 20,
              money: 200
            }
          ]
        }
      ]
    };
  },
  computed: {},
  created: function() {
    this.isVisible = this.visible;
    console.log("visble：confrim：" + this.isVisible);
  },
  watch: {
    visible: {
      handler(newVal) {
        console.log(newVal);
        this.isVisible = newVal;
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style scoped>
.tip_text_border {
  margin-top: 5px;
  font-size: 16px;
  background-color: rgb(192, 192, 192);
}
.mt_5 {
  margin-top: 5px;
}
</style>
