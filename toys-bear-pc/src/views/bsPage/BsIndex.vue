<template>
  <div class="bsIndex">
    <bsTop @handlerIsCollapse="handlerIsCollapse" :isCollapse="isCollapse" />
    <div class="content">
      <div class="leftMenu">
        <bsMenu :isCollapse="isCollapse" />
      </div>
      <div class="rightContent">
        <div class="views">
          <el-tabs
            v-model="activeTab"
            @tab-remove="closeTab"
            @tab-click="triggerTab"
            ref="elTabsRef"
            type="border-card"
            closable
          >
            <el-tab-pane
              v-for="item in tabList"
              :key="item.name"
              :name="item.name"
              :label="item.label"
            >
              <span slot="label">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="item.label"
                  placement="top"
                >
                  <span style="width: 90px; padding: 0">
                    {{ item.label }}
                  </span>
                </el-tooltip>
              </span>

              <div class="myScrollbar" @scroll="scrollevent" ref="myScrollbar">
                <component
                  :im="im"
                  class="componentContent"
                  :item="item.value"
                  v-if="item.refresh"
                  :is="item.component"
                  :ref="item.name"
                ></component>
                <!-- <div class="contentFooter">
                  <img src="~@/assets/images/contentFooter.png" alt="" />
                </div> -->
              </div>
              <!-- </el-scrollbar> -->
            </el-tab-pane>
          </el-tabs>
          <div class="closeAll" @click="closeAll">
            <i class="el-icon-close"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/** 后台首页 */
import bsHome from "@/views/bsPage/bsHome/BsHome.vue";

/** 产品详情 */
import bsProductDetails from "@/views/bsPage/bsProductSearch/bsProductDetails/BsProductDetails.vue";

/** 客户订单详情 */
import bsClientOrderDetails from "@/views/bsPage/bsSiteSharing/bsCustomerOrder/bsClientOrderDetails/BsClientOrderDetails.vue";

/** 展厅业务订单详情 */
import bsHallBusinessOrderDetails from "@/views/bsPage/bsBusinessManage/bsHallBusiness/bsHallBusinessOrderDetails/BsHallBusinessOrderDetails.vue";

/** 公司业务订单详情 */
import bsCompanyBusinessOrderDetails from "@/views/bsPage/bsBusinessManage/bsCompanyBusiness/bsCompanyBusinessOrderDetails/BsCompanyBusinessOrderDetails.vue";

/** 厂商业务订单详情 */
import bsVendorBusinessOrderDetails from "@/views/bsPage/bsBusinessManage/bsVendorBusiness/bsVendorBusinessOrderDetails/BsVendorBusinessOrderDetails.vue";

// 站点列表
import bsSiteLlis from "@/views/bsPage/bsSiteSharing/bsSiteLlis/BsSiteLlis.vue";

// 站点设置
import bsSiteSettings from "@/views/bsPage/bsSiteSharing/bsSiteSettings/BsSiteSettings.vue";

// 客户订单
import bsCustomerOrder from "@/views/bsPage/bsSiteSharing/bsCustomerOrder/BsCustomerOrder.vue";

// 登录记录
import bsLoginHistory from "@/views/bsPage/bsSiteSharing/bsLoginHistory/BsLoginHistory.vue";

// 浏览记录
import bsBrowsingHistory from "@/views/bsPage/bsSiteSharing/bsBrowsingHistory/BsBrowsingHistory.vue";

// 广告管理
import bsAdvertisingManage from "@/views/bsPage/bsSiteSharing/bsAdvertisingManage/BsAdvertisingManage.vue";

// 产品搜索首页
import bsProductSearchIndex from "@/views/bsPage/bsProductSearch/bsProductSearchIndex/BsProductSearchIndex.vue";
//  我的收藏
import bsMyCollection from "@/views/bsPage/bsProductSearch/bsMyCollection/BsMyCollection.vue";

//  最新产品
import bsLatestProducts from "@/views/bsPage/bsProductSearch/bsLatestProducts/BsLatestProducts.vue";

// 浏览足迹
import bsBrowsingFootprints from "@/views/bsPage/bsProductSearch/bsBrowsingFootprints/BsBrowsingFootprints.vue";
//  现货产品
import bsSpotProducts from "@/views/bsPage/bsProductSearch/bsSpotProducts/BsSpotProducts.vue";

