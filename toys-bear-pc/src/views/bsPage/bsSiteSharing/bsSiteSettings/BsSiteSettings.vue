<template>
  <div class="bsSiteSettings">
    <div class="title">站点设置 ({{ totalCount }})</div>
    <div class="searchBox">
      <div class="left">
        <div class="item">
          <span class="label">关键字：</span>
          <el-input
            v-focus
            type="text"
            size="medium"
            v-model="searchForm.keyword"
            clearable
            placeholder="请输入关键词"
            @keyup.native.enter="search"
          ></el-input>
        </div>
        <div class="item" v-if="userInfo.userInfo.isMain">
          <span class="label">业务员：</span>
          <el-select
            v-model="staffId"
            filterable
            size="medium"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in staffList"
              :key="item.id"
              :label="item.linkman"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <span class="label">时间段：</span>
          <el-date-picker
            size="medium"
            value-format="yyyy-MM-ddTHH:mm:ss"
            v-model="searchForm.dateTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          >
          </el-date-picker>
        </div>
        <div class="item">
          <el-button
            @click="search"
            type="primary"
            icon="el-icon-search"
            size="medium"
          >
            搜索
          </el-button>
        </div>
      </div>
      <el-button
        @click="openAddClien"
        type="primary"
        icon="el-icon-plus"
        size="medium"
      >
        新增域名
      </el-button>
    </div>
    <div class="tableBox">
      <Table :table="tableData"></Table>
      <center style="padding: 20px 0">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 20, 30, 40]"
          background
          :total="totalCount"
          :page-size="pageSize"
          :current-page.sync="currentPage"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </center>
    </div>
    <!-- 新增站点域名 -->
    <transition name="el-zoom-in-center">
      <el-dialog
        title="新增域名"
        v-if="showAddDomain"
        :visible.sync="showAddDomain"
        width="800px"
      >
        <bsAddSiteDomain
          :isEdit="isEdit"
          :currentRow="currentRow"
          @success="addSuccess"
        />
      </el-dialog>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Table from "@/components/table";
import bsAddSiteDomain from "./bsAddSiteDomain/bsAddSiteDomain";
export default {
  name: "bsSiteSettings",
  components: {
    bsAddSiteDomain,
    Table
  },
  data() {
    return {
      staffList: [],
      staffId: null,
      currentRow: {},
      isEdit: false,
      showAddDomain: false,
      searchForm: {
        keyword: null,
        dateTime: null
      },
      pageSize: 10,
      currentPage: 1,
      totalCount: 0,
      tableData: {
        data: [],
        showLoading: false,
        sizeMini: "mini",
        isIndex: true,
        columns: [
          { prop: "name", label: "站点", width: 300 },
          { prop: "url", label: "域名地址" },
          { prop: "createdBy", label: "业务员", width: 300 },
          {
            prop: "createdOn",
            width: 300,
            label: "新增时间",
            render: row => {
              return row.createdOn.replace(/T.*/, "");
            }
          }
        ],
        btnWidth: 200,
        actions: [
          {
            classWrapper: () => {
              return "primary";
            },
            textWrapper: () => {
              return "编辑";
            },
            methods: row => {
              this.openEdit(row);
            }
          },
          {
            classWrapper: () => {
              return "danger";
            },
            textWrapper: () => {
              return "删除";
            },
            methods: row => {
              this.handleDelete(row);
            }
          }
        ]
      }
    };
  },
  methods: {
    // 查询
    search() {
      this.getSites();
    },
    // 获取公司下的员工列表
    async getStaffList() {
      const res = await this.$http.post("/api/CompanyUserList", {
        orgCompanyID: this.currentComparnyId
      });
      if (res.data.result.code === 200) {
        this.staffList = res.data.result.item.personnels;
      } else {
        this.$common.handlerMsgState({
          msg: res.data.result.msg,
          type: "danger"
        });
      }
      this.getSites();
    },
    // 删除站点信息
    handleDelete(row) {
      this.$confirm("此操作将永久删除该站点, 是否继续?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(async () => {
          const res = await this.$http.post("/api/DeleteWebsiteInfo", row);
          const { code, msg } = res.data.result;
          if (code === 200) {
            this.$common.handlerMsgState({
              msg: "删除成功",
              type: "success"
            });
            this.getSites();
          } else {
            this.$common.handlerMsgState({
              msg: msg,
              type: "danger"
            });
          }
        })
        .catch(() => {
          this.$common.handlerMsgState({
            msg: "取消删除",
            type: "warning"
          });
        });
    },
    // 打开编辑域名
    openEdit(row) {
      this.currentRow = row;
      this.isEdit = true;
      this.showAddDomain = true;
    },
    // 新增域名成功
    addSuccess() {
      this.showAddDomain = false;
      this.getSites();
    },
    // 打开新增域名
    openAddClien() {
      this.isEdit = false;
      this.showAddDomain = true;
    },
    // 获取站点列表
    async getSites() {
      const fd = {
        staffId: this.staffId,
        skipCount: this.currentPage,
        maxResultCount: this.pageSize,
        keyword: this.searchForm.keyword,
        startTime: this.searchForm.dateTime && this.searchForm.dateTime[0],
        endTime: this.searchForm.dateTime && this.searchForm.dateTime[1]
      };
      for (const key in fd) {
        if (fd[key] === null || fd[key] === undefined || fd[key] === "") {
          delete fd[key];
        }
      }
      const res = await this.$http.post("/api/SearchWebsiteInfosPage", fd);
      if (res.data.result.code === 200) {
        this.tableData.data = res.data.result.item.items;
        this.totalCount = res.data.result.item.totalCount;
      } else {
        this.$common.handlerMsgState({
          msg: res.data.result.msg,
          type: "danger"
        });
      }
    },
    // 切換頁容量
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      if (
        this.currentPage * pageSize > this.totalCount &&
        this.currentPage != 1
      )
        return false;
      this.getSites();
    },
    // 修改当前页
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getSites();
    }
  },
  mounted() {
    this.getStaffList();
  },
  computed: {
    ...mapState(["currentComparnyId", "userInfo"])
  }
};
</script>
<style scoped lang="less">
@deep: ~">>>";
.bsSiteSettings {
  min-height: 100%;
  background-color: #fff;
  padding: 0 20px;
  .title {
    height: 55px;
    line-height: 55px;
    font-size: 15px;
    font-weight: 700;
    padding-left: 15px;
    box-sizing: border-box;
    position: relative;
    border-bottom: 1px solid #e5e5e5;
    &::before {
      width: 4px;
      height: 14px;
      background-color: #3368a9;
      position: absolute;
      left: 0;
      top: 50%;
      content: "";
      transform: translate(0, -50%);
    }
  }
  .searchBox {
    height: 76px;
    display: flex;
    align-items: center;
    .left {
      flex: 1;
      display: flex;
      align-items: center;
      .item {
        display: flex;
        align-items: center;
        max-width: 258px;
        margin-right: 20px;
        .label {
          width: 58px;
          min-width: 58px;
        }
      }
    }
  }
}
</style>
