<template>
	<view class="supplier_sharing">
		<!-- pc端 -->
		<!-- 头部 -->
		<xHead :contactInfo="contactInfo" active="dontLoadShareFactory" :threeMenuTemp="threeMenuTemp" :remMenuTemp="remMenuTemp" :isMobile="isMobile"></xHead>
		<view class="content" v-if="!isMobile">
			<!-- 幻灯片 -->
			<view class="content_swiper">
				<image :src="threeProduct.length ? supplier_sharing_3d:recommendProduct.length?supplier_sharing_3d_2:supplier_sharing_3d_3" class="product_label"></image>
				<customSwiper :swiper-lists="threeProduct.length ? threeProduct:recommendProduct.length?recommendProduct:allProduct" @go-detail="goDetail"></customSwiper>
			</view>
			<!-- 推荐产品 -->
			<view class="content_recommend_product" v-if="threeProduct.length&&recommendProduct.length">
				<view class="title rp"></view>
				<view class="product_list">
					<b-row >
						<b-col cols="6" v-for="(item,index) in recommendProduct.slice(0,2)" :key='index'>
							<view class="product_list_item">
								<view class="product_list_img" @click="goDetail(item)">
									<image class="img" :src="item.img?item.img:defaultImg"></image>
								</view>
								<view class="product_list_info">
									<view class="product_list_info_text active" :title="item.name">
										{{item.name}}
									</view>
									<view class="product_list_info_text">
										出厂货号：{{item.fa_no}}
									</view>
									<view class="product_list_info_text">
										参考报价：<text class="red_color">￥{{item.price}}</text>
									</view>
									<view class="product_list_info_text">
										<u-button type="warning" shape="circle" size="mini" @click="goDetail(item)">查看详情</u-button>
									</view>
								</view>
							</view>
						</b-col>
					</b-row>
					<b-row :style="{marginTop:'25px'}">
						<b-col cols="3" v-for="(item,index) in recommendProduct.slice(2,6)" :key='index'>
							<view class="product_list_item2">
								<view class="product_list_img" @click="goDetail(item)">
									<image class="img" :src="item.img?item.img:defaultImg"></image>
								</view>
								<view class="product_list_info">
									<view class="product_list_info_text active" :title="item.name">
										{{item.name}}
									</view>
									<view class="product_list_info_plus">
										<view class="product_list_info_text_left">
											出厂货号：{{item.fa_no}}
										</view>
										<view class="product_list_info_text_right">
											<text class="red_color">￥{{item.price}}</text>
										</view>
									</view>
								</view>
							</view>
						</b-col>
					</b-row>
					<view class="more_btn">
						<u-button class="orange-btn" shape="circle" @click="toLink('supplierSharingRecList')">查看更多></u-button>
					</view>
				</view>
			</view>
			<!-- 最新产品 -->
			<view class="content_new_product" v-if="newProduct.length">
				<view class="title rp"></view>
				<view class="product_list">
					<b-row>
						<b-col cols="3" v-for="(item,index) in newProduct" :key='index'>
							<view class="product_list_item">
								<view class="product_list_img" @click="goDetail(item)">
									<image class="img" :src="item.img?item.img:defaultImg"></image>
								</view>
								<view class="product_list_info">
									<view class="product_list_info_text active" :title="item.name">
										{{item.name}}
									</view>
									<view class="product_list_info_plus">
										<view class="product_list_info_text_left">
											出厂货号：{{item.fa_no}}
										</view>
										<view class="product_list_info_text_right">
											<text class="red_color">￥{{item.price}}</text>
										</view>
									</view>
								</view>
							</view>
						</b-col>
					</b-row>
					<view class="more_btn">
						<u-button class="grenn-btn" shape="circle" @click="toLink('supplierSharingAllList')">查看更多></u-button>
					</view>
				</view>
			</view>
			<!-- 其他产品 -->
			<view class="content_other_product" v-if="allProduct.length">
				<view class="title rp"></view>
				<view class="product_list">
					<b-row>
						<b-col cols="3" v-for="(item,index) in allProduct" :key='index'>
							<view class="product_list_item">
								<view class="product_list_img" @click="goDetail(item)">
									<image class="img" :src="item.img?item.img:defaultImg"></image>
								</view>
								<view class="product_list_info">
									<view class="product_list_info_text active" :title="item.name">
										{{item.name}}
									</view>
									<view class="product_list_info_plus">
										<view class="product_list_info_text_left">
											出厂货号：{{item.fa_no}}
										</view>
										<view class="product_list_info_text_right">
											<text class="red_color">￥{{item.price}}</text>
										</view>
									</view>
								</view>
							</view>
						</b-col>
					</b-row>
					<view class="more_btn">
						<u-button class="blue-btn" shape="circle" @click="toLink('supplierSharingAllList')">查看更多></u-button>
					</view>
				</view>
			</view>
			<!-- 联系方式 -->
			<view class="content_contact">
				<view class="contact_img"></view>
				<view class="contact_way">
					<view class="title" v-if="contactInfo.companyName">{{contactInfo.companyName}}</view>
					<view class="name" v-if="contactInfo.contactsMan">联系人：{{contactInfo.contactsMan}}</view>
				</view>
				<view class="contact_info">
					<view class="item" v-if="contactInfo.telephoneNumber">电话：{{contactInfo.telephoneNumber}}</view>
					<view class="item" v-if="contactInfo.phoneNumber">手机：{{contactInfo.phoneNumber}}</view>
					<view class="item" v-if="contactInfo.address">地址：{{contactInfo.address}}</view>
				</view>
			</view>
		</view>
		<!-- 尾部 -->
		<view class="mb_content" v-else>
			<view class="wrap">
				<image :src="threeProduct.length ? supplier_sharing_3d:recommendProduct.length?supplier_sharing_3d_2:supplier_sharing_3d_3" class="product_label"></image>
				<u-swiper :list="threeProduct.length ? dealImage(threeProduct):recommendProduct.length?dealImage(recommendProduct):dealImage(allProduct)" height="350" @click="goDetails" border-radius="0"></u-swiper>
			</view>
			<view class="panel">
				<view class="product_panel" v-if="threeProduct.length&&recommendProduct.length">
					<view class="title_box">
						<view class="icon_blue"></view>
						<view class="title_box_title">推荐产品</view>
						<view class="title_box_more" @click="toLink('supplierSharingList')">更多</view>
					</view>
					<view class="product_grid">
						<b-row no-gutters>
							<b-col cols="4" v-for="(item,index) in recommendProduct.slice(0,3)" :key='index'>
								<view class="product_grid_item">
									<image class="img" :src="item.img?item.img:defaultImg" @click="goDetail(item)"></image>
									<view class="text" :title="item.name">{{item.name}}</view>
								</view>
							</b-col>
						</b-row>
					</view>
				</view>
				<view class="product_panel" v-if="newProduct.length">
					<view class="title_box">
						<view class="icon_blue"></view>
						<view class="title_box_title">最新产品</view>
						<view class="title_box_more" @click="toLink('supplierSharingAllList')">更多</view>
					</view>
					<view class="product_list">
						<view class="product_list_item" v-for="(item,index) in newProduct.slice(0,3)" :key='index'>
							<view class="left">
								<image class="img" :src="item.img?item.img:defaultImg" @click="goDetail(item)"></image>
							</view>
							<view class="right">
								<view class="item name" :title="item.name">{{item.name}}</view>
								<view class="item number" :title="item.fa_no">货号：{{item.fa_no}}</view>
								<view class="item price" :title="item.price">参考报价：<text class="red_color">￥{{item.price}}</text></view>
							</view>
						</view>
					</view>
				</view>
				<view class="product_panel" v-if="allProduct.length">
					<view class="title_box">
						<view class="icon_blue"></view>
						<view class="title_box_title">其他产品</view>
						<view class="title_box_more"  @click="toLink('supplierSharingAllList')">更多</view>
					</view>
					<view class="product_list">
						<b-row no-gutters>
							<b-col cols="6" sm="3" v-for="(item,index) in newProduct.slice(0,4)" :key='index'>
								<view class="product_list_item2">
									<view class="product_list_img" @click="goDetail(item)">
										<image class="img" :src="item.imageUrl"></image>
									</view>
									<view class="product_list_info">
										<view class="product_list_info_text active" :title="item.name">
											{{item.name}}
										</view>
										<view class="product_list_info_plus">
											<view class="product_list_info_text_left">
												出厂货号：{{item.fa_no}}
											</view>
											<view class="product_list_info_text_right">
												参考报价：<text class="red_color">￥{{item.price}}</text>
											</view>
										</view>
									</view>
								</view>
							</b-col>
						</b-row>
					</view>
				</view>
			</view>
		</view>
		<xFooter :isMobile="isMobile"></xFooter>
	</view>
