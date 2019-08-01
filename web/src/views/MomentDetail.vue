<template>
	<el-dialog
			title="提示"
			:visible.sync="displayDialog"
			:fullscreen="true"
			v-loading="screenLoading"
			>
		<span>这是一段信息{{displayDialog}}</span>
		<span slot="footer" class="dialog-footer">
    <el-button @click="displayDialog = true">取消</el-button>
    <el-button type="primary" @click="displayDialog = false">确 定</el-button>
  </span>
	</el-dialog>
</template>

<script>
export default {
    name: "MomentDetail",
    data() {
        return {
            dialogVisible: false,
	        screenLoading: false,
	        t: true
        }
    },
	props: [
	    "moment-id",
		"screen-display"
	],
	methods: {
      getMomentDetail() {
          this.screenLoading = true
          this.$utils.ajax('getMomentDetail', {
              mid: this.momentId
          }).then((res) => {
              this.screenLoading = false
              console.log(res)
          })
      }
	},
	computed: {
        displayDialog: {
            get(){
                return this.screenDisplay;
            },
	        set(n){
                this.screenDisplay = false
	        }
        }
	}
}
</script>

<style scoped>
	.moment-detail-container{

	}
</style>