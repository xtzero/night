<template>
  <div class="home">
    <el-card class="box-card first-card">
      <el-col :span="20">
        <div class="notice-title">话题</div>
        <div class="notice-content">本期主题：你为什么睡不着</div>
      </el-col>
      <el-col :span="4" class="first-card-col-right">
        <el-button icon="el-icon-edit" type="primary" circle></el-button>
      </el-col>
    </el-card>
    <el-card class="box-card">
      <div>我觉得每天睡不着应该都赖杨艺，毕竟每天都是她絮絮叨叨不睡觉。</div>
      <p class="time">
        二狗子3天前发送
        <el-divider direction="vertical"></el-divider>
        <span class="el-icon-chat-dot-round">3</span>
        <el-divider direction="vertical"></el-divider>
        <span class="el-icon-sunny">4</span>
        <el-divider direction="vertical"></el-divider>
        <span class="el-icon-heavy-rain">5</span>
        <el-divider direction="vertical"></el-divider>
        <span class="el-icon-view">135</span>
      </p>
    </el-card>
    <el-card class="box-card">
      <div>我觉得每天睡不着应该都赖杨艺，毕竟每天都是她絮絮叨叨不睡觉。</div>
      <p class="time">
        二狗子3天前发送
        <el-divider direction="vertical"></el-divider>
        <span class="el-icon-chat-dot-round">3</span>
        <el-divider direction="vertical"></el-divider>
        <span class="el-icon-sunny">4</span>
        <el-divider direction="vertical"></el-divider>
        <span class="el-icon-heavy-rain">5</span>
        <el-divider direction="vertical"></el-divider>
        <span class="el-icon-view">135</span>
      </p>
    </el-card>
    <el-card class="box-card">
      <div>我觉得每天睡不着应该都赖杨艺，毕竟每天都是她絮絮叨叨不睡觉。</div>
      <p class="time">
        二狗子3天前发送
        <el-divider direction="vertical"></el-divider>
        <span class="el-icon-chat-dot-round">3</span>
        <el-divider direction="vertical"></el-divider>
        <span class="el-icon-sunny">4</span>
        <el-divider direction="vertical"></el-divider>
        <span class="el-icon-heavy-rain">5</span>
        <el-divider direction="vertical"></el-divider>
        <span class="el-icon-view">135</span>
      </p>
    </el-card>
    <el-card class="box-card">
      <div>我觉得每天睡不着应该都赖杨艺，毕竟每天都是她絮絮叨叨不睡觉。</div>
      <p class="time">
        二狗子3天前发送
        <el-divider direction="vertical"></el-divider>
        <span class="el-icon-chat-dot-round">3</span>
        <el-divider direction="vertical"></el-divider>
        <span class="el-icon-sunny">4</span>
        <el-divider direction="vertical"></el-divider>
        <span class="el-icon-heavy-rain">5</span>
        <el-divider direction="vertical"></el-divider>
        <span class="el-icon-view">135</span>
      </p>
    </el-card>
    <el-card class="box-card">
      <div>我觉得每天睡不着应该都赖杨艺，毕竟每天都是她絮絮叨叨不睡觉。</div>
      <p class="time">
        二狗子3天前发送
        <el-divider direction="vertical"></el-divider>
        <span class="el-icon-chat-dot-round">3</span>
        <el-divider direction="vertical"></el-divider>
        <span class="el-icon-sunny">4</span>
        <el-divider direction="vertical"></el-divider>
        <span class="el-icon-heavy-rain">5</span>
        <el-divider direction="vertical"></el-divider>
        <span class="el-icon-view">135</span>
      </p>
    </el-card>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  mounted() {
    const userid = localStorage.getItem('userid.night.xtzero.me')
    if (!userid) {
      this.$router.push('/login')
    }
  }
}
</script>
<style>
  .box-card{
    font-size: 20px;
    text-align: left;
    border-radius: 2px;
    margin: 15px 0;
  }

  .time{
    color: #999;
    margin: 10px 0 -5px 0;
    font-size: 13px;
  }

  .notice-title{
    font-size: 20px;
  }

  .notice-content{
    font-size: 13px;
  }

  .first-card{
    padding: 0 0 20px 0;
  }

  .first-card-col-right{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
  }
</style>
