<template>
  <div class="home" v-loading="screenLoading">
<!--    话题卡片-->
    <el-card class="box-card first-card">
      <el-col :span="20">
        <div class="notice-title">表态</div>
        <div class="notice-content">你为什么睡不着</div>
      </el-col>
      <el-col :span="4" class="first-card-col-right">
        <el-button icon="el-icon-edit" type="primary" circle @click="send.display=true"></el-button>
      </el-col>
    </el-card>
<!--    <el-card class="box-card first-card">-->
<!--      <el-col :span="20">-->
<!--        <div class="notice-title">呐喊</div>-->
<!--        <div class="notice-content">你觉得这世界如何</div>-->
<!--      </el-col>-->
<!--      <el-col :span="4" class="first-card-col-right">-->
<!--        <el-button icon="el-icon-microphone" type="primary" circle @click="sendVoice.display=true"></el-button>-->
<!--      </el-col>-->
<!--    </el-card>-->
<!--    帖子卡片 循环-->
    <el-card
      class="box-card"
      v-for="(v, k) in list"
    >
      <div v-if="v.image">
        <el-image
          style="width: 100%; height: 100px"
          :src="v.image"
          fit="cover"
          @click="showDetail(v)"
        >
        </el-image>
        <p style="margin: 0 0;color: black;font-size: 15px;">{{v.content}}</p>
      </div>
      <div v-else>
        <div @click="showDetail(v)" v-if="v.type === 'normal'">
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
      </div>
      <p class="time" @click="showDetail(v)">
        {{ zipName(v.name) }} 于 {{ v.create_at }}
        <span v-if="v.type === 'normal'"> 发送</span>
        <span v-else-if="v.type === 'voice'"> 呐喊</span>
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
      :fullscreen="true"
    >
      <el-form>
        <el-form-item label-width="0">
          <el-input
            :rows="10"
            type="textarea"
            :placeholder="send.placeholder"
            v-model="send.data.content"
            :autosize="{ minRows: 5, maxRows: 10}"
          >
          </el-input>
          <span style="color: red;" v-if="this.send.data.content.length>100">
            剩余字数 {{this.send.data.content.length}} / 100
          </span>
          <span v-else>
            剩余字数 {{this.send.data.content.length}} / 100
          </span>
          <el-row v-show="send.image.url">
            <input type="file" accept="image/*" ref="inputimage" v-show="false" @change="imageInputOnChange">
            <el-image
                    style="width: 70px; height: 70px"
                    :src="send.image.url"
                    :preview-src-list="imgSrcList"
                    @click="clearImg"
                    fit="fill">
            </el-image>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="margin-top: -30px;">
        <el-button size="small" type="primary" icon="el-icon-picture-outline-round" @click="addImage" v-loading="send.image.uploading">带图</el-button>
        <el-button size="small" type="primary" @click="sendMoment" :disabled="this.send.data.content.length > 100">表态！</el-button>
      </div>
    </el-dialog>
