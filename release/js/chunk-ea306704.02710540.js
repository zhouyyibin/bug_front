(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ea306704"],{"88bc":function(e,t,n){(function(t){var n=1/0,a=9007199254740991,r="[object Arguments]",l="[object Function]",i="[object GeneratorFunction]",o="[object Symbol]",c="object"==typeof t&&t&&t.Object===Object&&t,s="object"==typeof self&&self&&self.Object===Object&&self,u=c||s||Function("return this")();function d(e,t,n){switch(n.length){case 0:return e.call(t);case 1:return e.call(t,n[0]);case 2:return e.call(t,n[0],n[1]);case 3:return e.call(t,n[0],n[1],n[2])}return e.apply(t,n)}function f(e,t){var n=-1,a=e?e.length:0,r=Array(a);while(++n<a)r[n]=t(e[n],n,e);return r}function h(e,t){var n=-1,a=t.length,r=e.length;while(++n<a)e[r+n]=t[n];return e}var m=Object.prototype,p=m.hasOwnProperty,v=m.toString,b=u.Symbol,g=m.propertyIsEnumerable,w=b?b.isConcatSpreadable:void 0,C=Math.max;function y(e,t,n,a,r){var l=-1,i=e.length;n||(n=S),r||(r=[]);while(++l<i){var o=e[l];t>0&&n(o)?t>1?y(o,t-1,n,a,r):h(r,o):a||(r[r.length]=o)}return r}function k(e,t){return e=Object(e),_(e,t,function(t,n){return n in e})}function _(e,t,n){var a=-1,r=t.length,l={};while(++a<r){var i=t[a],o=e[i];n(o,i)&&(l[i]=o)}return l}function x(e,t){return t=C(void 0===t?e.length-1:t,0),function(){var n=arguments,a=-1,r=C(n.length-t,0),l=Array(r);while(++a<r)l[a]=n[t+a];a=-1;var i=Array(t+1);while(++a<t)i[a]=n[a];return i[t]=l,d(e,this,i)}}function S(e){return $(e)||O(e)||!!(w&&e&&e[w])}function j(e){if("string"==typeof e||E(e))return e;var t=e+"";return"0"==t&&1/e==-n?"-0":t}function O(e){return F(e)&&p.call(e,"callee")&&(!g.call(e,"callee")||v.call(e)==r)}var $=Array.isArray;function A(e){return null!=e&&L(e.length)&&!T(e)}function F(e){return I(e)&&A(e)}function T(e){var t=D(e)?v.call(e):"";return t==l||t==i}function L(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=a}function D(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function I(e){return!!e&&"object"==typeof e}function E(e){return"symbol"==typeof e||I(e)&&v.call(e)==o}var N=x(function(e,t){return null==e?{}:k(e,f(y(t,1),j))});e.exports=N}).call(this,n("c8ba"))},"958e":function(e,t,n){},"97f9":function(e,t,n){"use strict";var a=n("958e"),r=n.n(a);r.a},b6eb:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("a-row",{attrs:{gutter:24}},[n("a-col",{attrs:{span:8}},[n("a-card",{attrs:{bordered:!1,title:"维护部门:艾鑫集团"}},[n("a-tree",{attrs:{defaultSelectedKeys:[0],defaultExpandedKeys:[0],defaultExpandAll:"",showLine:"",treeData:e.treeData},on:{select:e.onSelect},scopedSlots:e._u([{key:"title",fn:function(t){return n("div",{staticClass:"tree-node"},[e._v("\n            "+e._s(t.title)+"\n            "),n("span",{staticClass:"tree-node-actions"},[n("a",{attrs:{href:"javascript:;"},on:{click:function(n){return e.$refs.modal.edit(t)}}},[e._v("编辑")]),t.children?e._e():n("a",{attrs:{href:"javascript:;"},on:{click:function(n){return e.handleDelete(t.id)}}},[e._v("删除")])])])}}])})],1)],1),n("a-col",{attrs:{span:16}},[n("a-card",{attrs:{bordered:!1,title:"下级部门"}},[n("table",[n("tr",[n("td",[e._v("\n              "+e._s(e.currentTitle)+"    >    \n            ")]),n("td",[e._l(e.children,function(t,a){return n("div",{key:"children_"+a,staticStyle:{"margin-bottom":"20px",width:"400px"}},[n("a-input",{model:{value:t.name,callback:function(n){e.$set(t,"name",n)},expression:"item.name"}})],1)}),e._l(e.newChildren,function(t,a){return n("div",{key:"newChildren_"+a,staticStyle:{"margin-bottom":"20px",width:"400px"}},[n("a-input",{model:{value:t.name,callback:function(n){e.$set(t,"name",n)},expression:"item.name"}})],1)}),n("a-button",{staticStyle:{"margin-right":"10px"},attrs:{type:"primary"},on:{click:e.saveForm}},[e._v("保存")])],2)])])])],1)],1),n("depart-modal",{ref:"modal",attrs:{"department-list":e.treeData}})],1)},r=[],l=n("795b"),i=n.n(l),o=(n("ac6a"),n("5df3"),n("7f7f"),n("2af9")),c=n("365c"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("a-modal",{staticStyle:{top:"20px"},attrs:{title:"编辑部门",width:800},on:{ok:e.handleOk},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[n("a-form",{attrs:{form:e.form,id:"userForm"}},[n("a-form-item",{attrs:{labelCol:e.labelCol,wrapperCol:e.wrapperCol,label:"上级部门"}},[n("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["parentId",{initialValue:0,rules:[{required:!0,message:"请选择上级部门"}]}],expression:"[\n          'parentId',\n          {\n            initialValue: 0,\n            rules: [{ required: true, message: '请选择上级部门' }]\n          }\n        ]"}],on:{change:e.handleChange}},[e._l(e.departmentList,function(t){return[n("a-select-option",{attrs:{value:t.id}},[e._v(e._s(t.name))]),e._l(t.departments,function(a){return[n("a-select-option",{attrs:{value:a.id}},[e._v(e._s(t.name)+">"+e._s(a.name))]),e._l(a.departments,function(r){return[n("a-select-option",{attrs:{value:r.id}},[e._v(e._s(t.name)+">"+e._s(a.name)+">"+e._s(r.name))])]})]})]})],2)],1),n("a-form-item",{attrs:{labelCol:e.labelCol,wrapperCol:e.wrapperCol,label:"部门名称",hasFeedback:""}},[n("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["name",{rules:[{required:!0,message:"请输入部门名称"}]}],expression:"[\n          'name',\n          {rules: [{ required: true, message: '请输入部门名称' }]}\n        ]"}],attrs:{placeholder:""}})],1),n("a-form-item",{attrs:{labelCol:e.labelCol,wrapperCol:e.wrapperCol,label:"负责人",hasFeedback:""}},[n("a-select",{attrs:{showSearch:"",value:e.value,placeholder:"input search text",defaultActiveFirstOption:!1,showArrow:!1,filterOption:!1,notFoundContent:null},on:{search:e.handleSearch,change:e.handleChange}},e._l(e.data,function(t){return n("a-select-option",{key:t.value},[e._v(e._s(t.text))])}),1)],1)],1)],1)},u=[],d=n("5176"),f=n.n(d),h=n("88bc"),m=n.n(h),p={name:"DepartModal",props:["departmentList"],data:function(){return{labelCol:{xs:{span:24},sm:{span:5}},wrapperCol:{xs:{span:24},sm:{span:16}},visible:!1,confirmLoading:!1,mdl:{},data:[],value:"",form:this.$form.createForm(this)}},methods:{handleCheckAccount:function(e,t,n){/^[0-9a-zA-Z]+$/.test(t)?n():n(new Error("请输入字母或数字组合的账号"))},handleSearch:function(e){c["default"].user.list({pageNo:1,pageSize:-1,keyword:e}).then(function(e){return console.log(e)})},add:function(){var e=this;this.mdl=null,this.visible=!0,this.$nextTick(function(){e.form.resetFields()})},edit:function(e){var t=this;console.log(e),this.mdl=e?f()({},e):"",this.visible=!0,this.$nextTick(function(){t.form.setFieldsValue(m()(t.mdl,"parentId","name","userId"))})},close:function(){this.$emit("close"),this.visible=!1},handleOk:function(){var e=this;this.form.validateFields(function(t,n){if(!t){e.confirmLoading=!0;var a=e.mdl?"update":"save";e.mdl&&(n.id=e.mdl.id),c["default"].user[a](n).then(function(t){e.$message.success("保存成功"),e.$emit("ok")}).catch(function(){}).finally(function(){e.confirmLoading=!1,e.close()})}})},handleCancel:function(){this.close()},onChangeCheck:function(e){e.indeterminate=!!e.selected.length&&e.selected.length<e.actionsOptions.length,e.checkedAll=e.selected.length===e.actionsOptions.length},onChangeCheckAll:function(e,t){f()(t,{selected:e.target.checked?t.actionsOptions.map(function(e){return e.value}):[],indeterminate:!1,checkedAll:e.target.checked})},handleChange:function(e){console.log(e)}}},v=p,b=n("2877"),g=Object(b["a"])(v,s,u,!1,null,"6454fd8c",null),w=g.exports,C=10,y={name:"TableList",components:{STable:o["l"],DepartModal:w},data:function(){return{treeData:[],currentTitle:"艾鑫集团",visible:!1,labelCol:{xs:{span:24},sm:{span:5}},wrapperCol:{xs:{span:24},sm:{span:16}},form:null,mdl:{name:"",parentId:0},children:[],newChildren:[],advanced:!1,queryParam:{},selectedRowKeys:[],selectedRows:[],departmentList:[]}},created:function(){this.getList()},methods:{addSlot2Tree:function(e){var t=this;return e.map(function(e){return e.slots={title:"title"},e.scopedSlots={title:"title"},e.title=e.name,e.departments&&e.departments.length>0&&(e.children=t.addSlot2Tree(e.departments)),e})},getList:function(){var e=this;c["default"].department.tree().then(function(t){var n=t.result.data,a=[{key:0,name:"艾鑫集团",id:0,departments:n,children:n}];e.treeData=e.addSlot2Tree(a),e.departmentList=e.addSlot2Tree(n),e.children=e.treeData[0].children,e.initNewChildren()})},initNewChildren:function(){for(var e=C-this.children.length,t=0;t<e;t++)this.$set(this.newChildren,t,{name:"",parentId:this.mdl.parentId})},onSelect:function(e,t){var n=t.node.dataRef,a=n.name,r=n.id,l=n.children;this.currentTitle=a,this.mdl.parentId=r,this.children=l||[],this.initNewChildren()},handleEdit:function(e){console.log(e)},handleOk:function(){},handleDelete:function(e){var t=this;this.$confirm({title:"温馨提示",content:"您确定要删除该部门吗？删除后将无法恢复",okText:"确定",okType:"danger",cancelText:"取消",onOk:function(){c["default"].department.remove(e).then(function(){return t.getList()})},onCancel:function(){console.log("Cancel")}})},saveForm:function(){var e=this,t=this.newChildren.filter(function(e){return""!==e.name});t.length>0&&i.a.all(t.map(function(e){return c["default"].department.save(e)})).then(function(t){e.$message.success("保存成功"),e.getList()})}}},k=y,_=(n("97f9"),Object(b["a"])(k,a,r,!1,null,"bfb18c46",null));t["default"]=_.exports}}]);