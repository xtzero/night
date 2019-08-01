<template>
  <div class="about">
    <h1>
      <i class="el-icon-smoking"></i>
      吸烟区
    </h1>
    <p>我们希望吸烟区能带给来访者更多的意外。</p>
    <el-card :body-style="{ padding: '0px' }" class="smoking-card">
      <el-image
        class="image"
        :src="'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'"
        :fit="'cover'">
      </el-image>
      <div class="card-mask">
        玩家守则
      </div>
    </el-card>
  </div>
</template>
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
