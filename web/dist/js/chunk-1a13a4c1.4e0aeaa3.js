(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1a13a4c1"],{7465:function(e,t,a){"use strict";var n=a("e290"),s=a.n(n);s.a},"7f7f":function(e,t,a){var n=a("86cc").f,s=Function.prototype,r=/^\s*function ([^ (]*)/,i="name";i in s||a("9e1e")&&n(s,i,{configurable:!0,get:function(){try{return(""+this).match(r)[1]}catch(e){return""}}})},a55b:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-container",{directives:[{name:"loading",rawName:"v-loading",value:e.screenLoading,expression:"screenLoading"}],staticClass:"login-body"},[a("el-main",[a("div",{},[a("h1",[e._v("欢迎加入！")]),a("p",[e._v("这是一个睡前互动社区，你只需要加入即可。 "),a("br"),e._v(" 试着放松，首先请...")]),a("el-form",{attrs:{"label-width":"0px"}},[a("el-form-item",[a("el-input",{attrs:{placeholder:"给自己起个名字，大家都会这样称呼你"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),a("p",[e._v("这个名字不是永久的，所以你不需要小心翼翼")]),a("p",[e._v("然后... ")]),a("el-form-item",[a("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("加入我们")])],1)],1)],1)])],1)},s=[],r=(a("7f7f"),{name:"Login",data:function(){return{name:"",password:"",usepassword:!1,screenLoading:!1}},mounted:function(){document.title="欢迎加入！";var e=localStorage.getItem("userid.night.xtzero.me");e&&this.$router.push("/")},methods:{onSubmit:function(){var e=this;if(!this.name)return this.$message({type:"error",message:"请至少告诉大家你叫什么吧？"}),!1;this.screenLoading=!0;var t=this.name+"%23"+this.$utils.rand(1e3,9999),a=this.password?this.password:this.$utils.rand(1e7,99999999);this.$utils.ajax("addUser",{name:t,password:a}).then(function(t){e.screenLoading=!1,200===t.data.code?(localStorage.setItem("userid.night.xtzero.me",t.data.data.id),localStorage.setItem("name.night.xtzero.me",t.data.data.name),e.$store.state.user.id=t.data.data.id,e.$store.state.user.name=t.data.data.name,e.$router.push("/")):e.$message({type:"error",message:t.data.msg})}).catch(function(t){e.screenLoading=!1,e.$message({type:"error",message:"登录时出现了问题"}),console.log(t)})}}}),i=r,o=(a("7465"),a("2877")),c=Object(o["a"])(i,n,s,!1,null,"7805e744",null);t["default"]=c.exports},e290:function(e,t,a){}}]);
//# sourceMappingURL=chunk-1a13a4c1.4e0aeaa3.js.map