<!--发语音 弹层-->
    <el-dialog
            title="那就呐喊"
            :visible.sync="sendVoice.display"
            width="100%"
            v-loading="sendVoice.loading"
    >
      <el-form>
        <el-form-item label-width="0">
          <p v-show="sendVoice.speaking && !sendVoice.spoken"><i class="el-icon-loading"></i> 我在听。</p>
          <p v-show="!sendVoice.speaking && !sendVoice.spoken"><i class="el-icon-ice-cream-round"></i> 请点击「讲」</p>
          <p v-show="!sendVoice.speaking && sendVoice.spoken"><i class="el-icon-cold-drink"></i> 点击「听」来重审自我。</p>
          <p v-show="!sendVoice.speaking && sendVoice.spoken"><i class="el-icon-dessert"></i> 点击「呐喊」来告知全世界</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="record" icon="el-icon-mic" v-show="!sendVoice.speaking">讲</el-button>
        <el-button type="primary" @click="record" icon="el-icon-mic" v-show="sendVoice.speaking">讲毕</el-button>
        <el-button type="primary" :disabled="sendVoice.listening" @click="reply" icon="el-icon-headset" v-show="!sendVoice.speaking && sendVoice.spoken">听</el-button>
        <el-button type="primary" v-show="sendVoice.spoken" @click="uploadVoice" v-loading="sendVoice.uploading">呐喊！</el-button>
      </div>
    </el-dialog>

    <!--详情弹层-->
    <el-dialog
      :visible.sync="detail.display"
      :fullscreen="true"
      v-loading="detail.loading"
    >
      <h3><i class="el-icon-sugar" style="font-size: 20px;"></i> {{zipName(detail.data.name)}}
        <span v-if="detail.data.type=='normal'"> 说：</span>
        <span v-else-if="detail.data.type=='voice'"> 曾经呐喊</span>
      </h3>
      <span class="detail-content" v-if="detail.data.type=='normal'">{{detail.data.content}}</span>
      <el-image
          v-if="detail.data.image"
          style="width: 100%;height: auto;"
          :src="detail.data.image"
          fit="cover"
      >
      </el-image>
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
                    :autosize="{ minRows: 5, maxRows: 10}"
            >
            </el-input>
            <span style="color: red;" v-if="detail.comment.data.content.length > 50">
            剩余字数 {{detail.comment.data.content.length}} / 50
          </span>
            <span v-else>
            剩余字数 {{detail.comment.data.content.length}} / 50
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
  import Recorder from 'js-audio-recorder'
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
          },
          placeholder: '表明态度',
          image: {
            uploading: false,
            url: ''
          }
        },
        sendVoice: {
          display: false,
          loading: false,
          speaking: false,  // 正在说
          spoken: false,    // 讲完了
          listening: false,  // 正在听
          uploading: false,
          url: ''
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
        },
        isRecording: false,
        recorder: {},
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
      this.getMomentList()
      this.recorder = new Recorder()
      this.playing.audioObj = new Audio()
    },
    methods: {
      clearImg() {
        if (confirm('清除图片吗？')) {
          this.send.image.url = ''
          this.$message({
            type: 'success',
            message: '完成了'
          });
        }
      },
      imageInputOnChange(e) {
        const fileList = this.$refs.inputimage.files
        if (fileList.length > 1) {
          this.$message({
            message: '多图只取第一张'
          })
        }
        const imageFile = fileList[0]
        this.$utils.zipImage(imageFile).then((file) => {
          const xhr = new XMLHttpRequest()
          xhr.open("POST",'http://nightapi.xtzero.me/index.php/uploadImage',true)
          xhr.onload = (e) => {
              this.send.image.uploading = false
              const res = JSON.parse(e.currentTarget.responseText)
              if (res.code === 200) {
                  const url = 'http://nightvoice.xtzero.me/' + res.data.url
                  this.send.image.url = url
              } else {
                  this.$message({
                      message: res.msg,
                      type: error
                  })
              }
          }
          xhr.onerror = () => {
              this.send.image.uploading = false
              this.$message({
                  message: '图片上传错误',
                  type: 'error'
              })
          }
          const form = new FormData()
          form.append('file', file)
          this.send.image.uploading = true
          xhr.send(form)
        })
      },
      addImage() {
        this.$refs.inputimage.click()
      },
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
      record() {
        if (this.isRecording) {
          this.sendVoice.speaking = false
          this.sendVoice.spoken = true
          this.recorder.stop()
        } else {
          this.sendVoice.speaking = true
          this.sendVoice.spoken = false
          this.recorder.start()
        }
        this.isRecording = !this.isRecording
      },
      reply() {
        this.sendVoice.listening = true
        this.recorder.play()
        setTimeout(() => {
          this.sendVoice.listening = false
        }, 2000)
      },
      uploadVoice() {
        this.sendVoice.uploading = true
        const wav = new Blob([ this.recorder.getWAV() ], { type: 'audio/wav' })
        const xhr = new XMLHttpRequest()
        xhr.open("POST",'http://nightapi.xtzero.me/index.php/upload',true)
        xhr.onload = (e) => {
          this.sendVoice.uploading = false
          this.sendVoice.display = false
          const res = JSON.parse(e.currentTarget.responseText)
          if (res.code === 200) {
            const url = 'http://nightvoice.xtzero.me/' + res.data.url
            this.sendVoice.url = url
            this.$utils.ajax('sendMoment', {
              userid: this.$store.state.user.id,
              content: this.sendVoice.url,
              type: 'voice'
            }).then((res) => {
              this.screenLoading = false
              this.send.data.content = ''
              this.send.display = false
              this.reload()
            })
          } else {
            this.$message({
              message: res.msg,
              type: error
            })
          }
        }
        xhr.onerror = () => {
          this.sendVoice.uploading = false
          this.sendVoice.display = false
          this.$message({
            message: '语音消息上传错误',
            type: error
          })
        }
        const form = new FormData()
        const files = new window.File(
            [wav],
            '123',
        )
        form.append('file', files)
        xhr.send(form)
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
          page: page
        }).then((res) => {
          this.screenLoading = false
          if (res.data.code === 200) {
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
          } else if (res.data.msg === '没有更多数据了') {
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
        if (this.send.data.content == '') {
          this.send.placeholder = '至少说点什么吧？'
          return false
        }
        this.$utils.ajax('sendMoment', {
          userid: this.$store.state.user.id,
          content: this.send.data.content,
          image: this.send.image.url
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
      },
      imgSrcList() {
        return [
                this.send.image.url
        ]
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
