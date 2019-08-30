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
<!--				<i class="el-icon-cold-drink" @click="showReturnBeforeDialog" v-if="canReturnBefore"> 重生</i>-->
<!--				<i class="el-icon-cold-drink" v-else> 重生已经被禁用</i>-->
<!--				<span style="margin-left: 20px;"></span>-->
				<i class="el-icon-moon-night" @click="showRebornDialog"> 转世</i>
			</p>
		</el-card>
		<el-card class="box-card" v-for="(v, k) in list">
			<div v-if="v.type === 'normal'">
				{{ v.content }}
			</div>
			<div v-else-if="v.type === 'voice'">
				<el-row>
					<el-col :span="3">
						<i class="el-icon-video-play" v-show="playing.mid!=v.id" @click="play(v, k)"></i>
						<i class="el-icon-circle-close" v-show="playing.mid==v.id" @click="stop"></i>
					</el-col>
					<el-col :span="19">
						<el-progress
								:text-inside="true"
								:stroke-width="26"
								:percentage="playing.mid===v.id ? ((Math.round(v.played) / Math.round(v.length)) * 100) : 0"
								:show-text="false"
						>
						</el-progress>
					</el-col>

				</el-row>
			</div>
			<p class="time">
				{{ v.name }} 于 {{ v.create_at }} 发送
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
				<p>你将会失去当前的全部数据。</p>
				<p>如果你在加入的时候设置了重生口令，则可以使用重生口令重新回来。</p>
				<p>或者，你可以就此重新开始。</p>
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
				v-loading="returnBefore.loading"
		>
			<span>
				<p>输入登录时预设的重生口令，你可以将之前账号的数据完全同步过来。</p>
				<p>将会参与同步的数据有：帖子、评论</p>
				<p>如果决定好了，请告诉我你之前的名字和重生口令...</p>
				<el-input
						v-model="returnBefore.name"
						placeholder="你之前的名字是什么？"
						size="mini"
				/>
				<el-input
						style="margin-top: 5px;"
						v-model="returnBefore.password"
						placeholder="安巴尼妈咪哄"
						size="mini"
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
	                name: '',
	                password: '',
                    loading: false
                },
	            canReturnBefore: true,
				playing: {
					isPlaying: false,
					mid: 0,
					audioObj: {},
					length: 1,
					played: 0,
					playInterval: {}
				}
            }
        },
        mounted() {
            this.$checkUser()
            this.me.name = this.$store.state.user.name
            this.getMomentCount()
            this.getMomentList()
	        this.canReturnBefore = localStorage.getItem('canreturnbefore.night.xtzero.me') == 1 ? false : true
			this.playing.audioObj = new Audio()
        },
        methods: {
			play(v, k) {
				if (this.playing.isPlaying) {
					this.$message({
						message: '正在播放其他音频',
						type: 'error'
					})
					return false
				}
				this.playing.audioObj.src = v.content
				this.playing.mid = v.id
				this.playing.audioObj.addEventListener("canplay", () => {
					this.playing.isPlaying = true
					this.playing.audioObj.play()
					this.list[k].length = this.playing.audioObj.duration
					this.playing.playInterval = setInterval(() => {
						this.list[k].played = this.playing.audioObj.currentTime
					}, 1000)
					setTimeout(() => {
						this.playing.audioObj.src = ''
						this.playing.isPlaying = false
						clearInterval(this.playing.playInterval)
					}, (this.playing.audioObj.duration - 0 + 1) * 1000)
				});
			},
			stop() {
				this.playing.audioObj.pause()
				this.playing.mid = 0
				this.playing.isPlaying = false
				clearInterval(this.playing.playInterval)
			},
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
							if (d[i].type === 'voice') {
								d[i].length = 1
								d[i].played = 0
							}
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
                if (prompt('如果真的想好要进行转世，并且已经准备好失去当前账号的全部数据，请在下方输入「确认转世」。成功后页面将刷新，你将会重新进入注册流程。','','请确认') === '确认转世') {
	                localStorage.removeItem('userid.night.xtzero.me')
	                localStorage.removeItem('name.night.xtzero.me')
	                this.$store.state.user.id = ''
	                this.$store.state.user.name = ''
	                window.location.reload()
                } else {
                    this.$message({
	                    type: error,
	                    message: '请做好充足准备再来'
                    })
                }
	        },
	        commitReturnBefore() {
                if (!this.returnBefore.name) {
                    this.$message({
                        type: 'error',
                        message: '请输入名字'
                    })
                    return false
                }
		        if (!this.returnBefore.password) {
		            this.$message({
			            type: 'error',
			            message: '请输入重生口令'
		            })
			        return false
		        }

		        if (prompt('请在下方输入「确认重生」，来表明这个操作是经过了你的深思熟虑。', '', '请确认') === '确认重生') {
		            if (confirm('请再次确认，是否真的要进行重生操作。重生后之前账号的数据将不复存在，全部的帖子、评论数据都将同步到当前账号。而且当前设备将在一段时间内禁止使用重生功能。这是最后一次确认，如果一切都确认完毕，请点击确认。')) {
                        this.returnBefore.loading = true
                        this.$utils.ajax('returnBefore', {
                            password: this.returnBefore.password,
                            name: this.returnBefore.name,
                            userid: this.$store.state.user.id
                        }).then((res) => {
                            this.returnBefore.loading = false
                            if (res.data.code === 200) {
                                localStorage.setItem('canreturnbefore.night.xtzero.me', 1)
                                alert('重生成功，点击确定后重新进入')
                                window.location.reload()
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: res.data.msg
                                })
                            }
                        }).catch(() => {
                            this.returnBefore.loading = false
                            this.$message({
                                type: 'error',
                                message: '重生时出现问题'
                            })
                        })
		            } else {
                        this.$message({
                            type: 'erorr',
                            message: '请深思熟虑之后再来'
                        })
		            }
		        } else {
		            this.$message({
			            type: 'erorr',
			            message: '请深思熟虑之后再来'
		            })
		        }
	        },
	        commitDelete(v) {
                alert('要删除啦~但是我还没做这个功能。要是发了什么不得了的东西，就先忘掉它吧~')
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
