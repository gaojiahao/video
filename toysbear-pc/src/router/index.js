import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import axios from "axios";
import { staticRouters, setMenuTree } from "./routers";
// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err);
// };
//解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
//push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};
//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch(err => err);
};
Vue.use(VueRouter);
function getToken() {
  return new Promise((result, reject) => {
    axios
      .post("/api/GetToken", {
        companyNum: "LittleBearWeb",
        platForm: "PC"
      })
      .then(res => {
        if (res.data.result.code === 200) {
          result(res.data.result.item);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}
export const router = new VueRouter({
  linkActiveClass: "router-link-active",
  mode: "hash",
  // mode: "history",
  routes: staticRouters,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  }
});
export async function getMenuFuc() {
  const list = store.state.routers;
  const routers = await setMenuTree(list);
  router.addRoutes(routers);
}
const proEnv = require("/config/pro.env"); // 生产环境
const testEnv = require("/config/test.env"); // 测试环境
const devEnv = require("/config/dev.env"); // 本地环境
const env = process.env.NODE_ENV;
let target = "";
// 默认是本地环境
switch (env) {
  case "production": // 生产环境
    target = proEnv.hosturl;
    break;
  case "test": // 测试环境
    target = testEnv.hosturl;
    break;
  default:
    // 本地环境
    target = devEnv.hosturl;
    break;
}
console.log(target);
// 拦截
router.beforeEach(async (to, from, next) => {
  console.log(target, to.fullPath);
  // 如果没有登录token
  if (!store.state.userInfo || !store.state.userInfo.accessToken) {
    const res = await getToken();
    const obj =
      typeof res === "string" && res.constructor === String
        ? { accessToken: res }
        : null;
    store.commit("setToken", obj);
    if (
      to.path.includes("/beforeIndex") ||
      to.path.includes("/erp") ||
      to.path.includes("/offer") ||
      to.path.includes("/publicChat") ||
      to.path.includes("/dontLoad")
    ) {
      next();
    } else {
      return next({ path: "/beforeIndex/login" });
    }
  } else {
    // 如果有登录token
    if (
      to.path.includes("/beforeIndex") ||
      to.path.includes("/erp") ||
      to.path.includes("/offer") ||
      to.path.includes("/publicChat") ||
      to.path.includes("/dontLoad")
    ) {
      next();
    } else {
      if (store.state.isLogin) {
        if (store.state.userInfo.commparnyList[0].companyType === "Sales") {
          location.href = target + "/new";
        }
        next();
      } else {
        // 如果有token但是没有经过正规登录
        return next({ path: "/beforeIndex/login" });
      }
    }
  }
});
// 路由报错
router.onError(error => {
  console.log(error);
  // 已有路由未配置页面文件的情况下就乖乖去404吧
  router.push("/404");
});
