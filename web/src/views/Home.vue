<template>
  <div class="home" v-loading="screenLoading">
    <el-card class="box-card first-card">
      <el-col :span="20">
        <div class="notice-title">话题</div>
        <div class="notice-content">本期主题：你为什么睡不着</div>
      </el-col>
      <el-col :span="4" class="first-card-col-right">
        <el-button icon="el-icon-edit" type="primary" circle @click="send.display=true"></el-button>
      </el-col>
    </el-card>
    <el-card
      class="box-card"
      v-for="v in list"
    >
      <div @click="showDetail(v)">
        {{ v.content }}
      </div>
      <p class="time" @click="showDetail(v)">
        {{ v.name }} 于 {{ formatTime(v.create_at)}} 发送
        <br/>
        <span class="el-icon-chat-dot-round">{{ v.c_count ? v.c_count : 0 }}</span>
        <el-divider direction="vertical"></el-divider>
        <span class="el-icon-sunny">{{ v.star ? v.star : 0 }}</span>
        <el-divider direction="vertical"></el-divider>
        <span class="el-icon-heavy-rain">{{ v.shit ? v.shit : 0 }}</span>
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
          <span style="color: red;" v-if="sendTotalCount>30">
            剩余字数 {{sendTotalCount}} / 30
          </span>
          <span v-else>
            剩余字数 {{sendTotalCount}} / 30
          </span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sendMoment" :disabled="sendTotalCount>30">表态！</el-button>
      </div>
    </el-dialog>

    <!--详情弹层-->
    <el-dialog
      :visible.sync="detail.display"
      :fullscreen="true"
      v-loading="detail.loading"
    >
      <h3><i class="el-icon-sugar" style="font-size: 20px;"></i> {{detail.data.name}} 说：</h3>
      <span class="detail-content">{{detail.data.content}}</span>
      <p class="time" style="margin-bottom: 30px;">{{detail.data.create_at}}</p>
<!--      <el-row style="display: flex;justify-content: center;align-items: center">-->
<!--        <el-button type="primary" icon="el-icon-sunny" circle></el-button>-->
<!--        <el-button type="primary" icon="el-icon-heavy-rain" circle></el-button>-->
<!--      </el-row>-->
      <div class="block">
        <el-slider
          v-model="value"
          range
          :show-tooltip="false"
          
        >
        </el-slider>
      </div>
      <el-divider class="others-say-divider" v-if="hasComments">其他人说</el-divider>
      <el-divider class="others-say-divider" v-else>其他人啥都没说</el-divider>
      <el-card class="detail-box-card">
        <div class="text item" style="text-align: center;">
          <span class="el-icon-thumb" v-if="hasComments"> 加入 「其他人」</span>
          <span class="el-icon-thumb" v-else> 我先说点啥</span>
        </div>
      </el-card>
      <el-card class="detail-box-card" v-for="v in detail.data.comments" v-show="hasComments">
        <span>{{v.name}} :</span>
        <div class="text item">
          {{v.content}}
        </div>
      </el-card>
      <el-divider class="others-say-divider" v-if="hasComments">其他人说完了</el-divider>
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
          data: {
            comments: []
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
            console.log(this.detail.data)
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
      }
    },
    computed: {
      sendTotalCount() {
        return this.send.data.content.length
      },
      hasComments() {
        return this.detail.data.comments.length > 0 ? true : false
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
</style>
