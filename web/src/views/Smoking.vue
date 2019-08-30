<template>
  <div class="about">
    <h1>
      <i class="el-icon-smoking"></i>
      吸烟区
    </h1>
    <p>我们希望吸烟区能带给来访者更多的意外。</p>
    <el-card :body-style="{ padding: '0px' }" class="smoking-card" v-for="(v, k) in list" style="margin-bottom: 15px;">
      <el-image
        class="image"
        :src="v.image"
        :fit="'cover'">
      </el-image>
      <div class="card-mask" @click="visitDetail(v)">
        {{v.title}}
      </div>
    </el-card>
    <el-dialog
            :visible.sync="detail.display"
            v-loading="detail.loading"
            width="100%"
    >
      <h3 v-if="this.detail.restSecond===0">
        <i class="el-icon-cold-drink" style="font-size: 20px;"></i>
        一路顺风
      </h3>
      <h3 v-else>
        <i class="el-icon-ship" style="font-size: 20px;"></i>
        即将跳转： {{detail.data.title}}  <br>
        {{detail.data.url}} <br><br>
        请注意境外安全 <br>
        必要时候请使用 「后退」 泊岸 <br><br>
        {{detail.restSecond}} 秒后抵达对岸
      </h3>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: "Smoking",
    data : () => {
      return {
        list: [],
        screenLoading: false,
        detail: {
          data: {
            url: '',
            title: ''
          },
          display: false,
          loading: false,
          restSecond: 0
        }
      }
    },
    mounted(){
      this.getArticleList()
    },
    methods: {
      visitDetail(v) {
        this.detail.display = true
        this.detail.data.title = v.title
        this.detail.data.url = v.url
        this.detail.restSecond = 3
        setInterval(() => {
          if (this.detail.restSecond === 0) {
            this.detail.restSecond = 0
          }
          this.detail.restSecond --
        }, 1000)
        setTimeout(() => {
          window.location.href = v.url
        }, 3000)
      },
      getArticleList() {
        this.$utils.ajax('articleList').then((res) => {
          if (res.data.code === 200) {
            this.list = res.data.data
            console.log(this.list)
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          }
        })
      }
    }
  }
</script>
<style>
  .about{
    color: white;
  }

  .image {
    width: 100%;
    display: block;
    height: 150px;
    border-style: none;
  }

  .smoking-card{
    position: relative;
  }
  .card-mask{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 30px;
  }
</style>
