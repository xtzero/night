(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-45775c53"],{"0bc1":function(t,i,e){"use strict";var a=e("8111"),s=e.n(a);s.a},"1a21":function(t,i,e){"use strict";e.r(i);var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"about"},[t._m(0),e("p",[t._v("我们希望吸烟区能带给来访者更多的意外。")]),t._l(t.list,function(i,a){return e("el-card",{staticClass:"smoking-card",attrs:{"body-style":{padding:"0px"}}},[e("el-image",{staticClass:"image",attrs:{src:i.image,fit:"cover"}}),e("div",{staticClass:"card-mask",on:{click:function(e){return t.visitDetail(i)}}},[t._v("\n      "+t._s(i.title)+"\n    ")])],1)}),e("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.detail.loading,expression:"detail.loading"}],attrs:{visible:t.detail.display,width:"100%"},on:{"update:visible":function(i){return t.$set(t.detail,"display",i)}}},[e("h3",[e("i",{staticClass:"el-icon-ship",staticStyle:{"font-size":"20px"}}),t._v("\n      即将跳转： "+t._s(t.detail.data.title)+"  "),e("br"),t._v("\n      "+t._s(t.detail.data.url)+" "),e("br"),e("br"),t._v("\n      请注意境外安全 "),e("br"),t._v("\n      必要时候请使用 「后退」 泊岸 "),e("br"),e("br"),t._v("\n      "+t._s(t.detail.restSecond)+" 秒后抵达对岸\n    ")])])],2)},s=[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("h1",[e("i",{staticClass:"el-icon-smoking"}),t._v("\n    吸烟区\n  ")])}],n={name:"Smoking",data:function(){return{list:[],screenLoading:!1,detail:{data:{url:"",title:""},display:!1,loading:!1,restSecond:0}}},mounted:function(){this.getArticleList()},methods:{visitDetail:function(t){var i=this;this.detail.display=!0,this.detail.data.title=t.title,this.detail.data.url=t.url,this.detail.restSecond=3,setInterval(function(){i.detail.restSecond--},1e3),setTimeout(function(){window.location.href=t.url},3e3)},getArticleList:function(){var t=this;this.$utils.ajax("articleList").then(function(i){200===i.data.code?(t.list=i.data.data,console.log(t.list)):t.$message({message:i.data.msg,type:"error"})})}}},l=n,r=(e("0bc1"),e("2877")),c=Object(r["a"])(l,a,s,!1,null,null,null);i["default"]=c.exports},8111:function(t,i,e){}}]);
//# sourceMappingURL=chunk-45775c53.2ca2f1ef.js.map