//  VIP产品
import bsVIPProducts from "@/views/bsPage/bsProductSearch/bsVIPProducts/BsVIPProducts.vue";

// 账号管理
import bsAccountManage from "@/views/bsPage/bsPersonalManage/bsAccountManage/BsAccountManage.vue";

// 报价设置
import bsQuotationSettings from "@/views/bsPage/bsPersonalManage/bsQuotationSettings/BsQuotationSettings.vue";

// 推送详情
import bsPushIndex from "@/components/commonComponent/pushDetailsComponent/bsPushIndex.vue";

// 推送设置
import bsPushSettings from "@/views/bsPage/bsPersonalManage/bsPushSettings/BsPushSettings.vue";

// 联系方式
import bsContactWay from "@/views/bsPage/bsPersonalManage/bsContactWay/BsContactWay.vue";

// 屏蔽设置
import bsShieldSettings from "@/views/bsPage/bsPersonalManage/bsShieldSettings/BsShieldSettings.vue";

// 我的消息
import bsNews from "@/views/bsPage/bsMyNews/bsNews/BsNews.vue";
// 我的好友
import bsMyGoodFriend from "@/views/bsPage/bsMyNews/bsMyGoodFriend/BsMyGoodFriend.vue";
// 玩具圈
import bsToyCircle from "@/views/bsPage/bsMyNews/bsToyCircle/BsToyCircle.vue";

// 我的客户
import bsMyClients from "@/views/bsPage/bsMyClients/bsMyClients/BsMyClients.vue";

// 厂商查询
import bsVendorQuery from "@/views/bsPage/bsMyClients/bsVendorQuery/BsVendorQuery.vue";
// 厂商查询-详情页
import bsMyClientsDetail from "@/components/bsComponents/bsMyClientsComponent/bsMyClientsDetail.vue";

// 公司查询
import bsCompanyQuery from "@/views/bsPage/bsMyClients/bsCompanyQuery/BsCompanyQuery.vue";
// 货场查询
import bsGoodsYardSearch from "@/views/bsPage/bsMyClients/bsGoodsYardSearch/BsGoodsYardSearch.vue";

// 展厅择样
import bsHallSample from "@/views/bsPage/bsBusinessManage/bsHallSample/BsHallSample.vue";
// 展厅业务
import bsHallBusiness from "@/views/bsPage/bsBusinessManage/bsHallBusiness/BsHallBusiness.vue";
// 公司业务
import bsCompanyBusiness from "@/views/bsPage/bsBusinessManage/bsCompanyBusiness/BsCompanyBusiness.vue";
// 厂商业务
import bsVendorBusiness from "@/views/bsPage/bsBusinessManage/bsVendorBusiness/BsVendorBusiness.vue";
// 择样明细
import bsHallSampleDetails from "@/views/bsPage/bsBusinessManage/bsHallSampleDetails/BsHallSampleDetails.vue";
// 购物车
import bsShoppingCart from "@/views/bsPage/bsBusinessManage/bsShoppingCart/BsShoppingCart.vue";
// 找样报价
import bsSampleQuotation from "@/views/bsPage/bsBusinessManage/bsSampleQuotation/BsSampleQuotation.vue";
//数据统计
import bsDataTotal from "@/views/bsPage/bsBusinessManage/bsDataTotal/bsDataTotal.vue";
// 找样报价-报价详情
import bsSampleQuotationDetails from "@/views/bsPage/bsBusinessManage/bsSampleQuotation/components/bsSampleQuotationDetails";
// 找样报价-选择其他产品
import bsSampleOfferCommodity from "@/components/bsComponents/bsSampleComponent/bsSampleOfferCommodity";

// 找样报价-编辑详情
import bsSampleUpdata from "@/views/bsPage/bsBusinessManage/bsSampleQuotation/components/bsSampleUpdata";
// 采购订单
import bsPurchaseOrder from "@/views/bsPage/bsBusinessManage/bsPurchaseOrder/BsPurchaseOrder.vue";
// 采购订单详情
import bsPurchaseOrderDetails from "@/views/bsPage/bsBusinessManage/bsPurchaseOrder/bsPurchaseOrderDetails/BsPurchaseOrderDetails.vue";

// 相似产品 | 同款产品
import bsSimilarProduct from "@/components/bsComponents/bsProductSearchComponent/bsSimilarProduct.vue";

