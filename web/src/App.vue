<template>
  <div id="app">
    <el-container class="container">
      <el-header style="height: 0px;"></el-header>
      <el-main class="body">
        <router-view/>
      </el-main>
      <el-footer class="footer">
        <span>
          <router-link to="/" class="el-icon-chat-line-round"> 表态</router-link>
        </span>
        <el-divider direction="vertical"></el-divider>
        <span>
          <router-link to="/smoking" class="el-icon-smoking"> 吸烟区</router-link>
        </span>
        <el-divider direction="vertical"></el-divider>
        <span>
          <router-link to="/me" class="el-icon-mobile-phone"> 自己</router-link>
        </span>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {

  }
}
</script>

<style>
.footer{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 44px;
  border-top: solid 1px white;
  background-color: black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.footer a{
  color: white;
  text-decoration: none;
  width: 100%;
}

.footer>span{
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 33%;
  text-align: center;
}
.body{
  background-color: black;
  height: calc(100vh - 43px);
}
body{
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
</style>
