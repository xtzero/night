(function(e){function t(t){for(var i,n,r=t[0],l=t[1],c=t[2],d=0,u=[];d<r.length;d++)n=r[d],s[n]&&u.push(s[n][0]),s[n]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(e[i]=l[i]);p&&p(t);while(u.length)u.shift()();return o.push.apply(o,c||[]),a()}function a(){for(var e,t=0;t<o.length;t++){for(var a=o[t],i=!0,n=1;n<a.length;n++){var r=a[n];0!==s[r]&&(i=!1)}i&&(o.splice(t--,1),e=l(l.s=a[0]))}return e}var i={},n={app:0},s={app:0},o=[];function r(e){return l.p+"js/"+({}[e]||e)+"."+{"chunk-1a13a4c1":"4e0aeaa3","chunk-45775c53":"74db4688","chunk-f73e891c":"1456f221"}[e]+".js"}function l(t){if(i[t])return i[t].exports;var a=i[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,l),a.l=!0,a.exports}l.e=function(e){var t=[],a={"chunk-1a13a4c1":1,"chunk-45775c53":1,"chunk-f73e891c":1};n[e]?t.push(n[e]):0!==n[e]&&a[e]&&t.push(n[e]=new Promise(function(t,a){for(var i="css/"+({}[e]||e)+"."+{"chunk-1a13a4c1":"b8c21606","chunk-45775c53":"27d594df","chunk-f73e891c":"280befcb"}[e]+".css",s=l.p+i,o=document.getElementsByTagName("link"),r=0;r<o.length;r++){var c=o[r],d=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(d===i||d===s))return t()}var u=document.getElementsByTagName("style");for(r=0;r<u.length;r++){c=u[r],d=c.getAttribute("data-href");if(d===i||d===s)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var i=t&&t.target&&t.target.src||s,o=new Error("Loading CSS chunk "+e+" failed.\n("+i+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=i,delete n[e],p.parentNode.removeChild(p),a(o)},p.href=s;var m=document.getElementsByTagName("head")[0];m.appendChild(p)}).then(function(){n[e]=0}));var i=s[e];if(0!==i)if(i)t.push(i[2]);else{var o=new Promise(function(t,a){i=s[e]=[t,a]});t.push(i[2]=o);var c,d=document.createElement("script");d.charset="utf-8",d.timeout=120,l.nc&&d.setAttribute("nonce",l.nc),d.src=r(e),c=function(t){d.onerror=d.onload=null,clearTimeout(u);var a=s[e];if(0!==a){if(a){var i=t&&("load"===t.type?"missing":t.type),n=t&&t.target&&t.target.src,o=new Error("Loading chunk "+e+" failed.\n("+i+": "+n+")");o.type=i,o.request=n,a[1](o)}s[e]=void 0}};var u=setTimeout(function(){c({type:"timeout",target:d})},12e4);d.onerror=d.onload=c,document.head.appendChild(d)}return Promise.all(t)},l.m=e,l.c=i,l.d=function(e,t,a){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(l.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)l.d(a,i,function(t){return e[t]}.bind(null,i));return a},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/",l.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],d=c.push.bind(c);c.push=t,c=c.slice();for(var u=0;u<c.length;u++)t(c[u]);var p=d;o.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"034f":function(e,t,a){"use strict";var i=a("64a9"),n=a.n(i);n.a},"56d7":function(e,t,a){"use strict";a.r(t);a("96cf");var i=a("3b8d"),n=(a("cadf"),a("551c"),a("f751"),a("097d"),a("2b0e")),s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[e.is_login?a("el-container",{staticClass:"container"},[a("el-header",{staticStyle:{height:"0px"}}),a("el-main",{staticClass:"body"},[a("router-view")],1),a("el-footer",{staticClass:"footer"},[a("span",[a("router-link",{staticClass:"el-icon-chat-line-round",attrs:{to:"/"}},[e._v(" 表态")])],1),a("el-divider",{attrs:{direction:"vertical"}}),a("span",[a("router-link",{staticClass:"el-icon-smoking",attrs:{to:"/smoking"}},[e._v(" 吸烟区")])],1),a("el-divider",{attrs:{direction:"vertical"}}),a("span",[a("router-link",{staticClass:"el-icon-mobile-phone",attrs:{to:"/me"}},[e._v(" 自己")])],1)],1)],1):a("router-view")],1)},o=[],r={name:"app",components:{},mounted:function(){this.$checkUser(),this.$router.push("/login")},computed:{is_login:function(){var e=this.$store.state.user.id;return!!e}}},l=r,c=(a("034f"),a("2877")),d=Object(c["a"])(l,s,o,!1,null,null,null),u=d.exports,p=a("8c4f"),m=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.screenLoading,expression:"screenLoading"}],staticClass:"home"},[a("el-card",{staticClass:"box-card first-card"},[a("el-col",{attrs:{span:20}},[a("div",{staticClass:"notice-title"},[e._v("表态")]),a("div",{staticClass:"notice-content"},[e._v("你为什么睡不着")])]),a("el-col",{staticClass:"first-card-col-right",attrs:{span:4}},[a("el-button",{attrs:{icon:"el-icon-edit",type:"primary",circle:""},on:{click:function(t){e.send.display=!0}}})],1)],1),e._l(e.list,function(t,i){return a("el-card",{staticClass:"box-card"},[t.image?a("div",[a("el-image",{staticStyle:{width:"100%",height:"100px"},attrs:{src:t.image,fit:"cover"},on:{click:function(a){return e.showDetail(t)}}}),a("p",{staticStyle:{margin:"0 0",color:"black","font-size":"15px"}},[e._v(e._s(t.content))])],1):a("div",["normal"===t.type?a("div",{on:{click:function(a){return e.showDetail(t)}}},[e._v("\n          "+e._s(t.content)+"\n        ")]):"voice"===t.type?a("div",[a("el-row",[a("el-col",{attrs:{span:3}},[a("i",{directives:[{name:"show",rawName:"v-show",value:e.playing.mid!=t.id,expression:"playing.mid!=v.id"}],staticClass:"el-icon-video-play",on:{click:function(a){return e.play(t,i)}}}),a("i",{directives:[{name:"show",rawName:"v-show",value:e.playing.mid==t.id,expression:"playing.mid==v.id"}],staticClass:"el-icon-circle-close",on:{click:e.stop}})]),a("el-col",{attrs:{span:19}},[a("el-progress",{attrs:{"text-inside":!0,"stroke-width":26,percentage:e.playing.mid===t.id?Math.round(t.played)/Math.round(t.length)*100:0,"show-text":!1}})],1)],1)],1):e._e()]),a("p",{staticClass:"time",on:{click:function(a){return e.showDetail(t)}}},[e._v("\n        "+e._s(e.zipName(t.name))+" 于 "+e._s(t.create_at)+"\n        "),"normal"===t.type?a("span",[e._v(" 发送")]):"voice"===t.type?a("span",[e._v(" 呐喊")]):e._e(),a("br"),a("span",{staticClass:"el-icon-chat-dot-round"},[e._v(e._s(t.c_count?t.c_count:0))]),a("el-divider",{attrs:{direction:"vertical"}}),a("span",{staticClass:"el-icon-sunny"},[e._v(e._s(t.star?t.star:0))]),a("el-divider",{attrs:{direction:"vertical"}}),a("span",{staticClass:"el-icon-heavy-rain"},[e._v(e._s(t.shit?t.shit:0))])],1)])}),a("el-card",{directives:[{name:"show",rawName:"v-show",value:!e.nomore,expression:"!nomore"}],staticClass:"box-card",staticStyle:{"text-align":"center","font-size":"13px",padding:"0"}},[a("span",{on:{click:e.nextPage}},[e._v("\n\t\t\t\t下一页\n\t\t\t")])]),a("el-card",{directives:[{name:"show",rawName:"v-show",value:e.nomore,expression:"nomore"}],staticClass:"box-card",staticStyle:{"text-align":"center","font-size":"13px",padding:"0"}},[a("span",{on:{click:e.reload}},[e._v("\n\t\t\t\t没有更多了，点击重新加载\n\t\t\t")])]),a("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:e.send.loading,expression:"send.loading"}],attrs:{title:"想要表态",visible:e.send.display,width:"100%",fullscreen:!0},on:{"update:visible":function(t){return e.$set(e.send,"display",t)}}},[a("el-form",[a("el-form-item",{attrs:{"label-width":"0"}},[a("el-input",{attrs:{rows:10,type:"textarea",placeholder:e.send.placeholder,autosize:{minRows:5,maxRows:10}},model:{value:e.send.data.content,callback:function(t){e.$set(e.send.data,"content",t)},expression:"send.data.content"}}),this.send.data.content.length>100?a("span",{staticStyle:{color:"red"}},[e._v("\n            剩余字数 "+e._s(this.send.data.content.length)+" / 100\n          ")]):a("span",[e._v("\n            剩余字数 "+e._s(this.send.data.content.length)+" / 100\n          ")]),a("el-row",{directives:[{name:"show",rawName:"v-show",value:e.send.image.url,expression:"send.image.url"}]},[a("input",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"inputimage",attrs:{type:"file",accept:"image/*"},on:{change:e.imageInputOnChange}}),a("el-image",{staticStyle:{width:"70px",height:"70px"},attrs:{src:e.send.image.url,"preview-src-list":e.imgSrcList,fit:"fill"},on:{click:e.clearImg}})],1)],1)],1),a("div",{staticClass:"dialog-footer",staticStyle:{"margin-top":"-30px"},attrs:{slot:"footer"},slot:"footer"},[a("el-button",{directives:[{name:"loading",rawName:"v-loading",value:e.send.image.uploading,expression:"send.image.uploading"}],attrs:{size:"small",type:"primary",icon:"el-icon-picture-outline-round"},on:{click:e.addImage}},[e._v("带图")]),a("el-button",{attrs:{size:"small",type:"primary",disabled:this.send.data.content.length>100},on:{click:e.sendMoment}},[e._v("表态！")])],1)],1),a("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:e.sendVoice.loading,expression:"sendVoice.loading"}],attrs:{title:"那就呐喊",visible:e.sendVoice.display,width:"100%"},on:{"update:visible":function(t){return e.$set(e.sendVoice,"display",t)}}},[a("el-form",[a("el-form-item",{attrs:{"label-width":"0"}},[a("p",{directives:[{name:"show",rawName:"v-show",value:e.sendVoice.speaking&&!e.sendVoice.spoken,expression:"sendVoice.speaking && !sendVoice.spoken"}]},[a("i",{staticClass:"el-icon-loading"}),e._v(" 我在听。")]),a("p",{directives:[{name:"show",rawName:"v-show",value:!e.sendVoice.speaking&&!e.sendVoice.spoken,expression:"!sendVoice.speaking && !sendVoice.spoken"}]},[a("i",{staticClass:"el-icon-ice-cream-round"}),e._v(" 请点击「讲」")]),a("p",{directives:[{name:"show",rawName:"v-show",value:!e.sendVoice.speaking&&e.sendVoice.spoken,expression:"!sendVoice.speaking && sendVoice.spoken"}]},[a("i",{staticClass:"el-icon-cold-drink"}),e._v(" 点击「听」来重审自我。")]),a("p",{directives:[{name:"show",rawName:"v-show",value:!e.sendVoice.speaking&&e.sendVoice.spoken,expression:"!sendVoice.speaking && sendVoice.spoken"}]},[a("i",{staticClass:"el-icon-dessert"}),e._v(" 点击「呐喊」来告知全世界")])])],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.sendVoice.speaking,expression:"!sendVoice.speaking"}],attrs:{type:"primary",icon:"el-icon-mic"},on:{click:e.record}},[e._v("讲")]),a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.sendVoice.speaking,expression:"sendVoice.speaking"}],attrs:{type:"primary",icon:"el-icon-mic"},on:{click:e.record}},[e._v("讲毕")]),a("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.sendVoice.speaking&&e.sendVoice.spoken,expression:"!sendVoice.speaking && sendVoice.spoken"}],attrs:{type:"primary",disabled:e.sendVoice.listening,icon:"el-icon-headset"},on:{click:e.reply}},[e._v("听")]),a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.sendVoice.spoken,expression:"sendVoice.spoken"},{name:"loading",rawName:"v-loading",value:e.sendVoice.uploading,expression:"sendVoice.uploading"}],attrs:{type:"primary"},on:{click:e.uploadVoice}},[e._v("呐喊！")])],1)],1),a("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:e.detail.loading,expression:"detail.loading"}],attrs:{visible:e.detail.display,fullscreen:!0},on:{"update:visible":function(t){return e.$set(e.detail,"display",t)}}},[a("h3",[a("i",{staticClass:"el-icon-sugar",staticStyle:{"font-size":"20px"}}),e._v(" "+e._s(e.zipName(e.detail.data.name))+"\n        "),"normal"==e.detail.data.type?a("span",[e._v(" 说：")]):"voice"==e.detail.data.type?a("span",[e._v(" 曾经呐喊")]):e._e()]),"normal"==e.detail.data.type?a("span",{staticClass:"detail-content"},[e._v(e._s(e.detail.data.content))]):e._e(),e.detail.data.image?a("el-image",{staticStyle:{width:"100%",height:"auto"},attrs:{src:e.detail.data.image,fit:"cover"}}):e._e(),a("p",{staticClass:"time",staticStyle:{"margin-bottom":"30px"}},[e._v(e._s(e.detail.data.create_at))]),a("div",{staticClass:"block"},[a("el-row",{staticStyle:{display:"flex","flex-direction":"row","justify-content":"space-between",width:"100%"}},[a("el-col",{staticStyle:{"text-align":"left"},attrs:{span:6}},[a("i",{staticClass:"el-icon-sunny"}),e._v(" "+e._s(e.detail.data.star)+"\n          ")]),a("el-col",{staticStyle:{"text-align":"center","font-size":"10px"},attrs:{span:12}},[e._v(e._s(e.sosTip))]),a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:6}},[e._v("\n            "+e._s(e.detail.data.shit)+" "),a("i",{staticClass:"el-icon-heavy-rain"})])],1),a("el-slider",{attrs:{"show-tooltip":!1},on:{change:e.onSosChange},model:{value:e.detail.sos,callback:function(t){e.$set(e.detail,"sos",t)},expression:"detail.sos"}})],1),e.hasComments?a("el-divider",{staticClass:"others-say-divider"},[e._v("其他人说")]):a("el-divider",{staticClass:"others-say-divider"},[e._v("其他人啥都没说")]),a("el-card",{staticClass:"detail-box-card"},[a("div",{staticClass:"text item",staticStyle:{"text-align":"center"}},[e.hasComments?a("span",{staticClass:"el-icon-thumb",on:{click:e.showCommentDialog}},[e._v(" 加入 「其他人」")]):a("span",{staticClass:"el-icon-thumb",on:{click:e.showCommentDialog}},[e._v(" 我先说点啥")])])]),e._l(e.detail.data.comments,function(t){return a("el-card",{directives:[{name:"show",rawName:"v-show",value:e.hasComments,expression:"hasComments"}],staticClass:"detail-box-card"},[a("span",[e._v(e._s(e.zipName(t.name))+" :")]),a("div",{staticClass:"text item"},[e._v("\n          "+e._s(t.content)+"\n        ")])])}),e.hasComments?a("el-divider",{staticClass:"others-say-divider"},[e._v("其他人说完了")]):e._e(),a("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:e.detail.comment.loading,expression:"detail.comment.loading"}],attrs:{title:"想要表态",visible:e.detail.comment.display,width:"100%","append-to-body":""},on:{"update:visible":function(t){return e.$set(e.detail.comment,"display",t)}}},[a("el-form",[a("el-form-item",{attrs:{"label-width":"0"}},[a("el-input",{attrs:{rows:10,type:"textarea",placeholder:"请输入内容",autosize:{minRows:5,maxRows:10}},model:{value:e.detail.comment.data.content,callback:function(t){e.$set(e.detail.comment.data,"content",t)},expression:"detail.comment.data.content"}}),e.detail.comment.data.content.length>50?a("span",{staticStyle:{color:"red"}},[e._v("\n            剩余字数 "+e._s(e.detail.comment.data.content.length)+" / 50\n          ")]):a("span",[e._v("\n            剩余字数 "+e._s(e.detail.comment.data.content.length)+" / 50\n          ")])],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary",disabled:e.detail.comment.data.content.length>30},on:{click:e.sendComment}},[e._v("表态！")])],1)],1)],2)],2)},h=[],g=a("da43"),v=a.n(g),f={name:"home",components:{},data:function(){return{screenLoading:!1,list:[],page:1,nomore:!1,send:{loading:!1,display:!1,data:{content:""},placeholder:"表明态度",image:{uploading:!1,url:""}},sendVoice:{display:!1,loading:!1,speaking:!1,spoken:!1,listening:!1,uploading:!1,url:""},detail:{loading:!1,display:!1,sos:0,data:{comments:[],shit:0,star:0},comment:{display:!1,data:{content:""},loading:!1}},isRecording:!1,recorder:{},playing:{isPlaying:!1,mid:0,audioObj:{},length:1,played:0,playInterval:{}}}},mounted:function(){this.$checkUser(),this.getMomentList(),this.recorder=new v.a,this.playing.audioObj=new Audio},methods:{clearImg:function(){confirm("清除图片吗？")&&(this.send.image.url="",this.$message({type:"success",message:"完成了"}))},imageInputOnChange:function(e){var t=this,a=this.$refs.inputimage.files;a.length>1&&this.$message({message:"多图只取第一张"});var i=a[0];this.$utils.zipImage(i).then(function(e){var a=new XMLHttpRequest;a.open("POST","http://nightapi.xtzero.me/index.php/uploadImage",!0),a.onload=function(e){t.send.image.uploading=!1;var a=JSON.parse(e.currentTarget.responseText);if(200===a.code){var i="http://nightvoice.xtzero.me/"+a.data.url;t.send.image.url=i}else t.$message({message:a.msg,type:error})},a.onerror=function(){t.send.image.uploading=!1,t.$message({message:"图片上传错误",type:"error"})};var i=new FormData;i.append("file",e),t.send.image.uploading=!0,a.send(i)})},addImage:function(){this.$refs.inputimage.click()},play:function(e,t){var a=this;if(this.playing.isPlaying)return this.$message({message:"正在播放其他音频",type:"error"}),!1;this.playing.audioObj.src=e.content,this.playing.mid=e.id,this.playing.audioObj.addEventListener("canplay",function(){a.playing.isPlaying=!0,a.playing.audioObj.play(),a.list[t].length=a.playing.audioObj.duration,a.playing.playInterval=setInterval(function(){a.list[t].played=a.playing.audioObj.currentTime},1e3),setTimeout(function(){a.playing.audioObj.src="",a.playing.isPlaying=!1,clearInterval(a.playing.playInterval)},1e3*(a.playing.audioObj.duration-0+1))})},stop:function(){this.playing.audioObj.pause(),this.playing.mid=0,this.playing.isPlaying=!1,clearInterval(this.playing.playInterval)},record:function(){this.isRecording?(this.sendVoice.speaking=!1,this.sendVoice.spoken=!0,this.recorder.stop()):(this.sendVoice.speaking=!0,this.sendVoice.spoken=!1,this.recorder.start()),this.isRecording=!this.isRecording},reply:function(){var e=this;this.sendVoice.listening=!0,this.recorder.play(),setTimeout(function(){e.sendVoice.listening=!1},2e3)},uploadVoice:function(){var e=this;this.sendVoice.uploading=!0;var t=new Blob([this.recorder.getWAV()],{type:"audio/wav"}),a=new XMLHttpRequest;a.open("POST","http://nightapi.xtzero.me/index.php/upload",!0),a.onload=function(t){e.sendVoice.uploading=!1,e.sendVoice.display=!1;var a=JSON.parse(t.currentTarget.responseText);if(200===a.code){var i="http://nightvoice.xtzero.me/"+a.data.url;e.sendVoice.url=i,e.$utils.ajax("sendMoment",{userid:e.$store.state.user.id,content:e.sendVoice.url,type:"voice"}).then(function(t){e.screenLoading=!1,e.send.data.content="",e.send.display=!1,e.reload()})}else e.$message({message:a.msg,type:error})},a.onerror=function(){e.sendVoice.uploading=!1,e.sendVoice.display=!1,e.$message({message:"语音消息上传错误",type:error})};var i=new FormData,n=new window.File([t],"123");i.append("file",n),a.send(i)},getMomentList:function(e){var t,a=this;t=e?this.page+1:this.page,this.screenLoading=!0,this.$utils.ajax("listMoment",{page:t}).then(function(t){if(a.screenLoading=!1,200===t.data.code){var i=t.data.data;for(var n in i)"voice"===i[n].type&&(i[n].length=1,i[n].played=0),a.list.push(i[n]);e&&a.page++}else"没有更多数据了"===t.data.msg?(a.$message({type:"error",message:t.data.msg}),a.nomore=!0):a.$message({type:"error",message:t.data.msg})})},formatTime:function(e){return this.$utils.formatTime(e)},nextPage:function(){this.getMomentList(!0)},reload:function(){this.list=[],this.page=1,this.nomore=!1,this.getMomentList()},sendMoment:function(){var e=this;if(this.screenLoading=!0,""==this.send.data.content)return this.send.placeholder="至少说点什么吧？",!1;this.$utils.ajax("sendMoment",{userid:this.$store.state.user.id,content:this.send.data.content,image:this.send.image.url}).then(function(t){e.screenLoading=!1,e.send.data.content="",e.send.display=!1,e.reload()})},showDetail:function(e){var t=this;this.screenLoading=!0,this.$utils.ajax("momentDetail",{mid:e.id}).then(function(e){t.screenLoading=!1,200===e.data.code?(t.detail.display=!0,t.detail.data=e.data.data,t.detail.sos=t.sosOriValue(),console.log(t.detail.data)):t.$message({type:"error",message:e.data.msg})})},onSosChange:function(e){0===e?this.shit():100===e?this.star():this.detail.sos=this.sosOriValue()},sosOriValue:function(){var e=this.detail.data.shit,t=this.detail.data.star,a=t-e+50;return a},star:function(){var e=this;this.detail.loading=!0,this.$utils.ajax("starOrShit",{mid:this.detail.data.id,sos:"star"}).then(function(t){e.detail.loading=!1,200===t.data.code?(e.showDetail({id:e.detail.data.id}),e.$message({type:"success",message:"点赞成功！",showClose:!0})):e.$message({type:"error",message:t.data.msg,showClose:!0})}).catch(function(t){e.detail.data.sos=e.sosOriValue()})},shit:function(){var e=this;this.detail.loading=!0,this.$utils.ajax("starOrShit",{mid:this.detail.data.id,sos:"shit"}).then(function(t){e.detail.loading=!1,200===t.data.code?(e.showDetail({id:e.detail.data.id}),e.$message({type:"success",message:"点踩成功！",showClose:!0})):e.$message({type:"error",message:t.data.msg,showClose:!0})}).catch(function(t){e.detail.data.sos=e.sosOriValue()})},showCommentDialog:function(){this.detail.comment.display=!0},sendComment:function(){var e=this;this.detail.comment.loading=!0,this.$utils.ajax("sendComment",{mid:this.detail.data.id,userid:this.$store.state.user.id,content:this.detail.comment.data.content}).then(function(t){e.detail.comment.loading=!1,200===t.data.code?(e.detail.comment.display=!1,e.detail.comment.data.content="",e.showDetail({id:e.detail.data.id})):e.$message({type:"error",message:t.data.msg})})},zipName:function(e){return e&&e.length>8?e.substring(0,8)+"...":e}},computed:{hasComments:function(){return this.detail.data.comments.length>0},sosTip:function(){return this.detail.sos==this.sosOriValue()?"拖动滑块来表态":this.detail.sos<this.sosOriValue()&&this.detail.sos>0?"拖到最左表示反对":this.detail.sos>this.sosOriValue()&&this.detail.sos<100?"拖到最右表示赞同":100==this.detail.sos?"松手表示赞同":0==this.detail.sos?"松手表示反对":void 0},imgSrcList:function(){return[this.send.image.url]}}},y=f,w=(a("cccb"),Object(c["a"])(y,m,h,!1,null,null,null)),b=w.exports;n["default"].use(p["a"]);var x=new p["a"]({routes:[{path:"/",name:"home",meta:"表态",component:b},{path:"/smoking",name:"smoking",meta:"吸烟区",component:function(){return a.e("chunk-45775c53").then(a.bind(null,"1a21"))}},{path:"/me",name:"me",meta:"自己",component:function(){return a.e("chunk-f73e891c").then(a.bind(null,"0a99"))}},{path:"/login",name:"login",meta:"登录",component:function(){return a.e("chunk-1a13a4c1").then(a.bind(null,"a55b"))}}]}),_=a("2f62");n["default"].use(_["a"]);var k=new _["a"].Store({state:{user:{id:"",name:""}},mutations:{},actions:{}}),C=a("5c96"),V=a.n(C);a("c69f");n["default"].use(V.a);var $=a("bc3a"),O=a.n($),S=a("62b0"),j="http://nightapi.xtzero.me/index.php/";function N(e,t){var a=[];for(var i in t)a.push(i+"="+t[i]);var n=j+e+"?"+a.join("&");return O.a.get(n)}function L(e,t){return parseInt(Math.random()*(t-e+1)+e,10)}function T(e,t){var a=new Date(e).getTime()/1e3,i=new Date(1e3*a),n=i.getFullYear(),s=i.getMonth()+1,o=i.getDate(),r=i.getHours(),l=i.getMinutes();if(1==t)return l>=0&&l<=9&&(l="0"+l),n+"-"+s+"-"+o+" "+r+":"+l;var c=new Date;return n==c.getFullYear()?n="":n==c.getFullYear()-1?n="去年 ":n+="年",s==c.getMonth()+1?s="":s+="月",o==c.getDate()?o="今天 ":o==c.getDate()-1?o="昨天":(""==s&&(s="本月 "),o+="号 "),r<10&&(r="0"+r),l<10&&(l="0"+l),n+s+o+r+":"+l}function z(e){return new Promise(function(t,a){e||a(),new S["a"](e,{quality:.6,success:function(e){t(e)},error:function(e){a(e)}})})}n["default"].config.productionTip=!1;var D={ajax:N,rand:L,formatTime:T,zipImage:z};n["default"].prototype.$utils=D,n["default"].prototype.$checkUser=function(){var e=this,t=localStorage.getItem("userid.night.xtzero.me"),a=localStorage.getItem("name.night.xtzero.me");t?(this.$store.state.user.id=t,this.$store.state.user.name=a,D.ajax("checkUser",{userid:t}).then(function(t){200!=t.data.code&&e.$router.push("/login")}).catch(function(e){n["default"].prototype.$message({type:"error",message:"检查用户时出现错误"})})):this.$router.push("/login")},new n["default"]({router:x,store:k,render:function(e){return e(u)}}).$mount("#app"),x.beforeEach(function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(t,a,i){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:document.title=t.meta,i();case 2:case"end":return e.stop()}},e)}));return function(t,a,i){return e.apply(this,arguments)}}())},"64a9":function(e,t,a){},c69f:function(e,t,a){},cccb:function(e,t,a){"use strict";var i=a("d563"),n=a.n(i);n.a},d563:function(e,t,a){}});
//# sourceMappingURL=app.665dfd95.js.map