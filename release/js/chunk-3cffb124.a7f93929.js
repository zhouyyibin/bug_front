(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3cffb124"],{"038f":function(t,e,a){},"33e6":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"account-settings-info-view"},[a("a-row",{attrs:{gutter:16}},[a("a-col",{attrs:{md:24,lg:16}},[a("a-form",{attrs:{layout:"vertical",form:t.form},on:{submit:t.handleSubmit}},[a("a-form-item",{attrs:{label:"账号"}},[a("a-input",{attrs:{value:t.account.account,disabled:""}})],1),a("a-form-item",{attrs:{label:"昵称"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["nice",{rules:[{required:!0,message:"请输入昵称"}]}],expression:"[\n              'nice',\n              {rules: [{ required: true, message: '请输入昵称' }]}\n            ]"}],attrs:{placeholder:"给自己起个名字"}})],1),a("a-form-item",{attrs:{label:"电子邮件",required:!1}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["email",{rules:[{required:!0,message:"请输入邮箱"}]}],expression:"[\n              'email',\n              {rules: [{ required: true, message: '请输入邮箱' }]}\n            ]"}],attrs:{placeholder:"exp@admin.com"}})],1),a("a-form-item",[a("a-button",{attrs:{type:"primary"}},[t._v("提交")]),a("a-button",{staticStyle:{"margin-left":"8px"}},[t._v("保存")])],1)],1)],1),a("a-col",{style:{minHeight:"180px"},attrs:{md:24,lg:8}},[a("div",{staticClass:"ant-upload-preview",on:{click:function(e){return t.$refs.modal.edit(1)}}},[a("a-icon",{staticClass:"upload-icon",attrs:{type:"cloud-upload-o"}}),a("div",{staticClass:"mask"},[a("a-icon",{attrs:{type:"plus"}})],1),a("img",{attrs:{src:t.option.img}})],1)])],1),a("avatar-modal",{ref:"modal"})],1)},o=[],r=(a("96cf"),a("3b8d")),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a-modal",{attrs:{title:"修改头像",visible:t.visible,maskClosable:!1,confirmLoading:t.confirmLoading,width:800},on:{cancel:t.cancelHandel}},[a("a-row",[a("a-col",{style:{height:"350px"},attrs:{xs:24,md:12}},[a("vue-cropper",{ref:"cropper",attrs:{img:t.options.img,info:!0,autoCrop:t.options.autoCrop,autoCropWidth:t.options.autoCropWidth,autoCropHeight:t.options.autoCropHeight,fixedBox:t.options.fixedBox},on:{realTime:t.realTime}})],1),a("a-col",{style:{height:"350px"},attrs:{xs:24,md:12}},[a("div",{staticClass:"avatar-upload-preview"},[a("img",{style:t.previews.img,attrs:{src:t.previews.url}})])])],1),a("template",{slot:"footer"},[a("a-button",{key:"back",on:{click:t.cancelHandel}},[t._v("取消")]),a("a-button",{key:"submit",attrs:{type:"primary",loading:t.confirmLoading},on:{click:t.okHandel}},[t._v("保存")])],1)],2)},s=[],c={data:function(){return{visible:!1,id:null,confirmLoading:!1,options:{img:"/avatar2.jpg",autoCrop:!0,autoCropWidth:200,autoCropHeight:200,fixedBox:!0},previews:{}}},methods:{edit:function(t){this.visible=!0,this.id=t},close:function(){this.id=null,this.visible=!1},cancelHandel:function(){this.close()},okHandel:function(){var t=this;t.confirmLoading=!0,setTimeout(function(){t.confirmLoading=!1,t.close(),t.$message.success("上传头像成功")},2e3)},realTime:function(t){this.previews=t}}},l=c,u=(a("9870"),a("2877")),d=Object(u["a"])(l,n,s,!1,null,"03ca9f6d",null),m=d.exports,p=a("365c"),f={components:{AvatarModal:m},data:function(){return{form:this.$form.createForm(this),account:{},preview:{},option:{img:"/avatar2.jpg",info:!0,size:1,outputType:"jpeg",canScale:!1,autoCrop:!0,autoCropWidth:180,autoCropHeight:180,fixedBox:!0,fixed:!0,fixedNumber:[1,1]}}},mounted:function(){this.getUserinfo()},methods:{getUserinfo:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(){var e,a,i,o;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,p["default"].auth.getUserinfo();case 2:e=t.sent,a=e.data,i=a.nice,o=a.email,this.account=a,this.form.setFieldsValue({nice:i,email:o});case 7:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),handleSubmit:function(){}}},v=f,h=(a("4f2d"),Object(u["a"])(v,i,o,!1,null,"31a0a240",null));e["default"]=h.exports},"4f2d":function(t,e,a){"use strict";var i=a("038f"),o=a.n(i);o.a},"89ed":function(t,e,a){},9870:function(t,e,a){"use strict";var i=a("89ed"),o=a.n(i);o.a}}]);