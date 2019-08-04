<template>
    <el-container class="login-body" v-loading="screenLoading">
        <el-main>
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
                    <p>如果你想永久保留这个名字，我们建议你</p>
                    <p v-show="!usepassword"><el-checkbox v-model="usepassword">使用转生口令</el-checkbox></p>
                    <el-form-item v-if="usepassword">
                        <el-input v-model="password" type="password" placeholder="转生口令"></el-input>
                    </el-form-item>
                    <p v-show="usepassword">转生口令会在账号失效的时候起到作用，让你能继续使用这个账号。</p>
                </el-form>
            </div>
        </el-main>
    </el-container>
</template>

<script>
export default {
    name: "Login",
    data : () => {
        return {
            name: '',
            password: '',
            usepassword: false,
            screenLoading: false
        }
    },
    mounted(){
      document.title = '欢迎加入！'
        const userid = localStorage.getItem('userid.night.xtzero.me')
        if (userid) {
            this.$router.push('/')
        }
    },
    methods: {
        onSubmit() {
            if (!this.name) {
                this.$message({
                    type: 'error',
                    message: '请至少告诉大家你叫什么吧？'
                })
                return false
            }
            this.screenLoading = true
            this.$utils.ajax('addUser',{
                name: this.name,
                password: this.password ? this.password : this.$utils.rand(10000000,99999999)
            }).then((res) => {
                this.screenLoading = false
                if (res.data.code === 200) {
                    localStorage.setItem('userid.night.xtzero.me', res.data.data.id)
                    localStorage.setItem('name.night.xtzero.me', res.data.data.name)
                    this.$store.state.user.id = res.data.data.id
                    this.$store.state.user.name = res.data.data.name
                    this.$router.push('/')
                } else {
                    this.$message({
                        type: 'error',
                        message: res.data.msg
                    })
                }
            }).catch((e) => {
                this.screenLoading = false
                this.$message({
                    type: 'error',
                    message: '登录时出现了问题'
                })
                console.log(e)
            })
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
    p{
        font-size: 13px;
    }
</style>