// 展厅主页
import bsExhibitionHallHome from "@/components/bsComponents/bsExhibitionHallHomeComponent/BsExhibitionHallHome.vue";

// 业务消息
import bsBusinessMsg from "@/views/bsPage/bsMyNews/bsBusinessMsg/BsBusinessMsg.vue";

// 聊天业务消息详情
import bsHallYewuDetails from "@/components/bsComponents/bsNewsComponent/bsHallYewuDetails.vue";

import bsTop from "@/components/bsComponents/bsTopComponent/BsTop";
import bsMenu from "@/components/bsComponents/bsMenuComponent/BsMenu";
import eventBus from "@/assets/js/common/eventBus.js";
import { mapState } from "vuex";
/** IM */
import IM from "@/assets/js/common/im.js";
export default {
  components: {
    bsHome,
    bsProductDetails,
    bsClientOrderDetails,
    bsHallBusinessOrderDetails,
    bsCompanyBusinessOrderDetails,
    bsVendorBusinessOrderDetails,
    bsSiteLlis,
    bsSiteSettings,
    bsCustomerOrder,
    bsBrowsingHistory,
    bsLoginHistory,
    bsAdvertisingManage,
    bsProductSearchIndex,
    bsMyCollection,
    bsLatestProducts,
    bsSpotProducts,
    bsVIPProducts,
    bsBrowsingFootprints,
    bsAccountManage,
    bsQuotationSettings,
    bsPushIndex,
    bsPushSettings,
    bsContactWay,
    bsShieldSettings,
    bsNews,
    bsMyGoodFriend,
    bsToyCircle,
    bsMyClients,
    bsVendorQuery,
    bsMyClientsDetail,
    bsCompanyQuery,
    bsGoodsYardSearch,
    bsHallSample,
    bsHallBusiness,
    bsCompanyBusiness,
    bsVendorBusiness,
    bsHallSampleDetails,
    bsShoppingCart,
    bsSampleQuotation,
    bsDataTotal,
    bsSampleQuotationDetails,
    bsSampleOfferCommodity,
    bsSampleUpdata,
    bsPurchaseOrder,
    bsTop,
    bsMenu,
    bsPurchaseOrderDetails,
    bsSimilarProduct,
    bsExhibitionHallHome,
    bsBusinessMsg,
    bsHallYewuDetails
  },
  data() {
    return {
      im: new IM().RongIMClient,
      isCollapse: false
    };
  },
  methods: {
    // 滚动
    scrollevent(e) {
      if (this.$route.path == "/bsIndex/bsShoppingCart") {
        // console.log(e.target.scrollLeft);
        eventBus.$emit("handlerLeft", e.target.scrollLeft);
      }
    },
    // 刷新tab标签
    triggerTab() {
      for (let i = 0; i < this.tabList.length; i++) {
        if (this.activeTab == this.tabList[i].name) {
          this.$store.commit("updataUrl", this.activeTab);
          this.$router.push(this.tabList[i].linkUrl);
          break;
        }
      }
    },
    // 关闭标签
    closeTab(e) {
      // this.$store.commit("handleraddrSearch", false);
      let len = this.tabList.length;
      len > 1 && this.$store.commit("closeTab", e);
      this.$nextTick(() => {});
    },
    // 关闭所有tab标签
    closeAll() {
      this.$confirm("此操作将关闭所有标签页, 是否继续?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$store.commit("closeTabAll", this.$router);
          this.$common.handlerMsgState({
            msg: "关闭成功!",
            type: "success"
          });
        })
        .catch(() => {
          this.$common.handlerMsgState({
            msg: "已取消删除!",
            type: "warning"
          });
        });
    },
    // 展开菜单
    handlerIsCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  },
  computed: {
    activeTab: {
      get() {
        return this.$store.state.activeTab;
      },
      set(val) {
        this.$store.commit("setActiveTab", val);
      }
    },
    ...mapState(["tabList"])
  },
  watch: {
    "$route.path"(path) {
      if (
        path.includes("bsProductSearchIndex") ||
        path.includes("bsLatestProducts") ||
        path.includes("bsSpotProducts") ||
        path.includes("bsVIPProducts") ||
        path.includes("bsMyCollection") ||
        path.includes("bsBrowsingFootprints") ||
        path.includes("bsVendorQuery")
      ) {
        eventBus.$emit("showCart", true);
      } else {
        eventBus.$emit("showCart", false);
      }
      if (!path.includes("bsSampleQuotation")) {
        this.$store.commit("resetCheckTabstypeId", 0);
      }
      console.log(path);
      if (path.includes("bsShoppingCart")) {
        eventBus.$emit("handlergetClientList");
      }
    },
    activeTab(newN, oldN) {
      // console.log(newN, "现在", oldN, "上一次"); // tabName
      this.$store.commit("handlerOldTabName", oldN);
      // if (
      //   newN == "/bsIndex/bsProductSearchIndex" ||
      //   newN == "/bsIndex/bsLatestProducts" ||
      //   newN == "/bsIndex/bsSpotProducts" ||
      //   newN == "/bsIndex/bsVIPProducts" ||
      //   newN == "/bsIndex/bsMyCollection" ||
      //   newN == "/bsIndex/bsBrowsingFootprints"
      // ) {
      //   eventBus.$emit("showCart", true);
      // } else {
      //   eventBus.$emit("showCart", false);
      // }
    }
  },
  created() {},
  mounted() {},
  beforeDestroy() {
    eventBus.$emit("showCart", false);
    this.im.disconnect().then(() => console.log("断开链接成功"));
  }
};
</script>
<style scoped lang="less">
@deep: ~">>>";
.bsIndex {
  // width: 100%;
  height: 100%;
  .content {
    // width: 100%;
    height: calc(100% - 72px);
    display: flex;
    background-color: #fff;
    box-sizing: border-box;
    .leftMenu {
      height: 100%;
      box-sizing: border-box;
      // box-shadow: 0px 0px 3px 0px rgba(42, 69, 116, 0.16);
      z-index: 99;
      box-shadow: 1px 0px 0px #dcdfe6;
      .bsMenu {
        box-shadow: 0px 0px 3px 0px rgba(42, 69, 116, 0.16);
      }
    }
    @{deep} .rightContent {
      flex: 1;
      height: 100%;
      overflow: hidden;
      .views {
        height: 100%;
        position: relative;
        .positionSearchBox {
          // width: calc(100% - 1px);
          background-color: #fff;
          position: absolute;
          left: 1px;
          top: 50px;
          z-index: 1;
        }
        .el-tabs {
          height: 100%;
          background-color: #f1f3f6;
          .el-tabs__header {
            overflow: inherit;
            box-sizing: border-box;
            background-color: #fff;
            border: none;
            padding-right: 50px;
            box-sizing: border-box;
            box-shadow: 0px 0px 3px 0px rgba(42, 69, 116, 0.16);
            .el-tabs__nav-wrap {
              margin-bottom: 0px !important;
              box-shadow: 0px 1px 0px #dcdfe6;
              z-index: 99;
              &.is-scrollable {
                padding: 0 30px;
              }
              .el-tabs__nav-prev,
              .el-tabs__nav-next {
                text-align: center;
                width: 30px;
                height: 50px;
                line-height: 50px;
                border: 1px solid #dcdfe6;
                background-color: #fff;
                border-bottom: none;
                box-sizing: border-box;
                z-index: 1;
              }
              .el-tabs__nav-scroll {
                height: 50px;
                box-sizing: border-box;
                padding-top: 10px;
                .el-tabs__nav {
                  height: 40px;
                  .el-tabs__item {
                    width: 110px;
                    margin: 0 5px;
                    border: 1px solid #dcdfe6;
                    border-bottom: none;
                    color: #333;
                    padding: 0;
                    text-align: center;
                    position: relative;
                    &:first-of-type {
                      margin-left: 20px;
                    }
                    &:last-of-type {
                      margin-right: 10px;
                    }
                    &.is-active {
                      border-top: 2px solid #3368a9;
                      color: #3368a9;
                      font-weight: 700;
                    }
                    .el-icon-refresh {
                      display: none;
                    }
                    span {
                      &:first-of-type {
                        width: 110px;
                        box-sizing: border-box;
                        padding: 0 10px;
                        display: block;
                        overflow: hidden;
                        white-space: nowrap; /*不换行*/
                        text-overflow: ellipsis; /*超出部分文字以...显示*/
                      }
                    }
                    .el-icon-close {
                      position: absolute;
                      right: -6px;
                      top: -5px;
                      background-color: #b9b9b9;
                      color: #fff;
                      font-size: 14px;
                      &:hover {
                        background-color: #3368a9;
                      }
                    }
                  }
                }
              }
            }
          }
          .el-tabs__content {
            height: calc(100% - 50px);
            box-sizing: border-box;
            background-color: #f1f3f6;
            overflow: hidden;
            box-sizing: border-box;
            margin: 0 0 0 20px;
            padding: 0;
            box-sizing: border-box;
            .el-tab-pane {
              height: 100%;
              padding: 0;
            }
          }
        }
        .closeAll {
          position: absolute;
          right: 0;
          width: 50px;
          height: 50px;
          top: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          border: 1px solid #dcdfe6;
          box-sizing: border-box;
          border-bottom: none;
          cursor: pointer;
          &:hover {
            color: #3368a9;
            font-weight: bold;
            background-color: #f3f3f5;
            font-size: 15px;
          }
        }
        // .clearAll {
        //   width: 50px;
        //   min-width: 50px;
        //   height: 50px;
        //   display: flex;
        //   align-items: center;
        //   justify-content: center;
        //   font-size: 15px;
        //   cursor: pointer;
        // }
        // .tab {
        //   display: inline-block;
        //   width: 110px;
        //   height: 40px;
        //   opacity: 1;
        //   background: #ffffff;
        //   border: 1px solid #dcdfe6;
        //   border-bottom-color: transparent;
        //   margin-right: 10px;
        //   margin-top: 7px;
        //   text-align: center;
        //   cursor: pointer;
        //   &.isActive {
        //     border-top-width: 2px;
        //     border-top-color: #3368a9;
        //     font-weight: 700;
        //     .tabItem {
        //       .tabName {
        //         color: #3368a9;
        //       }
        //     }
        //   }
        //   .tabItem {
        //     width: 100%;
        //     height: 100%;
        //     position: relative;
        //     .tabName {
        //       display: block;
        //       padding: 0 5px;
        //       line-height: 40px;
        //       box-sizing: border-box;
        //       width: 100%;
        //       height: 100%;
        //       overflow: hidden; /*超出部分隐藏*/
        //       white-space: nowrap; /*不换行*/
        //       text-overflow: ellipsis; /*超出部分文字以...显示*/
        //     }
        //     .closeTab {
        //       font-size: 16px;
        //       position: absolute;
        //       right: -7px;
        //       top: -5px;
        //       color: #b9b9b9;
        //       &:hover {
        //         color: #3368a9;
        //       }
        //     }
        //   }
        // }
      }
    }
  }
}
.myScrollbar {
  padding: 20px 0;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-right: 20px;
  .contentFooter {
    text-align: center;
    margin-top: 20px;
  }
  .componentContent {
    min-width: 1500px;
  }
  /*-------滚动条整体样式----*/
  &::-webkit-scrollbar {
    width: 10px;
    height: 12px;
  }
  /*滚动条里面小方块样式*/
  &::-webkit-scrollbar-thumb {
    border-radius: 100px;
    // -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #c8c8c9;
  }
  /*滚动条里面轨道样式*/
  &::-webkit-scrollbar-track {
    // -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: transparent;
  }
  /** 兼容ie样式 */
  // scrollbar-width: 5px;
  // /*三角箭头的颜色*/
  // scrollbar-arrow-color: transparent;
  // /*滚动条滑块按钮的颜色*/
  // scrollbar-face-color: transparent;
  // /*滚动条整体颜色*/
  // scrollbar-highlight-color: transparent;
  // /*滚动条阴影*/
  // scrollbar-shadow-color: transparent;
  // /*滚动条轨道颜色*/
  // scrollbar-track-color: transparent;
  // /*滚动条3d亮色阴影边框的外观颜色——左边和上边的阴影色*/
  // scrollbar-3dlight-color: transparent;
  // /*滚动条3d暗色阴影边框的外观颜色——右边和下边的阴影色*/
  // scrollbar-darkshadow-color: transparent;
  /*滚动条基准颜色*/
  // scrollbar-base-color: #d3d5d8;
}
@{deep} .el-scrollbar__wrap {
  overflow-x: hidden;
  .el-scrollbar__view {
    width: 100%;
    height: 100%;
  }
}
</style>
