/*
 * @Description: 
 * @Author: gaojiahao
 * @Date: 2021-03-31 17:09:19
 * @FilePath: \projectd:\LittleBearPC\toys-bear-pc\src\router\bsRouter\bsBusinessManage\index.js
 * @LastEditTime: 2021-05-11 16:27:55
 * @LastEditors: sueRimn
 * @Descripttion: 
 * @version: 1.0.0
 */
// 展厅择样
const BsHallSample = () =>
  import("@/views/bsPage/bsBusinessManage/bsHallSample/BsHallSample.vue");
// 展厅业务
const BsHallBusiness = () =>
  import("@/views/bsPage/bsBusinessManage/bsHallBusiness/BsHallBusiness.vue");
// 公司业务
const BsCompanyBusiness = () =>
  import(
    "@/views/bsPage/bsBusinessManage/bsCompanyBusiness/BsCompanyBusiness.vue"
  );
// 厂商业务
const BsVendorBusiness = () =>
  import(
    "@/views/bsPage/bsBusinessManage/bsVendorBusiness/BsVendorBusiness.vue"
  );
// 择样明细
const BsSampleDetailed = () =>
  import("@/views/bsPage/bsBusinessManage/bsSampleDetail/BsSampleDetailed.vue");
// 购物车
const BsShoppingCart = () =>
  import("@/views/bsPage/bsBusinessManage/bsShoppingCart/BsShoppingCart.vue");
// 找样报价
const BsSampleQuotation = () =>
  import(
    "@/views/bsPage/bsBusinessManage/bsSampleQuotation/BsSampleQuotation.vue"
  );

// 采购订单
const BsPurchaseOrder = () =>
  import("@/views/bsPage/bsBusinessManage/bsPurchaseOrder/BsPurchaseOrder.vue");

export default [
  {
    path: "/bsIndex/bsHallSample",
    name: "bsHallSample",
    component: BsHallSample,
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/bsIndex/bsHallBusiness",
    name: "bsHallBusiness",
    component: BsHallBusiness,
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/bsIndex/bsCompanyBusiness",
    name: "bsCompanyBusiness",
    component: BsCompanyBusiness,
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/bsIndex/bsVendorBusiness",
    name: "bsVendorBusiness",
    component: BsVendorBusiness,
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/bsIndex/bsSampleDetailed",
    name: "bsSampleDetailed",
    component: BsSampleDetailed,
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/bsIndex/bsShoppingCart",
    name: "bsShoppingCart",
    component: BsShoppingCart
  },
  {
    path: "/bsIndex/bsSampleQuotation",
    name: "bsSampleQuotation",
    component: BsSampleQuotation,
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/bsIndex/bsPurchaseOrder",
    name: "bsPurchaseOrder",
    component: BsPurchaseOrder,
    meta: {
      keepAlive: true
    }
  }
];
