<template>
  <div class="home" v-loading="screenLoading">
<!--    话题卡片-->
    <el-card class="box-card first-card">
      <el-col :span="20">
        <div class="notice-title">话题</div>
        <div class="notice-content">本期主题：你为什么睡不着</div>
      </el-col>
      <el-col :span="4" class="first-card-col-right">
        <el-button icon="el-icon-edit" type="primary" circle @click="send.display=true"></el-button>
      </el-col>
    </el-card>
<!--    帖子卡片 循环-->
    <el-card
      class="box-card"
      v-for="v in list"
    >
      <div @click="showDetail(v)">
        {{ v.content }}
      </div>
      <p class="time" @click="showDetail(v)">
        {{ zipName(v.name) }} 于 {{ v.create_at }} 发送
        <br/>
        <span class="el-icon-chat-dot-round">{{ v.c_count ? v.c_count : 0 }}</span>
        <el-divider direction="vertical"></el-divider>
        <span class="el-icon-sunny">{{ v.star ? v.star : 0 }}</span>
        <el-divider direction="vertical"></el-divider>
        <span class="el-icon-heavy-rain">{{ v.shit ? v.shit : 0 }}</span>
      </p>
    </el-card>
<!--    下一页卡片-->
    <el-card class="box-card" style="text-align: center; font-size: 13px;padding: 0;" v-show="!nomore">
			<span @click="nextPage">
				下一页
			</span>
    </el-card>
<!--    没有下一页了提示重新加载-->
    <el-card class="box-card" style="text-align: center; font-size: 13px;padding: 0;" v-show="nomore">
			<span @click="reload">
				没有更多了，点击重新加载
			</span>
    </el-card>
