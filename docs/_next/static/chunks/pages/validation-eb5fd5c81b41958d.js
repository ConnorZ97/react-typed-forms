(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[987],{7985:function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/validation",function(){return t(2322)}])},2322:function(n,e,t){"use strict";t.r(e),t.d(e,{default:function(){return b}});var r=t(5202),a=t(7247),i=t(6393);function l(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function o(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable})))),r.forEach((function(e){l(n,e,t[e])}))}return n}function s(n,e){if(null==n)return{};var t,r,a=function(n,e){if(null==n)return{};var t,r,a={},i=Object.keys(n);for(r=0;r<i.length;r++)t=i[r],e.indexOf(t)>=0||(a[t]=n[t]);return a}(n,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);for(r=0;r<i.length;r++)t=i[r],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(a[t]=n[t])}return a}function c(n){var e=n.state,t=n.label,i=n.showValid,l=n.id,c=s(n,["state","label","showValid","id"]);return(0,a.useControlStateVersion)(e),(0,r.jsxs)("div",{className:"form-group",id:l,children:[t&&(0,r.jsx)("label",{children:t}),(0,r.jsx)("input",o({value:e.value,disabled:e.disabled,onChange:function(n){return e.setValue(n.currentTarget.value)},onBlur:function(){return e.setTouched(!0)},className:"form-control ".concat(e.touched?e.valid?i?"is-valid":"":"is-invalid":"")},c)),(0,r.jsx)("span",{className:"invalid-feedback",children:e.error})]})}var u=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,d=(0,a.buildGroup)()({email:(0,a.control)("",(function(n){return u.test(n)?"":"Invalid email address"})),async:(0,a.control)("",null),array:(0,a.arrayControl)((0,a.groupControl)({notBlank:(0,a.control)("",(function(n){return n?void 0:"Blank"}))}))}),f=0;function b(){f++;var n=(0,i.useState)(),e=n[0],t=n[1],l=(0,i.useState)(d)[0],o=l.fields,s=(0,a.useControlState)(l,(function(n){return n.valid}));return(0,a.useAsyncValidator)(o.async,(function(n,e){return fetch("/api/validate",{method:"POST",signal:e,headers:{"Content-Type":"application/json"},body:JSON.stringify({value:n.value})}).then((function(n){return n.json().then((function(n){return n.error}))}))}),500),(0,r.jsxs)("div",{className:"container",children:[(0,r.jsxs)("h2",{children:["Validation Example - ",f," render(s)"]}),(0,r.jsx)(c,{id:"email",label:"Email:",type:"text",state:o.email}),(0,r.jsx)(c,{id:"async",label:"Async:",type:"text",state:o.async,showValid:!0}),(0,r.jsx)(a.FormArray,{state:o.array,children:function(n){return n.map((function(n){return(0,r.jsx)(c,{state:n.fields.notBlank,label:"Not blank"})}))}}),(0,r.jsxs)("div",{children:[(0,r.jsx)("button",{className:"btn btn-secondary",onClick:function(){return l.setDisabled(!l.disabled)},children:"Toggle disabled"})," ",(0,r.jsx)("button",{id:"submit",className:"btn btn-primary",onClick:function(n){return t(l.toObject())},children:"toObject()"})," ",(0,r.jsx)("button",{id:"add",className:"btn btn-secndary",onClick:function(){o.array.add(),l.setTouched(!0)},children:"Add array"})]}),(0,r.jsxs)("span",{children:["Valid: ",(0,r.jsx)("span",{id:"validFlag",children:s.toString()})]}),e&&(0,r.jsx)("pre",{className:"my-2",children:JSON.stringify(e,void 0,2)})]})}}},function(n){n.O(0,[247,774,888,179],(function(){return e=7985,n(n.s=e);var e}));var e=n.O();_N_E=e}]);