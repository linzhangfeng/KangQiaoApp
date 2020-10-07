<template>
  <el-dialog :close-on-click-modal="false" title="修改订单" :visible.sync="isVisible">
    <el-form
      ref="dataForm_edit"
      :rules="rules"
      :model="orderModel"
      label-position="left"
      label-width="100px"
      style="width: 400px; margin-left:50px;"
    >
      <el-form-item label="订单ID" prop="title">
        <el-input v-model="orderModel.orderId" placeholder :disabled="true" />
      </el-form-item>
      <el-form-item label="用户名" prop="title">
        <el-input v-model="orderModel.userName" placeholder :disabled="true" />
      </el-form-item>
      <el-form-item label="消费总额" prop="title">
        <el-input v-model="orderModel.money" placeholder :disabled="true" />
      </el-form-item>
    </el-form>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="productList"
      border
      fit
      highlight-current-row
      style="width: 560px;"
    >
      <el-table-column label="产品名称" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{row.productName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="数量" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{row.number}}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{row.price/100}}元</span>
        </template>
      </el-table-column>
      <el-table-column label="消费金额" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{row.sumCost/100}}元</span>
        </template>
      </el-table-column>
    </el-table>

    <div slot="footer" class="dialog-footer">
      <el-button @click="isVisible = false">{{ $t('table.cancel') }}</el-button>
      <el-button type="primary" @click="updateData()">{{ $t('table.confirm') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import waves from "@/directive/waves"; // waves directive
import { getOrderProductList, fastAddOrder } from "@/api/order-commission";
import {
  packageOrderDetailsData,
  getOrderStruct,
  packageOrderProductData,
  getOrderTestData
} from "../config";
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
    },
    model: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      isVisible: false,
      listLoading: false,
      tableKey: 0,
      orderId: 0,
      productList: [],
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
      orderModel: {
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

    // if (this.model) {
    //   var orderId = this.model.orderId;
    //   this.getProductList(orderId);
    // }
  },
  watch: {
    visible: {
      handler(newVal) {
        console.log(newVal);
        this.isVisible = newVal;
      },
      deep: true,
      immediate: true
    },
    model: {
      handler(newVal) {
        console.log("lin=model:"+JSON.stringify(newVal));
        this.orderModel = newVal;
        if (this.orderModel) {
          var orderId = this.orderModel.orderId;
          this.getProductList(orderId);
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    getProductList(orderId) {
      this.productList = [];
      getOrderProductList({
        orderId: orderId
      }).then(response => {
        var recv_data = response.data;
        this.productList = packageOrderProductData(recv_data.list);
        console.log(
          "lin=getOrderProduct:" + JSON.stringify(this.productList)
        );
      });
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
