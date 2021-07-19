<template>
  <el-dialog :close-on-click-modal="false" title="添加订单" :visible.sync="isVisible">
    <el-form
      ref="dataForm"
      :rules="rules"
      :model="orderDataModel"
      label-position="left"
      label-width="100px"
      style="width: 400px; margin-left:50px;"
    >
      <el-form-item label="订单内容" prop="title">
        <el-input v-model="orderDataModel.dataStr" placeholder />
      </el-form-item>
    </el-form>

    <el-table
      :key="0"
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
          <el-col v-if="!row.isCheck">
            <span>
              <el-button
                v-waves
                class="filter-item"
                type="primary"
                icon="el-icon-search"
                @click="handleCheckUser(row)"
              >检测用户</el-button>
            </span>
          </el-col>
          <el-col v-if="row.isCheck">
            <span class="user-check-text">用户检测通过</span>
          </el-col>
        </template>
      </el-table-column>
      <el-table-column label="消费总额" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{row.sumCost}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品列表" width="500px" align="center">
        <template slot-scope="{row}">
          <el-table
            :key="1"
            v-loading="listLoading"
            :data="row.product"
            border
            fit
            highlight-current-row
            style="width: 470px;"
          >
            <el-table-column label="产品名称" width="150px" align="center">
              <template slot-scope="{row}">
                <span>{{row.productName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="数量" width="100px" align="center">
              <template slot-scope="{row}">
                <span>{{row.number}}</span>
              </template>
            </el-table-column>
            <el-table-column label="价格" width="100px" align="center">
              <template slot-scope="{row}">
                <span>{{row.price/100}}元</span>
              </template>
            </el-table-column>
            <el-table-column label="消费金额" width="100px" align="center">
              <template slot-scope="{row}">
                <span>{{row.cost/100}}元</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
    </el-table>

    <div slot="footer" class="dialog-footer">
      <el-button @click="isVisible = false">{{ $t('table.cancel') }}</el-button>
      <el-button type="primary" @click="submit(orderData)">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import waves from "@/directive/waves"; // waves directive
export default {
  directives: { waves },
  props: {
    // 数字有默认值
    visible: {
      type: Boolean,
      default: false
    },
    submit: {
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
      orderDataModel: {
        dataStr: ""
      },
      rules: {
        userName: [
          { required: true, message: "userName is required", trigger: "change" }
        ],
        money: [
          { required: true, message: "money is required", trigger: "change" }
        ]
      },
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
