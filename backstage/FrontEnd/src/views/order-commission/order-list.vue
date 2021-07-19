<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.orderId"
        :placeholder="$t('userInformation.orderId')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.userName"
        :placeholder="$t('userInformation.userName')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >{{ $t('table.search') }}</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >{{ $t('table.add') }}</el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >{{ $t('table.export') }}</el-button>
      <el-checkbox
        v-model="showReviewer"
        class="filter-item"
        style="margin-left:15px;"
        @change="tableKey=tableKey+1"
      >{{ $t('table.reviewer') }}</el-checkbox>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column :label="$t('userInformation.orderId')" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.orderId }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('userInformation.userName')" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单名称" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.orderAliasName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="消费总额" width="80px">
        <template slot-scope="{row}">
          <span style="color:red;">{{ row.money }}</span>
        </template>
      </el-table-column>
      <el-table-column label="佣金状态" width="80px">
        <template slot-scope="{row}">
          <span
            :class="{'color_commission_type_green':(row.commissionState==1),'color_commission_type_red':(row.commissionState!=1)}"
          >{{ row.commissionState == 1?"已发放":"未发放" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.createTime')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createtime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.updateTime')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.updatetime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('userInformation.actions')"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{row,$index}">
          <el-button
            type="primary"
            size="mini"
            @click="handleUpdate(row)"
          >{{ $t('userInformation.edit') }}</el-button>
          <el-button
            v-if="row.status!='deleted'"
            size="mini"
            type="danger"
            @click="handleDelete(row,$index)"
          >{{ $t('userInformation.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isShowAdd = false">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>
    <commission :visible="test" :confrim="handlerCommissionConfirm"></commission>
    <add-order :visible="isShowAdd"></add-order>
    <edit-order :visible="isShowEdit" :model="orderModel"></edit-order>
  </div>
</template>

<script>
import {
  getOrderList,
  addOrder,
  editOrder,
  deleteOrder,
  fetchPv,
  createArticle,
  updateArticle
} from "@/api/article";
import { checkUser } from "@/api/user";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import { getListData } from "./testData";
import {
  packageOrderDetailsData,
  getOrderStruct,
  packageOrderProductData,
  getOrderTestData
} from "./config";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { getOrderProductList, fastAddOrder } from "@/api/order-commission";
import Commission from "./components/Commission";
import AddOrder from "./components/AddOrder";
import EditOrder from "./components/EditOrder";
const calendarTypeOptions = [
  { key: "CN", display_name: "China" },
  { key: "US", display_name: "USA" },
  { key: "JP", display_name: "Japan" },
  { key: "EU", display_name: "Eurozone" }
];

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name;
  return acc;
}, {});

export default {
  name: "ComplexTable",
  components: { Pagination, Commission, AddOrder, EditOrder },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      test: false,
      listLoading: true,
      orderModel: null,
      listQuery: {
        page: 1,
        limit: 20,
        userName: undefined,
        orderId: undefined,
        sort: "+id"
      },
      orderProductList: [],
      AddOrderData: [],
      orderTemp: {
        userName: undefined,
        number: undefined,
        productName: undefined,
        dialogRemark: "备注",
        timestamp: new Date()
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [
        { label: "ID Ascending", key: "+id" },
        { label: "ID Descending", key: "-id" }
      ],
      statusOptions: ["published", "draft", "deleted"],
      showReviewer: false,

      dialogFormVisible: false,
      isShowAdd: false,
      isShowEdit: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create"
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        userName: [
          { required: true, message: "userName is required", trigger: "change" }
        ],
        money: [
          { required: true, message: "money is required", trigger: "change" }
        ]
      },
      downloadLoading: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      getOrderList(this.listQuery).then(response => {
        var recv_data = response.data;
        this.list = packageOrderDetailsData(recv_data.list);
        this.total = recv_data.count;
        setTimeout(() => {
          this.listLoading = false;
        }, 0.5 * 1000);
      });
    },

    getOrderProduct(orderId) {
      this.orderProductList = [];
      getOrderProductList({
        orderId: orderId
      }).then(response => {
        var recv_data = response.data;
        this.orderProductList = packageOrderProductData(recv_data.list);
        console.log(
          "lin=getOrderProduct:" + JSON.stringify(this.orderProductList)
        );
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },

    handleModifyStatus(row, status) {
      this.$message({
        message: "操作成功",
        type: "success"
      });
      row.status = status;
    },
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+id";
      } else {
        this.listQuery.sort = "-id";
      }
      this.handleFilter();
    },
    resetTemp() {
      this.orderTemp = Object.assign({}, getOrderStruct()); // copy obj
    },
    handleCreate() {
      this.resetTemp();
      this.isShowAdd = false;
      this.AddOrderData = getOrderTestData();
      setTimeout(() => {
        this.isShowAdd = true;
        console.log("lin=handleCreate:" + this.test);
      }, 200);
    },

    fastCreateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.orderTemp.id = parseInt(Math.random() * 100) + 1024; // mock a id
          this.orderTemp.author = "vue-element-admin";
          var req_data = {};
          req_data["list"] = this.AddOrderData;
          fastAddOrder(req_data).then(() => {
            this.getList();
            this.isShowAdd = false;
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },

    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.orderTemp.id = parseInt(Math.random() * 100) + 1024; // mock a id
          this.orderTemp.author = "vue-element-admin";
          addOrder(this.orderTemp).then(() => {
            this.getList();
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    handleUpdate(row) {
      // this.orderTemp = = Object.assign({}, row); // copy obj
      this.orderModel = Object.assign({}, row); // copy obj
      this.dialogStatus = "update";
      this.isShowEdit = false;
      setTimeout(() => {
        this.isShowEdit = true;
      }, 200);
      // this.getOrderProduct(this.orderTemp.orderId);
      // this.$nextTick(() => {
      //   this.$refs["dataForm_edit"].clearValidate();
      // });
    },
    updateData() {
      this.$refs["dataForm_edit"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          tempData.timestamp = +new Date(tempData.timestamp); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          editOrder(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id);
            this.list.splice(index, 1, this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    handleDelete(row, index) {
      var temp = Object.assign({}, row); // copy obj
      deleteOrder(temp).then(response => {
        this.getList();
        this.$notify({
          title: "成功",
          message: "删除成功",
          type: "success",
          duration: 2000
        });
        this.list.splice(index, 1);
      });
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData;
        this.dialogPvVisible = true;
      });
    },
    handleDownload() {
      this.test = false;
      console.log("lin=handleDownload:" + this.test);
      setTimeout(() => {
        this.test = true;
        console.log("lin=handleDownload:" + this.test);
      }, 200);
    },
    handlerCommissionConfirm() {
      console.log("lin=handlerCommissionConfirm:" + this.test);
      this.test = false;
    },
    formatJson(filterVal) {
      return this.list.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}` ? "ascending" : "descending";
    },
    handleCheckUser(row) {
      var userName = row.userName;
      checkUser({
        userName: userName
      }).then(response => {
        var recv_data = response.data;
        if (response.code == 20000) {
          row.isCheck = true;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.color_commission_type_green {
  color: green;
}
.color_commission_type_red {
  color: red;
}
.user-check-text {
  background-color: rgb(0, 255, 55);
}
.el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*height:600px;*/
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
}
.el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
}
.customWidth {
  width: 120%;
}
</style>