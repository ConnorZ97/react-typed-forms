(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[84],{9579:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/group",function(){return n(5665)}])},5665:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return d}});var r=n(5202),a=n(7247),u=n(7599),s=n(6393),i=(0,a.buildGroup)()({age:0,firstName:"",anotherField:""});function d(){var e=(0,s.useState)(i)[0],t=e.fields,n=(0,s.useMemo)((function(){return e.subGroup((function(e){return{age:e.age,firstName:e.firstName}}))}),[e]),d=(0,s.useState)(0),o=d[0],l=d[1],c=(0,s.useState)(0),f=c[0],h=c[1],p=(0,s.useState)(0),b=p[0],x=p[1];return(0,a.useControlChangeEffect)(n,(function(){return h((function(e){return e+1}))}),a.ControlChange.Value),(0,a.useControlChangeEffect)(e,(function(){return l((function(e){return e+1}))}),a.ControlChange.Value),(0,a.useValueChangeEffect)(n,(function(){return x((function(e){return e+1}))}),1e3),(0,r.jsxs)("div",{className:"container",children:[(0,r.jsx)("h2",{children:"Group Test"}),(0,r.jsx)("div",{children:(0,r.jsx)(u.FTextField,{label:"First Name",id:"firstName",state:t.firstName})}),(0,r.jsx)("div",{children:(0,r.jsx)(u.FTextField,{label:"Another field",id:"anotherField",state:t.anotherField})}),(0,r.jsx)("div",{children:(0,r.jsx)(u.FNumberField,{id:"age",label:"Age",state:t.age})}),(0,r.jsxs)("div",{children:["SubGroup updates: ",(0,r.jsx)("span",{id:"updateCount",children:f})]}),(0,r.jsxs)("div",{children:["Parent updates: ",(0,r.jsx)("span",{id:"updateParentCount",children:o})]}),(0,r.jsxs)("div",{children:["Debounced subgroup updates:"," ",(0,r.jsx)("span",{id:"updateDebouncedCount",children:b})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("button",{id:"resetData",className:"btn btn-secondary",onClick:function(t){t.preventDefault(),e.setValue({age:10,anotherField:"WOW",firstName:"Reset"})},children:"Reset data"}),(0,r.jsx)("button",{id:"resetSubData",className:"btn btn-secondary",onClick:function(e){e.preventDefault(),n.setValue({age:5,firstName:"cool"})},children:"Reset Sub data"})]})]})}}},function(e){e.O(0,[247,599,774,888,179],(function(){return t=9579,e(e.s=t);var t}));var t=e.O();_N_E=t}]);