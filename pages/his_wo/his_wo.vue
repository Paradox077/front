<template>
<view>
	<view class="cu-list menu-avatar">
		<view class="cu-item">
		</view>
		<view class="cu-item">
		</view>
		<view class="cu-item ">
		</view>
		<view class="cu-item grayscale">
		</view>
		<view class="cu-item cur">
		</view>
	</view>
</view>
</template>

<script>
	import Api from '../../api/wo';
	export default {
		onLoad:function(){
			Api.getHisWO().then(res => {
					console.log(res)
				})
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
