<template>
	<view class="head" :class="[showHead ? '':'sm']">
		<template v-if="!isMobile">
			<view class="head_item_grid">
				<view class="logo">
					<image :src="contactInfo2.companyLogo" class="image"></image>
				</view>
				<view class="title">
					{{contactInfo2.companyName}}
				</view>
				<view class="menu">
					<view class="menu_item" :class="[nowActive=='dontLoadShareFactory' ? 'active':'']" @click="toLink('dontLoadShareFactory')">首页</view>
					<view class="menu_item" :class="[nowActive=='supplierSharingList' ? 'active':'']" @click="toLink('supplierSharingList')" v-if="threeMenu">3D产品</view>
					<view class="menu_item" :class="[nowActive=='supplierSharingRecList' ? 'active':'']" @click="toLink('supplierSharingRecList')" v-if="remMenu">推荐产品</view>
					<view class="menu_item" :class="[nowActive=='supplierSharingAllList' ? 'active':'']" @click="toLink('supplierSharingAllList')">全部产品</view>
					<view class="menu_item" :class="[nowActive=='supplierSharingContact' ? 'active':'']" @click="toLink('supplierSharingContact')">联系方式</view>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="head_item_grid_mb" v-if="showHead">
				<view class="logo">
					<image :src="contactInfo2.companyLogo" class="image"></image>
				</view>
				<view class="info">
					<view class="title">
						{{contactInfo2.companyName}}
					</view>
					<view class="contact">
						<view class="item" v-if="contactInfo2.contactsMan"><text>联系人：</text>{{contactInfo2.contactsMan}}</view>
						<view class="item" v-if="contactInfo2.phoneNumber||contactInfo2.telephoneNumber"><text>电话：</text>{{contactInfo2.phoneNumber||contactInfo2.telephoneNumber}}</view>
					</view>
				</view>
			</view>
			<view class="menu_mb">
				<view class="menu">
					<view class="menu_item" :class="[nowActive=='dontLoadShareFactory' ? 'active':'']" @click="toLink('dontLoadShareFactory')">首页</view>
					<view class="menu_item" :class="[nowActive=='supplierSharingList' ? 'active':'']" @click="toLink('supplierSharingList')" v-if="threeMenu">3D产品</view>
					<view class="menu_item" :class="[nowActive=='supplierSharingRecList' ? 'active':'']" @click="toLink('supplierSharingRecList')" v-if="remMenu">推荐产品</view>
					<view class="menu_item" :class="[nowActive=='supplierSharingAllList' ? 'active':'']" @click="toLink('supplierSharingAllList')">全部产品</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>

export default {
	name: "x-head",
	props:{
		contactInfo: {
			type: Object,
			default () {
				return {}
			}
		},
		active:{
			type:String,
			default:'supplierSharing',
		},
		threeMenuTemp:{
			type:Number,
			default:0,
		},
		remMenuTemp:{
			type:Number,
			default:0,
		},
		isMobile:{
			type:Boolean,
			default:false
		},
		showHead:{
			type:Boolean,
			default:true
		}
	},
	watch:{
		active:{
			handler(val){
				this.nowActive = val;
			},
			deep:true,
			immediate:true
		},
		contactInfo:{
			handler(val){
				this.contactInfo2 = val;
			},
			deep:true
		},
		threeMenuTemp:{
			handler(val){
				this.threeMenu = val;
			},
			deep:true,
			immediate:true
		},
		remMenuTemp:{
			handler(val){
				this.remMenu = val;
			},
			deep:true,
		}
	},
	data() {
		return {
			logo: require("@/static/logo.png"),
			nowActive:'',
			contactInfo2:{},
			threeMenu:0,
			remMenu:0,
		}
	},
	methods:{
		//链接跳转
		toLink(value){
			if(value == 'dontLoadShareFactory'){
				var id = uni.getStorageSync('supplier_sharing_shareCode');
				this.$Router.push({
				    path:'/'+value,
					query:{
						shareCode:id
					}
				})
			} else{
				this.$Router.push({
					name: value
				})
			}
		}
	},
	mounted() {
		
	},
	created(){
		this.contactInfo2 = uni.getStorageSync('supplier_sharing_contactInfo')&&JSON.parse(uni.getStorageSync('supplier_sharing_contactInfo'));
		this.threeMenu = uni.getStorageSync('threeMenu')&&JSON.parse(uni.getStorageSync('threeMenu'));
		this.remMenu = uni.getStorageSync('remMenu')&&JSON.parse(uni.getStorageSync('remMenu'));
	}
}
</script>
<style lang="less" scoped>
@media screen and (min-width: 768px){
	.head{
		display: flex;
		padding: 19px 360px 19px 360px;
		background: #ffffff;
		.head_item_grid{
			width: 100%;
			display: flex;
			.logo{
				width: 73px;
				height: 73px;
				.image{
					width: 73px;
					height: 73px;
				}
			}
			.title{
				height: 73px;
				font-size: 32px;
				font-weight: 800;
				text-align: left;
				color: #333333;
				line-height: 73px;
				margin-left: 16px;
			}
			.menu{
				display: flex;
				margin-left: auto;
				height: 73px;
				line-height: 73px;
				.menu_item{
					width: 100px;
					height: 40px;
					margin-top: 16.5px;
					margin-left: 30px;
					line-height: 40px;
					color: #333333;
					text-align: center;
				}
				.menu_item:hover{
					cursor: pointer;
				}
				.active{
					background: #36ade2;
					border-radius: 20px;
					text-align: center;
					color: #ffffff;
					font-size: 15px;
				}
			}
		}
		.head_item_grid_mb{
			width: 100%;
			display: flex;
			
		}
	}
}
@media screen and (max-width: 767px){
	.head{
		padding: 0;
		background: #00B0EC;
		width: 100%;
		height: 65px;
		color: #ffffff;
		.head_item_grid_mb{
			display: flex;
			width: 100%;
			height: 65px;
			.logo{
				width: 55px;
				height: 55px;
				margin: 5px 10px;
				.image{
					width: 55px;
					height: 55px;
				}
			}
			.info{
				margin-left: 15px;
				font-size: 13px;
				margin-top: 5px;
				margin-bottom: 5px;
				.title{
					font-size: 18px;
					line-height: 27.5px;
					font-weight: 700;
				}
				.contact{
					display: flex;
					line-height: 27.5px;
					.item{
						margin-right: 10px;
					}
				}
			}
		}
		.menu_mb{
			height: 50px;
			position: fixed;
			bottom: 0;
			border-top: 1px solid #DCDCDC;
			background: #fff;
			z-index: 2;
			width: 100%;
			.menu{
				display: flex;
				height: 30px;
				line-height: 30px;
				margin: 10px 10px 10px 10px;
				.menu_item{
					width: 100px;
					// height: 40px;
					// margin-top: 16.5px;
					// margin-left: 30px;
					// line-height: 40px;
					color: #333333;
					text-align: center;
					height: 30px;
					line-height: 30px;
				}
				.menu_item:hover{
					cursor: pointer;
				}
				.active{
					background: #36ade2;
					border-radius: 20px;
					text-align: center;
					color: #ffffff;
					font-size: 15px;
				}
			}
		}
	}
	.sm{
		height: 0px;
	}
}
</style>
