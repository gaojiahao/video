<!--  -->
<template>
  <div>
    <component :is="isHome" :allCount="allCount"></component>
  </div>
</template>

<script>
import { mapState } from "vuex";
import bsCompanyHome from "@/components/bsComponents/bsHomeComponent/bsCompanyHome";
import bsHallHome from "@/components/bsComponents/bsHomeComponent/bsHallHome";
import bsVendorHome from "@/components/bsComponents/bsHomeComponent/bsVendorHome";
import bsSuperAdminHome from "@/components/bsComponents/bsHomeComponent/bsSuperAdminHome";
import eventBus from "@/assets/js/common/eventBus";
export default {
  name: "bsHome",
  components: {
    bsCompanyHome,
    bsHallHome,
    bsVendorHome,
    bsSuperAdminHome
  },
  data() {
    return {
      isHome: "bsCompanyHome"
    };
  },
  methods: {
    // 获取业务消息未读数
    async getOrderMessageCount() {
      const res = await this.$http.post("/api/GetOrderMessageCount", {});
      console.log(res, 123);
      if (res.data.result.code === 200) {
        const list = res.data.result.item.result;
        let count = 0;
        let flag = true;
        for (let i = 0; i < list.length; i++) {
          count += list[i].count;
          flag = false;
          if (list[i].sampleFrom == "HALL") {
            this.$store.commit("updataHallCount", list[i].count);
          }
        }
        flag && this.$store.commit("updataHallCount", 0);
        this.$store.commit("updataAllCount", count);
      }
    }
  },
  created() {},
  mounted() {
    this.getOrderMessageCount();
    switch (this.userInfo.commparnyList[0].companyType) {
      case "Exhibition": // 展厅首页
        this.isHome = "bsHallHome";
        break;
      case "Sales": // 公司首页
        this.isHome = "bsCompanyHome";
        break;
      case "Supplier": // 厂商首页
        this.isHome = "bsVendorHome";
        break;
      case "Admin": // 超级管理员
        this.isHome = "bsSuperAdminHome";
        break;
    }
    console.log(this.$cookies.get("validityPeriod"));
    this.$cookies.remove("validityPeriod");
    eventBus.$on("resetTotalCount", () => {
      this.getOrderMessageCount();
    });
  },
  computed: {
    ...mapState(["userInfo", "allCount"])
  }
};
</script>
<style scoped lang="less"></style>
