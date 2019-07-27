<template>
  <div class="container" v-loading="screenLoading">
    <el-card class="box-card">
      <div style="font-weight: 900;font-size: 25px;">{{me.name.length > 8 ? me.name.substring(0,8) + '...' : me.name}}</div>
      <p class="time">
        {{me.count}} 条内容
      </p>
      <el-divider></el-divider>
      <p class="time card-bottom">
        <i class="el-icon-cold-drink"> 重生</i>
        <span style="margin-left: 20px;"></span>
        <i class="el-icon-moon-night"> 转世</i>
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
        <i class="el-icon-delete"> 删除</i>
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
      }

    },
    computed: {

    }
  }
</script>
<style>
  .card-bottom{
    margin-top: -10px;
  }
</style>
