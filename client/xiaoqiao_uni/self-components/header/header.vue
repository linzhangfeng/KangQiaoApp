/**
* @tpl 顶部导航模板（自定义）
*/
<template>
	<view class="uni_topbar" :style="!transparent ? style : ''">
		<view class="inner flexbox flex_alignc" :class="[fixed || transparent ? 'fixed' : '']" :style="[{'height': customBarH + 'px', 'padding-top': statusBarH + 'px', 'color': titleTintColor}, bgColor]">
			<view v-if="isBack" @tap="goBack">
				<slot name="back"></slot>
			</view>
			<view v-if="isGoIndex" @tap="goIndex">
				<slot name="goIndex"></slot>
			</view>
			<slot name="headerL"></slot>
			<!-- #ifndef MP -->
			<view class="flex1" v-if="!search && center"></view>
			<!-- #endif -->
			<view class="uni_title flex1" :class="[center ? 'uni_titleCenter' : '']" :style="[isBack ? {'font-size': '40upx', 'padding-left': '0'} : {'font-size':'40upx'}]"
			 v-if="!search && hdtitle">{{hdtitle}}</view>
			<view class="uni_search flex1" :class="[searchRadius ? 'uni_searchRadius' : '']" v-if="search">
				<input v-if="searchRadius"  class="uni_searchIpt flex1" type="text" placeholder="搜索" placeholder-style="color: rgba(0,0,0,.5);" />
				<input v-else class="uni_searchIpt flex1" type="text" placeholder="搜索" placeholder-style="color: rgba(255,255,255,.5);" />
			</view>
			<view class="uni_headerRight flexbox flex_row flex_alignc">
				<slot name="iconfont"></slot>
				<slot name="string"></slot>
				<slot name="image"></slot>
				<slot name="button"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				hdtitle:"",
				statusBarH: this.statusBar,
				customBarH: this.customBar
			}
		},
		props: {
			isBack: {
				type: [Boolean, String],
				default: true
			},
			isGoIndex: {
				type: [Boolean, String],
				default: true
			},
			title: {
				type: String,
				default: ''
			},
			titleTintColor: {
				type: String,
				default: '#fff'
			},
			bgColor: Object,
			center: {
				type: [Boolean, String],
				default: false
			},
			search: {
				type: [Boolean, String],
				default: false
			},
			searchRadius: {
				type: [Boolean, String],
				default: false
			},
			fixed: {
				type: [Boolean, String],
				default: false
			},
			transparent: {
				type: [Boolean, String],
				default: false
			},
		},
		
		computed: {
			style() {
				let _style = `height: ${this.customBarH}px;`
				return _style
			}
		},
		watch: { // 对接收值进行监听
			title: function(val) {
				console.log("lin=watch:" + val);
				this.hdtitle = val;
			},
		},
		mounted() {

		},
		methods: {
			onUpdateAppState(data){
				this.hdtitle = this.title + data;
			},
			goBack() {
				
			},
			goIndex(){
				console.log('goindx')
				uni.navigateBack({
				    delta: 100
				});
			}
		}
	}
</script>
<style>

</style>
