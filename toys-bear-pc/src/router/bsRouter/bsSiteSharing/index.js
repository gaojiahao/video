// 站点列表
const BsSiteLlis = () =>
  import("@/views/bsPage/bsSiteSharing/bsSiteLlis/BsSiteLlis.vue");
// 客户订单
const BsCustomerOrder = () =>
  import("@/views/bsPage/bsSiteSharing/bsCustomerOrder/BsCustomerOrder.vue");
// 浏览记录
const BsBrowsingHistory = () =>
  import(
    "@/views/bsPage/bsSiteSharing/bsBrowsingHistory/BsBrowsingHistory.vue"
  );

export default [
  {
    path: "/bsIndex/bsSiteLlis",
    name: "bsSiteLlis",
    component: BsSiteLlis
  },
  {
    path: "/bsIndex/bsCustomerOrder",
    name: "bsCustomerOrder",
    component: BsCustomerOrder
  },
  {
    path: "/bsIndex/bsBrowsingHistory",
    name: "bsBrowsingHistory",
    component: BsBrowsingHistory
  }
];