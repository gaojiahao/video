<template>
  <div class="wrapBox">
    <!-- 发布公告sendGonggaoBox -->
    <div class="sendGonggao">
      <!-- 公告类型 -->
      <div class="gonggaoType">
        <el-form
          :model="formData"
          :rules="rules"
          ref="refGonggao"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="类型：" prop="type">
            <el-radio-group v-model="formData.type">
              <el-radio label="普通公告"></el-radio>
              <el-radio label="采购公告"></el-radio>
              <el-radio label="供应公告"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="图片：" prop="fileList">
            <div class="gonggaoImgList">
              <!-- 发图片玩具圈 -->
              <template v-if="this.fileType === 'image'">
                <draggable
                  class="syllable_ul"
                  element="ul"
                  :list="formData.fileList"
                  :options="{ group: 'id', animation: 150 }"
                  :no-transition-on-drag="true"
                  @change="changeGonggaoImg"
                  @start="startGonggaoImg"
                  @end="endGonggaoImg"
                  :move="moveGonggaoImg"
                >
                  <el-col
                    :span="6"
                    v-for="(value, i) in formData.fileList"
                    :key="i"
                  >
                    <div
                      class="imgItemBox"
                      @mouseenter="itemImgNter(value.uid)"
                      @mouseleave="itemImgLeave"
                    >
                      <el-image fit="contain" :src="value.url"></el-image>
                      <div
                        class="itemIcon"
                        v-show="isHoverImgItem === value.uid"
                      >
                        <span>
                          <i @click="opemViewer(i)" class="el-icon-zoom-in" />
                          <i
                            @click="deleteItemImg(value.uid)"
                            class="el-icon-delete"
                          />
                        </span>
                      </div>
                    </div>
                  </el-col>
                </draggable>
              </template>
              <!-- 发视频玩具圈 -->
              <template v-else-if="this.fileType === 'video'">
                <div
                  style="width:100%;position: relative;"
                  v-for="(item, i) in formData.fileList"
                  :key="i"
                >
                  <video
                    width="100%"
                    height="150px"
                    class="video-js vjs-default-skin vjs-big-play-centered sendVideoImg"
                    controls
                    style="object-fit:contain; margin: 0 auto"
                  >
                    <source
                      ref="videoPreview"
                      :src="item.url"
                      type="video/mp4"
                    />
                  </video>
                  <i
                    style="position: absolute;right:0;top:0;cursor: pointer;"
                    @click="deleteItemImg(item.uid)"
                    class="el-icon-circle-close videoDelete"
                  />
                </div>
              </template>
              <el-col class="imgsItemBox" :span="6">
                <el-upload
                  action="#"
                  list-type="picture-card"
                  :file-list="formData.fileList"
                  :show-file-list="false"
                  :limit="imgAndVideoNum"
                  :on-change="changeFile"
                  class="imgsItem"
                  :auto-upload="false"
                  :on-exceed="onExceed"
                  :accept="uploadAccept"
                >
                  <i slot="default" class="el-icon-plus"></i>
                  <div slot="file" slot-scope="{ file }">
                    <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                      >
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span
                        v-if="!disabledImg"
                        class="el-upload-list__item-delete"
                        @click="handleDownload(file)"
                      >
                        <i class="el-icon-download"></i>
                      </span>
                      <span
                        v-if="!disabledImg"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file, fileList)"
                      >
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </div>
                </el-upload>
              </el-col>
              <el-dialog :visible.sync="dialogVisibleImg" destroy-on-close>
                <img
                  v-if="dialogVisibleImg"
                  width="100%"
                  :src="dialogImageUrl"
                  alt
                />
              </el-dialog>
            </div>
            <!-- <div class="sendGonggaoBtn">
              <el-button type="primary" class="sendBtn" @click="isSelectPush"
                >发 布</el-button
              >
            </div> -->
          </el-form-item>
          <el-form-item label="内容：" prop="content">
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              v-model="formData.content"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            :label="acceptor === 'All' ? '谁可以看：' : '不给谁看：'"
          >
            <div class="quanxianBox">
              <el-cascader
                :options="options"
                v-model="acceptor"
                clearable
                :props="{ expandTrigger: 'hover', emitPath: false }"
                :show-all-levels="false"
              ></el-cascader>
              <div class="guangbo">
                <span>是否广播：</span>
                <el-radio-group v-model="formData.isPush">
                  <el-radio label="false">否</el-radio>
                  <el-radio label="true">是</el-radio>
                </el-radio-group>
              </div>
            </div>
          </el-form-item>
          <!-- <el-form-item label="是否广播" prop="isPush">
            <el-radio-group v-model="formData.isPush">
              <el-radio label="false">否</el-radio>
              <el-radio label="true">是</el-radio>
            </el-radio-group>
          </el-form-item> -->
          <el-form-item>
            <div class="sendGonggaoBtn">
              <el-button type="primary" class="sendBtn" @click="isSelectPush"
                >发 布</el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 选择公告推送人 -->
    <el-dialog
      title="选择广播对象"
      :visible.sync="selectPush"
      destroy-on-close
      append-to-body
      width="700px"
    >
      <el-radio-group class="myRadios" v-model="radio" @change="changeRadios">
        <el-radio
          label="all"
          v-show="
            $store.state.userInfo.commparnyList[0].companyType === 'Supplier' ||
              $store.state.userInfo.commparnyList[0].companyType ===
                'Exhibition' ||
              $store.state.userInfo.commparnyList[0].companyType === 'Sales'
          "
        >
          <div class="icon_box">
            <i class="el-icon-s-custom"></i>
          </div>
          <span class="icon_box_text">平台所有人</span>
        </el-radio>
        <el-radio
          label="Sales"
          v-show="
            $store.state.userInfo.commparnyList[0].companyType === 'Supplier'
          "
        >
          <div class="icon_box_cs">
            <i class="el-icon-s-custom"></i>
          </div>
          <span class="icon_box_text">所有公司</span>
        </el-radio>
        <el-radio
          label="Supplier"
          v-show="
            $store.state.userInfo.commparnyList[0].companyType ===
              'Exhibition' ||
              $store.state.userInfo.commparnyList[0].companyType === 'Sales'
          "
        >
          <div class="icon_box_cs">
            <i class="el-icon-s-home"></i>
          </div>
          <span class="icon_box_text">所有厂商</span>
        </el-radio>
      </el-radio-group>
      <div class="tongxunlu">
        <div class="title">
          <span>通讯录联系人</span>
        </div>
        <div class="tongxunluLianxiren" v-infinite-scroll="tongxunluLoad">
          <el-checkbox-group
            class="myCheckBox"
            v-model="checkUserList"
            @change="handleCheckAllChange"
          >
            <el-checkbox v-for="(item, i) in orgList" :key="i" :label="item.id">
              <el-image
                class="img"
                style="width:50px; height: 50px;border-radius:50px;"
                :src="item.userImage"
                fit="cover"
              >
                <div
                  slot="error"
                  class="image-slot"
                  style="width:100%;height:100%;display:flex;align-items:center;justify-content:left;white-space: nowrap;"
                >
                  {{ item.userName }}
                </div>
              </el-image>
              {{ item.userName }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <center>
        <el-button @click="selectPush = false">取 消</el-button>
        <el-button type="primary" @click="sendSelectPush">发 送</el-button>
      </center>
    </el-dialog>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable
  },
  data() {
    return {
      acceptor: "All",
      options: [
        {
          value: "All",
          label: "公开"
        },
        {
          value: "noLook",
          label: "不给谁看",
          children: [
            {
              value: "Supplier",
              label: "全部供应商"
            },
            {
              value: "Sales",
              label: "全部公司"
            },
            {
              value: "Exhibition",
              label: "全部展厅"
            }
          ]
        }
      ],
      formData: {
        type: null,
        content: null,
        fileList: [],
        isPush: "false"
      },
      rules: {
        type: [
          { required: true, message: "请选择公告类型", trigger: "change" }
        ],
        content: [
          { required: true, message: "请输入公告内容", trigger: "blur" }
        ],
        isPush: [
          { required: true, message: "请选择是否广播", trigger: "change" }
        ]
      },
      type: "",
      fileType: "",
      radio: "",
      orgListPageSize: 10,
      orgListCurrentPage: 1,
      orgListCount: 0,
      orgList: [],
      checkUserList: [],
      showViewer: false,
      isHoverImgItem: null,
      imgAndVideoNum: null,
      selectPush: false,
      selectPushPersonList: [],
      dialogVisibleImg: false,
      ruleForm: { GonggaoText: "" },
      globalJson: this.$store.state.globalJson.Json
    };
  },
  methods: {
    // 放大预览
    handlePictureCardPreview(file) {
      if (file.raw.type.split(/\//)[0] === "video") {
        this.$common.handlerMsgState({
          msg: "功能暂未开放",
          type: "danger"
        });
      } else {
        this.dialogImageUrl = file.url;
        this.dialogVisibleImg = true;
      }
    },
    // 发布公告
    async sendGonggao() {
      this.$refs.refGonggao.validate(async valid => {
        if (valid) {
          let urls = "";
          let res;
          // let imgFlag = false
          if (this.formData.fileList && this.formData.fileList.length > 0) {
            const fd = new FormData();
            for (const val of this.formData.fileList) {
              fd.append("file", val.raw);
            }
            fd.append("BusinessType", "Notice");
            res = await this.$http.post("/api/File/InsertPic", fd, {
              headers: { "Content-Type": "multipart/form-data" }
            });
            if (res.data.result.code === 200) {
              urls = res.data.result.object.map(re => {
                return {
                  fileAddress: re.filePath,
                  order: re.orderIndx
                };
              });
            } else {
              this.$common.handlerMsgState({
                msg: res.data.result.msg,
                type: "danger"
              });
            }
            this.fileType = this.formData.fileList[0].raw.type.split("/")[0];
          }
          let gonggaoType = "";
          switch (this.formData.type) {
            case "普通公告":
              gonggaoType = "Ordinary";
              break;
            case "采购公告":
              gonggaoType = "Purchase";
              break;
            case "供应公告":
              gonggaoType = "Supply";
              break;
          }
          const result = await this.$http.post("/api/CreateBearNotice", {
            NoticeTitle: "",
            NoticeType: gonggaoType,
            Acceptor: this.acceptor == "All" ? "" : this.acceptor,
            Notice: this.formData.content,
            Publisher: this.$store.state.userInfo.userInfo.id,
            IssuedCompanyID: this.$store.state.userInfo.commparnyList[0]
              .commparnyId,
            attachmentList: urls,
            FileType:
              this.fileType === "image"
                ? "img"
                : this.fileType === "video"
                ? "video"
                : "" // 文件类型 img video
          });
          if (result.data.result.code === 200) {
            this.$common.handlerMsgState({
              msg: "发布公告成功",
              type: "success"
            });
            // 刷新公告列表
            this.$emit("close", true);
            this.skipCount = 1;
            this.maxResultCount = 10;
            this.formData.fileList = [];
          } else {
            this.$emit("close", false);
            this.$common.handlerMsgState({
              msg: result.data.result.msg,
              type: "danger"
            });
          }
        }
      });
    },
    // 确定推送公告
    async sendSelectPush() {
      this.sendGonggao();
      const fd = {
        PushType: 3,
        UserList: this.checkUserList,
        CompanyType: this.radio
      };
      try {
        const res = await this.$http.post("/api/GeSendPush", fd);
        if (res.data.result.code === 200) {
          // 刷新公告
          this.$root.eventHub.$emit("UpdateFind");
        } else {
          this.$common.handlerMsgState({
            msg: res.data.result.message,
            type: "danger"
          });
        }
      } catch (error) {
        console.log(error);
      }
      this.selectPush = false;
    },
    // 单选事件
    changeRadios(val) {
      if (val) {
        this.checkUserList = [];
      }
    },
    // 多选事件
    handleCheckAllChange(val) {
      val && (this.radio = "");
    },
    // evt里面有两个值，一个evt.added 和evt.removed  可以分别知道移动元素的ID和删除元素的ID
    changeGonggaoImg(evt) {
      console.log(evt, "change...");
      // const newVal = this.fileList[evt.moved.oldIndex]
      // this.fileList[evt.moved.oldIndex] = this.fileList[evt.moved.newIndex]
      // this.fileList[evt.moved.newIndex] = newVal
    },
    // start ,end ,add,update, sort, remove 得到的都差不多
    startGonggaoImg(evt) {
      this.drag = true;
      console.log(evt, "start...");
    },
    // 图片拖拽结束
    endGonggaoImg() {
      this.drag = true;
      // evt.item // 可以知道拖动的本身
      // evt.to    // 可以知道拖动的目标列表
      // evt.from  // 可以知道之前的列表
      // evt.oldIndex  // 可以知道拖动前的位置
      // evt.newIndex  // 可以知道拖动后的位置
    },
    // 移动公告图片
    moveGonggaoImg(evt, originalEvent) {
      this.isHoverImgItem = null;
      console.log(evt, "move");
      console.log(originalEvent); // 鼠标位置
    },
    // 鼠标移入发公告
    itemImgNter(id) {
      this.isHoverImgItem = id;
    },
    // 鼠标移出发公告
    itemImgLeave() {
      this.isHoverImgItem = null;
    },
    // 点击删除图片预览
    deleteItemImg(id) {
      this.formData.fileList.forEach((val, i) => {
        if (val.uid === id) {
          this.formData.fileList.splice(i, 1);
        }
      });
      console.log(this.formData.fileList);
    },
    // 点击打开预览发公告大图
    opemViewer(index) {
      this.showViewer = true;
      const tempImgList = this.formData.fileList.map(val => {
        if (val && val.url) return val.url;
      });
      const temp = [];
      for (let i = 0; i < index; i++) {
        temp.push(tempImgList.shift());
      }
      this.viewerImgList = tempImgList.concat(temp);
      this.$PreviewPic({
        zIndex: 9999, // 组件的zIndex值 默认为2000
        index: 0, // 展示第几张图片 默认为0
        list: this.viewerImgList, // 需要展示图片list
        onClose: i => {
          // 关闭时的回调
          console.log(i);
        },
        onSelect: i => {
          // 点击某张图片的回调
          console.log(i);
        }
      });
    },
    // 点击关闭预览发公告大图
    closeViewer() {
      this.showViewer = false;
    },
    // 图片或视频超出时的回调
    onExceed() {
      this.$common.handlerMsgState({
        msg: "最多只能选择" + this.imgAndVideoNum + "个文件呢",
        type: "danger"
      });
    },
    // 发公告选择图片
    changeFile(file, fileList) {
      if (fileList[0].raw.type.split(/\//)[0] === "video") {
        this.imgAndVideoNum = 1;
        if (file.size > this.globalJson.NoticeRestrictions[1].itemCode) {
          this.$common.handlerMsgState({
            msg:
              "上传视频大小不能超过 " +
              this.globalJson.NoticeRestrictions[1].itemCode / 1024 / 1024 +
              "MB",
            type: "danger"
          });
          fileList.pop();
          return false;
        }
      } else {
        this.imgAndVideoNum = Number(
          this.globalJson.NoticeRestrictions[4].itemCode
        );
        if (file.raw.type.split(/\//)[0] === "video") {
          fileList.pop();
          this.$common.handlerMsgState({
            msg: "只能上传图片或视频的其中一种文件格式",
            type: "danger"
          });
          return false;
        }
        if (file.size > this.globalJson.NoticeRestrictions[5].itemCode) {
          console.log(this.$common.handlerMsgState);
          this.$common.handlerMsgState({
            msg:
              "上传图片大小不能超过 " +
              this.globalJson.NoticeRestrictions[5].itemCode / 1024 / 1024 +
              "MB",
            type: "danger"
          });
          fileList.pop();
          return false;
        }
      }
      this.formData.fileList = fileList;
      this.fileType = this.formData.fileList[0].raw.type.split("/")[0];
    },
    // 删除图片
    handleRemove(file, fileList) {
      fileList.pop();
    },
    // 获取通讯录列表
    async getOrgList(flag) {
      const res = await this.$http.post("/api/GetFriendAddressBooksPage", {
        skipCount: this.orgListCurrentPage,
        maxResultCount: this.orgListPageSize
      });
      console.log(res);
      if (res.data.result.code === 200) {
        this.orgList = flag
          ? this.orgList.concat(res.data.result.item.items)
          : res.data.result.item.items;
        this.orgListCount = res.data.result.item.totalCount;
      }
    },
    // 通讯录下拉加载更多
    tongxunluLoad() {
      if (this.orgListCount < 10 || this.orgList.length >= this.orgListCount) {
        return;
      }
      this.orgListCurrentPage++;
      this.getOrgList(true);
    },
    // 是否推送公告
    isSelectPush() {
      this.$refs.refGonggao.validate(valid => {
        if (valid) {
          if (this.formData.isPush == "true") {
            this.orgListCurrentPage = 1;
            this.getOrgList(false);
            this.radio = "";
            this.checkUserList = [];
            this.selectPush = true;
          } else {
            this.sendGonggao();
          }
        }
      });
    }
  },
  created() {},
  mounted() {},
  computed: {
    gonggaoTypes() {
      return this.options.type === "Ordinary"
        ? "请输入普通公告内容"
        : this.options.type === "Purchase"
        ? "请输入采购公告内容"
        : "请输入供应公告内容";
    },
    uploadAccept() {
      return (
        this.globalJson.NoticeRestrictions[0].itemCode +
        "," +
        this.globalJson.NoticeRestrictions[3].itemCode
      );
    }
  }
};
</script>
<style scoped lang="less">
@deep: ~">>>";
.wrapBox {
  width: 100%;
  position: relative;
  .sendGonggao {
    background-color: #fff;
    box-sizing: border-box;
    padding: 10px 5px;
    box-sizing: border-box;
    .txtWrap {
      padding: 0;
      @{deep} .el-input__count {
        bottom: -5px;
        line-height: normal;
        padding: 0 5px;
      }
    }
    .gonggaoImgList {
      &:after {
        content: " ";
        height: 0;
        clear: both;
        display: block;
        visibility: hidden;
      }
      .syllable_ul {
        .el-col {
          margin-top: 5px;
          width: 148px;
          margin-right: 10px;
          box-sizing: border-box;
          .imgItemBox {
            width: 148px;
            box-sizing: border-box;
            border: 1px solid #dcdfe6;
            height: 0;
            padding-bottom: 100%;
            position: relative;
            border-radius: 5px;
            overflow: hidden;
            .itemIcon {
              position: absolute;
              left: 0;
              top: 0;
              right: 0;
              bottom: 0;
              background-color: rgba(0, 0, 0, 0.4);
              span {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                i {
                  color: #fff;
                  margin: 0 5px;
                  cursor: pointer;
                }
              }
            }
            .el-image {
              width: 100%;
              height: 100%;
              padding-bottom: 100%;
              position: relative;
              @{deep} img {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
              }
            }
          }
          @{deep} .el-image-viewer__wrapper {
            .el-image-viewer__mask {
              opacity: 0.1;
            }
          }
        }
      }
      .imgsItemBox {
        margin-top: 5px;
        // .imgsItem {
        //   width: 100%;
        //   height: 100%;
        //   float: left;
        //   @{deep} .el-upload {
        //     width: 100%;
        //     height: 123.98px;
        //     line-height: normal;
        //     position: relative;
        //     .el-icon-plus {
        //       position: absolute;
        //       left: 50%;
        //       top: 50%;
        //       transform: translate(-50%, -50%);
        //     }
        //   }
        // }
      }
    }
    .sendGonggaoBtn {
      text-align: center;
      margin: 20px 0;
      width: 264px;
      margin-left: 143px;
      .sendBtn {
        width: 80%;
        border-radius: 5px;
      }
    }
  }
  .tongxunlu {
    .title {
      margin-bottom: 20px;
      font-weight: 600;
    }
  }
}
.videoDelete {
  &:hover {
    color: #409eff;
  }
}
@{deep} .myRadios {
  display: flex;
  .el-radio {
    flex: 1;
    font-size: 30px;
    display: flex;
    align-items: center;
    margin: 20px;
    .el-radio__label {
      .el-avatar {
        vertical-align: top;
        margin-right: 10px;
      }
    }
    .el-radio__label,
    .is-checked,
    .el-radio__inner {
      display: flex;
      align-items: center;
    }
    .icon_box {
      opacity: 1;
      background: #6b3bed;
      border: 1px solid #6b3bed;
      border-radius: 50%;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      font-size: 27px;
    }
    .icon_box_cs {
      opacity: 1;
      background: #ff6060;
      border: 1px solid #ff6060;
      border-radius: 50%;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      font-size: 27px;
    }
    .icon_box_text {
      margin-left: 10px;
    }
  }
}
.quanxianBox {
  display: flex;
  align-items: center;
  .el-cascader {
    width: 150px;
  }
  .guangbo {
    margin-left: 50px;
  }
}
.tongxunluLianxiren {
  max-height: 430px;
  overflow: auto;
  @{deep} .el-checkbox-group {
    .el-checkbox {
      font-size: 30px;
      display: flex;
      align-items: center;
      margin: 20px;
      &:hover {
        background-color: #f5f7fa;
      }
      .el-checkbox__label,
      .el-checkbox__input {
        display: flex;
        align-items: center;
        .el-image {
          transition: all 0.5s;
          width: 50px;
          height: 50px;
          margin-right: 10px;
          border-radius: 50px;
          background-color: #165af7;
          color: white;
        }
      }
      &:hover {
        @{deep} .el-image {
          -webkit-transform: scale(1.1);
          -moz-transform: scale(1.1);
          -ms-transform: scale(1.1);
          transform: scale(1.1);
        }
      }
      .el-checkbox__label,
      .is-checkbox,
      .el-checkbox__inner {
        display: flex;
        align-items: center;
        border-radius: 50%;
      }
    }
  }
}
</style>
