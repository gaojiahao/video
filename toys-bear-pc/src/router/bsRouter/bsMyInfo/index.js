// 我的消息
const BsMyInfo = () => import("@/views/bsPage/bsMyInfo/bsInfo/BsInfo.vue");
// 我的好友
const BsMyFriends = () =>
  import("@/views/bsPage/bsMyInfo/bsMyFriends/BsMyFriends.vue");
// 玩具圈
const BsToyCircle = () =>
  import("@/views/bsPage/bsMyInfo/bsToyCircle/BsToyCircle.vue");

export default [
  {
    path: "/bsIndex/bsInfo",
    name: "bsInfo",
    component: BsMyInfo
  },
  {
    path: "/bsIndex/bsMyFriends",
    name: "bsMyFriends",
    component: BsMyFriends
  },
  {
    path: "/bsIndex/bsToyCircle",
    name: "bsToyCircle",
    component: BsToyCircle
  }
];