</template>

<script>
import xHead from "@/components/supplierSharing/x-head.vue"
import xFooter from "@/components/supplierSharing/x-footer.vue"
import util from "@/common/js/util.js"
import customSwiper from '@/components/blackmonth-swiper/index'
import {
  getToken
} from "@/service/common.js"
export default {
	name: "DontLoadShareFactory",
	components: {
		customSwiper,
		xHead,
		xFooter
	},
	data() {
		return {
			logo: require("@/static/logo.png"),
			supplier_sharing_3d: require("@/static/images/supplier_sharing_3d.png"),
			supplier_sharing_3d_2: require("@/static/images/supplier_sharing_3d_2.png"),
			supplier_sharing_3d_3: require("@/static/images/supplier_sharing_3d_3.png"),
			supplier_sharing_3d_sm: require("@/static/images/supplier_sharing_3d_sm.png"),
			defaultImg: require("@/static/images/logo.png"),
			isMobile:false,   //是否移动端
			contactInfo:{}, //联系信息
			recommendProduct:[], //推荐信息
			allProduct:[],	//所有产品
			threeProduct:[] 	,//3d产品
			newProduct:[], //最新产品
			threeMenuTemp:0,
			remMenuTemp:0,
			sortOrder:1, //1倒序，2升序
			sortType:3,  //1价格，2时间，3热度
		}
	},
	methods:{
		//获取厂商联系方式
		async getCompanyByIDShare() {
			var me = this;
			const res = await me.$u.api.CompanyByIDShare({
				shareCode: uni.getStorageSync('supplier_sharing_shareCode')
			});
			if (res.result.code === 200) {
				this.contactInfo = res.result.item;
				uni.setStorageSync('supplier_sharing_contactInfo',JSON.stringify(this.contactInfo));
			} else {
				uni.showToast({
					icon:'none',
					title: res.result.msg,
					duration: 2000
				});
			}
		},
		// 获取3d产品
		async getThreeDPage() {
			var me = this;
			const res = await me.$u.api.SupplierShareProducts({
				shareCode: uni.getStorageSync('supplier_sharing_shareCode'),
				skipCount: 1,
				maxResultCount: 5,
				getProductName: '3DProduct'
			});
			if (res.result.code === 200) {
				this.threeProduct = res.result.item.threeDProduct.newList;
				uni.setStorageSync('threeMenu',res.result.item.threeDProduct.totalCount);
				this.threeMenuTemp = res.result.item.threeDProduct.totalCount;
			} else {
				uni.showToast({
					icon:'none',
					title: res.data.result.msg,
					duration: 2000
				});
			}
		},
		// 获取推荐产品
		async getRecommendProductByNumberPage() {
			var me = this;
			const res = await me.$u.api.SupplierShareProducts({
				shareCode: uni.getStorageSync('supplier_sharing_shareCode'),
				skipCount: 1,
				maxResultCount: 8,
				getProductName: 'RecommendProduct'
			});
			if (res.result.code === 200) {
				this.recommendProduct = res.result.item.recommendProduct.newList;
				uni.setStorageSync('remMenu',res.result.item.recommendProduct.totalCount);
				this.remMenuTemp = res.result.item.recommendProduct.totalCount;
			} else {
				uni.showToast({
					icon:'none',
					title: res.data.result.msg,
					duration: 2000
				});
			}
		},
		// 最新所有产品
		async getSupplierProductShareNew() {
			var me = this;
			const res = await me.$u.api.SupplierShareProducts({
				shareCode: uni.getStorageSync('supplier_sharing_shareCode'),
				skipCount: 1,
				maxResultCount: 8,
				getProductName: 'AllProduct',
				sortOrder:2,
				sortType:1
			});
			if (res.result.code === 200) {
				this.newProduct = res.result.item.allProduct.newList;
			} else {
				uni.showToast({
					icon:'none',
					title: res.data.result.msg,
					duration: 2000
				});
			}
		},
		// 获取所有产品
		async getSupplierProductShare() {
			var me = this;
			const res = await me.$u.api.SupplierShareProducts({
				shareCode: uni.getStorageSync('supplier_sharing_shareCode'),
				skipCount: 1,
				maxResultCount: 8,
				getProductName: 'AllProduct',
				sortOrder:3,
				sortType:1
			});
			if (res.result.code === 200) {
				this.allProduct = res.result.item.allProduct.newList;
				// this.contactInfo = res.result.item.companyInfo;
				// uni.setStorageSync('supplier_sharing_contactInfo',JSON.stringify(this.contactInfo));
			} else {
				uni.showToast({
					icon:'none',
					title: res.data.result.msg,
					duration: 2000
				});
			}
		},
		//获取token
		async getToken(){
			var me = this;
			await getToken().then(
				(res) => {
					uni.setStorageSync('token',res[1].data.result.item);
				}
			)
		},
		//去详情页
		goDetail(item){
			var arr = [];
			var obj = {
				...item
			};
			if(item.imglist.length){
				for(var i=0;i<item.imglist.length;i++){
					
					arr.push(item.imglist[0].imgUrl);
				}
				obj['imgUrlList'] = arr;
			}
			uni.setStorageSync('supplier_sharing_detail',JSON.stringify(obj));
			this.$Router.push({
			    name:'supplierSharingDetail'
			})
		},
		goDetails(index){
			var item = this.threeProduct.length ? this.threeProduct[index]:this.recommendProduct.length ? this.recommendProduct[index]:this.newProduct[index];
			var arr = [];
			var obj = {
				...item
			};
			if(item.imglist&&item.imglist.length){
				for(var i=0;i<item.imglist.length;i++){
					
					arr.push(item.imglist[0].imgUrl);
				}
				obj['imgUrlList'] = arr;
			}
			uni.setStorageSync('supplier_sharing_detail',JSON.stringify(obj));
			//uni.setStorageSync('supplier_sharing_detail',JSON.stringify(this.threeProduct[index]));
			this.$Router.push({
			    name:'supplierSharingDetail'
			})
		},
		//链接跳转
		toLink(value){
			this.$Router.push({
			    name: value
			})
		},
		//修改数据返回类型，符合u-swiper的传参
		dealImage(data){
			var temp_data = data.map((e,index)=>{
				e.image = e.imageUrl;
				e.title = e.name;
				return e;
			});
			return temp_data.slice(0,5);
		},
		async init(){
			this.$loading.show();
			this.isMobile=util.isMobile();
			await this.getToken();
			await this.getCompanyByIDShare();
			await this.getThreeDPage();
			await this.getRecommendProductByNumberPage();
			await this.getSupplierProductShareNew();
			await this.getSupplierProductShare();
			this.$loading.hide();
		},
	},
	mounted() {
		
	},
	updated: function () {
	  this.$nextTick(function () {
		
	  })
	},
	created(){
		if(uni.getStorageSync('supplier_sharing_shareCode')||this.$route.query.shareCode){
			uni.getStorageSync('supplier_sharing_shareCode') ?  (this.$route.query.shareCode ? uni.setStorageSync('supplier_sharing_shareCode', this.$route.query.shareCode):''): uni.setStorageSync('supplier_sharing_shareCode', this.$route.query.shareCode);
			this.init();
		} else {
			this.$loading.show();
		}
	}
}
</script>
<style lang="less" scoped>
@import  "@/less/supplierSharing/supplierSharing.less";
</style>
