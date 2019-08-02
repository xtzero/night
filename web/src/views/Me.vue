<template>
	<div class="container" v-loading="screenLoading">
		<el-card class="box-card">
			<div style="font-weight: 900;font-size: 25px;">{{me.name.length > 8 ? me.name.substring(0,8) + '...' :
				me.name}}
			</div>
			<p class="time">
				{{me.count}} 条内容
			</p>
			<el-divider></el-divider>
			<p class="time card-bottom">
				<i class="el-icon-cold-drink" @click="showReturnBeforeDialog"> 重生</i>
				<span style="margin-left: 20px;"></span>
				<i class="el-icon-moon-night" @click="showRebornDialog"> 转世</i>
			</p>
		</el-card>
		<el-card class="box-card" v-for="v in list">
			<div>
				{{ v.content }}
			</div>
			<p class="time">
				{{ v.name }} 于 {{ formatTime(v.create_at)}} 发送
				<br/>
				<span class="el-icon-chat-dot-round">{{ v.c_count ? v.c_count : 0 }}</span>
				<el-divider direction="vertical"></el-divider>
				<span class="el-icon-sunny">{{ v.star ? v.star : 0 }}</span>
				<el-divider direction="vertical"></el-divider>
				<span class="el-icon-heavy-rain">{{ v.shit ? v.shit : 0 }}</span>
			</p>
			<el-divider></el-divider>
			<p class="time card-bottom">
				<i class="el-icon-delete" @click="commitDelete(v)"> 删除</i>
			</p>
		</el-card>
		<el-card class="box-card" style="text-align: center; font-size: 13px;padding: 0;" v-show="!nomore">
			<span @click="nextPage">
				下一页
			</span>
		</el-card>
		<el-card class="box-card" style="text-align: center; font-size: 13px;padding: 0;" v-show="nomore">
			<span @click="reload">
				没有更多了，点击重新加载
			</span>
		</el-card>
		<el-dialog
				title="转世"
				:visible.sync="reborn.display"
				width="80%"
		>
			<span>
				<p>转世之后会重置当前登录状态，并且你将永远失去当前身份。</p>
				<p>你将会失去当前的全部数据，并使重生口令失效。</p>
				<p>你可以就此重新开始。</p>
				<p>如果决定了，请点击确定。</p>
			</span>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="reborn.display = false">取 消</el-button>
			    <el-button type="primary" @click="commitReborn()">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog
				title="重生"
				:visible.sync="returnBefore.display"
				width="80%"
		>
			<span>
				<p>输入登录时预设的重生口令，你可以将之前账号的数据完全同步过来。</p>
				<p>将会参与同步的数据有：帖子、评论</p>
				<p>如果决定好了，请告诉我你的重生口令...</p>
				<el-input
						v-model="returnBefore.password"
						placeholder="安巴尼妈咪哄"
				/>
			</span>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="returnBefore.display = false">取 消</el-button>
			    <el-button type="primary" @click="commitReturnBefore()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
    export default {
        name: 'me',
        components: {},
        data() {
            return {
                screenLoading: false,
                list: [],
                page: 1,
                nomore: false,
                me: {
                    count: 0,
                    name: ''
                },
                reborn: {
                    display: false
                },
                returnBefore: {
                    display: false,
	                password: ''
                }
            }
        },
        mounted() {
            this.$checkUser()
            this.me.name = this.$store.state.user.name
            this.getMomentCount()
            this.getMomentList()
        },
        methods: {
            getMomentCount() {
                this.screenLoading = true
                this.$utils.ajax("momentCount", {
                    userid: this.$store.state.user.id
                }).then((res) => {
                    this.screenLoading = false
                    if (res.data.code === 200) {
                        this.me.count = res.data.data.count
                    } else {
                        this.$notify({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
            },
            getMomentList(nextPage) {
                let page;
                if (nextPage) {
                    page = this.page + 1
                } else {
                    page = this.page
                }
                this.screenLoading = true
                this.$utils.ajax('listMoment', {
                    page: page,
                    userid: this.$store.state.user.id
                }).then((res) => {
                    this.screenLoading = false
                    if (res.data.code == 200) {
                        const d = res.data.data
                        for (const i in d) {
                            this.list.push(d[i])
                        }
                        if (nextPage) {
                            this.page++
                        }
                    } else if (res.data.msg == '没有更多数据了') {
                        this.nomore = true
                    } else {
                        this.$notify({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
            },
            formatTime(time) {
                return this.$utils.formatTime(time)
            },
            nextPage() {
                this.getMomentList(true)
            },
            reload() {
                this.list = []
                this.page = 1
                this.nomore = false
                this.getMomentList()
            },
	        showRebornDialog() {
                this.reborn.display = true
	        },
            showReturnBeforeDialog() {
                this.returnBefore.display = true
            },
	        commitReborn() {
                alert('转世！')
	        },
	        commitReturnBefore() {
                alert('重生！')
	        },
	        commitDelete(v) {
                alert('要删除啦')
	        }

        },
        computed: {}
    }
</script>
<style>
	.card-bottom {
		margin-top: -10px;
	}
</style>
