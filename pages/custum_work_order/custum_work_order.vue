<template>
	<view>
		<form name="cusWO">
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					<text class="cuIcon-title text-green"></text>
					<text>联系方式</text>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">联系人</view>
				<input placeholder="您的姓名" name="cusWO.linkmanName"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">电话号码</view>
				<input name="cusWO.phone"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">归属网点</view>
				<text>{{bkName}}</text>
			</view>
			<view class="cu-form-group bg-white margin-top">
				<view class="title">故障分类</view>
				<picker @change="PickerChange" :value="index" :range="faultPickerArray.map(x => x.label)">
					<view class="picker">
						{{index>-1?faultPickerArray[index].label:'请选择分类'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">设备类型</view>
				<picker mode="multiSelector" @change="MultiChange" range-key="label" @columnchange="MultiColumnChange" :value="multiIndex" :range="multiArray">
					<view class="picker">
						{{multiIndex[0]==5?multiArray[multiIndex[0]].label:multiArray[multiIndex[0]][multiIndex[1]].label}}
					</view>
				</picker>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					<text class="cuIcon-title text-green"></text>
					<text>故障描述</text>
				</view>
			</view>
			<view class="cu-form-group">
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="故障描述"></textarea>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					<text class="cuIcon-title text-green"></text>
					<text>图片上传</text>
				</view>
				<view class="action">
					{{imgList.length}}/4
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					 <image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			<view class="padding flex flex-direction margin-top">
				<button class="cu-btn bg-gradual-blue lg" form-type="submit">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
import Api from '../../api/wo';
import mpvuePicker from 'mpvue-picker';
	export default {
		components: {
			mpvuePicker	
		},
		onLoad:function(){
			Api.initWO().then(res => {
					this.bkName = res.data.org
					this.machinePickerArray = res.data.machinePicker
					this.faultPickerArray = res.data.faultPicker
					this.multiArray[0] = res.data.machinePicker
					this.multiArray[1] = res.data.machinePicker[0].children
					console.log(this.multiArray)
				})
		},
		data() {
			return {
				index: -1,
				imgList: [],
				bkName: '',
				multiArray: [],
				multiIndex: [0, 0],
				machinePickerArray: [],
				faultPickerArray: [],
				flag: false
			};
		},
		methods: {
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '删除确认',
					content: '确定要删除这张图片吗？',
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			PickerChange(e) {
				console.log(e.detail.value)
				this.index = e.detail.value
			},
			MultiChange(e) {
				console.log(e.detail.value)
				this.multiIndex = e.detail.value
			},
			MultiColumnChange(e) {
				let data = {
					multiArray: this.multiArray,
					multiIndex: this.multiIndex
				};
				let len = data.multiArray.length
				console.log(e.detail.value)
				console.log(e.detail.column)
				data.multiIndex[e.detail.column] = e.detail.value
				for(let i = 0 ; i < len ; i++){
					if(i == 5){
						data.multiArray[1] = []
						break
					}
					if(data.multiIndex[0] == i){
						console.log(data.multiArray[0][i])
						data.multiArray[1] = data.multiArray[0][i].children
						break
					}
				}
				data.multiIndex[1] = 0
				this.multiArray = data.multiArray
				this.multiIndex = data.multiIndex
				console.log(this.multiArray)
			},
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
