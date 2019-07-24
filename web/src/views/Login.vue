<template>
    <el-container class="login-body">
        <div class="">
            <h1>欢迎加入！</h1>
            <p>这是一个睡前互动社区，你只需要加入即可。 <br> 试着放松，首先请...</p>
            <el-form label-width="0px">
                <el-form-item>
                    <el-input v-model="name" placeholder="给自己起个名字，大家都会这样称呼你"></el-input>
                </el-form-item>
                <p>这个名字不是永久的，所以你不需要小心翼翼</p>
                <p>然后... </p>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" style="width: 100%">加入我们</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-container>
</template>

<script>
export default {
    name: "Login",
    data : () => {
        return {
            name: ''
        }
    },
    methods: {
        onSubmit() {
            console.log(this.name)
        }
    }
}
</script>

<style scoped>
.login-body{
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
</style>