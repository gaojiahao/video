<!--  -->
<template>
  <div>
    <Table
      ref="bsTableItemRef"
      @selectionChange="selectionChange"
      :table="tableData"
    ></Table>
  </div>
</template>

<script>
import Table from "@/components/table";
import eventBus from "@/assets/js/common/eventBus";
export default {
  name: "bsTableItem",
  components: {
    Table
  },
  props: {
    productList: {
      type: Array
    },
    // 浏览足迹没有分页，所以用传值修改
    selection: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    productList: {
      deep: true,
      immediate: true,
      handler(val) {
        this.$set(this.tableData, "data", val);
      }
    }
  },
  data() {
    return {
      tableData: {
        data: [],
        selection: true,
        showLoading: false,
        sizeMini: "mini",
        columns: [
          {
            prop: "name",
            label: "产品",
            width: 300,
            color: "#3368a9",
            align: "left",
            // isHiden: true,
            infoBox: true,
            productInfo: true,
            cartInfoIcon: true,
            elImage: row => {
              return row.img;
            },
            nameHtml: row => {
              return row.name;
            },
            fcatoryNameHtml: row => {
              return row.supplierName;
            }
          },
          {
            prop: "supplierPhone",
            label: "联系厂商",
            render: row => {
              switch (row.supplierTelephoneNumber) {
                case "":
                case null:
                case undefined:
                case "null":
                case "undefined":
                  row.supplierTelephoneNumber = "";
                  break;
              }
              switch (row.supplierPhone) {
                case "":
                case null:
                case undefined:
                case "null":
                case "undefined":
                  row.supplierTelephoneNumber = "";
                  break;
              }
              return row.supplierPhone + "<br>" + row.supplierTelephoneNumber;
            }
          },
          {
            prop: "exhibitionName",
            isHiden: true,
            label: "资料来源"
          },
          { prop: "fa_no", label: "出厂货号", isHiden: true },
          { prop: "ch_pa", label: "包装", isHiden: true, width: 90 },
          {
            prop: "pr_le",
            renderHeard: () => {
              return "产品规格</br>(cm)";
            },
            isHiden: true,
            render: row => {
              return row.pr_le + "x" + row.pr_wi + "x" + row.pr_hi;
            }
          },
          {
            prop: "pr_le",
            renderHeard: () => {
              return "包装规格</br>(cm)";
            },
            isHiden: true,
            render: row => {
              return row.in_le + "x" + row.in_wi + "x" + row.in_hi;
            }
          },
          {
            prop: "pr_le",
            renderHeard: () => {
              return "外箱规格</br>(cm)";
            },
            isHiden: true,
            render: row => {
              return row.ou_le + "x" + row.ou_wi + "x" + row.ou_hi;
            }
          },
          {
            prop: "bulk_stere",
            renderHeard: () => {
              return "体积/材积</br>(cbm)/(cuft)";
            },
            isHiden: true,
            width: 150,
            render: row => {
              return row.bulk_stere + "(cbm)/" + row.bulk_feet;
            }
          },
          {
            prop: "gr_we",
            renderHeard: () => {
              return "毛重/净重</br>(kg)";
            },
            isHiden: true,
            render: row => {
              return row.gr_we + "/" + row.ne_we;
            }
          },
          {
            prop: "in_en",
            renderHeard: () => {
              return "装箱量</br>(pcs)";
            },
            width: 90,
            isHiden: true,
            render: row => {
              return row.in_en + "/" + row.ou_lo;
            }
          },
          {
            prop: "price",
            label: "单价",
            isHiden: true,
            width: 80,
            color: "red",
            render: row => {
              return row.cu_de + " " + row.price;
            }
          }
        ],
        btnWidth: 100,
        addIcon: true
      }
    };
  },
  created() {},
  mounted() {
    this.tableData.selection = this.selection;
    this.tableData.data = this.productList;
    // this.$set(this.tableData, "data", this.productList);
  },
  methods: {
    selectionChange(val) {
      eventBus.$emit("handleSelectionChangeBus", val);
    }
  }
};
</script>
<style scoped lang="less"></style>
