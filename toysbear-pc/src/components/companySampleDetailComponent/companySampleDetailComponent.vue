<template>
  <div>
    <el-card class="box-card">
      <div class="infoBox">
        <ul class="customerInfoBox">
          <li class="clientName">
            <span>公司名称：</span>
            <span class="content">{{ item.companyName }}</span>
          </li>
          <div class="middle">
            <li class="itemBox">
              <span>订单编号：</span>
              <span class="content">{{ item.sampleNumber }}</span>
            </li>
            <li class="itemBox">
              <span>找样时间：</span>
              <span class="content">{{
                item.createdOn && item.createdOn.replace(/T/, " ")
              }}</span>
            </li>
          </div>
        </ul>
        <div class="btns">
          <el-button type="primary" @click="openSelectTemplate">
            <i class="iconfont icon-daochujinruchukou"></i>
            导出找样
          </el-button>
        </div>
      </div>
    </el-card>
    <el-table
      size="mini"
      :data="tableData"
      :header-cell-style="{ backgroundColor: '#2468a9', color: '#fff' }"
      style="width:100%"
      ref="dataTable"
      height="600px"
    >
      <el-table-column
        label="序号"
        fixed
        align="center"
        type="index"
        width="50"
      >
      </el-table-column>
      <el-table-column fixed label="产品图片" width="82" align="center">
        <template slot-scope="scope">
          <el-image
            fit="contain"
            :z-index="9999"
            style="width: 60px; height:60px;"
            :preview-src-list="scope.row.imgUrlList"
            :src="scope.row.img"
            lazy
          >
            <div slot="placeholder" class="image-slot">
              <img
                class="errorImg"
                style="width: 60px; height:60px;"
                src="~@/assets/images/imgError.png"
                alt
              />
            </div>
            <div slot="error" class="image-slot">
              <img
                class="errorImg"
                style="width: 60px; height:60px;"
                src="~@/assets/images/imgError.png"
                alt
              />
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        fixed
        prop="fa_no"
        label="产品货号"
        align="center"
      ></el-table-column>
      <el-table-column
        fixed
        prop="name"
        label="名称"
        align="center"
      ></el-table-column>
      <el-table-column prop="costPrice" label="价格(¥)" align="center">
        <template slot-scope="scope">
          <span style="color:#ff0b00;">¥</span>
          <span style="color:#ff0b00;">
            {{ scope.row.price }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="产品规格(CM)" width="100" align="center">
        <template slot-scope="scope">
          <div>
            {{ scope.row.pr_le }} x {{ scope.row.pr_wi }} x
            {{ scope.row.pr_hi }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="包装规格(CM)" width="130" align="center">
        <template slot-scope="scope">
          <div>
            {{ scope.row.in_le }} x {{ scope.row.in_wi }} x
            {{ scope.row.in_hi }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="外箱规格(CM)" width="100" align="center">
        <template slot-scope="scope">
          <div>
            {{ scope.row.ou_le }} x {{ scope.row.ou_wi }} x
            {{ scope.row.ou_hi }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="毛重/净重(KG)" align="center">
        <template slot-scope="scope">
          <div>{{ scope.row.gr_we }}/{{ scope.row.ne_we }}</div>
        </template>
      </el-table-column>
      <el-table-column label="体积/材积(CBM/CUFT)" width="90" align="center">
        <template slot-scope="scope">
          <div>{{ scope.row.bulk_stere }}/{{ scope.row.bulk_feet }}</div>
        </template>
      </el-table-column>
      <el-table-column label="厂商资料" align="center">
        <el-table-column prop="supplierName" label="厂名" align="center">
        </el-table-column>
        <el-table-column
          prop="supplierTelephoneNumber"
          label="电话"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="supplierPhone"
          label="手机"
          align="center"
          width="100"
        >
        </el-table-column>
      </el-table-column>
      <el-table-column label="展厅来源" align="center" prop="exhibitionName">
      </el-table-column>
    </el-table>
    <center style="margin-top:20px;">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        background
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        :total="totalCount"
        :current-page.sync="currentPage"
        @current-change="currentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
    </center>
    <!-- 导出订单模板dialog -->
    <transition name="el-zoom-in-center">
      <el-dialog
        title="订单模板"
        append-to-body
        v-show="exportTemplateDialog"
        :visible.sync="exportTemplateDialog"
        top="60px"
        width="80%"
      >
        <el-card class="box-card">
          <div
            slot="header"
            style="display:flex; align-items:center; justify-content:space-between"
          >
            <span class="headerTitle">报出价(带工厂信息)</span>
            <div>
              <div class="isFac">
                <span class="facTitle">是否按厂商导出</span>
                <el-select
                  v-model="imageExportWay"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in imageExportWayList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <el-radio-group class="myExportWay" v-model="exportWay">
                <el-radio :label="1">带图片导出</el-radio>
                <el-radio :label="2">不带图片导出</el-radio>
              </el-radio-group>
              <el-button
                type="primary"
                @click="openViewer(require('@/assets/images/mode1.png'))"
                >预览</el-button
              >
              <el-button type="success" @click="exportOrder(1)">导出</el-button>
            </div>
          </div>
          <div class="modeImgBox">
            <el-image
              fit="contain"
              class="myImg"
              :src="require('@/assets/images/mode1.png')"
            ></el-image>
          </div>
        </el-card>
        <el-card class="box-card">
          <div
            slot="header"
            style="display:flex; align-items:center; justify-content:space-between"
          >
            <span class="headerTitle">报出价(不带工厂信息)</span>
            <div>
              <div class="isFac">
                <span class="facTitle">是否按厂商导出</span>
                <el-select
                  v-model="imageExportWay"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in imageExportWayList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <el-radio-group class="myExportWay" v-model="exportWay">
                <el-radio :label="1">带图片导出</el-radio>
                <el-radio :label="2">不带图片导出</el-radio>
              </el-radio-group>
              <el-button
                type="primary"
                @click="openViewer(require('@/assets/images/mode2.png'))"
                >预览</el-button
              >
              <el-button type="success" @click="exportOrder(2)">导出</el-button>
            </div>
          </div>
          <div class="modeImgBox">
            <el-image
              fit="contain"
              class="myImg"
              :src="require('@/assets/images/mode2.png')"
            ></el-image>
          </div>
        </el-card>
        <el-card class="box-card">
          <div
            slot="header"
            style="display:flex; align-items:center; justify-content:space-between"
          >
            <span class="headerTitle">出厂价(带工厂信息)</span>
            <div>
              <div class="isFac">
                <span class="facTitle">是否按厂商导出</span>
                <el-select
                  v-model="imageExportWay"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in imageExportWayList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <el-radio-group class="myExportWay" v-model="exportWay">
                <el-radio :label="1">带图片导出</el-radio>
                <el-radio :label="2">不带图片导出</el-radio>
              </el-radio-group>
              <el-button
                type="primary"
                @click="openViewer(require('@/assets/images/mode3.png'))"
                >预览</el-button
              >
              <el-button type="success" @click="exportOrder(3)">导出</el-button>
            </div>
          </div>
          <div class="modeImgBox">
            <el-image
              fit="contain"
              class="myImg"
              :src="require('@/assets/images/mode3.png')"
            ></el-image>
          </div>
        </el-card>
        <el-card class="box-card">
          <div
            slot="header"
            style="display:flex; align-items:center; justify-content:space-between"
          >
            <span class="headerTitle">出厂价+报出价+工厂信息</span>
            <div>
              <div class="isFac">
                <span class="facTitle">是否按厂商导出</span>
                <el-select
                  v-model="imageExportWay"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in imageExportWayList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <el-radio-group class="myExportWay" v-model="exportWay">
                <el-radio :label="1">带图片导出</el-radio>
                <el-radio :label="2">不带图片导出</el-radio>
              </el-radio-group>
              <el-button
                type="primary"
                @click="openViewer(require('@/assets/images/mode4.png'))"
                >预览</el-button
              >
              <el-button type="success" @click="exportOrder(4)">导出</el-button>
            </div>
          </div>
          <div class="modeImgBox">
            <el-image
              fit="contain"
              class="myImg"
              :src="require('@/assets/images/mode4.png')"
            ></el-image>
          </div>
        </el-card>
        <!-- 模板预览 -->
        <el-image-viewer
          style="z-index:9999"
          v-if="showViewer"
          :on-close="closeViewer"
          :url-list="viewerImgList"
        />
      </el-dialog>
    </transition>
  </div>
</template>

<script>
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import { getCurrentTime } from "@/assets/js/common.js";
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {
    ElImageViewer
  },
  data() {
    return {
      imageExportWayList: [
        { value: 0, label: "请选择" },
        { value: 2, label: "按厂商单独导图片" },
        { value: 1, label: "不按厂商单独导图片" }
      ],
      imageExportWay: 0,
      exportWay: 1,
      showViewer: false,
      exportTemplateDialog: false,
      isOrderDetailDialog: false,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      totalCount: 0
    };
  },
  methods: {
    // 导出
    exportOrder(type) {
      console.log(this.item);
      this.$http
        .post(
          "/api/ExportCompanySampleListToExcel",
          {
            excelExportWay: this.exportWay,
            imageExportWay: this.imageExportWay ? this.imageExportWay : 0,
            templateType: type,
            sampleNumber: this.item.sampleNumber
          },
          { responseType: "blob", timeout: 1000000000 }
        )
        .then(res => {
          const currentTime = getCurrentTime();
          const fileName = this.item.companyName
            ? this.item.companyName + "_" + currentTime + ".xlsx"
            : currentTime + ".xlsx";
          const zipName = this.item.companyName
            ? this.item.companyName + "_" + getCurrentTime() + ".zip"
            : getCurrentTime() + ".zip";
          const myName = this.imageExportWay > 0 ? zipName : fileName;
          const blob = res.data;
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            // 兼容IE
            window.navigator.msSaveOrOpenBlob(blob, myName);
          } else {
            // 兼容Google及fireFox
            const link = document.createElement("a");
            link.style.display = "none";
            link.download = myName;
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(link.href); // 释放URL 对象
            document.body.removeChild(link);
          }
        });
    },
    // 点击关闭预览模板
    closeViewer() {
      this.showViewer = false;
    },
    // 打开预览模板
    openViewer(url) {
      this.viewerImgList = [url];
      this.showViewer = true;
    },
    // 打开选择导出模板
    openSelectTemplate() {
      this.exportTemplateDialog = true;
    },
    // 打开订单详情
    openOrderDetail() {
      this.isOrderDetailDialog = true;
    },
    // 获取公司订单详情订单
    async getCompanySamplelistByNumber() {
      const res = await this.$http.post("/api/CompanySamplelistByNumber", {
        skipCount: this.currentPage,
        maxResultCount: this.pageSize,
        sampleNumber: this.item.sampleNumber
      });
      console.log(res);
      if (res.data.result.code === 200) {
        this.tableData = res.data.result.item.items;
        this.totalCount = res.data.result.item.totalCount;
      } else {
        this.$message.error(res.data.result.msg);
      }
    },
    // 切换当前页
    currentChange(page) {
      this.currentPage = page;
      this.getCompanySamplelistByNumber();
    },
    // 切换当前页条数
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      if (this.currentPage * pageSize > this.totalCount) return false;
      this.getCompanySamplelistByNumber();
    }
  },
  created() {
    this.getCompanySamplelistByNumber();
  },
  mounted() {}
};
</script>
<style scoped lang="less">
@deep: ~">>>";
.infoBox {
  display: flex;
  align-items: center;
  height: 50px;
  align-items: center;
  .totalAllBox {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .totlePrice {
      display: flex;
      justify-content: center;
      font-weight: bold;
      .content {
        color: rgb(255, 11, 0);
      }
    }
  }
  .customerInfoBox {
    flex: 1;
    display: flex;
    .middle {
      flex: 1;
      display: flex;
      justify-content: space-evenly;
      .itemBox {
        display: flex;
        justify-content: center;
        font-weight: bold;
        .content {
          color: #999;
          font-weight: normal;
        }
      }
    }
    .totlePrice,
    .clientName {
      font-weight: bold;
      .content {
        color: #999;
        font-weight: normal;
      }
    }
  }
  .btns {
    margin-left: 20px;
    height: 100%;
    display: flex;
    align-items: center;
    .el-button--primary {
      color: #fff;
      background-color: #2468a9;
      border-color: #2468a9;
    }
  }
}
@{deep} .el-dialog__header {
  padding: 10px 20px;
}
@{deep}.el-dialog__body {
  padding: 20px;
}
@{deep} .el-card {
  margin-top: 20px;
  background-color: #fff;
  &:first-child {
    margin-top: 0;
  }
  .el-card__header,
  .el-card__body {
    padding: 5px 20px;
    background-color: #fff;
    .modeImgBox {
      width: 100%;
      height: 100px;
      .myImg {
        height: 100px;
        width: 100%;
      }
    }
  }
  .el-card__header {
    background-color: #dde8f8;
    .headerTitle {
      font-size: 16px;
      font-weight: bold;
    }
  }
}
.myExportWay {
  margin-right: 20px;
}
.isFac {
  display: inline;
  margin: 20px;
  .facTitle {
    margin-right: 10px;
  }
}
</style>