<!--新发帖 弹层-->
    <el-dialog
      title="想要表态"
      :visible.sync="send.display"
      width="100%"
      v-loading="send.loading"
    >
      <el-form>
        <el-form-item label-width="0">
          <el-input
            :rows="10"
            type="textarea"
            placeholder="请输入内容"
            v-model="send.data.content"
            :autosize="{ minRows: 3, maxRows: 10}"
          >
          </el-input>
          <span style="color: red;" v-if="this.send.data.content.length>30">
            剩余字数 {{this.send.data.content.length}} / 30
          </span>
          <span v-else>
            剩余字数 {{this.send.data.content.length}} / 30
          </span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sendMoment" :disabled="this.send.data.content.length > 30">表态！</el-button>
      </div>
    </el-dialog>

    <!--详情弹层-->
    <el-dialog
      :visible.sync="detail.display"
      :fullscreen="true"
      v-loading="detail.loading"
    >
      <h3><i class="el-icon-sugar" style="font-size: 20px;"></i> {{zipName(detail.data.name)}} 说：</h3>
      <span class="detail-content">{{detail.data.content}}</span>
      <p class="time" style="margin-bottom: 30px;">{{detail.data.create_at}}</p>
      <div class="block">
        <el-row style="display: flex;flex-direction: row;justify-content: space-between;width: 100%;">
          <el-col :span="6" style="text-align: left;">
            <i class="el-icon-sunny"></i> {{detail.data.star}}
          </el-col>
          <el-col :span="12" style="text-align: center;font-size: 10px;">{{sosTip}}</el-col>
          <el-col :span="6" style="text-align: right;">
            {{detail.data.shit}} <i class="el-icon-heavy-rain"></i>
          </el-col>
        </el-row>
        <el-slider
          v-model="detail.sos"
          :show-tooltip="false"
          @change="onSosChange"
        >
        </el-slider>
      </div>
      <el-divider class="others-say-divider" v-if="hasComments">其他人说</el-divider>
      <el-divider class="others-say-divider" v-else>其他人啥都没说</el-divider>
      <el-card class="detail-box-card">
        <div class="text item" style="text-align: center;">
          <span class="el-icon-thumb" v-if="hasComments" @click="showCommentDialog"> 加入 「其他人」</span>
          <span class="el-icon-thumb" v-else @click="showCommentDialog"> 我先说点啥</span>
        </div>
      </el-card>
      <el-card class="detail-box-card" v-for="v in detail.data.comments" v-show="hasComments">
        <span>{{zipName(v.name)}} :</span>
        <div class="text item">
          {{v.content}}
        </div>
      </el-card>
      <el-divider class="others-say-divider" v-if="hasComments">其他人说完了</el-divider>

    <!--详情里的评论弹层-->
      <el-dialog
              title="想要表态"
              :visible.sync="detail.comment.display"
              width="100%"
              v-loading="detail.comment.loading"
              append-to-body
      >
        <el-form>
          <el-form-item label-width="0">
            <el-input
                    :rows="10"
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="detail.comment.data.content"
                    :autosize="{ minRows: 3, maxRows: 10}"
            >
            </el-input>
            <span style="color: red;" v-if="detail.comment.data.content.length > 30">
            剩余字数 {{detail.comment.data.content.length}} / 30
          </span>
            <span v-else>
            剩余字数 {{detail.comment.data.content.length}} / 30
          </span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="sendComment" :disabled="detail.comment.data.content.length > 30">表态！</el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'home',
    components: {},
    data() {
      return {
        screenLoading: false,
        list: [],
        page: 1,
        nomore: false,
        send: {
          loading: false,
          display: false,
          data: {
            content: ''
          }
        },
        detail: {
          loading: false,
          display: false,
          sos: 0,
          data: {
            comments: [],
            shit: 0,
            star: 0
          },
          comment: {
            display: false,
            data: {
              content: ''
            },
            loading: false
          }
        }
      }
    },
    mounted() {
      this.$checkUser()
      this.getMomentList()
    },
    methods: {
      getMomentList(nextPage) {
        let page;
        if (nextPage) {
          page = this.page + 1
        } else {
          page = this.page
        }
        this.screenLoading = true
        this.$utils.ajax('listMoment', {
          page: page
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
            this.$message({
              type: 'error',
              message: res.data.msg
            })
            this.nomore = true
          } else {
            this.$message({
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
      sendMoment() {
        // 帖子要不要存话题啊？
        this.screenLoading = true
        this.$utils.ajax('sendMoment', {
          userid: this.$store.state.user.id,
          content: this.send.data.content
        }).then((res) => {
          this.screenLoading = false
          this.send.data.content = ''
          this.send.display = false
          this.reload()
        })
      },
      showDetail(v) {
        this.screenLoading = true
        this.$utils.ajax('momentDetail', {
          'mid': v.id
        }).then((res) => {
          this.screenLoading = false
          if (res.data.code === 200) {
            this.detail.display = true
            this.detail.data = res.data.data
            this.detail.sos = this.sosOriValue()
            console.log(this.detail.data)
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
      },
      onSosChange(v) {
        if (v === 0) {
          this.shit()
        } else if (v === 100) {
          this.star()
        } else {
          this.detail.sos = this.sosOriValue()
        }
      },
      sosOriValue() {
        const shit = this.detail.data.shit
        const star = this.detail.data.star
        const v = (star - shit) + 50
        return v
      },
      star() {
        this.detail.loading = true
        this.$utils.ajax('starOrShit', {
          mid: this.detail.data.id,
          sos: 'star'
        }).then((res) => {
          this.detail.loading = false
          if (res.data.code === 200) {
            this.showDetail({id: this.detail.data.id})
            this.$message({
              type: 'success',
              message: '点赞成功！',
              showClose: true,
            })
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg,
              showClose: true
            })
          }
        }).catch((e) => {
          this.detail.data.sos = this.sosOriValue()
        })
      },
      shit() {
        this.detail.loading = true
        this.$utils.ajax('starOrShit', {
          mid: this.detail.data.id,
          sos: 'shit'
        }).then((res) => {
          this.detail.loading = false
          if (res.data.code === 200) {
            this.showDetail({id: this.detail.data.id})
            this.$message({
              type: 'success',
              message: '点踩成功！',
              showClose: true
            })
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg,
              showClose: true
            })
          }
        }).catch((e) => {
          this.detail.data.sos = this.sosOriValue()
        })
      },
      showCommentDialog() {
        this.detail.comment.display = true
      },
      sendComment() {
        this.detail.comment.loading = true
        this.$utils.ajax('sendComment', {
          mid: this.detail.data.id,
          userid: this.$store.state.user.id,
          content: this.detail.comment.data.content
        }).then((res) => {
          this.detail.comment.loading = false
          if (res.data.code === 200) {
            this.detail.comment.display = false
            this.detail.comment.data.content = ''
            this.showDetail({
              id: this.detail.data.id
            })
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
      },
      zipName(name) {
        return name && name.length > 8 ? name.substring(0,8) + '...' : name
      }
    },
    computed: {
      hasComments() {
        return this.detail.data.comments.length > 0 ? true : false
      },
      sosTip() {
        if (this.detail.sos == this.sosOriValue()) {
          return '拖动滑块来表态'
        } else if (this.detail.sos < this.sosOriValue() && this.detail.sos > 0) {
          return '拖到最左表示反对'
        } else if (this.detail.sos > this.sosOriValue() && this.detail.sos < 100) {
          return '拖到最右表示赞同'
        } else if (this.detail.sos == 100) {
          return '松手表示赞同'
        } else if (this.detail.sos == 0) {
          return '松手表示反对'
        }
      }
    }
  }
</script>
<style>
  .box-card {
    font-size: 20px;
    text-align: left;
    border-radius: 2px;
    margin: 15px 0;
  }

  .time {
    color: #999;
    margin: 10px 0 -5px 0;
    font-size: 13px;
  }

  .notice-title {
    font-size: 20px;
  }

  .notice-content {
    font-size: 13px;
  }

  .first-card {
    padding: 0 0 20px 0;
  }

  .first-card-col-right {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
  }

  .detail-box-card{
    margin: 5px 0;
  }

  .detail-content{
    font-size: 20px;
    font-weight: 500;
  }

  .others-say-divider{
    margin: 50px 0;
  }

  .el-slider__bar{
    background-color: greenyellow !important;
  }

  .el-slider__runway{
    background-color: red !important;
  }
</style>
